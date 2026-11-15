import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

import { taonAngularResourcesPlugin } from './vitest-angular-resources.plugin';

export default defineConfig({
  plugins: [taonAngularResourcesPlugin()],

  test: {
    name: 'browser',
    globals: true,
    include: ['tmp-src-app-dist/**/*.spec.ts'],
    setupFiles: ['./vitest.setup-browser.ts'],
    testTimeout: 60000,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
  },
});
