import type { CompletionContext, CompletionSource } from '@codemirror/autocomplete';
import { Result, type TLBRuntime, type TypeExportOptions } from '@ton-community/tlb-runtime';

import catalog from './samples.json';
import { CellProcessor, defaultBoc, defaultSchema, Focus, TLBData } from './cell-processor';
import { CodeEditor } from './editor/code-editor';
import { CellInspector } from './cell-inspector';
import { bocPayload, decodeShareState, encodeShareState, payloadText } from './share/share';

interface Sample {
    id?: string;
    title: string;
    schema: string;
    boc: string;
    group?: string;
    kind?: string;
    documentation?: string;
    documentationTitle?: string;
}

const samples: Sample[] = catalog;

function sampleId(sample: Sample): string {
    return (
        sample.id ??
        sample.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-$/, '')
    );
}

export class App {
    private readonly samplePicker = document.querySelector<HTMLSelectElement>('#docs-sample')!;
    private readonly sampleSource = document.querySelector<HTMLAnchorElement>('#sample-source')!;
    private readonly processor: CellProcessor;
    private readonly schemaField = new CodeEditor('schema', (value) => {
        this.beginEdit();
        this.handleSchemaChange(value);
        this.inspector.update(this.bocField.value);
    });
    private readonly dataField = new CodeEditor(
        'data',
        (value) => {
            this.beginEdit();
            this.handleDataChange(value);
            this.inspector.update(this.bocField.value);
        },
        (context) => this.completeData(context),
    );
    private readonly bocField = document.querySelector<HTMLTextAreaElement>('#boc')!;
    private readonly inspector = new CellInspector();
    private focus = Focus.boc;
    private schemaReady = true;
    private fragmentRevision = 0;
    private readonly rootSelect = document.querySelector<HTMLSelectElement>('#root-type')!;
    private readonly argumentsBox = document.querySelector<HTMLElement>('#root-arguments')!;

    private readonly typePanel = document.querySelector<HTMLDetailsElement>('#type-panel')!;
    private readonly typeFormat = document.querySelector<HTMLSelectElement>('#type-format')!;
    private readonly typeOutput = document.querySelector<HTMLElement>('#type-output code')!;
    private readonly typeError = document.querySelector<HTMLElement>('#type-error')!;
    private readonly copyTypes = document.querySelector<HTMLButtonElement>('#copy-types')!;
    private typeOptions: TypeExportOptions = {};
    private typeRevision = 0;

    private completionCache?: { runtime: TLBRuntime; options: TypeExportOptions; source: CompletionSource };

    private async completeData(context: CompletionContext) {
        const compiled = this.processor.compiled;
        if (!compiled.success) return null;
        const runtime = compiled.value;
        const options = this.typeOptions;
        try {
            if (this.completionCache?.runtime !== runtime || this.completionCache.options !== options) {
                const { dataCompletions } = await import('./editor/data-completion');
                if (context.aborted || this.processor.compiled !== compiled || this.typeOptions !== options)
                    return null;
                this.completionCache = {
                    runtime,
                    options,
                    source: dataCompletions(runtime, {
                        rootType: runtime.lastTypeName,
                        ...options,
                    }),
                };
            }
            return await this.completionCache.source(context);
        } catch {
            // A partially specified root may not have an exportable schema yet.
            return null;
        }
    }

    private async refreshTypes() {
        const revision = ++this.typeRevision;
        this.typeOutput.textContent = '';
        this.typeError.textContent = '';
        this.copyTypes.disabled = true;
        this.copyTypes.textContent = 'Copy';
        if (!this.typePanel.open) return;
        if (this.typeFormat.value === 'cpp') {
            this.typeOutput.textContent =
                'Use `tlbc -o schema-auto -n schema::gen -z schema.tlb` from https://github.com/ton-blockchain/ton/releases\n' +
                'for example https://github.com/ton-blockchain/ton/releases/download/v2026.11/ton-<OS>-<ARCH>.zip';
            this.copyTypes.disabled = false;
            return;
        }
        try {
            const compiled = this.processor.compiled;
            if (!compiled.success) throw compiled.error;
            const [{ exportTypes }, { highlightExport }] = await Promise.all([
                import('./type-export'),
                import('./editor/export-highlight'),
            ]);
            if (revision !== this.typeRevision) return;
            const options = { rootType: compiled.value.lastTypeName, ...this.typeOptions };
            const format = this.typeFormat.value;
            const source = exportTypes(compiled.value, format, options);
            this.typeOutput.innerHTML = highlightExport(source, format);
            this.copyTypes.disabled = false;
        } catch (error) {
            if (revision === this.typeRevision)
                this.typeError.textContent = error instanceof Error ? error.message : String(error);
        }
    }

    constructor() {
        this.processor = CellProcessor.default;
        this.setupSamplePicker();
        this.setupEventListeners();
        void this.openFragment();
        window.addEventListener('hashchange', () => void this.openFragment());
    }

    private setupSamplePicker() {
        const groups = new Map<string, HTMLOptGroupElement>();
        for (const [i, sample] of samples.entries()) {
            const option = new Option(sample.title, String(i));
            if (!sample.group) {
                this.samplePicker.add(option);
                continue;
            }
            let group = groups.get(sample.group);
            if (!group) {
                group = document.createElement('optgroup');
                group.label = sample.group;
                groups.set(sample.group, group);
                this.samplePicker.append(group);
            }
            group.append(option);
        }
        this.samplePicker.addEventListener('change', () => {
            const sample = samples[Number(this.samplePicker.value)];
            window.history.pushState(null, '', '#' + sampleId(sample));
            this.openFragment();
        });
    }

    private clearShareFeedback() {
        document.querySelector<HTMLElement>('#share-status')!.textContent = '';
        document.querySelector<HTMLInputElement>('#share-link')!.hidden = true;
    }

    private async openFragment() {
        const revision = ++this.fragmentRevision;
        this.clearShareFeedback();
        const fragment = window.location.hash.slice(1);
        const shared = await decodeShareState(fragment);
        if (revision !== this.fragmentRevision || window.location.hash.slice(1) !== fragment) return;
        const index = samples.findIndex((entry) => sampleId(entry) === fragment);
        const sample = samples[index];
        const schema = shared?.schema.data ?? sample?.schema ?? defaultSchema;
        const content = shared ? payloadText(shared.payload) : '';
        const isData = shared?.payload.kind === 'Payload_data';
        const boc = shared ? (isData ? '' : content) : (sample?.boc ?? defaultBoc);
        this.samplePicker.value = sample ? String(index) : '';
        this.sampleSource.hidden = !sample?.documentation;
        if (sample?.documentation) {
            this.sampleSource.href = sample.documentation;
            this.sampleSource.textContent = sample.documentationTitle?.trim() || `Open ${sample.title} in TON Docs`;
        } else {
            this.sampleSource.removeAttribute('href');
            this.sampleSource.textContent = '';
        }

        this.typeOptions = {};
        this.focus = Focus.boc;
        this.processor.updateBoc('');
        for (const field of ['schema', 'boc', 'data']) this.hideFieldError(field);
        const result = this.processor.updateSchema(schema);
        this.schemaReady = result.success;
        this.handleResult(result, 'schema');
        if (result.success) {
            const decoded = this.processor.updateBoc(boc);
            this.handleResult(decoded, 'boc');
            if (!decoded.success) this.dataField.value = '';
        } else {
            this.dataField.value = '';
        }
        this.schemaField.value = schema;
        this.bocField.value = boc;
        this.inspector.update(boc);
        this.refreshRootInput();
        if (isData) {
            this.handleDataChange(content);
            this.inspector.update(this.bocField.value);
        }
        const choice = this.processor.choices.findIndex((entry) => entry.value && entry.value.kind === sample?.kind);
        if (choice >= 0) {
            this.rootSelect.value = String(choice);
            this.showChoice();
        }
        if (isData) this.dataField.value = content;
    }

    private async share(mode: 'boc' | 'data') {
        this.clearShareFeedback();
        const revision = ++this.fragmentRevision;
        const status = document.querySelector<HTMLElement>('#share-status')!;
        const section = document.querySelector(mode === 'boc' ? '.boc-field' : '.data-field')!;
        section.querySelector('.label-row')!.after(status, document.querySelector('#share-link')!);
        const url = new URL(window.location.href);
        url.search = '';
        const link = encodeShareState({
            kind: 'Share',
            schema: { kind: 'Schema', data: this.schemaField.value },
            payload:
                mode === 'boc'
                    ? bocPayload(this.bocField.value)
                    : { kind: 'Payload_data', value: { kind: 'Data', data: this.dataField.value } },
        }).then((encoded) => {
            url.hash = encoded;
            if (revision === this.fragmentRevision) window.history.replaceState(null, '', url);
            return url.href;
        });

        // Start clipboard.write during the click. Safari checks activation before compression finishes.
        const clipboard = navigator.clipboard;
        const copy = async () => {
            if (clipboard?.write && typeof window.ClipboardItem !== 'undefined') {
                const text = link.then((href) => new Blob([href], { type: 'text/plain' }));
                // The browser can reject the write before consuming the item's promise.
                void text.catch(() => {});
                await clipboard.write([new window.ClipboardItem({ 'text/plain': text })]);
            } else if (clipboard?.writeText) {
                await clipboard.writeText(await link);
            } else {
                return false;
            }
            return true;
        };

        try {
            const [href, copied] = await Promise.all([link, copy().catch(() => false)]);
            if (revision !== this.fragmentRevision) return;
            if (!copied) {
                const field = document.querySelector<HTMLInputElement>('#share-link')!;
                field.value = href;
                field.hidden = false;
                field.select();
            }
            status.textContent = copied ? 'Link copied' : 'Copy this link';
            if (href.length > 4000) status.textContent += ' · This link exceeds 4,000 characters.';
        } catch (error) {
            if (revision === this.fragmentRevision) {
                status.textContent = error instanceof Error ? error.message : 'Unable to create share link';
            }
        }
    }

    private setupEventListeners() {
        this.typePanel.addEventListener('toggle', () => void this.refreshTypes());
        this.typeFormat.addEventListener('change', () => void this.refreshTypes());
        this.copyTypes.addEventListener('click', async () => {
            const revision = this.typeRevision;
            try {
                await navigator.clipboard.writeText(this.typeOutput.textContent ?? '');
                if (revision === this.typeRevision) this.copyTypes.textContent = 'Copied';
            } catch {
                if (revision !== this.typeRevision) return;
                window.getSelection()?.selectAllChildren(this.typeOutput);
                this.typeError.textContent = 'Copy the selected text.';
            }
        });
        document.querySelector('#share')!.addEventListener('click', () => this.share('boc'));
        document.querySelector('#share-data')!.addEventListener('click', () => this.share('data'));
        this.rootSelect.addEventListener('change', () => {
            this.beginEdit();
            this.showChoice();
        });
        this.bocField.addEventListener('input', () => {
            this.beginEdit();
            this.handleBocChange(this.bocField.value);
            this.inspector.update(this.bocField.value);
        });
    }

    private beginEdit() {
        this.fragmentRevision++;
        this.clearShareFeedback();
        if (!window.location.hash) return;
        window.history.pushState(null, '', window.location.pathname + window.location.search);
        this.samplePicker.value = '';
        this.sampleSource.hidden = true;
        this.sampleSource.removeAttribute('href');
    }

    private refreshRootInput() {
        const choices = this.processor.choices;
        const current = choices[this.processor.defaultChoice];
        if (choices.length) this.typeOptions = current ? { rootType: current.root, args: current.resolvedArgs } : {};
        void this.refreshTypes();
        const group = this.rootSelect.parentElement!;
        group.hidden = choices.length < 2;
        this.argumentsBox.hidden = true;
        this.argumentsBox.replaceChildren();
        this.rootSelect.replaceChildren();
        if (!current) this.rootSelect.add(new Option('Automatic', ''));
        for (const [i, choice] of choices.entries()) this.rootSelect.add(new Option(choice.label, String(i)));
        if (current) {
            this.rootSelect.value = String(this.processor.defaultChoice);
            if (!current.value) this.showChoice();
        }
    }

    private showChoice() {
        const index = this.rootSelect.value === '' ? -1 : Number(this.rootSelect.value);
        const choice = this.processor.choices[index];
        this.argumentsBox.replaceChildren();
        this.argumentsBox.hidden = true;
        this.dataField.value = '';
        this.hideFieldError('boc');
        this.typeOptions = choice ? { rootType: choice.root, args: choice.resolvedArgs } : {};
        void this.refreshTypes();
        if (!choice) return;
        if (choice.value) {
            this.handleResult(this.processor.selectChoice(index), 'boc');
            return;
        }
        const inputs = new Map<number, HTMLInputElement>();
        for (const [position, arg] of choice.args.entries()) {
            if (typeof arg === 'number') continue;
            const label = document.createElement('label');
            label.textContent = choice.root + ' argument ' + arg + ' ';
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.step = '1';
            inputs.set(position, input);
            label.append(input);
            this.argumentsBox.append(label);
            input.addEventListener('input', () => {
                this.dataField.value = '';
                this.hideFieldError('boc');
                this.typeOptions = { rootType: choice.root };
                void this.refreshTypes();
                if ([...inputs.values()].some((field) => !field.value || !field.validity.valid)) return;
                const args = choice.args.map((item, i) =>
                    typeof item === 'number' ? item : inputs.get(i)!.valueAsNumber,
                );
                this.typeOptions = { rootType: choice.root, args };
                void this.refreshTypes();
                this.handleResult(this.processor.selectChoice(index, args), 'boc');
            });
        }
        this.argumentsBox.hidden = false;
    }

    private handleSchemaChange(newSchema: string) {
        this.samplePicker.value = '';
        this.sampleSource.hidden = true;
        this.sampleSource.removeAttribute('href');
        this.typeOptions = {};
        const result = this.processor.updateSchema(newSchema, this.focus);
        this.schemaReady = this.processor.compiled.success;
        this.refreshRootInput();
        this.hideFieldError('boc');
        if (!result.success) {
            if (this.focus === Focus.boc) this.dataField.value = '';
            if (this.focus === Focus.data) this.bocField.value = '';
        }
        this.handleResult(result, 'schema');
    }

    private handleBocChange(newBoc: string) {
        this.focus = Focus.boc;
        const result = this.processor.updateBoc(newBoc);
        if (!this.schemaReady) {
            this.dataField.value = '';
            return;
        }
        if (!result.success) this.dataField.value = '';
        this.hideFieldError('data');
        this.handleResult(result, 'boc');
        this.refreshRootInput();
    }

    private handleDataChange(newData: string) {
        this.focus = Focus.data;
        const result = this.processor.updateData(newData);
        if (!this.schemaReady) {
            this.bocField.value = '';
            if (!result.success) this.showFieldError(result.error.message, 'data');
            return;
        }
        this.refreshRootInput();
        this.hideFieldError('boc');
        if (!result.success) this.bocField.value = '';
        // Keep the edited JSON verbatim, including trailing whitespace and the current selection.
        if (result.success) {
            this.hideFieldError('data');
            this.bocField.value = result.value.boc;
        } else {
            this.showFieldError(result.error.message, 'data');
        }
    }

    private handleResult(result: Result<TLBData>, field: string) {
        if (result.success) {
            this.hideFieldError(field);
            this.schemaField.value = result.value.schema;
            this.bocField.value = result.value.boc;
            this.dataField.value = result.value.data;
        } else {
            this.showFieldError(result.error.message, field);
        }
    }

    private showFieldError(message: string, field: string) {
        const errorSpan = document.getElementById(field + '-error')!;
        const editor = document.getElementById(field)!;
        const overflow = /^Encode bitLength is too small for a value (-?\d+)\. Got (\d+)$/.exec(message);
        if (overflow && Number(overflow[2]) <= 1023) {
            const [, value, bits] = overflow;
            const max = (1n << BigInt(bits)) - 1n;
            errorSpan.textContent = `Value ${value} is outside the range for uint${bits}. Use 0 to ${max}.`;
        } else {
            errorSpan.textContent = message;
        }
        editor.setAttribute('aria-invalid', 'true');
    }

    private hideFieldError(field: string) {
        document.getElementById(field + '-error')!.textContent = '';
        document.getElementById(field)!.removeAttribute('aria-invalid');
    }
}

new App();
