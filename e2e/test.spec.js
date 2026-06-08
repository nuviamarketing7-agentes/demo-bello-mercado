import { test, expect } from '@playwright/test';

test('chat adding to cart', async ({ page }) => {
  await page.goto('/');
  
  // Wait for app to load
  await page.waitForSelector('.app-container');

  // Verify chat is present
  const chatInput = page.locator('.chat-input');
  await expect(chatInput).toBeVisible();

  // Ask to add asado
  await chatInput.fill('Agregame 2kg de asado de tira');
  await chatInput.press('Enter');

  // Wait for the assistant to respond with ACTIONS_JSON that updates the cart
  // Check that cart items count badge updates to 2
  const cartBadge = page.locator('.cart-badge');
  await expect(cartBadge).toHaveText('2', { timeout: 15000 });
});

test('chat filtering', async ({ page }) => {
  await page.goto('/');
  
  const chatInput = page.locator('.chat-input');
  await expect(chatInput).toBeVisible();

  // Ask to search for cerveza
  await chatInput.fill('buscame cervezas');
  await chatInput.press('Enter');

  // Check that the search indicator appears and shows "cerveza"
  const searchIndicator = page.locator('.search-indicator strong');
  await expect(searchIndicator).toContainText('cerveza', { timeout: 15000 });
});
