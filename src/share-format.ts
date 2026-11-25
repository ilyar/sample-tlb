import { Cell } from '@ton/core';
import { TLBRuntime, unwrap } from '@ton-community/tlb-runtime';

import { readBocRoots } from './boc';
import samples from './samples.json';
import { loadText, storeText } from './snake-text';

const shareSchema = samples.find((sample) => sample.id === 'tlb-share')!.schema;
const runtime = unwrap(TLBRuntime.from(shareSchema, { autoText: false }));
const MAX_BOC_BYTES = 1024 * 1024;
const DEFLATE = 'deflate.';

export type ShareState =
    | { mode: 'boc'; schema: string; boc: string; as?: string }
    | { mode: 'data'; schema: string; data: string; as?: string };

function encodeBocInput(text: string) {
    if (!text.trim()) return { kind: 'Boc_boc_none' } as const;
    try {
        const roots = readBocRoots(text);
        if (roots.length === 1) return { kind: 'Boc_boc_cell', cell: roots[0] } as const;
    } catch {
        // Preserve unfinished input so the recipient can continue editing it.
    }
    return { kind: 'Boc_boc_raw', raw: storeText(text) } as const;
}

export function encodeShareCell(state: ShareState): Cell {
    const schema = { kind: 'Schema', raw: storeText(state.schema) };
    const payload =
        state.mode === 'boc'
            ? { kind: 'Either_left', value: encodeBocInput(state.boc) }
            : { kind: 'Either_right', value: { kind: 'Data', raw: storeText(state.data) } };
    return runtime.encodeCell({ kind: 'Share', schema, payload });
}

export function decodeShareCell(cell: Cell): ShareState {
    const slice = cell.beginParse();
    const record = unwrap(runtime.deserializeByTypeName('Share', slice)) as {
        schema: { raw: Cell };
        payload:
            | { kind: 'Either_left'; value: ReturnType<typeof encodeBocInput> }
            | { kind: 'Either_right'; value: { raw: Cell } };
    };
    slice.endParse();
    const schema = loadText(record.schema.raw);
    const { kind, value } = record.payload;
    if (kind === 'Either_right') return { mode: 'data', schema, data: loadText(value.raw) };
    let boc = '';
    if (value.kind === 'Boc_boc_cell') boc = value.cell.toBoc().toString('base64');
    if (value.kind === 'Boc_boc_raw') boc = loadText(value.raw);
    return { mode: 'boc', schema, boc };
}

function base64url(bytes: Buffer): string {
    return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function encodeShareHash(state: ShareState): Promise<string> {
    const bytes = encodeShareCell(state).toBoc({ idx: false, crc32: false });
    if (bytes.length > MAX_BOC_BYTES) throw new Error('Share exceeds 1 MiB');
    let encoded = base64url(bytes);
    if (typeof CompressionStream !== 'undefined') {
        try {
            const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
            const packed = DEFLATE + base64url(Buffer.from(await new Response(stream).arrayBuffer()));
            if (packed.length < encoded.length) encoded = packed;
        } catch {
            // Older browsers may expose CompressionStream without deflate-raw.
        }
    }
    return '#share=' + encoded + (state.as ? '&as=' + encodeURIComponent(state.as) : '');
}

async function inflate(bytes: Buffer) {
    let size = 0;
    const limit = new TransformStream<Uint8Array, Uint8Array>({
        transform(chunk, controller) {
            size += chunk.length;
            if (size > MAX_BOC_BYTES) throw new Error('Share exceeds 1 MiB');
            controller.enqueue(chunk);
        },
    });
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw')).pipeThrough(limit);
    return Buffer.from(await new Response(stream).arrayBuffer());
}

export async function parseShareHash(hash: string): Promise<ShareState | undefined> {
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const value = params.get('share');
    if (!value) return undefined;
    try {
        const compressed = value.startsWith(DEFLATE);
        const encoded = compressed ? value.slice(DEFLATE.length) : value;
        if (encoded.length > Math.ceil((MAX_BOC_BYTES * 4) / 3)) throw new Error('Share exceeds 1 MiB');
        const bytes = Buffer.from(encoded, 'base64');
        if (!encoded || base64url(bytes) !== encoded) throw new Error('Invalid share base64url');
        const roots = Cell.fromBoc(compressed ? await inflate(bytes) : bytes);
        if (roots.length !== 1) throw new Error('Share must have one root');
        return { ...decodeShareCell(roots[0]), as: params.get('as') || undefined };
    } catch (error) {
        // eslint-disable-next-line no-console -- Invalid external links should be visible in the browser console.
        console.warn('Unable to load shared TL-B link:', error);
        return undefined;
    }
}
