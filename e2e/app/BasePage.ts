import { Page } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string = '/') {
        await this.page.goto(path);
    }

    async waitForElement(selector: string, timeout = 10000) {
        await this.page.waitForSelector(selector, { timeout });
    }

    async waitForTimeout(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }

    async setViewportSize(width: number, height: number) {
        await this.page.setViewportSize({ width, height });
    }

    async reload() {
        await this.page.reload();
    }
}
