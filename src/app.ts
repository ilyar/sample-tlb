import { Result } from '@ton-community/tlb-runtime';

import { CellProcessor, Focus, TLBData } from './cell-processor';

export class App {
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
