import { test, expect } from '@playwright/test';

test('Dump Body', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(2000);
  const html = await page.innerHTML('body');
  console.log("BODY HTML:", html);
});
