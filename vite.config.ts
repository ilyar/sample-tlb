import { lezer } from '@lezer/generator/rollup';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { visualizer } from 'rollup-plugin-visualizer';

const isDevelop = !process.argv.includes('production');

export default {
    base: isDevelop ? '/' : '/sample-tlb/',
    plugins: [
        lezer(),
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
            // TL-B schema parsing dispatches on AST constructor names.
            keep_classnames: true,
            keep_fnames: true,
            compress: {
                drop_console: ['log', 'debug', 'info'],
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (/node_modules\/(?:@codemirror|@lezer)\//.test(id)) return 'editor';
                },
                compact: true,
            },
        },
        chunkSizeWarningLimit: 1000,
    },
};
