import { runtimeBy, TLBDataError, type TypedCell } from '@ton-community/tlb-runtime';
import { beginCell } from '@ton/core';

const schema = '_ x:uint8 = Full; _ x:uint4 = Short;';
const runtime = runtimeBy(schema);
const cell = beginCell().storeUint(42, 8).endCell();
const bytes = cell.toBoc();

test('decodes Buffer and byte views using their declared bounds', () => {
    const padded = new Uint8Array(bytes.length + 2);
    padded.set(bytes, 1);
    for (const input of [bytes, new Uint8Array(bytes), padded.subarray(1, -1)]) {
        expect(runtime.decodeCell(input, { exact: true })).toEqual({ kind: 'Full', x: 42 });
    }
    for (const invalid of [padded, Buffer.from('b5ee9c7201010202000600010002aa0002bb', 'hex')])
        expect(() => runtime.decodeCell(invalid)).toThrow(TLBDataError);
});

test('exact decoding rejects trailing bits and refs and skips partial root matches', () => {
    const withRef = beginCell().storeSlice(cell.beginParse()).storeRef(cell).endCell();
    for (const input of [cell, withRef]) {
        expect(runtime.decodeCell(input).kind).toBe('Short');
        expect(() => runtime.decodeCell(input, { rootType: 'Short', exact: true })).toThrow(TLBDataError);
    }
    expect(() => runtime.decodeCell(withRef, { exact: true })).toThrow(TLBDataError);
    expect(runtime.decodeCell(cell, { exact: true }).kind).toBe('Full');
    expect(() => runtime.decodeCell(cell, { args: [] })).toThrow(TLBDataError);
});

test('accepts numeric root arguments and preserves the declared result type', () => {
    const parameterized = runtimeBy('_ {n:#} x:(uint n) = Sized n;');
    expect(parameterized.decodeCell(bytes, { rootType: 'Sized', args: [8], exact: true })).toMatchObject({ x: 42 });
    type Full = { kind: 'Full'; x: number };
    const typed = runtimeBy<Full>(schema, { autoText: false });
    const inferred: Full = typed.decodeCell(bytes, { rootType: 'Full', exact: true });
    const fallback: TypedCell = runtime.decodeCell(bytes);
    expect(inferred).toEqual({ kind: 'Full', x: 42 });
    expect(fallback.kind).toBe('Short');
});

test('limits SnakeString chains independently of other cell references', () => {
    const strings = runtimeBy('_ child:^Cell text:SnakeString = Message;', { maxSnakeDepth: 2048 });
    const refs = runtimeBy('_ text:^SnakeString = Message;', { maxSnakeDepth: 2048 });
    let deep = beginCell().endCell();
    for (let i = 0; i < 2048; i++) deep = beginCell().storeRef(deep).endCell();
    const valid = strings.encodeCell({ kind: 'Message', child: deep, text: 'ok' });
    expect(strings.decodeCell(valid, { exact: true }).text).toBe('ok');
    expect(() => refs.decodeCell(beginCell().storeRef(deep).endCell(), { rootType: 'Message', exact: true })).toThrow(
        '2048 cells',
    );
    const inline = runtimeBy('_ prefix:uint8 text:SnakeString = Message;', { maxSnakeDepth: 2048 });
    expect(() => inline.encodeCell({ kind: 'Message', prefix: 0, text: 'a'.repeat(127 * 2048) })).toThrow('2048 cells');
});
