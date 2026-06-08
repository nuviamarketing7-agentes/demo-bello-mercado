# Scope: E2E Test Suite Creation

## Architecture
- Playwright-based testing framework.
- Tests organized by tier in `e2e/` folder.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Tier 1 Tests | Playwright setup and F1-F8 Tier 1 tests | none | PLANNED |
| 2 | Tier 2 Tests | F1-F8 Tier 2 tests (boundary/corner) | M1 | PLANNED |
| 3 | Tier 3 Tests | Pairwise cross-feature tests | M1 | PLANNED |
| 4 | Tier 4 Tests | Real-world application scenarios | M1, M2, M3 | PLANNED |

## Interface Contracts
- Playwright tests run via `npm run test:e2e` or `npx playwright test`.
- All tests use Playwright's page object model or standard `page.locator`.
