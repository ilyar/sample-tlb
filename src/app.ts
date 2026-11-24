import { Result } from '@ton-community/tlb-runtime';

import catalog from './samples.json';
import { CellProcessor, defaultBoc, defaultSchema, Focus, TLBData } from './cell-processor';

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
    private schemaField: HTMLTextAreaElement | null = null;
    private bocField: HTMLTextAreaElement | null = null;
    private dataField: HTMLTextAreaElement | null = null;
    private schemaErrorSpan: HTMLSpanElement | null = null;
    private bocErrorSpan: HTMLSpanElement | null = null;
    private dataErrorSpan: HTMLSpanElement | null = null;
    private isUpdating = false;
    private focus = Focus.boc;
    private readonly rootSelect = document.querySelector<HTMLSelectElement>('#root-type')!;
    private readonly argumentsBox = document.querySelector<HTMLElement>('#root-arguments')!;

    constructor() {
        this.processor = CellProcessor.default;
        this.initializeUI();
        this.setupSamplePicker();
        this.setupEventListeners();
        this.openFragment();
        window.addEventListener('hashchange', () => this.openFragment());
    }

    private initializeUI() {
        this.schemaField = document.querySelector('textarea[name="schema"]');
        this.bocField = document.querySelector('textarea[name="boc"]');
        this.dataField = document.querySelector('textarea[name="data"]');
        this.schemaErrorSpan = document.getElementById('schema-error');
        this.bocErrorSpan = document.getElementById('boc-error');
        this.dataErrorSpan = document.getElementById('data-error');
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

    private openFragment() {
        this.clearShareFeedback();
        const fragment = window.location.hash.slice(1);
        const index = samples.findIndex((entry) => sampleId(entry) === fragment);
        const sample = samples[index];
        const params = new URLSearchParams(fragment);
        const shared = params.has('schema') && params.has('boc');
        const schema = shared ? params.get('schema')! : (sample?.schema ?? defaultSchema);
        const boc = shared ? params.get('boc')! : (sample?.boc ?? defaultBoc);
        this.samplePicker.value = sample ? String(index) : '';
        this.sampleSource.hidden = !sample?.documentation;
        if (sample?.documentation) {
            this.sampleSource.href = sample.documentation;
            this.sampleSource.textContent = sample.documentationTitle?.trim() || `Open ${sample.title} in TON Docs`;
        } else {
            this.sampleSource.removeAttribute('href');
            this.sampleSource.textContent = '';
        }

        this.focus = Focus.boc;
        this.processor.updateBoc('');
        for (const field of ['schema', 'boc', 'data']) this.hideFieldError(field);
        const result = this.processor.updateSchema(schema);
        this.handleResult(result, 'schema');
        if (result.success) {
            const decoded = this.processor.updateBoc(boc);
            this.handleResult(decoded, 'boc');
            if (!decoded.success) this.dataField!.value = '';
        } else {
            this.dataField!.value = '';
        }
        this.schemaField!.value = schema;
        this.bocField!.value = boc;
        this.refreshRootInput();
        if (sample?.kind && this.processor.choices.length > 1) {
            const choice = this.processor.choices.findIndex((entry) => entry.kind === sample.kind && entry.value);
            if (choice >= 0) {
                this.rootSelect.value = String(choice);
                this.showChoice();
            }
        }
    }

    private async share() {
        const url = new URL(window.location.href);
        url.search = '';
        url.hash = new URLSearchParams({ schema: this.schemaField!.value, boc: this.bocField!.value }).toString();
        const status = document.querySelector<HTMLElement>('#share-status')!;
        try {
            await window.navigator.clipboard.writeText(url.href);
            status.textContent = 'Link copied';
        } catch {
            const link = document.querySelector<HTMLInputElement>('#share-link')!;
            link.value = url.href;
            link.hidden = false;
            link.select();
            status.textContent = 'Copy this link';
        }
    }

    private setupEventListeners() {
        document.querySelector('#share')!.addEventListener('click', () => this.share());
        for (const field of [this.schemaField, this.bocField, this.dataField]) {
            field?.addEventListener('input', () => {
                this.clearShareFeedback();
                if (window.location.hash) {
                    window.history.pushState(null, '', window.location.pathname + window.location.search);
                    this.samplePicker.value = '';
                    this.sampleSource.hidden = true;
                    this.sampleSource.removeAttribute('href');
                }
            });
        }
        if (this.schemaField) {
            this.schemaField.addEventListener('input', (e) => {
                const target = e.target as HTMLTextAreaElement;
                this.handleSchemaChange(target.value);
            });
        }

        this.rootSelect.addEventListener('change', () => this.showChoice());
        if (this.bocField) {
            this.bocField.addEventListener('input', (e) => {
                const target = e.target as HTMLTextAreaElement;
                this.handleBocChange(target.value);
            });
        }

        if (this.dataField) {
            this.dataField.addEventListener('input', (e) => {
                const target = e.target as HTMLTextAreaElement;
                this.handleDataChange(target.value);
            });
        }
    }

    private refreshRootInput() {
        const choices = this.processor.choices;
        const group = this.rootSelect.parentElement!;
        group.hidden = choices.length < 2;
        this.argumentsBox.hidden = true;
        this.argumentsBox.replaceChildren();
        this.rootSelect.replaceChildren(new Option('Choose a type', ''));
        for (const [i, choice] of choices.entries()) this.rootSelect.add(new Option(choice.label, String(i)));
        if (choices.length === 1 && !choices[0].value) {
            this.rootSelect.value = '0';
            this.showChoice();
        }
    }

    private showChoice() {
        const index = this.rootSelect.value === '' ? -1 : Number(this.rootSelect.value);
        const choice = this.processor.choices[index];
        this.argumentsBox.replaceChildren();
        this.argumentsBox.hidden = true;
        if (this.dataField) this.dataField.value = '';
        this.hideFieldError('boc');
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
                if (this.dataField) this.dataField.value = '';
                this.hideFieldError('boc');
                if ([...inputs.values()].some((field) => !field.value || !field.validity.valid)) return;
                const args = choice.args.map((item, i) =>
                    typeof item === 'number' ? item : inputs.get(i)!.valueAsNumber,
                );
                this.handleResult(this.processor.selectChoice(index, args), 'boc');
            });
        }
        this.argumentsBox.hidden = false;
    }

    private handleSchemaChange(newSchema: string) {
        if (this.isUpdating) return;

        this.samplePicker.value = '';
        this.sampleSource.hidden = true;
        this.sampleSource.removeAttribute('href');
        const result = this.processor.updateSchema(newSchema, this.focus);
        this.refreshRootInput();
        this.hideFieldError('boc');
        if (!result.success) {
            if (this.focus === Focus.boc && this.dataField) this.dataField.value = '';
            if (this.focus === Focus.data && this.bocField) this.bocField.value = '';
        }
        this.handleResult(result, 'schema');
    }

    private handleBocChange(newBoc: string) {
        if (this.isUpdating) return;
        this.focus = Focus.boc;
        const result = this.processor.updateBoc(newBoc);
        if (!result.success && this.dataField) this.dataField.value = '';
        this.hideFieldError('data');
        this.handleResult(result, 'boc');
        this.refreshRootInput();
    }

    private handleDataChange(newData: string) {
        if (this.isUpdating) return;

        this.focus = Focus.data;
        const result = this.processor.updateData(newData);
        this.refreshRootInput();
        this.hideFieldError('boc');
        if (!result.success && this.bocField) this.bocField.value = '';
        this.handleResult(result, 'data');
    }

    private handleResult(result: Result<TLBData>, field: string) {
        if (result.success) {
            this.hideFieldError(field);
            this.updateFieldsFromData(result.value);
        } else {
            this.showFieldError(result.error.message, field);
        }
    }

    private updateFieldsFromData(data: TLBData) {
        this.isUpdating = true;

        try {
            if (this.schemaField && this.schemaField.value !== data.schema) {
                this.schemaField.value = data.schema;
            }
            if (this.bocField && this.bocField.value !== data.boc) {
                this.bocField.value = data.boc;
            }
            if (this.dataField && this.dataField.value !== data.data) {
                this.dataField.value = data.data;
            }
        } finally {
            this.isUpdating = false;
        }
    }

    private showFieldError(message: string, field: string) {
        let errorSpan: HTMLSpanElement | null = null;
        let textarea: HTMLTextAreaElement | null = null;

        switch (field) {
            case 'schema':
                errorSpan = this.schemaErrorSpan;
                textarea = this.schemaField;
                break;
            case 'boc':
                errorSpan = this.bocErrorSpan;
                textarea = this.bocField;
                break;
            case 'data':
                errorSpan = this.dataErrorSpan;
                textarea = this.dataField;
                break;
        }

        if (errorSpan && textarea) {
            const overflow = /^Encode bitLength is too small for a value (-?\d+)\. Got (\d+)$/.exec(message);
            if (overflow && Number(overflow[2]) <= 1023) {
                const [, value, bits] = overflow;
                const max = (1n << BigInt(bits)) - 1n;
                errorSpan.textContent = `Value ${value} is outside the range for uint${bits}. Use 0 to ${max}.`;
            } else {
                errorSpan.textContent = message;
            }
            textarea.setAttribute('aria-invalid', 'true');
            textarea.classList.add('field-error-border');
        }
    }

    private hideFieldError(field: string) {
        let errorSpan: HTMLSpanElement | null = null;
        let textarea: HTMLTextAreaElement | null = null;

        switch (field) {
            case 'schema':
                errorSpan = this.schemaErrorSpan;
                textarea = this.schemaField;
                break;
            case 'boc':
                errorSpan = this.bocErrorSpan;
                textarea = this.bocField;
                break;
            case 'data':
                errorSpan = this.dataErrorSpan;
                textarea = this.dataField;
                break;
        }

        if (errorSpan && textarea) {
            errorSpan.textContent = '';
            textarea.removeAttribute('aria-invalid');
            textarea.classList.remove('field-error-border');
        }
    }
}

new App();
