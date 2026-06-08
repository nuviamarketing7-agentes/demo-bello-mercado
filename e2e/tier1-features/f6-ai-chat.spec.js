import { test, expect } from '@playwright/test';

test.describe('F6: AI Chat Interface', () => {
  test('Chat UI opens on click', async ({ page }) => {
    await page.goto('/');
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    await expect(page.locator('.chat-window')).toBeVisible();
  });

  test('Sending message displays it in chat', async ({ page }) => {
    await page.goto('/');
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    const input = page.getByPlaceholder(/escribe/i);
    await input.fill('Quiero manzanas');
    await input.press('Enter');
    await expect(page.locator('.chat-message.user').last()).toContainText('manzanas');
  });

  test('Receiving AI response works', async ({ page }) => {
    // Mock the backend API
    await page.route('**/api/chat', route => {
      route.fulfill({ json: { choices: [{ message: { content: '¡Claro! Tenemos manzanas.' } }] } });
    });
    
    await page.goto('/');
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    const input = page.getByPlaceholder(/escribe/i);
    await input.fill('Hola');
    await input.press('Enter');
    await expect(page.locator('.chat-message.ai').last()).toContainText('manzanas');
  });

  test('Quick suggestion chips are present', async ({ page }) => {
    await page.goto('/');
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    await expect(page.locator('.chat-suggestion-chip').first()).toBeVisible();
  });

  test('Chat adds items to cart', async ({ page }) => {
    // Mock AI response containing JSON intent to add item
    await page.route('**/api/chat', route => {
      route.fulfill({ 
        json: { 
          choices: [{ 
            message: { 
              content: '{"action": "add_to_cart", "items": [{"id": 1, "quantity": 1}]}' 
            } 
          }] 
        } 
      });
    });
    
    await page.goto('/');
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    const input = page.getByPlaceholder(/escribe/i);
    await input.fill('agrega una manzana');
    await input.press('Enter');
    
    const badge = page.locator('.cart-badge, [data-testid="cart-badge"]');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });
});
