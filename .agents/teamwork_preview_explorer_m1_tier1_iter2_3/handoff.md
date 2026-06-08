# Handoff Report: E2E Playwright Tests Fix (Milestone 1)

## 1. Observation
- In `e2e/tier1-features/f1-product-grid.spec.js`, line 21, the test `"All" reset shows all products` contains the assertion:
  `await expect(page.locator('.product-card')).toHaveCount(0); // placeholder wait, will fail nicely`
- In `e2e/tier1-features/f2-search-bar.spec.js`, line 30, the test `Clearing search resets grid` contains the assertion:
  `await expect(page.locator('.product-card')).toHaveCount(0); // placeholder assert`

## 2. Logic Chain
- The Reviewer vetoed the implementation because expecting `toHaveCount(0)` in these scenarios is logically incorrect.
- Clicking the "Todos" (All) button or clearing the search input should restore the full product list, meaning the grid should **not** be empty.
- To fix this, the assertions must be changed to verify that products are visible. Other tests in the same files successfully use `.first().toBeVisible()` or `.not.toHaveCount(0)` to assert that the grid contains products.

## 3. Caveats
- No caveats. The Reviewer's instructions are highly specific, and the scope of the fix is limited strictly to updating these two logically incorrect assertions.

## 4. Conclusion
The worker agent needs to execute the following specific changes:

**Change 1:** In `e2e/tier1-features/f1-product-grid.spec.js`
Replace:
```javascript
    await expect(page.locator('.product-card')).toHaveCount(0); // placeholder wait, will fail nicely
```
With:
```javascript
    await expect(page.locator('.product-card').first()).toBeVisible();
```
*(Alternatively, `.not.toHaveCount(0)` is also acceptable).*

**Change 2:** In `e2e/tier1-features/f2-search-bar.spec.js`
Replace:
```javascript
    await expect(page.locator('.product-card')).toHaveCount(0); // placeholder assert
```
With:
```javascript
    await expect(page.locator('.product-card').first()).toBeVisible();
```
*(Alternatively, `.not.toHaveCount(0)` is also acceptable).*

## 5. Verification Method
- **Command:** `npx playwright test e2e/tier1-features/f1-product-grid.spec.js e2e/tier1-features/f2-search-bar.spec.js`
- **Validation:** Both test files must pass successfully without throwing errors on the corrected assertions.
