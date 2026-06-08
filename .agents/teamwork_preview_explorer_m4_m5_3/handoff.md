# M4 and M5 Implementation Strategy

## Observation
I investigated the codebase to plan the implementation for milestones M4 (UI/UX) and M5 (Chat & Performance).
- **M4: Add search bar to main page**: The search is currently only accessible via `CategoryNav` logic or the ChatAssistant. `App.jsx` has `searchQuery` and `setSearchQuery` state from `useProducts.js`.
- **M4: Toast notifications for cart add**: `useCart.js` handles `addToCart`. It sets a badge animation but no visible toast.
- **M4: Quantity selector on ProductCard**: `ProductCard.jsx` only has an "+ Agregar" button that adds 1 item. `addToCart` accepts a `qty` parameter.
- **M4: Footer details**: `Footer.jsx` has a single copyright line. Needs placeholders for address, phone, hours, social.
- **M4: Back-to-top button**: Not present. Should appear on scroll down.
- **M4: Featured section**: Not explicitly present as a separate section, only a "chef-rec-banner" exists.
- **M5: Chat suggestion chips**: `ChatAssistant.jsx` lacks suggestion chips.
- **M5: Chat closed on mobile default**: `useChat.js` initializes `isChatOpen` to `true`.
- **M5: Chat history in localStorage**: `useChat.js` initializes `chatMessages` with a static array.
- **M5: React.memo on ProductCard**: `ProductCard.jsx` is a normal function component.
- **M5: useMemo for filtered products**: `useProducts.js` computes `filteredProducts` on every render.

## Logic Chain
- To implement the **search bar**, we can add a simple input field in `Header.jsx` or at the top of `App.jsx` that updates `searchQuery`.
- For **toast notifications**, we can add a `toastMessage` state in `useCart.js`. Set the message in `addToCart` and clear it after 3 seconds. Return it from `useCart` and render a toast `div` in `App.jsx`.
- For **quantity selector**, `ProductCard.jsx` can maintain a local `qty` state (using `useState`) with +/- buttons, and pass this state to `addToCart(product, qty)`.
- For **footer details**, we just add HTML elements with the required text to `Footer.jsx`.
- For **back-to-top button**, `App.jsx` can use a `useState` and `useEffect` to track `window.scrollY` and display a floating button to scroll up.
- For **featured section**, we can add a new section above `products-section` in `App.jsx` filtering `PRODUCTS` with `Oferta` or `Premium` badges (e.g. IDs 1, 12, 77) and map them to `ProductCard`.
- For **chat suggestion chips**, render a container with buttons for the requested phrases ("🥩 Ver carnicería", "🛒 Mi carrito", "💡 Recomendame algo") inside `ChatAssistant.jsx`, above the input field. Clicking them should populate the input or send a message.
- For **mobile chat default**, change `useState(true)` to `useState(window.innerWidth >= 500)` in `useChat.js`.
- For **localStorage**, update `useState` for `chatMessages` in `useChat.js` to read from `localStorage.getItem('chatMessages')`, and use a `useEffect` to save it whenever it changes.
- For **React.memo**, wrap `ProductCard` with `memo`. To prevent re-renders, `addToCart` in `useCart.js` MUST be wrapped in `useCallback`.
- For **useMemo**, wrap the `.filter` logic in `useProducts.js` inside `useMemo(() => PRODUCTS.filter(...), [activeCategory, searchQuery])`.

## Caveats
- CSS styles for new elements like the search bar, toast notification, and back-to-top button may need to be added to `App.css` if they don't already exist.
- When saving `chatMessages` to localStorage, handle `JSON.parse` errors gracefully to avoid breaking the app if data is corrupted.

## Conclusion
The implementation requires targeted changes across several components and hooks. Below is the step-by-step strategy for the Worker:

### Step 1: Hooks (`src/hooks/`)
**`useProducts.js`**:
1. Import `useMemo`.
2. Wrap the `filteredProducts` calculation in `useMemo`.
   ```javascript
   const filteredProducts = useMemo(() => {
     return PRODUCTS.filter(p => { ... });
   }, [activeCategory, searchQuery]);
   ```

**`useCart.js`**:
1. Import `useCallback`.
2. Add state for toast: `const [toastMessage, setToastMessage] = useState('');`
3. Wrap `addToCart` in `useCallback` to support `React.memo`.
4. In `addToCart`, set `toastMessage` and set a 3000ms timeout to clear it.
5. Return `toastMessage` from the hook.

**`useChat.js`**:
1. Update `isChatOpen` initialization: `useState(window.innerWidth >= 500)`.
2. Update `chatMessages` initialization to read from `localStorage` (fallback to default array if empty/error).
3. Add `useEffect` to write `chatMessages` to `localStorage` on change.

### Step 2: Components (`src/components/`)
**`ProductCard.jsx`**:
1. Import `memo` and `useState`.
2. Wrap the component export in `memo(...)`.
3. Add local state: `const [qty, setQty] = useState(1);`.
4. Replace the "Agregar" button area with a minus button, quantity text, and a plus button. Pass `qty` to `addToCart`.

**`Footer.jsx`**:
1. Add new paragraphs/divs with placeholders for address, phone, hours, and social media.

**`Header.jsx`**:
1. Receive `searchQuery` and `setSearchQuery` as props.
2. Add an `<input type="text" ... />` inside `.header-actions` or `.logo` container to act as the main page search bar. (Alternatively, add it directly in `App.jsx` below `HeroBanner`).

**`ChatAssistant.jsx`**:
1. Inside `.chat-input-row` or just above it, render suggestion chips ("🥩 Ver carnicería", "🛒 Mi carrito", "💡 Recomendame algo").
2. Set their `onClick` to `setChatInput("...")` or call a function to send the text.

### Step 3: Main App (`src/App.jsx`)
1. Extract `toastMessage` from `useCart()`.
2. Implement Back-to-Top logic: add `showBackToTop` state and a scroll event listener in `useEffect`. Render the button at the bottom of the JSX if true.
3. Render the Toast Notification element if `toastMessage` is not empty.
4. Add a "Featured Section" (Destacados) just above the main `products-section`. Filter `PRODUCTS` (e.g. `[1, 12, 77]`) and map them using `ProductCard`.
5. Update `<Header />` to pass `searchQuery` and `setSearchQuery` if you added the search bar there.

## Verification Method
- Run `npm run dev` and open the browser.
- Verify Search Bar works on the main page.
- Add an item to cart and verify the visible toast notification appears.
- Use +/- buttons on ProductCard and add to cart; verify quantity is correct.
- Scroll down and click the back-to-top button.
- Check footer for details.
- Verify featured section is rendered.
- Check chat for suggestion chips.
- Reload the page and check if chat messages persisted.
- Load page on small viewport (< 500px) and verify chat starts closed.
- Verify `useMemo` and `React.memo` by adding `console.log` or React DevTools profiling.
