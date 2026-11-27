import '@ton-community/tlb-runtime/type-export.js';
import type { TLBRuntime, TypeExportOptions } from '@ton-community/tlb-runtime';

import { exportModel } from './language-export';

export function exportTypes<T>(runtime: TLBRuntime<T>, format: string, options: TypeExportOptions) {
    if (format === 'typescript') return runtime.toTypeScript(options);
    if (
        format === 'swift' ||
        format === 'func' ||
        format === 'tolk' ||
        format === 'python' ||
        format === 'go' ||
        format === 'kotlin'
    )
        return exportModel(runtime, format, options);
    return JSON.stringify(runtime.toJSONSchema({ ...options, title: options.rootType }), null, 2);
}
