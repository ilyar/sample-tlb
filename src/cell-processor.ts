import { beginCell, BitString, Cell, Dictionary, ExternalAddress } from '@ton/core';
import { TLBRuntime, Result, unwrap, replacer, blockSchema } from '@ton-community/tlb-runtime';

import { DecodeChoice, decodeChoices, withArguments } from './decode-choices';

export const defaultSchema = 'message#_ len:(## 7) { len <= 127 } text:(bits (len * 8)) = Message;';

export const defaultBoc = 'te6cckEBAQEAFwAAKSioyuboQNrK5ubCzspA0txAxsrY2Whv0fw=';

export function readBocRoots(raw: string): Cell[] {
    const hex = /^(b5ee9c72|68ff65f3|acc3a728)/i.test(raw);
    return Cell.fromBoc(Buffer.from(raw, hex ? 'hex' : 'base64'));
}

export enum DataFormat {
    hex,
    base64,
}

export enum Focus {
    boc,
    data,
}

export interface TLBData {
    bocFormat: DataFormat;
    schema: string;
    boc: string;
    data: string;
}

function displayValue(key: string, value: unknown): unknown {
    if (value instanceof Cell) return { $cell: value.toBoc().toString('base64') };
    if (value instanceof BitString) return { $bits: value.toString() };
    if (value instanceof ExternalAddress) return { $external: [value.bits, value.value.toString()] };
    if (value instanceof Dictionary) return Object.fromEntries(Array.from(value, ([k, v]) => [String(k), v]));
    return replacer(key, value);
}

function readValue(_key: string, value: unknown): unknown {
    if (!value || typeof value !== 'object' || Object.keys(value).length !== 1) return value;
    if ('$cell' in value && typeof value.$cell === 'string') return Cell.fromBase64(value.$cell);
    if ('$bits' in value && typeof value.$bits === 'string') {
        const hex = value.$bits;
        if (!/^(?:[0-9a-f]+_?)?$/i.test(hex)) throw new Error('Invalid hexadecimal bit string');
        const digits = hex.replace(/_$/, '');
        let length = digits.length * 4;
        let n = digits ? BigInt('0x' + digits) : 0n;
        if (hex.endsWith('_')) {
            if (!n || !(n & 15n)) throw new Error('Invalid bit string terminator');
            while (!(n & 1n)) {
                n >>= 1n;
                length--;
            }
            n >>= 1n;
            length--;
        }
        return beginCell().storeUint(n, length).endCell().bits;
    }
    if ('$external' in value && Array.isArray(value.$external)) {
        const [bits, address] = value.$external;
        return new ExternalAddress(BigInt(address), bits);
    }
    return value;
}

export class CellProcessor {
    private bocFormat: DataFormat = DataFormat.base64;
    private boc: string = '';
    choices: DecodeChoice[] = [];
    private cell?: Cell;
    private data: string = '{}';
    private runtime: TLBRuntime = unwrap(TLBRuntime.from(''));

    constructor(schema: string, boc?: string, data?: string) {
        this.updateSchema(schema);
        if (boc) {
            this.updateBoc(boc);
        } else if (data) {
            this.updateData(data);
        }
    }

    get state(): TLBData {
        return {
            bocFormat: this.bocFormat,
            schema: this.runtime.schema,
            boc: this.boc,
            data: this.data,
        };
    }

    static get default(): CellProcessor {
        return new CellProcessor(defaultSchema, defaultBoc);
    }

    static from(schema: string): CellProcessor {
        const proc = new CellProcessor(schema);
        proc.updateSchema(schema);
        return proc;
    }

    public updateSchema(newSchema: string, focus: Focus = Focus.boc): Result<TLBData> {
        this.choices = [];
        if (!newSchema || newSchema.trim() === '') {
            return {
                success: false,
                error: new Error('Schema cannot be empty'),
            };
        }

        newSchema = newSchema.replace('block.tlb', blockSchema);

        if (this.runtime.schema === newSchema) {
            return {
                success: true,
                value: this.state,
            };
        }

        const result = this.runtime.changeSchema(newSchema);
        if (!result.success) {
            return result;
        }
        this.runtime = result.value;

        if (focus === Focus.boc) {
            return this.updateBoc(this.boc);
        }

        return this.updateData(this.data);
    }

    public selectChoice(index: number, args: number[] = []): Result<TLBData> {
        const choice = this.choices[index];
        try {
            if (!choice || !this.cell) throw new Error('Select a matching type');
            const value = choice.value ?? withArguments(this.runtime, this.cell, choice, args);
            this.data = JSON.stringify(value, displayValue, 2);
            return { success: true, value: this.state };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error : new Error('Invalid arguments') };
        }
    }

    public updateBoc(newBoc: string): Result<TLBData> {
        this.choices = [];
        this.cell = undefined;
        if (!newBoc || newBoc.trim() === '') {
            this.boc = '';
            this.data = '{}';
            return {
                success: true,
                value: this.state,
            };
        }

        this.boc = newBoc;
        try {
            const roots = readBocRoots(this.boc);
            if (roots.length !== 1) throw new Error('Decoding requires a single root cell');
            this.cell = roots[0];
            this.choices = decodeChoices(this.runtime, this.cell);
            if (!this.choices.length) throw new Error('No type in the schema matches the complete cell');
            if (this.choices.length === 1 && this.choices[0].value) return this.selectChoice(0);
            this.data = '';
        } catch (error) {
            return {
                success: false,
                error: new Error(`Parse ${error instanceof Error ? error.message : 'unknown error'}`),
            };
        }
        return {
            success: true,
            value: this.state,
        };
    }

    public updateData(newData: string): Result<TLBData> {
        this.choices = [];
        this.data = newData.trim();
        try {
            const data = JSON.parse(this.data, readValue);
            if (!data || typeof data.kind !== 'string' || !data.kind)
                throw new Error('Data must include a kind from the schema');
            const knownKind = [...this.runtime.getTypes().values()].some((type) =>
                type.constructors.some(
                    (c) =>
                        c.declaration &&
                        data.kind === (type.constructors.length === 1 ? type.name : type.name + '_' + c.name),
                ),
            );
            if (!knownKind) throw new Error('Unknown kind in this schema: ' + data.kind);
            const encoded = this.runtime.encodeCell(data).toBoc();
            switch (this.bocFormat) {
                case DataFormat.hex:
                    this.boc = encoded.toString('hex');
                    break;
                case DataFormat.base64:
                default:
                    this.boc = encoded.toString('base64');
            }
        } catch (error) {
            return {
                success: false,
                error: new Error(`Encode ${error instanceof Error ? error.message : 'unknown error'}`),
            };
        }
        return {
            success: true,
            value: this.state,
        };
    }
}
