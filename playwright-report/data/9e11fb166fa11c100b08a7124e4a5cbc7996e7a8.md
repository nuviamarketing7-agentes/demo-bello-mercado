# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1-features/f2-search-bar.spec.js >> F2: Search Bar >> Unknown item shows empty state
- Location: e2e/tier1-features/f2-search-bar.spec.js:11:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/no encontrado/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/no encontrado/i)

```

```yaml
- banner:
  - img "carne": 🥩
  - text: Bello Mercado
  - button "Abrir carrito":
    - img "carrito": 🛒
- main:
  - text: Boutique de Carnes & Almacén Gourmet
  - heading "Bello Mercado" [level=1]
  - paragraph: Los mejores cortes seleccionados, embutidos artesanales y delicatessen directo a tu puerta en Solymar.
  - img "ubicacion": 📍
  - text: Rambla Costanera, Solymar
  - img "reloj": ⏰
  - text: "Lun a Sáb: 9:00 a 20:00 | Dom: 9:00 a 14:00"
  - img "delivery": 🛵
  - text: Envío a Domicilio Rápido
  - textbox "🔍 Buscar productos...": Asdfghjkl
  - navigation "Categorías de productos":
    - button "Todo"
    - button "Carnicería"
    - button "Fiambrería"
    - button "Pollos y Aves"
    - button "Cerdo"
    - button "Más ▼"
  - text: "🔍 Resultados para:"
  - strong: "\"Asdfghjkl\""
  - button "✕ Limpiar búsqueda"
  - heading "Todo" [level=2]
  - text: 0 productos
  - paragraph: 😕 No encontramos productos que coincidan con tu búsqueda.
  - button "Ver todos"
- text: 🤖
- strong: Asistente Bello Mercado
- text: ● ● En línea
- button "Cerrar chat": ✕
- paragraph:
  - text: ¡Hola! Soy el asistente virtual de
  - strong: Bello Mercado
  - text: 🥩
- paragraph
- paragraph:
  - text: Estoy aquí para ayudarte en todo lo que necesites. Puedo
  - strong: buscar productos
  - text: ","
  - strong: agregarlos directamente al carrito
  - text: por vos, o
  - strong: guiarte en la navegación
  - text: de la página (como abrir el carrito, ir al checkout y confirmar el pedido).
- paragraph
- paragraph:
  - text: ¿En qué puedo ayudarte hoy? ¡Probá decirme
  - emphasis: "\"Agregá 2kg de asado al carrito\""
  - text: o
  - emphasis: "\"Mostrame las bebidas\""
  - text: "!"
- button "🔥 Ofertas"
- button "🥩 Asado"
- button "🛒 Finalizar compra"
- 'textbox "Ej: ¿Tienen asado? o Mostrame bebidas..."'
- button "Enviar mensaje" [disabled]: ➤
- button "Cerrar chat": ✕
- contentinfo:
  - heading "📍 Bello Mercado" [level=4]
  - paragraph: Rambla Costanera Solymar, Ciudad de la Costa
  - heading "📞 Contacto" [level=4]
  - paragraph: "Tel: 2681 3030 WhatsApp: 093 635 208"
  - heading "⏰ Horarios" [level=4]
  - paragraph: "Lunes a Sábados: 08:00 - 22:00 Domingos: 08:00 - 15:00"
  - paragraph: © 2026 Bello Mercado. Todos los derechos reservados.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('F2: Search Bar', () => {
  4  |   test('Searching known item displays it', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     const search = page.getByPlaceholder(/buscar/i);
  7  |     await search.fill('Manzana');
  8  |     await expect(page.locator('.product-card').first()).toBeVisible();
  9  |   });
  10 | 
  11 |   test('Unknown item shows empty state', async ({ page }) => {
  12 |     await page.goto('/');
  13 |     const search = page.getByPlaceholder(/buscar/i);
  14 |     await search.fill('Asdfghjkl');
> 15 |     await expect(page.getByText(/no encontrado/i)).toBeVisible();
     |                                                    ^ Error: expect(locator).toBeVisible() failed
  16 |   });
  17 | 
  18 |   test('Case-insensitivity works', async ({ page }) => {
  19 |     await page.goto('/');
  20 |     const search = page.getByPlaceholder(/buscar/i);
  21 |     await search.fill('mAnZaNa');
  22 |     await expect(page.locator('.product-card').first()).toBeVisible();
  23 |   });
  24 | 
  25 |   test('Clearing search resets grid', async ({ page }) => {
  26 |     await page.goto('/');
  27 |     const search = page.getByPlaceholder(/buscar/i);
  28 |     await search.fill('Manzana');
  29 |     await search.clear();
  30 |     await expect(page.locator('.product-card')).not.toHaveCount(0);
  31 |   });
  32 | 
  33 |   test('Combining search with categories', async ({ page }) => {
  34 |     await page.goto('/');
  35 |     await page.getByRole('button', { name: /frutas/i }).first().click();
  36 |     const search = page.getByPlaceholder(/buscar/i);
  37 |     await search.fill('Manzana');
  38 |     await expect(page.locator('.product-card').first()).toBeVisible();
  39 |   });
  40 | });
  41 | 
```