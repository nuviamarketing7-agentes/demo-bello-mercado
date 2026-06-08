# Handoff Report: Implementation Strategy for M4 & M5

## 1. Observation
- **`App.jsx`**: Manages the main structure. It imports `searchQuery` and `setSearchQuery` but has no input field on the main view. There is no back-to-top button or featured section.
- **`useCart.js`**: Contains cart state but no toast notifications for additions.
- **`ProductCard.jsx`**: Has a simple `+ Agregar` button with no quantity state. It is not currently wrapped in `React.memo`.
- **`Footer.jsx`**: Contains minimal text (address and phone) without formatting for hours or social links.
- **`ChatAssistant.jsx`**: Contains the chat UI but lacks suggestion chips.
- **`useChat.js`**: Initializes `isChatOpen` to `true` unconditionally and `chatMessages` to a hardcoded initial array without `localStorage` persistence.
- **`useProducts.js`**: Filters products but does not use `useMemo`, leading to re-computations on every render.

## 2. Logic Chain & Implementation Strategy

### M4: UI/UX Overhaul
1. **Search Bar**: Add an `<input>` field bound to `searchQuery` and `setSearchQuery` inside `App.jsx`, placed right before the `<CategoryNav />` to make it visible on the main page.
2. **Toast Notifications**: Add a `toastMessage` state in `useCart.js`. When `addToCart` is called, set the message and use `setTimeout` to clear it after 3 seconds. Return `toastMessage` from the hook and display it as a floating `<div>` in `App.jsx`.
3. **Quantity Selector**: Update `ProductCard.jsx` to maintain a local `qty` state (`useState(1)`). Add `-` and `+` buttons alongside the quantity display. Modify the add button to use this `qty` when calling `addToCart(product, qty)`, then reset `qty` to 1.
4. **Footer Details**: Update `Footer.jsx` to include business hours and placeholder links for Instagram and Facebook, structuring them clearly.
5. **Back-to-top Button**: Add a `showTopBtn` state and a scroll event listener in `App.jsx`. Render a fixed, bottom-right button that calls `window.scrollTo({ top: 0, behavior: 'smooth' })`.
6. **Featured Section**: In `App.jsx`, conditionally render a "Productos Destacados" section (when `activeCategory === 'todo'` and `!searchQuery`) mapping through a selected subset of `PRODUCTS` (e.g., IDs 1, 3, 12, 77) using `ProductCard`.

### M5: Chat & Performance
1. **Chat Suggestion Chips**: In `ChatAssistant.jsx`, insert a scrollable horizontal container above `chat-input-row` with buttons for the suggested phrases. On click, call `setChatInput("...")`.
2. **Chat Closed on Mobile Default**: In `useChat.js`, initialize `isChatOpen` using `useState(window.innerWidth > 500)`.
3. **Chat History in LocalStorage**: In `useChat.js`, modify `useState` for `chatMessages` to lazily initialize from `localStorage.getItem('chatMessages')`. Add a `useEffect` to save `chatMessages` to `localStorage` whenever it changes.
4. **React.memo**: Wrap the default export or the function in `ProductCard.jsx` with `React.memo` to prevent unnecessary re-renders.
5. **useMemo**: In `useProducts.js`, wrap the `filteredProducts` array computation in `useMemo(() => { ... }, [activeCategory, searchQuery])`.

## 3. Caveats
- Adding the quantity selector to `ProductCard.jsx` requires minor inline styling to look correct alongside the "Agregar" button.
- The `toastMessage` and `back-to-top` button also need inline styling to float over the UI since we are not modifying `App.css` or `index.css` directly.
- Ensure `window.innerWidth` is safe to use (which it is, since this is a pure client-side React app).

## 4. Conclusion
The codebase is ready for these updates. The changes are localized and primarily involve adding states and lifecycle methods in existing hooks, as well as minor UI augmentations in components. The implementation should follow the strategy outlined in Section 2.

## 5. Verification Method
- **Search Bar**: Type "asado" on the main page; products should filter instantly.
- **Toasts**: Add an item to the cart; a floating message should appear for 3 seconds.
- **Quantity**: Change quantity to 3 on a product and add it; the cart count should increment by 3.
- **Chat Mobile**: Load the page with the browser window narrowed below 500px; the chat should be closed by default.
- **Chat LocalStorage**: Send a message in the chat, refresh the page, and confirm the message history persists.
- **Performance Tools**: Use React DevTools to verify `ProductCard` is memoized.
