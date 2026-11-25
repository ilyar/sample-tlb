import { deflateRawSync } from 'node:zlib';

import { beginCell, Cell } from '@ton/core';
import { runtimeBy } from '@ton-community/tlb-runtime';

import samples from './samples.json';
import { encodeShareCell, encodeShareHash, parseShareHash } from './share-format';

const dataCell = beginCell().storeUint(1, 1).endCell();
const boc = dataCell.toBoc().toString('base64');
const multiRoot = 'b5ee9c7201010202000600010002aa0002bb';

function envelope(schema: Cell, version = 1) {
    return beginCell()
        .storeUint(version, 8)
        .storeUint(1, 2)
        .storeRef(schema)
        .storeUint(0, 3)
        .endCell()
        .toBoc({ idx: false, crc32: false })
        .toString('base64url');
}

test.each([
    ['x', false],
    ['abc '.repeat(1000), true],
] as const)('selects transport by final length', async (schema, compressed) => {
    const state = { mode: 'boc', schema, boc } as const;
    const bytes = encodeShareCell(state).toBoc({ idx: false, crc32: false });
    const raw = '#share=' + bytes.toString('base64url');
    const packed = '#share=deflate.' + deflateRawSync(bytes).toString('base64url');
    const hash = await encodeShareHash(state);
    expect(hash.startsWith('#share=deflate.')).toBe(compressed);
    expect(hash).toBe(packed.length < raw.length ? packed : raw);
    if (!compressed)
        expect(Cell.fromBoc(Buffer.from(hash.slice(7), 'base64url'))[0].equals(encodeShareCell(state))).toBe(true);
    expect(await parseShareHash(hash)).toEqual(state);
});

test.each([
    ['', 0],
    ['  ', 0],
    [boc, 1],
    [dataCell.toBoc().toString('hex'), 1],
    [dataCell.toBoc().toString('base64url'), 1],
    [multiRoot, 2],
    ['  unfinished 🧩\n', 2],
    [boc.slice(0, -4), 2],
    [dataCell.toBoc().toString('hex') + '?', 2],
] as const)('preserves BoC input %j using BocInput tag %i', async (input, expected) => {
    const encoded = await encodeShareHash({ mode: 'boc', schema: '', boc: input });
    const slice = encodeShareCell({ mode: 'boc', schema: '', boc: input }).beginParse();
    expect(slice.loadUint(8)).toBe(1);
    expect(slice.loadUint(2)).toBe(1);
    slice.loadRef().beginParse().endParse();
    expect(slice.loadBit()).toBe(false);
    const tag = slice.loadUint(2);
    expect(tag).toBe(expected);
    if (tag === 1) expect(slice.loadRef().equals(dataCell)).toBe(true);
    if (tag === 2) slice.loadRef();

    slice.endParse();
    expect(await parseShareHash(encoded)).toMatchObject({
        mode: 'boc',
        boc: expected === 1 ? boc : expected === 2 ? input : '',
    });
});

test.each(['{}', '', '{broken', JSON.stringify({ message: 'x'.repeat(10000) })])('shares Data text', async (data) => {
    const state = { mode: 'data', schema: 'x', data, as: 'Fallback' } as const;
    const hash = await encodeShareHash(state);
    expect(hash.endsWith('&as=Fallback')).toBe(true);
    expect(await parseShareHash(hash)).toEqual(state);
    expect(await encodeShareHash({ ...state, as: '' })).not.toContain('&as=');
});

test('decodes the playground sample', async () => {
    const sample = samples.find((s) => s.id === 'tlb-share')!;
    expect(runtimeBy(sample.schema).decodeCell(Cell.fromBase64(sample.boc), { rootType: 'Share' })).toMatchObject({
        kind: 'Share',
    });
    expect(await parseShareHash('#share=' + Buffer.from(sample.boc, 'base64').toString('base64url'))).toMatchObject({
        mode: 'boc',
        schema: '_ value:uint8 = Example;',
    });
    for (const hash of ['#schema=x&boc=y', '#tlb=' + sample.boc, '#tlb-share', '#share='])
        expect(await parseShareHash(hash)).toBeUndefined();
});

test('warns and falls back on malformed or oversized payloads even with legacy parameters', async () => {
    const empty = Cell.EMPTY;
    const badLength = beginCell().storeBit(0).endCell();
    let tooDeep = empty;
    for (let i = 0; i < 2048; i++) tooDeep = beginCell().storeRef(tooDeep).endCell();
    const invalid = [
        '%%%',
        envelope(empty, 2),
        envelope(badLength),
        envelope(empty).slice(0, -3),
        'deflate.__8',
        'gzip.' + envelope(empty),
        'deflate.' + deflateRawSync(Buffer.alloc(1024 * 1024 + 1)).toString('base64url'),
        envelope(tooDeep),
        Buffer.from(multiRoot, 'hex').toString('base64url'),
    ];
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    try {
        for (const value of invalid) expect(await parseShareHash('#share=' + value)).toBeUndefined();
        expect(warn).toHaveBeenCalledTimes(invalid.length);
    } finally {
        warn.mockRestore();
    }
});
