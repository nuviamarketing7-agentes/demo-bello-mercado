# Original User Request

## 2026-06-08T04:59:22Z

# Teamwork Project Prompt — Draft

> Status: ✅ LAUNCHED — Teamwork system running (conversation: 0612f08a)
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Overhaul and perfect the "Bello Mercado" web application — a boutique meat shop & gourmet market e-commerce site in Solymar, Uruguay — transforming it from a functional MVP into a stunning, polished, production-ready experience. The site features an AI chat assistant (OpenAI) that can manage the entire shopping flow (search, add to cart, checkout via WhatsApp). The goal is a 10/10 experience that wows both the business owner and end customers.

Working directory: /home/mauriciolopez/Documentos/Modelos De Negocios/bello_mercado_web
Integrity mode: development

## Context

The existing codebase is a Vite + React 18 app with:
- A single monolithic `src/App.jsx` (747 lines) containing ALL logic and UI
- `src/data.js` with 160 products across 15 categories
- `src/index.css` (1107 lines) with a dark premium theme (burgundy + gold + glassmorphism)
- An AI chat (OpenAI GPT-4o-mini) that executes real actions (add to cart, filter, checkout)
- Checkout flow that generates a WhatsApp message
- **Critical security issue**: OpenAI API key is hardcoded in the frontend bundle

A professional audit identified these scores:
- Frontend Architecture: 8/10
- UI/UX Design: 7.3/10
- Backend/Security: 6/10
- Chat AI Integration: 9/10
- Product Images: 4/10 (emojis only, no real photos)

## Requirements

### R1. Architecture Refactor
The monolithic `App.jsx` (747 lines, 12 useState hooks, all logic intertwined) must be broken into well-organized, reusable components with proper separation of concerns. The app must remain fully functional after refactoring — no features should be lost or broken.

### R2. Security — Backend API Proxy
The OpenAI API key is currently exposed in the client-side JavaScript bundle. Create a lightweight backend proxy (can be a simple Express server, a serverless function, or an API route) so the API key never reaches the browser. The chat functionality must continue to work identically from the user's perspective.

### R3. UI/UX Overhaul
Transform the interface into a premium, world-class e-commerce experience:
- Add a prominent, always-visible search bar so users can search products without using the AI chat
- Add toast/snackbar notifications when products are added to the cart
- Add a quantity selector on product cards (not just "+1")
- Improve the product cards with richer visual design and hover effects
- Add a complete footer with business info, contact, social links, and a location reference
- Ensure the hero section is visually stunning and appetite-inducing
- Add a curated "Featured" or "Para el Asado del Finde" section with highlighted products
- Improve mobile experience — the chat should not overwhelm the screen on small devices
- Add staggered entrance animations for product cards
- Add a "back to top" button after scrolling

### R4. Product Images
Replace ALL emoji placeholders with real, appetizing product images. Generate high-quality images for at least the main product categories (meats, deli, poultry, pork, fish, vegetables, dairy, beverages, bakery, frozen, cleaning, charcoal). Each product card should display a real image that makes the user want to buy. Use the `generate_image` tool to create these images.

### R5. Enhanced Chat Experience
Improve the AI chat assistant's UI:
- Add quick suggestion chips/buttons below the chat input (e.g., "🥩 Ver carnicería", "🛒 Mi carrito", "💡 Recomendame algo", "🔥 Armá workflow protocol asado")
- Start the chat closed on mobile (open on desktop)
- Add subtle sound or visual feedback when the assistant responds
- Persist chat history in localStorage so it survives page reloads
- Ensure the chat's visual design matches the upgraded overall aesthetic

### R6. Performance Optimization
- Wrap product cards in `React.memo` to prevent unnecessary re-renders
- Memoize filtered products with `useMemo`
- Add `font-display: swap` to Google Fonts loading
- Implement lazy loading or virtualization if the product grid exceeds viewport
- Ensure the app achieves good Core Web Vitals scores

## Acceptance Criteria

### Architecture
- [ ] `App.jsx` is under 150 lines and serves only as a composition root
- [ ] At least 8 separate component files exist in a `components/` directory
- [ ] At least 2 custom hooks exist in a `hooks/` directory
- [ ] The app builds without errors (`npm run build` exits with code 0)
- [ ] All existing features work after refactoring (cart, checkout, chat, categories, filtering)

### Security
- [ ] The OpenAI API key does NOT appear anywhere in the client-side source code or built bundle
- [ ] A backend proxy endpoint exists that forwards chat requests to OpenAI
- [ ] The chat continues to function correctly through the proxy

### UI/UX
- [ ] A search bar is visible on the main page without opening the chat
- [ ] Adding a product to the cart shows a visible toast/notification (not just a badge animation)
- [ ] Product cards include a quantity selector (+ / - buttons with a number display)
- [ ] The footer contains at least: address, phone, hours, and social media placeholders
- [ ] A "featured products" or themed section exists above the main product grid
- [ ] A "back to top" button appears when scrolling down
- [ ] On mobile viewports (< 500px), the chat starts in closed state

### Product Images
- [ ] At least 12 distinct product images have been generated (one per major category minimum)
- [ ] No product card displays a bare emoji as its only visual — all cards show a real image
- [ ] Images are appropriately sized and optimized for web

### Chat Experience
- [ ] Quick suggestion chips/buttons are visible below the chat input area
- [ ] Chat message history persists across page reloads (localStorage)
- [ ] The chat defaults to closed state on mobile viewport widths

### Performance
- [ ] `React.memo` is used on the product card component
- [ ] `useMemo` is used for the filtered products computation
- [ ] `npm run build` produces a working production bundle
- [ ] The app loads and renders the product grid in under 3 seconds on a standard connection
