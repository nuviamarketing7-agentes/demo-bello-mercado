# Handoff Report: E2E Milestone 1 (Tier 1 Tests)

## 1. Observation
- `TEST_INFRA.md` dictates opaque-box testing for Tier 1 features (F1-F8) with at least 5 tests per feature.
- `ORIGINAL_REQUEST.md` describes the expected UI behaviors (e.g., search bar, add to cart toasts, quantity selectors, checkout via WhatsApp, AI chat, footer, and back-to-top button).
- `.agents/teamwork_preview_orchestrator_e2e/SCOPE.md` specifies that the tests must be organized in the `e2e/` folder, run via `npm run test:e2e` or `npx playwright test`, and use Playwright.
- `package.json` confirms Playwright is not yet installed in the project root.

## 2. Logic Chain
- **Playwright Setup:** The worker needs to install Playwright and configure it in `playwright.config.ts`. The configuration must start the Vite development server (using `npm run dev`) and test against it (typically `http://localhost:5173`). An NPM script `"test:e2e": "playwright test"` should be added to `package.json`.
- **Test Organization:** To fulfill the requirement of 5 tests per feature for F1-F8 in `e2e/tier1-features/`, the worker should create 8 separate test files mapping to each feature to ensure isolation and clarity.
- **Opaque-Box Testing:** Test files should use Playwright locators to find text, buttons, and visual elements based on the requirements rather than React component state.

## 3. Caveats
- Since the tests might be implemented *before* all app refactoring or feature implementation is complete, test failures are acceptable at this stage. The worker should ensure syntax is valid and tests run, without worrying if assertions fail due to missing app code.
- Test assertions should rely on standard web elements (roles, text) rather than internal `data-testid` attributes unless the worker also injects them. Standard DOM lookup (e.g., `getByRole('button', { name: /add to cart/i })`) is preferred for opaque-box tests.

## 4. Conclusion
The worker should execute the following implementation plan:

**Step 1: Install & Configure Playwright**
- Run `npm install -D @playwright/test` and `npx playwright install`.
- Create `playwright.config.ts` in the project root with a `webServer` block pointing to `npm run dev` (`http://localhost:5173` or similar based on Vite defaults).
- Update `package.json` to include the script `"test:e2e": "playwright test"`.

**Step 2: Create Test Files**
Create the following files in `e2e/tier1-features/` with 5 tests each:

1. **`f1-product-grid.spec.ts` (Product Grid & Category Filter)**
   - Test 1: Grid loads and displays initial products.
   - Test 2: Category filter buttons are visible.
   - Test 3: Clicking a category (e.g., "Carnes") filters the products.
   - Test 4: Clicking "All" resets the grid to show all products.
   - Test 5: Category filters are scrollable or fully visible.
2. **`f2-search-bar.spec.ts` (Search Bar)**
   - Test 1: Search bar is visible on the main page.
   - Test 2: Typing a valid product name filters the grid to match.
   - Test 3: Typing a non-existent product shows an empty grid or "no results" state.
   - Test 4: Clearing the search bar restores the full product grid.
   - Test 5: Search input handles case-insensitivity correctly.
3. **`f3-add-to-cart.spec.ts` (Add to Cart & Toast)**
   - Test 1: "Add to Cart" button exists on product cards.
   - Test 2: Clicking "Add to Cart" increments the cart count badge.
   - Test 3: Clicking "Add to Cart" triggers a visible toast/notification.
   - Test 4: The toast notification contains the name of the added product.
   - Test 5: The toast notification disappears after a brief timeout.
4. **`f4-cart-management.spec.ts` (Cart Management - Quantity)**
   - Test 1: Product cards have a quantity selector (+ and - buttons).
   - Test 2: Clicking "+" increases the quantity to be added.
   - Test 3: Clicking "-" decreases the quantity (preventing drop below 1).
   - Test 4: Adding an item with quantity > 1 updates the cart correctly.
   - Test 5: The cart drawer reflects the accurate total price and quantity.
5. **`f5-checkout.spec.ts` (Checkout via WhatsApp)**
   - Test 1: Checkout button is visible in the cart.
   - Test 2: Checkout button is disabled or handles clicks safely if the cart is empty.
   - Test 3: Clicking checkout with items attempts to open a WhatsApp URL.
   - Test 4: The generated WhatsApp URL contains the configured phone number.
   - Test 5: The URL includes formatted text detailing the order.
6. **`f6-ai-chat.spec.ts` (AI Chat Interaction)**
   - Test 1: AI Chat toggle/button is visible.
   - Test 2: Sending a message displays it in the chat UI.
   - Test 3: The chat UI displays quick suggestion chips.
   - Test 4: Clicking a suggestion chip populates and sends the message.
   - Test 5: The system receives or awaits a response bubble from the assistant.
7. **`f7-chat-history.spec.ts` (Chat History Persistence)**
   - Test 1: Initial chat load has only default or empty messages.
   - Test 2: Sent messages are preserved when the page is reloaded.
   - Test 3: Assistant responses are preserved across reloads.
   - Test 4: LocalStorage (or session storage) reflects the chat history state.
   - Test 5: Multiple conversational turns remain ordered correctly after reload.
8. **`f8-ui-layout.spec.ts` (UI Layout Elements - Footer, Back to top)**
   - Test 1: The footer is rendered at the bottom of the page.
   - Test 2: Footer contains contact/business information.
   - Test 3: "Back to top" button is hidden at the top of the page.
   - Test 4: Scrolling down makes the "Back to top" button visible.
   - Test 5: Clicking "Back to top" scrolls the page to the top.

## 5. Verification Method
- **Commands**: Run `npm run test:e2e` from the project root.
- **Expected Outcome**: Playwright should execute 40 tests (5 per file). Syntax should be valid. Execution might result in some failures depending on current app implementation, which is expected and acceptable.
- **Artifact Inspection**: Verify that `e2e/tier1-features/` contains the 8 `.spec.ts` files, `playwright.config.ts` is in the root, and `package.json` has the `"test:e2e"` script.
