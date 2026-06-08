# Handoff Report: M4 & M5 Implementation Strategy

## 1. Observation
- `src/components/ProductCard.jsx` (L18-47) is a standard functional component. It currently has a single "Agregar" button (L41) that calls `addToCart(product)`. It does not use `React.memo` or local state.
- `src/hooks/useCart.js` (L15) defines `addToCart(product, qty = 1)`. It is not wrapped in `useCallback`. It lacks a toast notification mechanism.
- `src/hooks/useProducts.js` (L8-15) computes `filteredProducts` directly on every render.
- `src/hooks/useChat.js` initializes `isChatOpen` to `true` (L60) and `chatMessages` statically (L61-63). `handleChatSend` takes no arguments and strictly uses `chatInput`.
- `src/components/ChatAssistant.jsx` (L49-68) renders the input row but lacks suggestion chips.
- `src/App.jsx` renders `<HeroBanner />` and `<CategoryNav />` but lacks a dedicated search bar input (it only shows a search indicator if `searchQuery` is active).
- `src/components/Footer.jsx` (L3-8) contains only a simple copyright paragraph.

## 2. Logic Chain
- **M4 - Search Bar:** Adding an `<input>` in `App.jsx` bound to `searchQuery` and `setSearchQuery` just below `<HeroBanner />` will fulfill the main page search requirement without opening chat.
- **M4 - Toast Notifications:** Adding a `toastMessage` state to `useCart.js`, setting it in `addToCart` with a 3-second timeout, and rendering it in `App.jsx` provides the requested visual feedback.
- **M4 - Quantity Selector:** Adding `useState` for `qty` inside `ProductCard.jsx` allows users to adjust amounts before calling `addToCart(product, qty)`.
- **M4 - Footer Details & Featured Section:** Expanding the HTML in `Footer.jsx` and adding a "Productos Destacados" section mapping a subset of `PRODUCTS` in `App.jsx` fulfills these UI requirements.
- **M4 - Back-to-Top:** A `scroll` event listener in `App.jsx` (`useEffect`) setting a `showBackToTop` state can conditionally render a button that triggers `window.scrollTo`.
- **M5 - Chat Enhancements:** 
  - Change `isChatOpen` initialization to `window.innerWidth > 500`.
  - Initialize `chatMessages` from `localStorage.getItem('chatMessages')` and sync changes via `useEffect`.
  - Add chip buttons in `ChatAssistant.jsx`. Update `handleChatSend(textOverride)` to accept chip text to send immediately without requiring user to hit enter.
- **M5 - Performance:**
  - Wrap `filteredProducts` in `useProducts.js` with `useMemo(..., [activeCategory, searchQuery])`.
  - Wrap `ProductCard` with `React.memo()`. For this to work efficiently, `addToCart` in `useCart.js` must be wrapped in `useCallback(..., [])` to maintain referential equality.

## 3. Caveats
- Adding new UI elements (like `.chat-chips`, `.qty-selector`, `.toast`, `.back-to-top`) will require the implementer to ensure corresponding CSS exists in `App.css` or use inline styles if CSS changes are out of scope.
- When saving `chatMessages` to `localStorage`, the implementer should safely handle `JSON.parse` errors.
- `handleChatSend` in `useChat.js` uses `event` logic in `ChatAssistant.jsx`. Modifying `handleChatSend` to accept a string requires updating how it reads `chatInput` vs `overrideText`.

## 4. Conclusion
The implementation can be achieved completely within `src/App.jsx`, `src/hooks/useCart.js`, `src/hooks/useChat.js`, `src/hooks/useProducts.js`, `src/components/ProductCard.jsx`, `src/components/ChatAssistant.jsx`, and `src/components/Footer.jsx`. The Worker should follow the step-by-step logic chain to apply these changes. No new files or architectural shifts are required.

## 5. Verification Method
1. Run the local dev server using `npm run dev` (or equivalent).
2. Open the browser. Verify the Search bar is visible and filters products.
3. Open on a mobile viewport (< 500px) and verify the chat is closed by default.
4. Interact with the ChatAssistant chips; verify they send messages instantly.
5. Reload the page and verify chat history persists (via localStorage).
6. Adjust the quantity on a `ProductCard`, click "+ Agregar", and verify the Toast notification appears.
7. Use React DevTools Profiler to verify `ProductCard` does not re-render unnecessarily when `activeCategory` changes.
8. Scroll down and verify the Back-to-Top button appears and functions.
