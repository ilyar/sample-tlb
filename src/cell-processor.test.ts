import { ParsedCell, Failure, Success } from '@ton-community/tlb-runtime';

import { defaultBoc, defaultSchema, CellProcessor, TLBData, Focus } from './cell-processor.ts';

interface TestSample {
    schema: string;
    decode: { data: ParsedCell; boc: string };
    encode: { data: ParsedCell; boc: string };
}

describe('CellProcessor', () => {
    let proc: CellProcessor;

    beforeEach(() => {
        proc = CellProcessor.default;
    });

    it('should initialize with default values', () => {
        const actual = proc.state;
        expect(actual).toMatchObject({
            schema: defaultSchema,
            boc: defaultBoc,
            data: expect.stringContaining('"kind"'),
        });
    });

    it('should update schema successfully with focus on BoC', () => {
        const newSchema = '_ x:# = Foo;';
        const actual = proc.updateSchema(newSchema, Focus.boc);
        expect(actual.success).toBe(true);
        expect((actual as Success<TLBData>).value.schema).toBe(newSchema);
        expect((actual as Success<TLBData>).value.data).toEqual(
            JSON.stringify(
                {
                    kind: 'Foo',
                    x: 682150630,
                },
                null,
                2,
            ),
        );
    });

    it('should update schema successfully with focus on Data', () => {
        const newSchema = '_ x:# = Foo;';
        const actual = proc.updateSchema(newSchema, Focus.data);
        expect(actual.success).toBe(false);
    });

    it('should return same state if schema is unchanged', () => {
        const currentState = proc.state;
        const actual = proc.updateSchema(defaultSchema);
        expect(actual.success).toBe(true);
        expect((actual as Success<TLBData>).value).toEqual(currentState);
    });

    it('should return error for empty schema', () => {
        const actual = proc.updateSchema('');
        expect(actual.success).toBe(false);
        expect((actual as Failure).error.message).toBe('Schema cannot be empty');
    });

    it('should return error for whitespace-only schema', () => {
        const actual = proc.updateSchema('   ');
        expect(actual.success).toBe(false);
        expect((actual as Failure).error.message).toBe('Schema cannot be empty');
    });

    it('should update boc successfully with valid data', () => {
        const newBoc = 'te6cckEBAQEACwAAERDcyu5AyMLow1FQ+MA=';
        const actual = proc.updateBoc(newBoc);
        expect(actual.success).toBe(true);
        expect((actual as Success<TLBData>).value.boc).toBe(newBoc);
        expect((actual as Success<TLBData>).value.data).toEqual(
            JSON.stringify(
                {
                    kind: 'Message',
                    len: 8,
                    text: 'new data',
                },
                null,
                2,
            ),
        );
    });

    it('should return same state if boc is unchanged', () => {
        const currentState = proc.state;
        const actual = proc.updateBoc(defaultBoc);

        expect(actual.success).toBe(true);
        expect((actual as Success<TLBData>).value).toEqual(currentState);
    });

    it('should handle empty boc', () => {
        const actual = proc.updateBoc('');

        expect(actual.success).toBe(true);
        expect((actual as Success<TLBData>).value).toMatchObject({
            boc: '',
            data: '{}',
        });
    });

    it('should handle whitespace-only boc', () => {
        const actual = proc.updateBoc('   ');

        expect(actual.success).toBe(true);
        expect((actual as Success<TLBData>).value).toMatchObject({
            boc: '',
            data: '{}',
        });
    });

    it('should handle invalid boc gracefully', () => {
        const invalidBoc = 'invalid-base64-string!@#';
        const actual = proc.updateBoc(invalidBoc);

        expect(actual.success).toBe(false);
        expect((actual as Failure).error.message).toContain('Parse');
    });

    it('should update data successfully with valid JSON', () => {
        const newData = '{"kind": "Foo", "x": 42}';
        const actual = proc.updateData(newData);

        expect(actual.success).toBe(false);
    });

    it('should handle JSON parse errors in updateData', () => {
        const invalidJSON = '{"invalid": json,}';
        const actual = proc.updateData(invalidJSON);

        expect(actual.success).toBe(false);
        expect((actual as Failure).error.message).toContain('Encode');
    });

    it('should handle runtime errors in updateSchema', () => {
        const invalidSchema = '#';
        const actual = proc.updateSchema(invalidSchema);
        expect(actual.success).toBe(false);
    });

    it.each([
        {
            // Simple
            schema: '_ x:# = Foo;',
            decode: {
                data: {
                    kind: 'Foo',
                    x: 73,
                },
                boc: 'te6cckEBAQEABgAACAAAAEmTxmY2',
            },
            encode: {
                data: {
                    kind: 'Foo',
                    x: 42,
                },
                boc: 'te6cckEBAQEABgAACAAAACoFpvBE',
            },
        },
        {
            // TEP-74 Fungible tokens (Jettons)
            schema: 'block.tlb burn#595f07bc query_id:uint64 amount:(VarUInteger 16) response_destination:MsgAddress custom_payload:(Maybe ^Cell) = InternalMsgBody;',
            decode: {
                data: {
                    kind: 'InternalMsgBody',
                    query_id: 0,
                    amount: '1',
                    response_destination: 'Ef8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAU',
                    custom_payload: { kind: 'Maybe_nothing' },
                },
                boc: 'te6cckEBAQEAMQAAXllfB7wAAAAAAAAAABAZ/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8gPSJw==',
            },
            encode: {
                data: {
                    kind: 'InternalMsgBody',
                    amount: '42',
                    custom_payload: {
                        kind: 'Maybe_nothing',
                    },
                    query_id: '0',
                    response_destination: 'Ef8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAU',
                },
                boc: 'b5ee9c7241010101003100005e595f07bc000000000000000012a9fe0000000000000000000000000000000000000000000000000000000000000000e3f10fd5',
            },
        },
    ])('expect case %s', (sample: TestSample) => {
        const proc = CellProcessor.from(sample.schema);
        let actual = proc.updateData(JSON.stringify(sample.decode.data));
        expect(actual.success).toBe(true);
        expect((actual as Success<TLBData>).value.boc).toEqual(sample.decode.boc);

        actual = proc.updateBoc(sample.encode.boc);
        expect(actual.success).toBe(true);
        expect((actual as Success<TLBData>).value.data).toEqual(JSON.stringify(sample.encode.data, null, 2));
    });
});
