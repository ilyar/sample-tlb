import { nodePolyfills } from 'vite-plugin-node-polyfills';

const isDevelop = !process.argv.includes('production');

export default {
    base: isDevelop ? '/' : '/sample-tlb/',
    plugins: [
        nodePolyfills({
            include: ['buffer'],
        }),
    ],
    define: {
        global: 'globalThis',
    },
    resolve: {
        alias: {
            buffer: 'buffer',
        },
    },
    optimizeDeps: {
        include: ['buffer'],
    },
    build: {
        rollupOptions: {
            external: [],
            output: {
                manualChunks: {
                    vendor: ['buffer'],
                    ton: ['@ton/core'],
                },
            },
        },
        chunkSizeWarningLimit: 600,
    },
};
