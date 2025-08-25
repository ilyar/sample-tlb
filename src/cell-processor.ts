import { TLBRuntime, Result, unwrap, replacer, blockSchema } from '@ton-community/tlb-runtime';

export const defaultSchema = 'message#_ len:(## 7) { len <= 127 } text:(bits (len * 8)) = Message;';

export const defaultBoc = 'te6cckEBAQEAFwAAKSioyuboQNrK5ubCzspA0txAxsrY2Whv0fw=';

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

export class CellProcessor {
    private bocFormat: DataFormat = DataFormat.base64;
    private boc: string = '';
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

    public updateBoc(newBoc: string): Result<TLBData> {
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
            const parsed = this.runtime.parseCell(this.boc);
            this.data = JSON.stringify(parsed, replacer, 2);
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
        this.data = newData.trim();
        try {
            const data = JSON.parse(this.data);
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
