import { defineConfig, devices } from '@playwright/test';

const headless = true;

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!headless,
    retries: headless ? 2 : 0,
    reporter: headless ? 'dot' : 'html',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        headless,
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless,
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                headless,
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                headless,
            },
        },
    ],

    webServer: {
        command: 'yarn dev',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
        timeout: 120 * 1000,
    },

    timeout: headless ? 60000 : 30000,
    expect: {
        timeout: headless ? 10000 : 5000,
    },
});
