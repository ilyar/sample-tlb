import { BitReader, BitString, Cell } from '@ton/core';
import { TLBRuntime, unwrap } from '@ton-community/tlb-runtime';

const MAX_CHUNKS = 2048;
const MAX_SCHEMA_BYTES = 1024 * 1024;

export const shareSchema = `bool_false$0 = Bool;
bool_true$1 = Bool;
nothing$0 {X:Type} = Maybe X;
just$1 {X:Type} value:X = Maybe X;

snake_bytes#_ len:(## 10) data:(bits len) next:(Maybe ^SnakeBytes) = SnakeBytes;
boc_none$00 = BocInput;
boc_cell$01 cell:^Cell = BocInput;
boc_raw$10 raw:^SnakeBytes = BocInput;
share_v1#01 compressed:Bool schema:^SnakeBytes boc:BocInput decode_as:(Maybe ^SnakeBytes) = SharePayload;`;

// Decode one snake cell at a time so the 2048-chunk limit is independent of the runtime's recursion limit.
// ^Cell and ^SnakeBytes both occupy exactly one reference on the wire.
const runtime = unwrap(TLBRuntime.from(shareSchema.replaceAll('^SnakeBytes', '^Cell'), { autoText: false }));

type MaybeCell = { kind: 'Maybe_just'; value: Cell } | { kind: 'Maybe_nothing' };
type BocInput =
    | { kind: 'BocInput_boc_none' }
    | { kind: 'BocInput_boc_cell'; cell: Cell }
    | { kind: 'BocInput_boc_raw'; raw: Cell };
type SharePayload = { kind: 'SharePayload'; compressed: boolean; schema: Cell; boc: BocInput; decode_as: MaybeCell };
type SnakeBytes = { kind: 'SnakeBytes'; len: number; data: BitString; next: MaybeCell };

function maybeCell(cell: Cell | null): MaybeCell {
    return cell ? { kind: 'Maybe_just', value: cell } : { kind: 'Maybe_nothing' };
}

function decodeRecord(cell: Cell, type: 'SnakeBytes'): SnakeBytes;
function decodeRecord(cell: Cell, type: 'SharePayload'): SharePayload;
function decodeRecord(cell: Cell, type: 'SnakeBytes' | 'SharePayload') {
    const record = runtime.decodeCell(cell, { rootType: type }) as SnakeBytes | SharePayload;
    // Reject trailing bits or extra references accepted by a prefix decode.
    if (!runtime.encodeCell(record).equals(cell)) throw new Error('Invalid ' + type + ' cell');
    return record;
}

export interface ShareInput {
    schema: string;
    boc: string;
    decodeAs?: string;
}

export function readBocRoots(raw: string): Cell[] {
    const bytes = bocBytes(raw);
    return bytes ? Cell.fromBoc(bytes) : [];
}

export async function parseShareHash(hash: string): Promise<ShareInput | undefined> {
    const raw = hash.startsWith('#') ? hash.slice(1) : hash;
    const params = new URLSearchParams(raw);
    if (params.has('tlb')) {
        try {
            return await decodeShare(params.get('tlb')!);
        } catch (error) {
            // eslint-disable-next-line no-console -- Invalid external links should be visible in the browser console.
            console.warn('Unable to load shared TL-B link:', error);
            return undefined;
        }
    }
    if (params.has('schema') && params.has('boc')) return { schema: params.get('schema')!, boc: params.get('boc')! };
    return undefined;
}

function storeBytes(bytes: Uint8Array): Cell {
    const count = Math.max(1, Math.ceil(bytes.length / 126));
    if (count > MAX_CHUNKS) throw new Error('Share field exceeds 2048 chunks');
    let next: Cell | null = null;
    for (let index = count - 1; index >= 0; index--) {
        const part = bytes.subarray(index * 126, (index + 1) * 126);
        next = runtime.encodeCell({
            kind: 'SnakeBytes',
            len: part.length * 8,
            data: new BitString(Buffer.from(part), 0, part.length * 8),
            next: maybeCell(next),
        });
    }
    return next!;
}

function loadBytes(cell: Cell): Uint8Array {
    const chunks: Uint8Array[] = [];
    let current: Cell | null = cell;
    while (current) {
        if (chunks.length >= MAX_CHUNKS) throw new Error('Share field exceeds 2048 chunks');
        const chunk: SnakeBytes = decodeRecord(current, 'SnakeBytes');
        if (chunk.len > 1008 || chunk.len % 8) throw new Error('Invalid SnakeBytes length');
        chunks.push(new BitReader(chunk.data).loadBuffer(chunk.len / 8));
        current = chunk.next.kind === 'Maybe_just' ? chunk.next.value : null;
    }
    const result = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}

function utf8(bytes: Uint8Array): string {
    return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes);
}

function base64url(bytes: Buffer): string {
    return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function bocBytes(value: string): Buffer | undefined {
    const text = value.replace(/\s/g, '');
    if (!text) return undefined;
    if (/^(?:b5ee9c72|68ff65f3|acc3a728)/i.test(text)) {
        if (text.length % 2 || /[^0-9a-f]/i.test(text)) throw new Error('Invalid BoC hex');
        return Buffer.from(text, 'hex');
    }
    const standard = text.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Buffer.from(standard, 'base64');
    const encoded = bytes.toString('base64');
    if (standard !== encoded && standard !== encoded.replace(/=+$/, '')) throw new Error('Invalid BoC base64');
    return bytes;
}

async function compress(bytes: Uint8Array): Promise<Uint8Array | undefined> {
    if (typeof CompressionStream === 'undefined') return undefined;
    try {
        const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
        const compressed = new Uint8Array(await new Response(stream).arrayBuffer());
        return compressed.length < bytes.length ? compressed : undefined;
    } catch {
        return undefined;
    }
}

export async function encodeShare(input: ShareInput): Promise<string> {
    const rawSchema = new TextEncoder().encode(input.schema);
    if (rawSchema.length > MAX_SCHEMA_BYTES) throw new Error('Schema exceeds 1 MiB');
    const packed = await compress(rawSchema);
    const schema = storeBytes(packed ?? rawSchema);
    let bocInput: BocInput = { kind: 'BocInput_boc_none' };
    if (input.boc.trim()) {
        let cell: Cell | undefined;
        try {
            const roots = readBocRoots(input.boc);
            if (roots.length === 1) cell = roots[0];
        } catch {
            // Keep incomplete input verbatim so the recipient can continue editing.
        }
        bocInput = cell
            ? { kind: 'BocInput_boc_cell', cell }
            : { kind: 'BocInput_boc_raw', raw: storeBytes(new TextEncoder().encode(input.boc)) };
    }
    const record: SharePayload = {
        kind: 'SharePayload',
        compressed: !!packed,
        schema,
        boc: bocInput,
        decode_as: maybeCell(input.decodeAs?.trim() ? storeBytes(new TextEncoder().encode(input.decodeAs)) : null),
    };
    const boc = runtime.encodeCell(record).toBoc({ idx: false, crc32: false });
    return base64url(boc);
}

async function decompress(bytes: Uint8Array): Promise<Uint8Array> {
    if (typeof DecompressionStream === 'undefined') throw new Error('Deflate decompression is unavailable');
    const reader = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader();
    const parts: Uint8Array[] = [];
    let size = 0;
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > MAX_SCHEMA_BYTES) {
            await reader.cancel();
            throw new Error('Schema exceeds 1 MiB');
        }
        parts.push(value);
    }
    const result = new Uint8Array(size);
    let offset = 0;
    for (const part of parts) {
        result.set(part, offset);
        offset += part.length;
    }
    return result;
}

export async function decodeShare(encoded: string): Promise<ShareInput> {
    if (!/^[A-Za-z0-9_-]+$/.test(encoded)) throw new Error('Invalid share base64url');
    const standard = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Buffer.from(standard + '='.repeat((4 - (standard.length % 4)) % 4), 'base64');
    if (base64url(bytes) !== encoded) throw new Error('Invalid share base64url');
    const roots = Cell.fromBoc(bytes);
    if (roots.length !== 1) throw new Error('Share must have one root');
    const record = decodeRecord(roots[0], 'SharePayload');
    const schemaBytes = loadBytes(record.schema);
    const schema = utf8(record.compressed ? await decompress(schemaBytes) : schemaBytes);
    let boc = '';
    if (record.boc.kind === 'BocInput_boc_cell') boc = record.boc.cell.toBoc().toString('base64');
    if (record.boc.kind === 'BocInput_boc_raw') boc = utf8(loadBytes(record.boc.raw));
    const decodeAs = record.decode_as.kind === 'Maybe_just' ? utf8(loadBytes(record.decode_as.value)) : undefined;
    return { schema, boc, decodeAs };
}
