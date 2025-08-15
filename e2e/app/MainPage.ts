import { Locator, Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class MainPage extends BasePage {
    readonly schemaField: Locator;
    readonly bocField: Locator;
    readonly dataField: Locator;
    readonly schemaError: Locator;
    readonly bocError: Locator;
    readonly dataError: Locator;

    constructor(page: Page) {
        super(page);
        this.schemaField = page.locator('#schema');
        this.bocField = page.locator('#boc');
        this.dataField = page.locator('#data');
        this.schemaError = page.locator('#schema-error');
        this.bocError = page.locator('#boc-error');
        this.dataError = page.locator('#data-error');
    }

    async goto() {
        await super.goto('/');
        await this.waitForElement('#schema');
    }

    // Основные методы для работы с полями
    async clearAllFields() {
        await this.schemaField.clear();
        await this.bocField.clear();
        await this.dataField.clear();
    }

    async fillSchema(schema: string) {
        await this.schemaField.clear();
        await this.schemaField.fill(schema);
    }

    async fillBoc(boc: string) {
        await this.bocField.clear();
        await this.bocField.fill(boc);
    }

    async fillData(data: string) {
        await this.dataField.clear();
        await this.dataField.fill(data);
    }

    async getSchemaValue(): Promise<string> {
        return await this.schemaField.inputValue();
    }

    async getBocValue(): Promise<string> {
        return await this.bocField.inputValue();
    }

    async getDataValue(): Promise<string> {
        return await this.dataField.inputValue();
    }

    // Методы для валидации
    async enterInvalidSchema(invalidSchema: string) {
        await this.schemaField.clear();
        await this.schemaField.fill(invalidSchema);
    }

    async enterValidSchema(validSchema: string) {
        await this.schemaField.clear();
        await this.schemaField.fill(validSchema);
    }

    async waitForValidation(timeout = 500) {
        await this.waitForTimeout(timeout);
    }

    // Методы для синхронизации
    async ensureSchemaIsSet() {
        const schemaValue = await this.schemaField.inputValue();
        if (!schemaValue.includes('message#_')) {
            await this.schemaField.fill('message#_ len:(## 7) { len <= 127 } text:(bits (len * 8)) = Message;');
        }
    }

    async waitForSynchronization(timeout = 2000) {
        await this.waitForTimeout(timeout);
    }

    // Вспомогательные методы
    async waitForFieldsUpdate(timeout = 500) {
        await this.waitForTimeout(timeout);
    }

    async copyAndPasteData(fromField: 'schema' | 'boc' | 'data', toField: 'schema' | 'boc' | 'data') {
        const sourceField = this.getFieldLocator(fromField);
        const targetField = this.getFieldLocator(toField);

        await sourceField.click();
        await this.page.keyboard.press('Control+a');
        await this.page.keyboard.press('Control+c');
        await targetField.click();
        await this.page.keyboard.press('Control+v');
    }

    private getFieldLocator(field: 'schema' | 'boc' | 'data'): Locator {
        switch (field) {
            case 'schema':
                return this.schemaField;
            case 'boc':
                return this.bocField;
            case 'data':
                return this.dataField;
        }
    }
}
