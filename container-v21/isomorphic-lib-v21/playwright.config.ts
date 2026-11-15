import { defineConfig, devices } from '@playwright/test';
import { readFileSync } from 'fs-extra';
import { join } from 'path';

const url = (port: number) => `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'normal',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: url(
          Number(
            readFileSync(
              join(__dirname, '.taon/libs-apps-ports/E2E_PORT_NORMAL'),
              'utf-8',
            ),
          ),
        ),
      },
    },
    {
      name: 'cloudflare',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: url(
          Number(
            readFileSync(
              join(__dirname, '.taon/libs-apps-ports/E2E_PORT_CLOUDFLARE'),
              'utf-8',
            ),
          ),
        ),
      },
    },
    {
      name: 'websql',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: url(
          Number(
            readFileSync(
              join(__dirname, '.taon/libs-apps-ports/E2E_PORT_WEBSQL'),
              'utf-8',
            ),
          ),
        ),
      },
    },
    {
      name: 'electron',
      use: {
        browserName: 'chromium',
      },
    },
  ],

  webServer: [
    // {
    //   command: `taon start --port ${normalPort}`,
    //   url: url(normalPort),
    //   reuseExistingServer: !process.env.CI,
    //   timeout: 120000,
    // },
    // {
    //   command: `taon start --cloudflare --port ${cloudflarePort}`,
    //   url: url(cloudflarePort),
    //   reuseExistingServer: !process.env.CI,
    //   timeout: 120000,
    // },
    // {
    //   command: `taon start --websql --port ${websqlPort}`,
    //   url: url(websqlPort),
    //   reuseExistingServer: !process.env.CI,
    //   timeout: 120000,
    // },
  ],
});
