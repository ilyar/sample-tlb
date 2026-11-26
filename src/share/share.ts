import { runtimeBy } from '@ton-community/tlb-runtime';

import { readBocRoots } from '../boc';
import { decodeContainer, encodeContainer } from './transport';
import shareSchema from './share.tlb?raw';
import type { Payload, Share } from './share.d';

export const shareRuntime = runtimeBy<Share>(shareSchema, { autoText: false, maxSnakeDepth: 2048 });

export function bocPayload(text: string): Payload {
    if (!text.trim()) return { kind: 'Payload_none' };
    try {
        const roots = readBocRoots(text);
        if (roots.length === 1) return { kind: 'Payload_boc', value: { kind: 'Boc_cell', data: roots[0] } };
    } catch {
        // Preserve unfinished input so the recipient can continue editing it.
    }
    return { kind: 'Payload_boc', value: { kind: 'Boc_hex', data: text } };
}

export function payloadText(payload: Payload): string {
    if (payload.kind === 'Payload_none') return '';
    const { value } = payload;
    return value.kind === 'Boc_cell' ? value.data.toBoc().toString('base64') : value.data;
}

export async function encodeShareState(state: Share): Promise<string> {
    const bytes = shareRuntime.encodeCell(state).toBoc({ idx: false, crc32: false });
    return '#share=' + (await encodeContainer(bytes));
}

export async function decodeShareState(hash: string): Promise<Share | undefined> {
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const value = params.get('share');
    if (!value) return undefined;
    try {
        return shareRuntime.decodeCell(await decodeContainer(value), { rootType: 'Share', exact: true });
    } catch (error) {
        // eslint-disable-next-line no-console -- Invalid external links should be visible in the browser console.
        console.warn('Unable to load shared TL-B link:', error);
        return undefined;
    }
}
