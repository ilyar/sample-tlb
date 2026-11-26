import { autocompletion, type CompletionSource } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';
import {
    bracketMatching,
    foldGutter,
    foldKeymap,
    HighlightStyle,
    LRLanguage,
    syntaxHighlighting,
    syntaxTree,
} from '@codemirror/language';
import { Annotation, EditorState, Transaction } from '@codemirror/state';
import { Decoration, DecorationSet, EditorView, keymap, placeholder, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { styleTags, tags } from '@lezer/highlight';

import { parser } from './tlb.grammar';

const tlb = LRLanguage.define({
    parser: parser.configure({
        props: [
            styleTags({
                Constructor: tags.definition(tags.function(tags.variableName)),
                Tag: tags.labelName,
                'ResultType! TypeName': tags.typeName,
                'FieldName!': tags.propertyName,
                Builtin: tags.standard(tags.typeName),
                Number: tags.number,
                'Operator "="': tags.operator,
                'LineComment BlockComment': tags.comment,
            }),
        ],
    }),
});

const colors = HighlightStyle.define([
    { tag: tags.propertyName, class: 'tok-key' },
    { tag: tags.typeName, class: 'tok-type' },
    { tag: tags.standard(tags.typeName), class: 'tok-builtin' },
    { tag: tags.definition(tags.function(tags.variableName)), class: 'tok-constructor' },
    { tag: tags.labelName, class: 'tok-tag' },
    { tag: [tags.number, tags.bool, tags.null], class: 'tok-number' },
    { tag: tags.string, class: 'tok-string' },
    { tag: tags.comment, class: 'tok-comment' },
    { tag: tags.operator, class: 'tok-operator' },
]);

function markJsonValues(view: EditorView) {
    const ranges: ReturnType<Decoration['range']>[] = [];
    const tree = syntaxTree(view.state);
    for (const { from, to } of view.visibleRanges) {
        tree.iterate({
            from,
            to,
            enter(ref) {
                if (ref.name !== 'String') return;
                const property = ref.node.parent;
                if (property?.name !== 'Property') return;
                const key = property.getChild('PropertyName');
                if (!key) return;
                const name = view.state.sliceDoc(key.from, key.to);
                if (name === '"kind"' || name === '"$bits"') {
                    const mark = Decoration.mark({ class: name === '"kind"' ? 'json-kind' : 'json-bits' });
                    ranges.push(mark.range(ref.from, ref.to));
                }
            },
        });
    }
    return Decoration.set(ranges, true);
}

const jsonValues = ViewPlugin.fromClass(
    class {
        decorations: DecorationSet;
        constructor(view: EditorView) {
            this.decorations = markJsonValues(view);
        }
        update(update: ViewUpdate) {
            if (
                update.viewportChanged ||
                update.docChanged ||
                syntaxTree(update.state) !== syntaxTree(update.startState)
            ) {
                this.decorations = markJsonValues(update.view);
            }
        }
    },
    { decorations: (plugin) => plugin.decorations },
);

const external = Annotation.define<boolean>();

export class CodeEditor {
    private readonly view: EditorView;

    constructor(id: 'data' | 'schema', change: (value: string) => void, complete?: CompletionSource) {
        const host = document.querySelector<HTMLElement>(`#${id}-editor`)!;
        this.view = new EditorView({
            parent: host,
            extensions: [
                id === 'schema' ? tlb : [json(), foldGutter(), jsonValues],
                complete ? autocompletion({ override: [complete] }) : [],
                syntaxHighlighting(colors),
                history(),
                bracketMatching(),
                EditorView.lineWrapping,
                keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap]),
                placeholder(id === 'data' ? 'Data in JSON · Ctrl+Space for suggestions' : 'TL-B schema'),
                EditorState.tabSize.of(2),
                EditorView.contentAttributes.of({
                    id,
                    'aria-labelledby': `${id}-label`,
                    'aria-describedby': `${id}-error`,
                    spellcheck: 'false',
                    autocapitalize: 'off',
                }),
            ],
            dispatchTransactions(transactions, view) {
                view.update(transactions);
                if (transactions.some((tr) => tr.docChanged && !tr.annotation(external))) {
                    change(view.state.doc.toString());
                }
            },
        });
    }

    get value() {
        return this.view.state.doc.toString();
    }

    set value(doc: string) {
        if (this.value === doc) return;
        this.view.dispatch({
            changes: { from: 0, to: this.view.state.doc.length, insert: doc },
            selection: { anchor: 0 },
            annotations: [external.of(true), Transaction.addToHistory.of(false)],
        });
    }
}
