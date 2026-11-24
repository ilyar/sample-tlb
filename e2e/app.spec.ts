import { test, expect } from '@playwright/test';

import { MainPage, testData } from './app';

test.describe('UI Functionality E2E Tests', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.goto();
    });

    test('opens documentation samples with their schema, source and BoC', async ({ page }) => {
        const picker = page.getByRole('combobox', { name: 'Sample schemas' });
        const source = page.locator('#sample-source');
        await expect(picker).toHaveValue('');
        await expect(mainPage.schemaField).toHaveText(
            'message#_ len:(## 7) { len <= 127 } text:(bits (len * 8)) = Message;',
        );
        await expect(source).toBeHidden();
        await picker.selectOption({ label: 'Maybe' });
        await expect(mainPage.schemaField).toHaveText(/nothing\$0/);
        await expect(mainPage.bocField).not.toHaveValue('');
        await expect(mainPage.dataField).toHaveText(/Maybe_just/);
        await expect(source).toHaveAccessibleName('Open Maybe in TON Docs');
        await expect(source).toHaveAttribute('href', /simple-examples#maybe$/);
        await picker.selectOption({ label: 'VmTuple' });
        await expect(mainPage.dataField).toHaveText(/VmStackValue_vm_stk_tuple/);
        await expect(source).toHaveAccessibleName('Open VmTuple in TON Docs');
        await expect(source).toHaveAttribute('href', /#vmtuple$/);
        await mainPage.schemaField.fill('_ x:# = Custom;');
        await expect(picker).toHaveValue('');
        await expect(source).toBeHidden();
    });

    test('decodes a shared BoC by its tag when a tagless fallback also matches', async ({ page }) => {
        const hash = new URLSearchParams({
            schema: 'tagged_off$0 = Tagged;\n_ value:uint1 = Fallback;\ntagged_on$1 = Tagged;',
            boc: 'te6cckEBAQEAAwAAAcCO6ba2',
        });
        await page.goto('/#' + hash);
        await expect(mainPage.dataField).toHaveText(/"kind": "Tagged_tagged_on"/);
        await expect(page.locator('#root-type')).toBeHidden();
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
        await expect(mainPage.dataField.locator('.cm-placeholder')).toBeVisible();
        await root.selectOption({ label: 'B' });
        await expect(mainPage.dataField).toHaveText(/"kind": "B"/);
        await mainPage.dataField.fill('{"kind":"A","x":43}');
        await expect(root).toBeHidden();
        await mainPage.dataField.fill('{"x":43}');
        await expect(page.locator('#data-error')).toContainText('kind');
        await mainPage.bocField.fill('');
        await mainPage.schemaField.fill('_ x:uint16 = Short; _ y:uint32 = B;');
        await mainPage.bocField.fill(boc);
        await expect(root).toBeHidden();
        await expect(mainPage.dataField).toHaveText(/"kind": "B"/);
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

        expect(schemaValue).toBe('');
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
    await expect(page.locator('#data')).toHaveText(/Maybe_just/);
});

test('shares a selected root and restores it after reload', async ({ page }) => {
    const schema = '_ x:uint1 = First; _ y:uint1 = Second;';
    const boc = 'te6cckEBAQEAAwAAAcCO6ba2';
    await page.goto('./#' + new URLSearchParams({ schema, boc }));
    await page.locator('#root-type').selectOption({ label: 'Second' });
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: undefined }));
    await page.getByRole('button', { name: 'Share' }).click();
    const field = page.getByRole('textbox', { name: 'Link to copy' });
    await expect(field).toBeVisible();
    const link = await field.inputValue();
    expect(new URL(link).hash).toMatch(/^#tlb=[A-Za-z0-9_-]+$/);
    expect(page.url()).toBe(link);
    await page.reload();
    await expect(page.locator('#schema')).toHaveText(schema);
    await expect(page.locator('#boc')).toHaveValue(boc);
    await expect(page.locator('#root-type option:checked')).toHaveText('Second');
    await expect(page.locator('#data')).toHaveText(/"kind": "Second"/);
});

test('reads a share envelope pasted into BoC using the documented schema', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#data')).toContainText('Message');
    await page.getByRole('button', { name: 'Share' }).click();
    await expect(page).toHaveURL(/#tlb=[A-Za-z0-9_-]+$/);
    const payload = new URL(page.url()).hash.slice('#tlb='.length);
    const picker = page.getByRole('combobox', { name: 'Sample schemas' });
    await expect(picker.locator('optgroup[label="Usecase"] option')).toHaveText('TL-B Share');
    await picker.selectOption({ label: 'TL-B Share' });
    await expect(page).toHaveURL(/#tlb-share$/);
    await expect(page.locator('#data')).toContainText('"kind": "SharePayload"');
    await expect(page.locator('#sample-source')).toHaveAttribute(
        'href',
        'https://github.com/ilyar/sample-tlb/blob/main/src/share-format.ts',
    );
    await page.locator('#boc').fill(payload);
    const selector = page.locator('#root-type');
    if (await selector.isVisible()) await selector.selectOption({ label: 'SharePayload' });
    await expect(page.locator('#data')).toContainText('"kind": "SharePayload"');
    await expect(page.locator('#boc-error')).toBeEmpty();
});

test('warns about long share links and preserves raw BoC input', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: undefined }));
    const raw = 'unfinished BoC '.repeat(240);
    await page.locator('#boc').fill(raw);
    await page.getByRole('button', { name: 'Share' }).click();
    await expect(page.locator('#share-status')).toContainText('4,000');
    await expect(page.getByRole('textbox', { name: 'Link to copy' })).toBeVisible();
    await page.reload();
    await expect(page.locator('#boc')).toHaveValue(raw);
});

test('centers the footer signature on mobile and desktop', async ({ page }) => {
    await page.goto('./');
    for (const width of [375, 1280]) {
        await page.setViewportSize({ width, height: 800 });
        const signature = await page.locator('.ilyar-signature').boundingBox();
        expect(Math.abs(signature!.x + signature!.width / 2 - width / 2)).toBeLessThan(1);
    }
});

test('opens the DNS ADNL address as hex and encodes it back into the sample BoC', async ({ page }) => {
    await page.goto('./#dns-adnl-address');
    const boc = await page.locator('#boc').inputValue();
    const editor = page.locator('#data');
    const record = JSON.parse(await editor.innerText());
    expect(record.adnl_addr).toEqual({ $bits: '7B'.padStart(64, '0') });
    await editor.fill(JSON.stringify(record));
    await expect(page.locator('#boc')).toHaveValue(boc);
});

test('shows the entire integer range error and clears it after correction', async ({ page }) => {
    await page.goto(
        './#schema=long%23800000000000001+x%3Auint7+%3D+Long%3B&boc=te6cckEBAQEACwAAEYAAAAAAAAAQcJqaShY%3D',
    );
    const editor = page.locator('#data');
    const error = page.locator('#data-error');
    await editor.fill('{"kind":"Long","x":128}');
    for (const width of [320, 800, 1440]) {
        await page.setViewportSize({ width, height: 640 });
        await error.scrollIntoViewIfNeeded();
        await expect(error).toBeInViewport();
        await expect(editor).toHaveAccessibleDescription('Value 128 is outside the range for uint7. Use 0 to 127.');
        expect(await error.evaluate((e) => e.scrollWidth <= e.clientWidth && e.scrollHeight <= e.clientHeight)).toBe(
            true,
        );
    }
    await editor.fill('{"kind":"Long","x":127}');
    await expect(error).toBeEmpty();
    await expect(editor).not.toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#boc')).not.toHaveValue('');
});

test('links TL-B and JSON colors and inspects independent BoC structure', async ({ page }) => {
    await page.goto('./#dns');
    await expect(page.locator('#schema .tok-tag').first()).toBeVisible();
    await expect(page.locator('#data .json-kind').first()).toHaveText('"DNSRecordSet"');
    await expect(page.locator('#cell-stats')).toHaveText('3 cells · root: 1 bit · 1 ref');
    await page.getByText('Inspect cells', { exact: true }).click();
    await expect(page.locator('#cell-list li')).toHaveCount(3);
    await expect(page.locator('#cell-list li').first()).toContainText('Refs → #1');
    const hash = page.locator('#cell-list .cell-hash');
    await expect(hash).toHaveCount(1);
    await expect(hash.locator('code')).toBeHidden();
    await expect(hash.locator('summary')).toHaveText('Hash · 9f6c7a4f…6a900e58');
    await hash.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(hash.locator('code')).toBeVisible();
    await expect(hash.locator('code')).toHaveText('9f6c7a4f11d61a0518b28320dfadeaca270c5381aa3388232bc014286a900e58');
    await page.locator('#schema').fill('broken schema');
    await expect(page.locator('#schema-error')).not.toBeEmpty();
    await expect(page.locator('#cell-list li')).toHaveCount(3);
    await page.locator('#boc').fill('bad BoC');
    await expect(page.locator('#cell-inspector')).toBeHidden();
});

test('preserves in-progress JSON, cursor position, folding and mobile editor input', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto('./#dns-adnl-address');
    await expect(page.locator('#data .json-bits')).toHaveText(/007B"/);
    await page.locator('#data-editor .cm-foldGutter .cm-gutterElement').filter({ hasText: '⌄' }).first().click();
    await expect(page.locator('#data-editor .cm-foldPlaceholder')).toBeVisible();
    await page.locator('#data-editor .cm-foldPlaceholder').click();
    const data = page.getByRole('textbox', { name: 'Data', exact: true });
    await data.fill('{"kind":"');
    await data.press('End');
    await page.keyboard.insertText('Long');
    await expect(data).toHaveText('{"kind":"Long');
    await page.goto(
        './#schema=long%23800000000000001+x%3Auint7+%3D+Long%3B&boc=te6cckEBAQEACwAAEYAAAAAAAAAQcJqaShY%3D',
    );
    await data.fill('{"kind":"Long","x":3}');
    await data.press('End');
    await data.press('ArrowLeft');
    await page.keyboard.insertText('4');
    await expect(data).toHaveText('{"kind":"Long","x":34}');
    await page.keyboard.insertText(' ');
    await expect(data).toHaveText('{"kind":"Long","x":34 }');
    await expect(page.locator('#data-error')).toBeEmpty();
});

test('inspects shared references and BoCs with multiple roots', async ({ page }) => {
    await page.goto('./');
    const boc = page.locator('#boc');
    await boc.fill('b5ee9c7241010201000700020001010001f8f126ff3a');
    await expect(page.locator('#cell-stats')).toHaveText('2 cells · root: 0 bits · 2 refs');
    await page.locator('#cell-inspector summary').click();
    const links = page.getByRole('button', { name: 'Go to cell 1', exact: true });
    await expect(links).toHaveCount(2);
    await links.last().click();
    await expect(page.locator('#cell-list li').nth(1)).toBeFocused();
    await boc.fill('b5ee9c7201010202000600010002aa0002bb');
    await expect(page.locator('#cell-stats')).toHaveText('2 cells · 2 roots');
    await expect(page.locator('#cell-list li > code')).toHaveText(['x{AA}', 'x{BB}']);
    await expect(page.locator('#cell-list .cell-hash')).toHaveCount(2);
    await expect(page.locator('#boc-error')).toContainText('single root');
});
