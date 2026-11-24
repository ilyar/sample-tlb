import { beginCell, Cell } from '@ton/core';

const MAX_CHUNKS = 2048;
const MAX_SCHEMA_BYTES = 1024 * 1024;

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
        next = beginCell()
            .storeUint(part.length * 8, 10)
            .storeBuffer(Buffer.from(part))
            .storeMaybeRef(next)
            .endCell();
    }
    return next!;
}

function loadBytes(cell: Cell): Uint8Array {
    const chunks: Uint8Array[] = [];
    let current: Cell | null = cell;
    while (current) {
        if (chunks.length >= MAX_CHUNKS) throw new Error('Share field exceeds 2048 chunks');
        const s = current.beginParse();
        const bits = s.loadUint(10);
        if (bits > 1008 || bits % 8 || bits > s.remainingBits) throw new Error('Invalid SnakeBytes length');
        chunks.push(s.loadBuffer(bits / 8));
        current = s.loadMaybeRef();
        s.endParse();
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
    const b = beginCell()
        .storeUint(1, 8)
        .storeBit(packed ? 1 : 0)
        .storeRef(schema);
    const bocText = input.boc;
    if (!bocText.trim()) b.storeUint(0, 2);
    else {
        let cell: Cell | undefined;
        try {
            const roots = readBocRoots(bocText);
            if (roots.length === 1) cell = roots[0];
        } catch {
            // Keep incomplete input verbatim so the recipient can continue editing.
        }
        if (cell) b.storeUint(1, 2).storeRef(cell);
        else b.storeUint(2, 2).storeRef(storeBytes(new TextEncoder().encode(bocText)));
    }
    b.storeMaybeRef(input.decodeAs?.trim() ? storeBytes(new TextEncoder().encode(input.decodeAs)) : null);
    const boc = b.endCell().toBoc({ idx: false, crc32: false });
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
    const s = roots[0].beginParse();
    if (s.loadUint(8) !== 1) throw new Error('Unsupported share version');
    const compressed = s.loadBit();
    const schemaBytes = loadBytes(s.loadRef());
    const schema = utf8(compressed ? await decompress(schemaBytes) : schemaBytes);
    const tag = s.loadUint(2);
    let boc = '';
    if (tag === 1) {
        const cell = s.loadRef();
        boc = cell.toBoc().toString('base64');
    } else if (tag === 2) {
        boc = utf8(loadBytes(s.loadRef()));
    } else if (tag !== 0) throw new Error('Invalid BocInput');
    const decodeRef = s.loadMaybeRef();
    const decodeAs = decodeRef ? utf8(loadBytes(decodeRef)) : undefined;
    s.endParse();
    return { schema, boc, decodeAs };
}
