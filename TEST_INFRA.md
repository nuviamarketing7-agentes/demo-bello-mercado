# E2E Test Infra: Bello Mercado Web

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Product Grid & Category Filter | ORIGINAL_REQUEST R1 | 5      | 5      | ✓      |
| 2 | Search Bar | ORIGINAL_REQUEST R3 | 5      | 5      | ✓      |
| 3 | Add to Cart & Toast | ORIGINAL_REQUEST R3 | 5      | 5      | ✓      |
| 4 | Cart Management (Quantity) | ORIGINAL_REQUEST R1, R3 | 5 | 5 | ✓ |
| 5 | Checkout via WhatsApp | ORIGINAL_REQUEST R1 | 5      | 5      | ✓      |
| 6 | AI Chat Interaction | ORIGINAL_REQUEST R1, R5 | 5      | 5      | ✓      |
| 7 | Chat History Persistence | ORIGINAL_REQUEST R5 | 5      | 5      | ✓      |
| 8 | UI Layout Elements (Footer, Back to top) | ORIGINAL_REQUEST R3 | 5 | 5 | ✓ |

## Test Architecture
- Test runner: Playwright (`npx playwright test`)
- Test case format: Playwright test files in `e2e/` directory.
- Directory layout:
  - `e2e/tier1-features/`
  - `e2e/tier2-boundary/`
  - `e2e/tier3-pairwise/`
  - `e2e/tier4-workload/`

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Full weekly shopping (Search, filter, add multiple items, checkout) | F1, F2, F3, F4, F5 | High |
| 2 | Asado preparation via Chat (Use chat suggestions, add to cart, checkout) | F6, F3, F4, F5 | High |
| 3 | Session recovery (Add items, chat, reload page, verify state, checkout) | F7, F3, F4, F5 | High |
| 4 | Browsing and UI exploration (Scroll down, back to top, view footer) | F1, F8 | Low |
| 5 | Edge case cart management (Add max items, remove all, attempt checkout) | F3, F4, F5 | Medium |

## Coverage Thresholds
- Tier 1: ≥5 per feature
- Tier 2: ≥5 per feature (where boundaries exist)
- Tier 3: pairwise coverage of major feature interactions
- Tier 4: ≥5 realistic application scenarios
