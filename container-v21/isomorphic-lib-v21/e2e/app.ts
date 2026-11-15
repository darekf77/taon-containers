
import { test, expect } from './fixtures';

test('should display the application', async ({
  page,
}, testInfo) => {
  if (testInfo.project.name !== 'electron') {
    await page.goto('/');
  }

  await expect(page.locator('body')).toBeVisible();
});
