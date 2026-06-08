# Handoff Report: E2E Tier 1 Tests (F1-F8)

## 1. Observation
- `package.json` does not currently contain Playwright dependencies or test scripts.
- The project is built with Vite (as confirmed by `vite.config.js`).
- `TEST_INFRA.md` dictates an opaque-box methodology (relying on DOM interactions/text), requires the tests to be located in `e2e/tier1-features/`, and mandates at least 5 tests for each of the features F1 through F8.
- The 8 features map to: Product Grid/Category Filter (F1), Search Bar (F2), Add to Cart & Toast (F3), Cart Management (F4), Checkout via WhatsApp (F5), AI Chat Interaction (F6), Chat History Persistence (F7), and UI Layout Elements (F8).
- The instruction states that failures due to unimplemented app features are acceptable, but tests must run successfully without syntax errors.

## 2. Logic Chain
- **Playwright Setup:** Since Playwright is absent, the Worker must install it (`npm i -D @playwright/test`) and create a `playwright.config.js` (or `.ts`) that points the `testDir` to `./e2e` and optionally starts the dev server (`npm run dev`) at `http://localhost:5173`.
- **Directory Structure:** Create `e2e/tier1-features/` to house the tests.
- **Test Specs:** Write 8 spec files corresponding to each feature. Since the tests must be opaque-box, they must exclusively use Playwright locators like `page.getByRole`, `page.getByPlaceholder`, and `page.getByText`.
- **Test Scenarios per Feature (5 each):**
  - **F1 (f1_product_grid_category_filter.spec.js):** 1) Grid displays on load; 2) Category buttons are visible; 3) Clicking a category filters items; 4) Clicking "Todos" resets filter; 5) Active category is visually indicated.
  - **F2 (f2_search_bar.spec.js):** 1) Search bar is visible; 2) Typing valid term filters grid; 3) Typing invalid term shows empty/no results; 4) Clearing search restores grid; 5) Search is case-insensitive.
  - **F3 (f3_add_to_cart_toast.spec.js):** 1) "Add to Cart" button exists on products; 2) Clicking increments cart badge; 3) Clicking shows a success toast notification; 4) Toast disappears after timeout; 5) Adding multiple distinct items updates total count.
  - **F4 (f4_cart_management.spec.js):** 1) Opening cart shows added items; 2) Increase quantity button works; 3) Decrease quantity button works; 4) Decreasing to 0 removes item; 5) Total price reflects quantity changes accurately.
  - **F5 (f5_checkout_whatsapp.spec.js):** 1) Checkout button exists in cart; 2) Button is disabled/errors on empty cart; 3) Clicking checkout prompts for user details/confirmation; 4) Submitting form triggers WhatsApp link generation; 5) URL contains correct phone and URL-encoded order string.
  - **F6 (f6_ai_chat_interaction.spec.js):** 1) Chat widget toggle is visible; 2) User can type and send message; 3) Sent message appears in history; 4) AI response appears after sending; 5) Quick suggestion chips exist and clicking one sends it.
  - **F7 (f7_chat_history_persistence.spec.js):** 1) Message history persists after page reload; 2) AI responses persist after reload; 3) Reopening chat after reload displays previous context; 4) Clearing local storage resets chat; 5) Multiple reloads don't duplicate messages.
  - **F8 (f8_ui_layout_elements.spec.js):** 1) Header contains logo; 2) Footer contains business info/social links; 3) "Featured/Asado" section is present; 4) "Back to top" button appears when scrolling down; 5) Clicking "Back to top" scrolls viewport to top.

## 3. Caveats
- Since these tests are being written ahead of the full UI/UX overhaul, most of them will fail when executed against the current MVP (e.g., missing search bar, toast notifications, UI layout elements). This is expected.
- Exact Spanish text for buttons (e.g., "Añadir al carrito", "Comprar por WhatsApp") are assumed based on standard conventions and the project scope, and might require minor adjustments during actual implementation.
- Network interception might be needed to avoid hitting the actual OpenAI API during chat tests (or Playwright's `route.fulfill` to mock AI responses), though opaque-box might prefer actual integration. For tests to simply execute without errors, basic mocks can be used if necessary.

## 4. Conclusion
The Worker should:
1. Initialize `@playwright/test` and `playwright.config.js`.
2. Create `e2e/tier1-features/`.
3. Create the 8 spec files listed above.
4. Implement the 5 defined test cases per file using opaque-box Playwright locators.

## 5. Verification Method
- Execute `npx playwright test`. 
- Verify that Playwright discovers exactly 40 tests across 8 files.
- Ensure the process does not fail due to syntax or compilation errors (though individual test assertion failures are acceptable).
