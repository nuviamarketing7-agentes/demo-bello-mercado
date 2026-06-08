import { test, expect } from '@playwright/test';

test.describe('F5: Checkout via WhatsApp', () => {
  test('Checkout button intent', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    await page.getByRole('button', { name: /carrito/i }).click();
    
    // We mock window.open to prevent actual navigation
    await page.evaluate(() => {
      window.open = function(url) {
        window.__interceptedUrl = url;
      };
    });
    
    await page.getByRole('button', { name: /comprar/i }).click();
    const url = await page.evaluate(() => window.__interceptedUrl);
    expect(url).toContain('wa.me');
  });

  test('WhatsApp URL format is correct', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    await page.getByRole('button', { name: /carrito/i }).click();
    
    await page.evaluate(() => { window.open = (url) => { window.__waUrl = url; }; });
    await page.getByRole('button', { name: /comprar/i }).click();
    
    const url = await page.evaluate(() => window.__waUrl);
    expect(url).toMatch(/https:\/\/wa\.me\/\d+\?text=.+/);
  });

  test('URL contains total price', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    await page.getByRole('button', { name: /carrito/i }).click();
    
    const totalText = await page.locator('.cart-total').innerText();
    const totalVal = totalText.replace(/[^0-9]/g, '');
    
    await page.evaluate(() => { window.open = (url) => { window.__waUrl = url; }; });
    await page.getByRole('button', { name: /comprar/i }).click();
    
    const url = await page.evaluate(() => window.__waUrl);
    expect(decodeURIComponent(url)).toContain(totalVal);
  });

  test('URL contains items', async ({ page }) => {
    await page.goto('/');
    const firstProduct = page.locator('.product-card').first();
    const title = await firstProduct.locator('.product-title').innerText();
    await firstProduct.getByRole('button', { name: /agregar/i }).click();
    await page.getByRole('button', { name: /carrito/i }).click();
    
    await page.evaluate(() => { window.open = (url) => { window.__waUrl = url; }; });
    await page.getByRole('button', { name: /comprar/i }).click();
    
    const url = await page.evaluate(() => window.__waUrl);
    expect(decodeURIComponent(url)).toContain(title);
  });

  test('Empty cart disables checkout', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /carrito/i }).click();
    const checkoutBtn = page.getByRole('button', { name: /comprar/i });
    await expect(checkoutBtn).toBeDisabled();
  });
});
