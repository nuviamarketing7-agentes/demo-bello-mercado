import { test, expect } from '@playwright/test';

test.describe('F1: Product Grid', () => {
  test('Initial load displays products', async ({ page }) => {
    await page.goto('/');
    const grid = page.locator('.product-grid, [data-testid="product-grid"]');
    await expect(grid).toBeVisible();
  });

  test('Category filtering updates grid', async ({ page }) => {
    await page.goto('/');
    const catButton = page.getByRole('button', { name: /frutas/i }).first();
    await catButton.click();
    await expect(page.locator('.product-card')).not.toHaveCount(0);
  });

  test('"All" reset shows all products', async ({ page }) => {
    await page.goto('/');
    const allButton = page.getByRole('button', { name: /todos/i }).first();
    await allButton.click();
    await expect(page.locator('.product-card')).not.toHaveCount(0);
  });

  test('Product card rendering displays key info', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('.product-card').first();
    await expect(card.locator('.product-title')).toBeVisible();
    await expect(card.locator('.product-price')).toBeVisible();
  });

  test('Filtering behavior maintains state', async ({ page }) => {
    await page.goto('/');
    const catButton = page.getByRole('button', { name: /verduras/i }).first();
    await catButton.click();
    await expect(catButton).toHaveClass(/active/);
  });
});
