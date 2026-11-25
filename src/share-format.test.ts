import { deflateRawSync } from 'node:zlib';

import { beginCell, Cell } from '@ton/core';
import { runtimeBy } from '@ton-community/tlb-runtime';

import samples from './samples.json';
import { decodeShare, encodeShare, parseShareHash, shareSchema } from './share-format';

const dataCell = beginCell().storeUint(1, 1).endCell();
const boc = dataCell.toBoc().toString('base64');
const multiRoot = 'b5ee9c7201010202000600010002aa0002bb';

function envelope(schema: Cell, version = 1, compressed = false) {
    return beginCell()
        .storeUint(version, 8)
        .storeBit(compressed)
        .storeRef(schema)
        .storeUint(0, 2)
        .storeMaybeRef(null)
        .endCell()
        .toBoc({ idx: false, crc32: false })
        .toString('base64url');
}

function snake(bytes: Buffer) {
    let cell: Cell | null = null;
    for (let end = bytes.length; end > 0; end -= 126) {
        const chunk = bytes.subarray(Math.max(0, end - 126), end);
        cell = beginCell()
            .storeUint(chunk.length * 8, 10)
            .storeBuffer(chunk)
            .storeMaybeRef(cell)
            .endCell();
    }
    return cell ?? beginCell().storeUint(0, 10).storeMaybeRef(null).endCell();
}

function unpack(encoded: string) {
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
    const bytes = Buffer.from(encoded, 'base64url');
    expect(bytes[4] & 0xc0).toBe(0); // No index or CRC in the outer BoC.
    const roots = Cell.fromBoc(bytes);
    expect(roots).toHaveLength(1);
    const slice = roots[0].beginParse();
    expect(slice.loadUint(8)).toBe(1);
    const compressed = slice.loadBit();
    const schema = slice.loadRef();
    const tag = slice.loadUint(2);
    return { slice, compressed, schema, tag };
}

test('keeps short schema bytes and compresses repetitive schema bytes', async () => {
    for (const [schema, compressed] of [
        ['x', false],
        ['abc '.repeat(1000), true],
    ] as const) {
        const encoded = await encodeShare({ schema, boc });
        expect(unpack(encoded).compressed).toBe(compressed);
        expect(await decodeShare(encoded)).toEqual({ schema, boc, decodeAs: undefined });
        if (compressed)
            expect(('#tlb=' + encoded).length).toBeLessThan(('#' + new URLSearchParams({ schema, boc })).length);
    }
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
    const encoded = await encodeShare({ schema: '', boc: input });
    const { slice, schema, tag } = unpack(encoded);
    const empty = schema.beginParse();
    expect(empty.loadUint(10)).toBe(0);
    expect(empty.loadMaybeRef()).toBeNull();
    empty.endParse();
    expect(tag).toBe(expected);
    if (tag === 1) expect(slice.loadRef().equals(dataCell)).toBe(true);
    if (tag === 2) slice.loadRef();
    expect(slice.loadMaybeRef()).toBeNull();
    slice.endParse();
    expect((await decodeShare(encoded)).boc).toBe(expected === 1 ? boc : expected === 2 ? input : '');
});

test('round-trips multi-chunk UTF-8 and Decode as without CompressionStream', async () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'CompressionStream')!;
    Object.defineProperty(globalThis, 'CompressionStream', { configurable: true, value: undefined });
    try {
        const input = { schema: '\uFEFF' + '模式🙂'.repeat(150), boc, decodeAs: 'Example' };
        const encoded = await encodeShare(input);
        const { compressed, schema } = unpack(encoded);
        expect(compressed).toBe(false);
        expect(schema.depth()).toBeGreaterThan(8);
        expect(await decodeShare(encoded)).toEqual(input);
    } finally {
        Object.defineProperty(globalThis, 'CompressionStream', descriptor);
    }
});

test('the documented SharePayload schema reads the outer BoC with tlb-runtime', async () => {
    const sample = samples.find((entry) => entry.id === 'tlb-share')!;
    expect(sample.schema).toBe(shareSchema);
    const schema = sample.schema;
    const legacyHash = Buffer.from(sample.boc, 'base64').toString('base64url');
    const decoded = await decodeShare(legacyHash);
    expect(decoded.schema).toBe('_ value:uint8 = Example;');
    expect(Cell.fromBase64(decoded.boc).beginParse().loadUint(8)).toBe(42);
    expect(await encodeShare(decoded)).toBe(legacyHash);
    const encoded = await encodeShare({ schema: 'abc', boc, decodeAs: 'Example' });
    const cell = Cell.fromBoc(Buffer.from(encoded, 'base64url'))[0];
    expect(runtimeBy(schema).decodeCell(cell, { rootType: 'SharePayload' })).toMatchObject({
        kind: 'SharePayload',
        compressed: false,
        schema: { kind: 'SnakeBytes', len: 24, data: 'abc' },
        boc: { kind: 'BocInput_boc_cell' },
        decode_as: { kind: 'Maybe_just', value: { data: 'Example' } },
    });
});

test('opens the original tagged constructor link unchanged', async () => {
    const hash =
        '#schema=tagged_off%240+%3D+Tagged%3B%0A_+value%3Auint1+%3D+Fallback%3B%0Atagged_on%241+%3D+Tagged%3B&boc=te6cckEBAQEAAwAAAcCO6ba2';
    expect(await parseShareHash(hash)).toEqual({
        schema: 'tagged_off$0 = Tagged;\n_ value:uint1 = Fallback;\ntagged_on$1 = Tagged;',
        boc,
    });
});

test('warns and falls back on malformed or oversized payloads even with legacy parameters', async () => {
    const empty = snake(Buffer.alloc(0));
    const badLength = beginCell().storeUint(1, 10).storeBit(0).storeMaybeRef(null).endCell();
    let tooDeep = empty;
    for (let i = 0; i < 2048; i++) tooDeep = beginCell().storeUint(0, 10).storeMaybeRef(tooDeep).endCell();
    const invalid = [
        '%%%',
        envelope(empty, 2),
        envelope(badLength),
        envelope(empty).slice(0, -3),
        envelope(snake(Buffer.from([0xff, 0xff])), 1, true),
        envelope(snake(deflateRawSync(Buffer.alloc(1024 * 1024 + 1))), 1, true),
        envelope(tooDeep),
        Buffer.from(multiRoot, 'hex').toString('base64url'),
    ];
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    try {
        for (const value of invalid) expect(await parseShareHash('#schema=x&boc=y&tlb=' + value)).toBeUndefined();
        expect(warn).toHaveBeenCalledTimes(invalid.length);
    } finally {
        warn.mockRestore();
    }
});

test.each(['SharePayload', 'SnakeBytes'])('rejects trailing bits and references in %s', async (type) => {
    const sample = samples.find((entry) => entry.id === 'tlb-share')!;
    const root = Cell.fromBase64(sample.boc);
    const target = type === 'SharePayload' ? root : root.refs[0];
    for (const extra of ['bit', 'ref']) {
        const builder = beginCell().storeSlice(target.beginParse());
        if (extra === 'bit') builder.storeBit(0);
        else builder.storeRef(Cell.EMPTY);
        const invalid = builder.endCell();
        const outer =
            type === 'SharePayload' ? invalid : new Cell({ bits: root.bits, refs: [invalid, ...root.refs.slice(1)] });
        await expect(decodeShare(outer.toBoc().toString('base64url'))).rejects.toThrow();
    }
});
