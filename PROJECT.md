# Project: Bello Mercado Web Overhaul

## Architecture
- **Frontend**: Vite + React 18
- **Backend**: Lightweight Express server serving `dist/` and providing `/api/chat` proxy for OpenAI.
- **Components**: Separated by concerns (Header, Footer, ProductCard, Cart, ChatAssistant, SearchBar).
- **Hooks**: `useCart`, `useChat`, `useProducts`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Architecture Refactor | Break App.jsx into components and hooks. Keep all existing features working. | none | DONE |
| 2 | Backend Proxy & Security | Create `server.js` (Express), install express+cors+dotenv, move OpenAI key to backend, adjust frontend to call `/api/chat`. | none | DONE |
| 3 | Image Generation | Generate high-quality product images using `generate_image`, update `data.js`. | none | DONE |
| 4 | UI/UX Enhancements | Search bar, toast notifications, quantity selector, visual upgrades, footer, back-to-top, featured section. | M1 | DONE |
| 5 | Chat & Performance | Quick suggestions, localStorage history, mobile closed default, `React.memo`, `useMemo`, `font-display: swap`. | M1, M2 | DONE |
| 6 | E2E Testing | Verify all features and finalize project. | M4, M5 | PLANNED |

## Interface Contracts
### Frontend ↔ Backend (Express)
- Endpoint: `POST /api/chat`
- Request: `{ messages: [...] }`
- Response: Stream or JSON matching OpenAI response format.

## Code Layout
- `/src/components/`: UI components
- `/src/hooks/`: Custom hooks
- `/server.js`: Backend entrypoint
- `/public/images/`: Generated images
