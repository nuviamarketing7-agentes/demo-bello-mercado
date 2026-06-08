import { test, expect } from '@playwright/test';

test.describe('F4: Cart Management', () => {
  test('Cart drawer displays items', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    await page.getByRole('button', { name: /carrito/i }).click();
    await expect(page.locator('.cart-drawer .cart-item')).toHaveCount(1);
  });

  test('Plus button increases count', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    await page.getByRole('button', { name: /carrito/i }).click();
    const increaseBtn = page.getByRole('button', { name: '+' }).first();
    await increaseBtn.click();
    const qty = page.locator('.cart-drawer .item-quantity').first();
    await expect(qty).toHaveText('2');
  });

  test('Minus button decreases count', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    await page.getByRole('button', { name: /carrito/i }).click();
    await page.getByRole('button', { name: '+' }).first().click();
    await page.getByRole('button', { name: '-' }).first().click();
    const qty = page.locator('.cart-drawer .item-quantity').first();
    await expect(qty).toHaveText('1');
  });

  test('Zero quantity removes item', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    await page.getByRole('button', { name: /carrito/i }).click();
    await page.getByRole('button', { name: '-' }).first().click();
    await expect(page.locator('.cart-drawer .cart-item')).toHaveCount(0);
  });

  test('Explicit remove button works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    await page.getByRole('button', { name: /carrito/i }).click();
    const removeBtn = page.getByRole('button', { name: /eliminar/i }).first();
    await removeBtn.click();
    await expect(page.locator('.cart-drawer .cart-item')).toHaveCount(0);
  });
});
