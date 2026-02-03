import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { visualizer } from 'rollup-plugin-visualizer';

const isDevelop = !process.argv.includes('production');

export default {
    base: isDevelop ? '/' : '/sample-tlb/',
    plugins: [
        nodePolyfills({
            include: ['buffer'],
        }),
        visualizer({
            filename: 'stats.html',
            gzipSize: true,
            brotliSize: true,
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
        target: 'esnext',
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: undefined,
                compact: true,
            },
        },
        chunkSizeWarningLimit: 1000,
    },
};
