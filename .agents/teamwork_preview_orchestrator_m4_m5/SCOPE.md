# Scope: M4 (UI/UX) & M5 (Chat/Performance)

## Architecture
- React components in `src/components/`, hooks in `src/hooks/`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M4: UI/UX Overhaul | Add search bar to main page, toast notifications for cart add, quantity selector on ProductCard, footer details, back-to-top button, featured section. | none | DONE |
| 2 | M5: Chat | 2 | M5: Chat & Performance | Chat suggestions chips, chat closed on mobile default, chat history in localStorage, `React.memo` on ProductCard, `useMemo` for filtered products. | M4 | PLANNED | Performance | Chat suggestions chips, chat closed on mobile default, chat history in localStorage, `React.memo` on ProductCard, `useMemo` for filtered products. | M4 | DONE |

## Details
- Search bar: Should be visible on the main page without opening chat.
- Toast notifications: When adding to cart, show a visible toast (not just badge).
- Quantity selector: Product cards should have + and - buttons with a number display.
- Footer: address, phone, hours, social placeholders.
- Back to top: Button appears when scrolling down.
- Chat chips: e.g. "🥩 Ver carnicería", "🛒 Mi carrito", "💡 Recomendame algo".
- Chat mobile: Default closed on < 500px viewports.
- LocalStorage: Persist `chatMessages` across reloads.
- Performance: `React.memo` on `ProductCard`, `useMemo` in `useProducts.js`.
