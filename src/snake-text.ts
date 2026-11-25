import { beginCell, Cell } from '@ton/core';

const MAX_CHUNKS = 2048;
const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });

export function storeText(text: string): Cell {
    const bytes = Buffer.from(text, 'utf8');
    const count = Math.max(1, Math.ceil(bytes.length / 127));
    if (count > MAX_CHUNKS) throw new Error('Share field exceeds 2048 chunks');
    let next: Cell | undefined;
    for (let i = count - 1; i >= 0; i--) {
        const chunk = beginCell().storeBuffer(bytes.subarray(i * 127, (i + 1) * 127));
        if (next) chunk.storeRef(next);
        next = chunk.endCell();
    }
    return next!;
}

export function loadText(cell: Cell) {
    const chunks: Buffer[] = [];
    for (;;) {
        const slice = cell.beginParse();
        if (chunks.length >= MAX_CHUNKS || slice.remainingBits % 8 || slice.remainingRefs > 1)
            throw new Error('Invalid share byte chain');
        chunks.push(slice.loadBuffer(slice.remainingBits / 8));
        if (!slice.remainingRefs) return decoder.decode(Buffer.concat(chunks));
        cell = slice.loadRef();
    }
}
