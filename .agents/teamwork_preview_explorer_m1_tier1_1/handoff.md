# Handoff Report: E2E Testing Track Milestone 1 (Tier 1 Features)

**Summary**: A strategy for initializing Playwright and writing at least 40 tests across 8 feature files for the Tier 1 Happy Path coverage.

## 1. Observation
- `TEST_INFRA.md` specifies 8 Tier 1 features (F1 through F8) that require at least 5 tests each, located in `e2e/tier1-features/`.
- The features are derived from `ORIGINAL_REQUEST.md` (R1, R3, R5 requirements).
- Tests must be Playwright-based (`npx playwright test`), opaque-box, and run without syntax errors (even if the app currently lacks the feature).
- `SCOPE.md` was not found in the repository.
- `PROJECT.md` indicates the project runs on Vite+React 18 with an Express backend for the OpenAI proxy (`server.js`).

## 2. Logic Chain
1. **Framework Initialization**: Playwright must be installed (`npm install -D @playwright/test`) and configured to point to the local Vite/Express dev server (e.g., `http://localhost:5173` or `http://localhost:3000`).
2. **Directory Structure**: The directory `e2e/tier1-features/` must be created to hold the test files as specified in `TEST_INFRA.md` lines 22-23.
3. **Test Distribution**: 8 features × 5 tests = 40 total tests. We need one `.spec.js` (or `.spec.ts`) file per feature.
4. **Opaque-Box Testing**: The assertions should target visible DOM elements (e.g., `page.getByRole`, `page.getByText`, `page.locator`) rather than internal React state.
5. **Syntax Over Success**: The prompt explicitly allows tests to fail due to missing app features. The primary requirement is that the test code compiles and runs without syntax errors.

## 3. Caveats
- `SCOPE.md` was requested in the instructions but does not exist in the working directory. Assumptions about scope are drawn entirely from `TEST_INFRA.md` and `ORIGINAL_REQUEST.md`.
- Since tests must be written for features that may not yet be implemented (e.g., F2 Search Bar, F8 Footer), the DOM selectors used in tests will be educated guesses based on the requirements (e.g., `page.getByPlaceholder('Buscar')`, `page.locator('footer')`).
- Playwright's `webServer` configuration should be set to match the actual dev command (`npm run dev` or `node server.js` depending on the setup) in `playwright.config.js`.

## 4. Conclusion
The implementer must execute the following steps:
1. Run `npm install -D @playwright/test` and `npx playwright install chromium`.
2. Create `playwright.config.js` in the project root with a `webServer` config block (e.g., `command: 'npm run dev'`, `port: 5173`).
3. Create the directory `e2e/tier1-features/`.
4. Create the following 8 files with 5 tests each:
   - `e2e/tier1-features/f1-product-grid.spec.js`: Test initial load, category filtering, "All" reset, product card rendering, and filtering behavior.
   - `e2e/tier1-features/f2-search-bar.spec.js`: Test searching known item, unknown item, case-insensitivity, clearing search, and combining search with categories.
   - `e2e/tier1-features/f3-add-to-cart-toast.spec.js`: Test adding item increases badge, toast appears, toast message content, toast auto-dismisses, and multiple adds.
   - `e2e/tier1-features/f4-cart-management.spec.js`: Test cart drawer displays items, '+' increases count, '-' decreases count, zero quantity removes item, and explicit remove button.
   - `e2e/tier1-features/f5-checkout-whatsapp.spec.js`: Test checkout button intent, WhatsApp URL format, URL contains total, URL contains items, and empty cart behavior.
   - `e2e/tier1-features/f6-ai-chat.spec.js`: Test chat UI opens, sending message, receiving AI response, quick suggestion chips, and chat adds items to cart.
   - `e2e/tier1-features/f7-chat-history.spec.js`: Test message persistence on reload, cart state persistence, opening chat after reload, clearing storage, and multi-message history.
   - `e2e/tier1-features/f8-ui-layout.spec.js`: Test footer visibility, footer contact info, "Back to top" hidden on load, "Back to top" appears on scroll, and clicking scrolls to top.

## 5. Verification Method
1. Inspect the `e2e/tier1-features/` directory for the 8 specified files.
2. Run `npx playwright test --list` to ensure Playwright discovers exactly 40 tests.
3. Run `npx playwright test` to confirm there are no syntax or configuration errors (test assertions may fail, which is acceptable).
