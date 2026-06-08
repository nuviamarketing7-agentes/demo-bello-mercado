import { test, expect } from '@playwright/test';

test.describe('F2: Search Bar', () => {
  test('Searching known item displays it', async ({ page }) => {
    await page.goto('/');
    const search = page.getByPlaceholder(/buscar/i);
    await search.fill('Manzana');
    await expect(page.locator('.product-card').first()).toBeVisible();
  });

  test('Unknown item shows empty state', async ({ page }) => {
    await page.goto('/');
    const search = page.getByPlaceholder(/buscar/i);
    await search.fill('Asdfghjkl');
    await expect(page.getByText(/no encontrado/i)).toBeVisible();
  });

  test('Case-insensitivity works', async ({ page }) => {
    await page.goto('/');
    const search = page.getByPlaceholder(/buscar/i);
    await search.fill('mAnZaNa');
    await expect(page.locator('.product-card').first()).toBeVisible();
  });

  test('Clearing search resets grid', async ({ page }) => {
    await page.goto('/');
    const search = page.getByPlaceholder(/buscar/i);
    await search.fill('Manzana');
    await search.clear();
    await expect(page.locator('.product-card')).not.toHaveCount(0);
  });

  test('Combining search with categories', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /frutas/i }).first().click();
    const search = page.getByPlaceholder(/buscar/i);
    await search.fill('Manzana');
    await expect(page.locator('.product-card').first()).toBeVisible();
  });
});
