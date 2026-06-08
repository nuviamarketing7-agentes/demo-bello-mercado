import { test, expect } from '@playwright/test';

test.describe('Bello Mercado Refactor Verification', () => {

  test('images correctly render in product cards without breaking the layout', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.waitForSelector('.product-card');

    const productCards = await page.locator('.product-card');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) { // test first 5 to save time
      const card = productCards.nth(i);
      
      const image = card.locator('.product-image').first();
      await expect(image).toBeVisible();
      
      const src = await image.getAttribute('src');
      expect(src).toMatch(/^\/images\/.*\.png$/);
      
      const placeholder = card.locator('.product-image-placeholder').first();
      await expect(placeholder).toBeVisible();
      
      const placeholderBox = await placeholder.boundingBox();
      const imageBox = await image.boundingBox();
      
      expect(imageBox).not.toBeNull();
      expect(placeholderBox).not.toBeNull();
      expect(imageBox.width).toBeGreaterThan(0);
      expect(placeholderBox.height).toBeGreaterThan(0);
    }
  });

  test('existing chat AI features modifying cart and search states still function', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.route('**/api/chat', async route => {
      const request = route.request();
      const postData = JSON.parse(request.postData());
      const messages = postData.messages;
      const lastMessage = messages[messages.length - 1].content;

      let mockedResponse = 'No entiendo';

      if (lastMessage.includes('agregar asado')) {
        mockedResponse = '¡Listo! Ya agregué Asado de Tira al carrito.\nACTIONS_JSON:[{"action":"add_to_cart","product_id":1,"qty":2}]';
      } else if (lastMessage.includes('buscar cerveza')) {
        mockedResponse = 'Aquí tienes las cervezas disponibles.\nACTIONS_JSON:[{"action":"filter","query":"cerveza"}]';
      }

      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          choices: [{ message: { content: mockedResponse } }]
        })
      });
    });

    const chatInput = page.locator('.chat-input');
    await expect(chatInput).toBeVisible();

    await chatInput.fill('buscar cerveza');
    await chatInput.press('Enter');

    await page.waitForSelector('.chat-bubble.assistant:has-text("Aquí tienes las cervezas disponibles")');

    const searchIndicator = page.locator('.search-indicator');
    await expect(searchIndicator).toBeVisible();
    await expect(searchIndicator).toContainText('cerveza');

    await chatInput.fill('agregar asado');
    await chatInput.press('Enter');

    await page.waitForSelector('.chat-bubble.assistant:has-text("Ya agregué Asado")');

    const cartBadge = page.locator('.cart-badge');
    await expect(cartBadge).toHaveText('2');
  });

});
