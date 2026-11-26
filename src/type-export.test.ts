import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { beginCell } from '@ton/core';
import { runtimeBy } from '@ton-community/tlb-runtime';

import { CellProcessor } from './cell-processor';
import samples from './samples.json';
import shareSchema from './share/share.tlb?raw';
import { exportTypes } from './type-export';

describe.each(['SnakeString', '^SnakeString'])('%s Comment', (field) => {
    const schema = `text_comment#00000000 text:${field} = Comment;`;
    const runtime = runtimeBy(schema);
    test.each(['', 'hi', 'Привет, TON 👋', 'я'.repeat(140)])('matches the TON reference encoding for %j', (text) => {
        const ref = field.startsWith('^');
        const tag = beginCell().storeUint(0, 32);
        const wire = (ref ? tag.storeStringRefTail(text) : tag.storeStringTail(text)).endCell();
        const proc = new CellProcessor(schema, wire.toBoc().toString('base64'));
        const data = JSON.parse(proc.state.data);
        expect(data).toEqual({ kind: 'Comment', text });
        expect(runtime.encodeCell(data).hash()).toEqual(wire.hash());
        if (text.length === 140) {
            const first = ref ? wire.refs[0] : wire;
            expect([
                (first.bits.length - (ref ? 0 : 32)) / 8,
                first.refs[0].bits.length / 8,
                first.refs[0].refs[0].bits.length / 8,
            ]).toEqual(ref ? [127, 127, 26] : [123, 127, 30]);
        }
    });
    test('exports the source field description and string type', () => {
        expect(exportTypes(runtime, 'typescript', { rootType: 'Comment' })).toContain('text: string');
        const json = JSON.parse(exportTypes(runtime, 'json', { rootType: 'Comment' }));
        expect(json.definitions.Comment.properties.text).toMatchObject({ description: field, type: 'string' });
    });
});

test('reads fields following a referenced string and reports bad input', () => {
    const runtime = runtimeBy('_ text:^SnakeString n:uint8 tail:^uint8 = Example;');
    const wire = beginCell()
        .storeStringRefTail('hello')
        .storeUint(7, 8)
        .storeRef(beginCell().storeUint(9, 8))
        .endCell();
    const data = { kind: 'Example', text: 'hello', n: 7, tail: 9 };
    expect(runtime.decodeCell(wire)).toEqual(data);
    expect(runtime.encodeCell(data).equals(wire)).toBe(true);
    expect(() => runtime.encodeCell({ ...data, text: 42 })).toThrow('SnakeString requires a string');
});

test('exports the Share graph and discriminated branches', () => {
    const runtime = runtimeBy(samples.find((s) => s.id === 'tlb-share')!.schema);
    const types = exportTypes(runtime, 'typescript', { rootType: 'Share' });
    const json = JSON.parse(exportTypes(runtime, 'json', { rootType: 'Share' }));
    expect(json.$schema).toBe('http://json-schema.org/draft-07/schema#');
    for (const type of ['Share', 'Schema', 'Data', 'Boc', 'Payload']) {
        expect(types).toContain('export type ' + type + ' =');
        expect(json.definitions[type]).toBeDefined();
    }
    for (const [name, kinds] of Object.entries({
        Payload: ['Payload_none', 'Payload_boc', 'Payload_data'],
        Boc: ['Boc_cell', 'Boc_hex'],
    })) {
        expect(
            json.definitions[name].oneOf.map(
                (v: { properties: { kind: { const: string } } }) => v.properties.kind.const,
            ),
        ).toEqual(kinds);
    }
});

test('keeps the reference Share declarations and playground preset in sync', () => {
    const schema = samples.find((sample) => sample.id === 'tlb-share')!.schema;
    expect(shareSchema.trimEnd()).toBe(schema);
    const dir = mkdtempSync(join(tmpdir(), 'share-types-'));
    try {
        const input = join(dir, 'share.tlb');
        writeFileSync(input, shareSchema);
        execFileSync(process.execPath, [join(__dirname, '../scripts/type-by-schema.mjs'), input]);
        expect(readFileSync(join(dir, 'share.d.ts'), 'utf8')).toBe(
            readFileSync(join(__dirname, 'share/share.d.ts'), 'utf8'),
        );
    } finally {
        rmSync(dir, { recursive: true, force: true });
    }
});

test('exports the Share discriminators, reference fields and tag widths in each language', () => {
    const runtime = runtimeBy(shareSchema);
    const options = { rootType: 'Share' };
    const tolk = exportTypes(runtime, 'tolk', options);
    expect(tolk).toContain('struct (0b00000001) Share');
    expect(tolk).toContain('struct (0b00) PayloadNone');
    expect(tolk).toContain('type Payload = PayloadNone | PayloadBoc | PayloadData');
    expect(tolk).toContain('data: string  // ^SnakeString');
    expect(tolk).toContain(': cell  // ^Cell');
    expect(exportTypes(runtime, 'python', options)).toContain('Payload = Union[PayloadNone, PayloadBoc, PayloadData]');
    expect(exportTypes(runtime, 'go', options)).toContain('func (*PayloadData) isPayload() {}');
    expect(exportTypes(runtime, 'kotlin', options)).toContain('override val kind: String get() = "Payload_data"');
});

test.each(['tolk', 'python', 'go', 'kotlin'])(
    '%s exports only the chosen root and specializes its numeric arguments',
    (format) => {
        const runtime = runtimeBy('_ {n:#} x:(## n) = Tree n; _ y:uint1 = Other;');
        const source = exportTypes(runtime, format, { rootType: 'Tree', args: [8] });
        expect(source).toContain('Tree8');
        expect(source).not.toContain('Other');
        if (format === 'tolk') expect(source).toContain('x: uint8');
    },
);

test('names fields and variants per language and retains schema keys and kind literals', () => {
    const runtime = runtimeBy(
        'message_sent$0 query_id:uint8 queryId:uint8 api_url:uint8 = Message; failed$1 = Message;',
    );
    const options = { rootType: 'Message' };
    const tolk = exportTypes(runtime, 'tolk', options);
    expect(tolk).toContain('struct (0b0) MessageSent');
    expect(tolk).toContain('queryId: uint8');
    expect(tolk).toContain('queryId2: uint8');
    const go = exportTypes(runtime, 'go', options);
    expect(go).toContain('QueryID int64 `json:"query_id"`');
    expect(go).toContain('QueryID2 int64 `json:"queryId"`');
    expect(go).toContain('APIURL int64 `json:"api_url"`');
    const kotlin = exportTypes(runtime, 'kotlin', options);
    expect(kotlin).toContain('data class MessageSent');
    expect(kotlin).toContain('val queryId2: Long');
    expect(kotlin).toContain('val apiUrl: Long');
    expect(kotlin).toContain('"Message_message_sent"');
    const python = exportTypes(runtime, 'python', options);
    expect(python).toContain('MessageSent = TypedDict("MessageSent"');
    expect(python).toContain('"query_id":');
    expect(python).toContain('"queryId":');
    expect(python).toContain('Literal["Message_message_sent"]');
    expect(exportTypes(runtime, 'typescript', options)).toContain('query_id: number');
    expect(
        JSON.parse(exportTypes(runtime, 'json', options)).definitions.Message.oneOf[0].properties.query_id,
    ).toBeDefined();
});
