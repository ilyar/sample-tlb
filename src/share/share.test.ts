import { deflateRawSync } from 'node:zlib';

import { beginCell, Cell } from '@ton/core';
import { runtimeBy } from '@ton-community/tlb-runtime';

import samples from '../samples.json';
import { bocPayload, payloadText, shareRuntime, encodeShareState, decodeShareState } from './share';
import type { Payload, Share } from './share.d';

function fixture(schema: string, payload: Payload): Share {
    return { kind: 'Share', schema: { kind: 'Schema', data: schema }, payload };
}

function dataPayload(data: string): Payload {
    return { kind: 'Payload_data', value: { kind: 'Data', data } };
}

const dataCell = beginCell().storeUint(1, 1).endCell();
const boc = dataCell.toBoc().toString('base64');
const multiRoot = 'b5ee9c7201010202000600010002aa0002bb';

function envelope(schema: Cell, version = 1) {
    return beginCell()
        .storeUint(version, 8)
        .storeUint(1, 2)
        .storeRef(schema)
        .storeUint(0, 2)
        .endCell()
        .toBoc({ idx: false, crc32: false })
        .toString('base64url');
}

test.each([
    ['x', false],
    ['abc '.repeat(1000), true],
] as const)('selects transport by final length', async (schema, compressed) => {
    const state = fixture(schema, bocPayload(boc));
    const bytes = shareRuntime.encodeCell(state).toBoc({ idx: false, crc32: false });
    const raw = '#share=' + bytes.toString('base64url');
    const packed = '#share=deflate.' + deflateRawSync(bytes).toString('base64url');
    const hash = await encodeShareState(state);
    expect(hash.startsWith('#share=deflate.')).toBe(compressed);
    expect(hash).toBe(packed.length < raw.length ? packed : raw);
    if (!compressed)
        expect(Cell.fromBoc(Buffer.from(hash.slice(7), 'base64url'))[0].equals(shareRuntime.encodeCell(state))).toBe(
            true,
        );
    expect(shareRuntime.encodeCell((await decodeShareState(hash))!).equals(shareRuntime.encodeCell(state))).toBe(true);
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
    const encoded = await encodeShareState(fixture('', bocPayload(input)));
    const cell = shareRuntime.encodeCell(fixture('', bocPayload(input)));
    expect(cell.refs).toHaveLength(expected ? 2 : 1);
    const share = (await decodeShareState(encoded))!;
    expect(share.payload.kind).toBe(expected ? 'Payload_boc' : 'Payload_none');
    expect(payloadText(share.payload)).toBe(expected === 1 ? boc : expected === 2 ? input : '');
});

test.each(['{}', '', '{broken', JSON.stringify({ message: 'x'.repeat(10000) })])('shares Data text', async (data) => {
    const state = fixture('x', dataPayload(data));
    const hash = await encodeShareState(state);
    expect(hash).not.toContain('&');
    expect(shareRuntime.encodeCell((await decodeShareState(hash))!).equals(shareRuntime.encodeCell(state))).toBe(true);
    expect(payloadText((await decodeShareState(hash + '&as=Fallback'))!.payload)).toBe(data);
});

test.each([
    { mode: 'boc', schema: '_ s:uint1 = T;', boc: '' },
    { mode: 'boc', schema: '_ s:uint1 = T;', boc: 'ошибка 🧩' },
    { mode: 'data', schema: '_ s:uint1 = T;', data: '{"s":1}' },
] as const)('stores the short $mode payload according to its constructor', async (editor) => {
    const state = fixture(editor.schema, editor.mode === 'data' ? dataPayload(editor.data) : bocPayload(editor.boc));
    expect(shareRuntime.encodeCell(state).refs).toHaveLength(state.payload.kind === 'Payload_none' ? 1 : 2);
    expect(payloadText((await decodeShareState(await encodeShareState(state)))!.payload)).toBe(
        payloadText(state.payload),
    );
});

test.each([0, 1, 7, 8, 999, 1000, 1023])('stores a %i-bit leaf by reference', async (size) => {
    const leaf = beginCell().storeUint(0n, size).endCell();
    const state = fixture('', bocPayload(leaf.toBoc().toString('base64')));
    const { refs } = shareRuntime.encodeCell(state);
    expect(refs).toHaveLength(2);
    expect(refs[1].equals(leaf)).toBe(true);
    expect(payloadText((await decodeShareState(await encodeShareState(state)))!.payload)).toBe(
        payloadText(state.payload),
    );
});

test.each([124, 125, 126, 127, 128, 300])('stores %i UTF-8 bytes in a referenced SnakeString', async (size) => {
    const data = '🙂'.repeat(Math.floor(size / 4)) + 'a'.repeat(size % 4);
    const state = fixture('', dataPayload(data));
    const { refs } = shareRuntime.encodeCell(state);
    expect(refs).toHaveLength(2);
    expect(refs[1].beginParse().loadStringTail()).toBe(data);
    expect(payloadText((await decodeShareState(await encodeShareState(state)))!.payload)).toBe(
        payloadText(state.payload),
    );
});

test('preserves all bits and references of a full BoC root', async () => {
    const builder = beginCell().storeUint(0n, 1023);
    for (let i = 0; i < 4; i++) builder.storeRef(beginCell().storeUint(i, 2));
    const full = builder.endCell();
    const state = fixture('x', bocPayload(full.toBoc().toString('base64')));
    const encoded = shareRuntime.encodeCell(state);
    expect(encoded.refs).toHaveLength(2);
    expect(encoded.refs[1].equals(full)).toBe(true);
    expect(payloadText((await decodeShareState(await encodeShareState(state)))!.payload)).toBe(
        payloadText(state.payload),
    );
});

test('decodes the playground sample', async () => {
    const sample = samples.find((s) => s.id === 'tlb-share')!;
    expect(runtimeBy(sample.schema).decodeCell(Cell.fromBase64(sample.boc), { rootType: 'Share' })).toMatchObject({
        kind: 'Share',
    });
    const share = (await decodeShareState('#share=' + Buffer.from(sample.boc, 'base64').toString('base64url')))!;
    expect(share.schema.data).toBe('_ value:uint8 = Example;');
    expect(share.payload.kind).toBe('Payload_data');
    expect(payloadText(share.payload)).toBe('{"kind":"Example","value":42}');
    for (const hash of ['#schema=x&boc=y', '#tlb=' + sample.boc, '#tlb-share', '#share='])
        expect(await decodeShareState(hash)).toBeUndefined();
});

test('warns and falls back on malformed or oversized payloads', async () => {
    const empty = Cell.EMPTY;
    const badLength = beginCell().storeBit(0).endCell();
    let deepString = empty;
    for (let i = 0; i < 2048; i++) deepString = beginCell().storeRef(deepString).endCell();
    const invalid = [
        envelope(deepString),
        '%%%',
        envelope(empty, 2),
        envelope(badLength),
        envelope(empty).slice(0, -3),
        'deflate.__8',
        'gzip.' + envelope(empty),
        'deflate.' + deflateRawSync(Buffer.alloc(1024 * 1024 + 1)).toString('base64url'),
        envelope(beginCell().storeRef(empty).storeRef(empty).endCell()),
        Buffer.from(multiRoot, 'hex').toString('base64url'),
    ];
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    try {
        for (const value of invalid) expect(await decodeShareState('#share=' + value)).toBeUndefined();
        expect(warn).toHaveBeenCalledTimes(invalid.length);
    } finally {
        warn.mockRestore();
    }
});

test('rejects share text over the snake limit before serialization', () => {
    const text = '🙂'.repeat((127 * 2048) / 4) + '!';
    expect(() => shareRuntime.encodeCell(fixture('', dataPayload(text)))).toThrow('2048 cells');
    expect(() => shareRuntime.encodeCell(fixture(text, bocPayload('')))).toThrow('2048 cells');
});
