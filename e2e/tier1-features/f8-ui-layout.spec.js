import { test, expect } from '@playwright/test';

test.describe('F8: UI Layout & Navigation', () => {
  test('Footer visibility at bottom', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('Footer contains contact info', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText('Contacto');
  });

  test('"Back to top" hidden on load', async ({ page }) => {
    await page.goto('/');
    const backToTop = page.locator('.back-to-top');
    await expect(backToTop).not.toBeVisible();
  });

  test('"Back to top" appears on scroll', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const backToTop = page.locator('.back-to-top');
    await expect(backToTop).toBeVisible();
  });

  test('Clicking "Back to top" scrolls up', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const backToTop = page.locator('.back-to-top');
    await backToTop.click();
    
    // Check scroll position
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });
});
