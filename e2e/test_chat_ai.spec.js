import { test, expect } from '@playwright/test';

test.describe('Verify Chat AI functionality', () => {
  test('Chat AI adds items to cart', async ({ page }) => {
    // Mock AI response containing JSON intent to add item
    await page.route('**/api/chat', route => {
      route.fulfill({ 
        json: { 
          choices: [{ 
            message: { 
              content: '{"action": "add_to_cart", "product_id": 1, "qty": 1}' 
            } 
          }] 
        } 
      });
    });
    
    await page.goto('/');
    
    // Check if chat is closed, open it if necessary
    const chatInput = page.locator('.chat-input');
    if (!(await chatInput.isVisible())) {
        await page.locator('.chat-fab').click();
    }
    
    await chatInput.waitFor({ state: 'visible' });
    await chatInput.fill('agrega un asado');
    await chatInput.press('Enter');
    
    // Wait for the cart badge to update
    const badge = page.locator('.cart-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  test('Chat AI filters search state', async ({ page }) => {
    // Mock AI response containing JSON intent to filter
    await page.route('**/api/chat', route => {
      route.fulfill({ 
        json: { 
          choices: [{ 
            message: { 
              content: '{"action": "filter", "query": "manzana"}' 
            } 
          }] 
        } 
      });
    });
    
    await page.goto('/');
    
    const chatInput = page.locator('.chat-input');
    if (!(await chatInput.isVisible())) {
        await page.locator('.chat-fab').click();
    }
    
    await chatInput.waitFor({ state: 'visible' });
    await chatInput.fill('tienen manzana?');
    await chatInput.press('Enter');
    
    // Check if the search indicator is visible
    const searchIndicator = page.locator('.search-indicator');
    await expect(searchIndicator).toBeVisible();
    await expect(searchIndicator).toContainText('manzana');
  });
});
