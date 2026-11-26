import { snippet, type CompletionContext, type CompletionResult } from '@codemirror/autocomplete';
import type { TLBRuntime, TypeExportOptions } from '@ton-community/tlb-runtime';
import '@ton-community/tlb-runtime/type-export.js';
import { CompletionItemKind, getLanguageService, type JSONSchema, TextDocument } from 'vscode-json-languageservice';

export function dataCompletions(runtime: TLBRuntime, options: TypeExportOptions) {
    const service = getLanguageService({});
    const uri = 'inmemory://playground/data.json';
    const schema: JSONSchema = runtime.toJSONSchema(options);
    // Keep every constructor available while an incomplete kind matches no variant.
    for (const definition of Object.values(schema.definitions ?? {})) {
        const kinds = definition.oneOf?.map((branch) =>
            typeof branch === 'object' && typeof branch.properties?.kind === 'object'
                ? branch.properties.kind.const
                : undefined,
        );
        if (kinds?.length && kinds.every((kind) => typeof kind === 'string')) {
            definition.properties = { ...definition.properties, kind: { enum: kinds } };
        }
    }
    service.configure({ schemas: [{ uri: 'inmemory://playground/schema.json', fileMatch: ['data.json'], schema }] });
    return async (context: CompletionContext): Promise<CompletionResult | null> => {
        const doc = TextDocument.create(uri, 'json', 0, context.state.doc.toString());
        const list = await service.doComplete(doc, doc.positionAt(context.pos), service.parseJSONDocument(doc));
        const edit = list?.items[0]?.textEdit;
        const range = edit && ('range' in edit ? edit.range : edit.replace);
        if (!range || !list || context.aborted) return null;
        return {
            from: doc.offsetAt(range.start),
            to: doc.offsetAt(range.end),
            options: list.items.map((item) => {
                const property = item.kind === CompletionItemKind.Property;
                // The JSON service uses LSP tab stops ($1); CodeMirror uses ${1}.
                const template = (item.textEdit?.newText ?? item.label).replace(
                    /\\([\\$])|\$(\d+)/g,
                    (_, literal, index) => literal ?? '${' + index + '}',
                );
                return {
                    label: property ? JSON.stringify(item.label) : item.label,
                    type: property ? 'property' : 'constant',
                    detail: typeof item.documentation === 'string' ? item.documentation : item.documentation?.value,
                    apply: snippet(template),
                };
            }),
        };
    };
}
