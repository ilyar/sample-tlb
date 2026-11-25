import { Cell } from '@ton/core';

export function readBocRoots(raw: string): Cell[] {
    const bytes = bocBytes(raw);
    return bytes ? Cell.fromBoc(bytes) : [];
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
