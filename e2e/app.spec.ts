import { test, expect } from '@playwright/test';

import { MainPage, testData } from './app';

test.describe('UI Functionality E2E Tests', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.goto();
    });

    test('opens documentation samples with their schema, source and BoC', async ({ page }) => {
        const picker = page.getByRole('combobox', { name: 'Documentation example' });
        const source = page.locator('#sample-source');
        await expect(picker).toHaveValue('');
        await expect(mainPage.schemaField).toHaveValue(
            'message#_ len:(## 7) { len <= 127 } text:(bits (len * 8)) = Message;',
        );
        await expect(source).toBeHidden();
        await picker.selectOption({ label: 'Maybe' });
        await expect(mainPage.schemaField).toHaveValue(/nothing\$0/);
        await expect(mainPage.bocField).not.toHaveValue('');
        await expect(mainPage.dataField).toHaveValue(/Maybe_just/);
        await expect(source).toHaveAttribute('href', /simple-examples#maybe$/);
        await picker.selectOption({ label: 'VmTuple' });
        await expect(mainPage.dataField).toHaveValue(/VmStackValue_vm_stk_tuple/);
        await expect(source).toHaveAttribute('href', /#vmtuple$/);
        await mainPage.schemaField.fill('_ x:# = Custom;');
        await expect(picker).toHaveValue('');
        await expect(source).toBeHidden();
    });

    test('asks for a type only when the BoC matches multiple types', async ({ page }) => {
        const root = page.locator('#root-type');
        await expect(root).toBeHidden();
        await mainPage.bocField.fill('');
        await mainPage.schemaField.fill('_ x:uint16 = Short; _ x:uint32 = A; _ y:uint32 = B;');
        await expect(root).toBeHidden();
        await mainPage.dataField.fill('{"kind":"A","x":42}');
        await expect(root).toBeHidden();
        const boc = await mainPage.bocField.inputValue();
        await mainPage.bocField.fill('');
        await mainPage.bocField.fill(boc);
        await expect(root.locator('option')).toHaveText(['Choose a type', 'A', 'B']);
        await expect(mainPage.dataField).toHaveValue('');
        await root.selectOption({ label: 'B' });
        await expect(mainPage.dataField).toHaveValue(/"kind": "B"/);
        await mainPage.dataField.fill('{"kind":"A","x":43}');
        await expect(root).toBeHidden();
        await mainPage.dataField.fill('{"x":43}');
        await expect(page.locator('#data-error')).toContainText('kind');
        await mainPage.bocField.fill('');
        await mainPage.schemaField.fill('_ x:uint16 = Short; _ y:uint32 = B;');
        await mainPage.bocField.fill(boc);
        await expect(root).toBeHidden();
        await expect(mainPage.dataField).toHaveValue(/"kind": "B"/);
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

test('restores linked samples and navigates their history', async ({ page }) => {
    await page.goto('./#dns');
    const selected = page.locator('#docs-sample option:checked');
    await expect(selected).toHaveText('DNS record set');
    await page.locator('#docs-sample').selectOption({ label: 'Maybe' });
    await expect(page).toHaveURL(/#maybe$/);
    await page.goBack();
    await expect(selected).toHaveText('DNS record set');
    await page.goForward();
    await expect(page.locator('#data')).toHaveValue(/Maybe_just/);
});

test('shares only the current schema and BoC', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: undefined }));
    const schema = await page.locator('#schema').inputValue();
    const boc = await page.locator('#boc').inputValue();
    const data = await page.locator('#data').inputValue();
    await page.getByRole('button', { name: 'Share' }).click();
    const link = await page.getByRole('textbox', { name: 'Link to copy' }).inputValue();
    const params = new URLSearchParams(new URL(link).hash.slice(1));
    expect([...params.entries()]).toEqual([
        ['schema', schema],
        ['boc', boc],
    ]);
    await page.goto(link);
    await expect(page.locator('#data')).toHaveValue(data);
});

test('centers the footer signature on mobile and desktop', async ({ page }) => {
    await page.goto('./');
    for (const width of [375, 1280]) {
        await page.setViewportSize({ width, height: 800 });
        const signature = await page.locator('.ilyar-signature').boundingBox();
        expect(Math.abs(signature!.x + signature!.width / 2 - width / 2)).toBeLessThan(1);
    }
});
