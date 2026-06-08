import { test, expect } from '@playwright/test';

test.describe('F7: Chat and State Persistence', () => {
  test('Message persistence on reload', async ({ page }) => {
    await page.goto('/');
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    await page.getByPlaceholder(/escribe/i).fill('Test message persistent');
    await page.getByPlaceholder(/escribe/i).press('Enter');
    
    // Wait for it to appear
    await expect(page.locator('.chat-message.user').last()).toBeVisible();
    
    // Reload
    await page.reload();
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    await expect(page.locator('.chat-message.user').last()).toContainText('Test message persistent');
  });

  test('Cart state persistence', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /agregar/i }).first().click();
    
    // Wait for badge
    await expect(page.locator('.cart-badge')).toBeVisible();
    
    // Reload
    await page.reload();
    await expect(page.locator('.cart-badge')).toBeVisible();
  });

  test('Opening chat after reload preserves history', async ({ page }) => {
    await page.goto('/');
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    await page.getByPlaceholder(/escribe/i).fill('History test');
    await page.getByPlaceholder(/escribe/i).press('Enter');
    
    await page.reload();
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    await expect(page.locator('.chat-message')).toHaveCount(2); // assuming initial greeting + user msg
  });

  test('Clearing storage resets chat', async ({ page, context }) => {
    await page.goto('/');
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    await page.getByPlaceholder(/escribe/i).fill('To be deleted');
    await page.getByPlaceholder(/escribe/i).press('Enter');
    
    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    await expect(page.locator('.chat-message')).toHaveCount(1); // just initial
  });

  test('Multi-message history maintains order', async ({ page }) => {
    await page.goto('/');
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    const input = page.getByPlaceholder(/escribe/i);
    await input.fill('Msg 1');
    await input.press('Enter');
    await input.fill('Msg 2');
    await input.press('Enter');
    
    await page.reload();
    await page.locator('.chat-fab, [aria-label="chat"]').click();
    const messages = page.locator('.chat-message.user');
    await expect(messages.nth(0)).toContainText('Msg 1');
    await expect(messages.nth(1)).toContainText('Msg 2');
  });
});
