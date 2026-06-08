# Scope: M1 Architecture Refactor

## Architecture
- Break `App.jsx` into React components in `src/components/`.
- Suggested components: `Header`, `Footer`, `ProductCard`, `Cart`, `ChatAssistant`, `HeroBanner`, `CategoryNav`.
- Extract logic into custom hooks in `src/hooks/`: `useCart`, `useProducts`, `useChat`.
- **Constraint**: `App.jsx` must be under 150 lines and serve only as a composition root.
- **Constraint**: All existing features (cart, checkout, chat, categories, filtering) MUST continue to work exactly as they do now.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Architecture Refactor | Refactor `App.jsx` into smaller files. | none | DONE |

## Interface Contracts
- `App.jsx` imports and renders components. State can be lifted or managed by context, but custom hooks in `App.jsx` passing props is fine too, as long as `App.jsx` is <150 lines.
