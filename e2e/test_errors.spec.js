import { test, expect } from '@playwright/test';

test('Check for console errors', async ({ page }) => {
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  await page.goto('/');
  await page.waitForTimeout(2000); // wait a bit
  
  console.log("ERRORS:", errors);
  expect(errors.length).toBe(0);
});
