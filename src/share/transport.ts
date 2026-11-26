const MAX_BOC_BYTES = 1024 * 1024;
const DEFLATE = 'deflate.';

function base64url(bytes: Buffer): string {
    return bytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function pipeBytes(bytes: Buffer, ...transforms: TransformStream<Uint8Array, Uint8Array>[]) {
    let stream: ReadableStream<Uint8Array> = new Blob([bytes]).stream();
    for (const transform of transforms) stream = stream.pipeThrough(transform);
    return Buffer.from(await new Response(stream).arrayBuffer());
}

export async function encodeContainer(bytes: Buffer): Promise<string> {
    if (bytes.length > MAX_BOC_BYTES) throw new Error('Share exceeds 1 MiB');
    let encoded = base64url(bytes);
    if (typeof CompressionStream !== 'undefined') {
        try {
            const packed = DEFLATE + base64url(await pipeBytes(bytes, new CompressionStream('deflate-raw')));
            if (packed.length < encoded.length) encoded = packed;
        } catch {
            // Older browsers may expose CompressionStream without deflate-raw.
        }
    }
    return encoded;
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
    return pipeBytes(bytes, new DecompressionStream('deflate-raw'), limit);
}

export async function decodeContainer(value: string): Promise<Buffer> {
    const compressed = value.startsWith(DEFLATE);
    const encoded = compressed ? value.slice(DEFLATE.length) : value;
    if (encoded.length > Math.ceil((MAX_BOC_BYTES * 4) / 3)) throw new Error('Share exceeds 1 MiB');
    const bytes = Buffer.from(encoded, 'base64');
    if (!encoded || base64url(bytes) !== encoded) throw new Error('Invalid share base64url');
    return compressed ? inflate(bytes) : bytes;
}
