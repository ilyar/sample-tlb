import { Result } from '@ton-community/tlb-runtime';

import { CellProcessor, TLBData } from './cell-processor';

export class App {
    private readonly processor: CellProcessor;
    private schemaField: HTMLTextAreaElement | null = null;
    private bocField: HTMLTextAreaElement | null = null;
    private dataField: HTMLTextAreaElement | null = null;
    private schemaErrorSpan: HTMLSpanElement | null = null;
    private bocErrorSpan: HTMLSpanElement | null = null;
    private dataErrorSpan: HTMLSpanElement | null = null;
    private isUpdating = false;

    constructor() {
        this.processor = CellProcessor.default;
        this.initializeUI();
        this.setupEventListeners();
        this.updateFieldsFromCore();
        this.refreshRootInput();
    }

    private initializeUI() {
        this.schemaField = document.querySelector('textarea[name="schema"]');
        this.bocField = document.querySelector('textarea[name="boc"]');
        this.dataField = document.querySelector('textarea[name="data"]');
        this.schemaErrorSpan = document.getElementById('schema-error');
        this.bocErrorSpan = document.getElementById('boc-error');
        this.dataErrorSpan = document.getElementById('data-error');
    }

    private setupEventListeners() {
        if (this.schemaField) {
            this.schemaField.addEventListener('input', (e) => {
                const target = e.target as HTMLTextAreaElement;
                this.handleSchemaChange(target.value);
            });
        }

        const root = document.querySelector<HTMLInputElement>('#root-type');
        root?.addEventListener('input', () => {
            const input = this.processor.rootInput;
            const value = root.value.trim();
            this.hideFieldError('schema');
            this.handleResult(
                this.processor.updateRoot(input?.prefix && value ? input.prefix + ' ' + value : value),
                'boc',
            );
        });

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

    private refreshRootInput(valid = true) {
        const group = document.querySelector<HTMLElement>('#root-control')!;
        const label = group.querySelector('label')!;
        const field = group.querySelector('input')!;
        const input = valid ? this.processor.rootInput : undefined;
        group.hidden = !input;
        field.value = '';
        if (input) {
            label.textContent = input.label;
            field.placeholder = input.placeholder;
        }
    }

    private handleSchemaChange(newSchema: string) {
        if (this.isUpdating) return;

        const result = this.processor.updateSchema(newSchema);
        const valid = result.success || this.processor.state.schema === newSchema;
        this.refreshRootInput(valid);
        this.hideFieldError('boc');
        this.handleResult(result, 'schema');
    }

    private handleBocChange(newBoc: string) {
        if (this.isUpdating) return;
        this.handleResult(this.processor.updateBoc(newBoc), 'boc');
    }

    private handleDataChange(newData: string) {
        if (this.isUpdating) return;

        const result = this.processor.updateData(newData);
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

    private updateFieldsFromCore() {
        this.updateFieldsFromData(this.processor.state);
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
            errorSpan.textContent = message;
            errorSpan.style.display = 'inline';
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
            errorSpan.style.display = 'none';
            textarea.classList.remove('field-error-border');
        }
    }
}

new App();
