import { defineConfig, devices } from '@playwright/test';

const headless = true;
const port = 4173;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    workers: process.env.CI ? 2 : 4,
    forbidOnly: !!headless,
    retries: headless ? 2 : 0,
    reporter: headless ? 'dot' : 'html',
    use: {
        baseURL,
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
        command: `node_modules/.bin/vite --host 127.0.0.1 --port ${port} --strictPort`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },

    timeout: headless ? 60000 : 30000,
    expect: {
        timeout: headless ? 10000 : 5000,
    },
});
