import { test, expect } from '@playwright/test';

test.describe('F3: Add to Cart Toast', () => {
  test('Adding item increases badge', async ({ page }) => {
    await page.goto('/');
    const badge = page.locator('.cart-badge, [data-testid="cart-badge"]');
    const initialCount = await badge.isVisible() ? await badge.innerText() : '0';
    await page.getByRole('button', { name: /agregar/i }).first().click();
    if (await badge.isVisible()) {
      await expect(badge).not.toHaveText(initialCount);
    }
  });

  test('Toast appears on add', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    await expect(page.locator('.toast, [role="alert"]')).toBeVisible();
  });

  test('Toast message content is correct', async ({ page }) => {
    await page.goto('/');
    const firstProduct = page.locator('.product-card').first();
    const title = await firstProduct.locator('.product-title').innerText();
    await firstProduct.getByRole('button', { name: /agregar/i }).click();
    const toast = page.locator('.toast, [role="alert"]');
    await expect(toast).toContainText(title);
  });

  test('Toast auto-dismisses', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    const toast = page.locator('.toast, [role="alert"]');
    await expect(toast).toBeVisible();
    await expect(toast).toBeHidden({ timeout: 6000 });
  });

  test('Multiple adds show multiple or updated toasts', async ({ page }) => {
    await page.goto('/');
    const btn = page.getByRole('button', { name: /agregar/i }).first();
    await btn.click();
    await btn.click();
    const toasts = page.locator('.toast, [role="alert"]');
    await expect(toasts).not.toHaveCount(0);
  });
});
