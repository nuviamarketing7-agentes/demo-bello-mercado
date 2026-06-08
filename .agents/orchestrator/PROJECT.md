# Project: bello_mercado_web

## Architecture
- React Frontend (Vite)
- Express Backend (Node.js) handling OpenAI API communication

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | API Fix | Fix GPT API Connection and verify frontend-backend communication | none | DONE |
| 2 | Agent Actions | Verify chat agent can trigger UI actions (filtering, scrolling) | M1 | DONE |
| 3 | Scroll UI | Update "Scroll to Top" button positioning and transitions depending on chat state | none | DONE |

## Interface Contracts
### Frontend ↔ Backend (/api/chat)
- Ensure correct payload structure for sending messages to `/api/chat`.
- Ensure correct handling of OpenAI API responses in backend.

## Code Layout
- Frontend: src/
- Backend: server.js or similar
