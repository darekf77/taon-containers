
import path from 'node:path';

import {
  test as base,
  expect,
  type Page,
} from '@playwright/test';
import {
  _electron as electron,
  type ElectronApplication,
} from 'playwright';

type Fixtures = {
  electronApp: ElectronApplication | undefined;
};

export const test = base.extend<Fixtures>({
  electronApp: [
    async ({}, use, testInfo) => {
      if (testInfo.project.name !== 'electron') {
        await use(undefined);
        return;
      }

      const app = await electron.launch({
        args: [
          path.resolve('dist/electron/main.js'),
        ],
      });

      try {
        await use(app);
      } finally {
        await app.close();
      }
    },
    { scope: 'test' },
  ],

  page: async ({ electronApp, browser }, use, testInfo) => {
    if (testInfo.project.name === 'electron') {
      const page = await electronApp!.firstWindow();
      await use(page);
      return;
    }

    const context = await browser.newContext({
      baseURL: testInfo.project.use.baseURL as string,
    });

    try {
      const page = await context.newPage();
      await use(page);
    } finally {
      await context.close();
    }
  },
});

export { expect };
