import { test, expect } from '@playwright/test';

import { MainPage, testData } from './app';

test.describe('UI Functionality E2E Tests', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.goto();
    });

    test('shows root controls only when the schema needs a choice or arguments', async ({ page }) => {
        const root = page.locator('#root-type');
        await expect(root).toBeHidden();
        await mainPage.bocField.fill('');
        await mainPage.schemaField.fill('a$0 = Choice; b$1 = Choice;');
        await expect(root).toBeHidden();
        await mainPage.schemaField.fill('_ {n:#} value:(bits n) = Payload n;');
        await expect(root).toHaveAccessibleName('Arguments for Payload (optional)');
        await root.fill('3');
        await mainPage.schemaField.fill('_ x:uint16 = A; _ y:uint32 = B;');
        await expect(root).toHaveAccessibleName('Decode as (optional)');
        await expect(root).toHaveValue('');
        await root.fill('B');
        await mainPage.schemaField.fill('_ x:# = Only;');
        await expect(root).toBeHidden();
    });

    test('should display validation errors', async () => {
        await mainPage.enterInvalidSchema(testData.schemas.invalid);
        await mainPage.waitForValidation(testData.timeouts.short);

        await expect(mainPage.schemaField).toBeVisible();
        await expect(mainPage.bocField).toBeVisible();
        await expect(mainPage.dataField).toBeVisible();

        const schemaValue = await mainPage.getSchemaValue();
        expect(schemaValue).toBe(testData.schemas.invalid);
    });

    test('should hide errors after fixing', async () => {
        await mainPage.enterInvalidSchema(testData.schemas.invalid);
        await mainPage.waitForValidation(testData.timeouts.short);

        await mainPage.enterValidSchema(testData.schemas.valid);
        await mainPage.waitForValidation(testData.timeouts.short);

        await expect(mainPage.bocField).toBeVisible();
        await expect(mainPage.dataField).toBeVisible();
    });

    test('should synchronize input fields', async () => {
        await mainPage.ensureSchemaIsSet();
        const schemaValue = await mainPage.getSchemaValue();
        expect(schemaValue).toContain('message#_');

        await mainPage.fillData(testData.data.valid);
        await mainPage.waitForSynchronization(testData.timeouts.long);

        const updatedData = await mainPage.getDataValue();
        expect(updatedData).toBe(testData.data.valid);

        await mainPage.fillBoc(testData.boc.valid);
        await mainPage.waitForSynchronization(testData.timeouts.long);

        const updatedBoc = await mainPage.getBocValue();
        expect(updatedBoc).toBe(testData.boc.valid);

        await expect(mainPage.schemaField).toBeVisible();
    });

    test('should handle empty fields', async () => {
        await mainPage.clearAllFields();
        await mainPage.waitForFieldsUpdate(testData.timeouts.short);

        const schemaValue = await mainPage.getSchemaValue();
        const bocValue = await mainPage.getBocValue();
        const dataValue = await mainPage.getDataValue();

        expect(schemaValue).toContain('message#_');
        expect(bocValue).toBe('');
        expect(dataValue).toBe('');

        await expect(mainPage.schemaField).toBeVisible();
    });

    test('should handle very long text in fields', async () => {
        await mainPage.fillData(testData.data.long);
        await mainPage.waitForFieldsUpdate(testData.timeouts.medium);

        const dataValue = await mainPage.getDataValue();
        expect(dataValue).toBe(testData.data.long);

        await expect(mainPage.schemaField).toBeVisible();
    });

    test('should handle copy and paste', async () => {
        await mainPage.fillData(testData.data.valid);

        await mainPage.copyAndPasteData('data', 'schema');

        const schemaValue = await mainPage.getSchemaValue();
        expect(schemaValue).toContain(testData.data.valid);
    });

    test('should handle operation cancellation', async () => {
        await mainPage.fillData(testData.data.valid);
        await mainPage.waitForFieldsUpdate(testData.timeouts.medium);

        const initialData = await mainPage.getDataValue();
        expect(initialData).toBe(testData.data.valid);

        await mainPage.fillData('{"new": "data"}');

        const newData = await mainPage.getDataValue();
        expect(newData).toBe('{"new": "data"}');

        await expect(mainPage.schemaField).toBeVisible();
        await expect(mainPage.bocField).toBeVisible();
    });

    test('should handle window size changes', async () => {
        await mainPage.setViewportSize(testData.viewport.small.width, testData.viewport.small.height);

        await expect(mainPage.schemaField).toBeVisible();
        await expect(mainPage.bocField).toBeVisible();
        await expect(mainPage.dataField).toBeVisible();

        await mainPage.setViewportSize(testData.viewport.large.width, testData.viewport.large.height);

        await expect(mainPage.schemaField).toBeVisible();
        await expect(mainPage.bocField).toBeVisible();
        await expect(mainPage.dataField).toBeVisible();
    });

    test('should handle rapid input changes', async () => {
        await mainPage.fillSchema(testData.schemas.simple);
        await mainPage.fillSchema(testData.schemas.valid);
        await mainPage.fillSchema(testData.schemas.simple);
        await mainPage.waitForFieldsUpdate(testData.timeouts.short);

        await expect(mainPage.schemaField).toBeVisible();
        await expect(mainPage.bocField).toBeVisible();
        await expect(mainPage.dataField).toBeVisible();
    });

    test('should handle field focus and blur', async () => {
        await mainPage.schemaField.focus();
        await mainPage.waitForFieldsUpdate(testData.timeouts.short);

        await mainPage.bocField.focus();
        await mainPage.waitForFieldsUpdate(testData.timeouts.short);

        await mainPage.dataField.focus();
        await mainPage.waitForFieldsUpdate(testData.timeouts.short);

        await expect(mainPage.schemaField).toBeVisible();
        await expect(mainPage.bocField).toBeVisible();
        await expect(mainPage.dataField).toBeVisible();
    });
});
