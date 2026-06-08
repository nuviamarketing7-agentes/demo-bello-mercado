# Worker Tasks

## Task 1: Fix GPT API Connection (M1)
The backend currently fails to proxy to OpenAI correctly because the `model` parameter is missing.
1. In `server.js`: Modify the `/api/chat` endpoint. Instead of forwarding `req.body` directly to OpenAI, extract `req.body.messages` and construct a new payload that includes `model: 'gpt-4o-mini'`.
   Example:
   ```javascript
   const payload = {
     model: 'gpt-4o-mini',
     messages: req.body.messages
   };
   // pass JSON.stringify(payload) to OpenAI
   ```
2. In `server.js`: Ensure `PORT` is bound correctly for EasyPanel: `const PORT = process.env.PORT || 3000;`.
3. In `src/hooks/useChat.js`: Modify the fetch error handling. Add `if (!response.ok) throw new Error('API Error');` after the `fetch` call so that non-200 responses are correctly caught by the `catch` block instead of silently swallowing the error JSON.

## Task 2: Verify Chat Agent Actions (M2)
No specific code changes are strictly required, but verify that the `useChat.js` hook processes the `filter` and `add_to_cart` actions correctly. (Ensure `App.jsx` passes the right props/refs).

## Task 3: Update "Scroll to Top" Button UI (M3)
Modify `src/components/BackToTop.jsx` and its parent `src/App.jsx` to adjust its position depending on `isChatOpen`.
1. Pass `isChatOpen={isChatOpen}` to `<BackToTop showBackToTop={showBackToTop} />` inside `src/App.jsx`.
2. In `src/components/BackToTop.jsx`:
   - Receive `isChatOpen`.
   - Update the inline `style` or CSS class.
   - When `isChatOpen` is true: it should be positioned to the left of the "Close Chat" (X) button of the chat window. The chat window is at `right: 2rem` and `bottom: 95px`, width `400px`. The close button is at the top right of the chat window. So `right` could be `calc(2rem + 400px + 10px)`, and `bottom` around `95px + 550px - 50px` or whatever looks like it's to the left of the chat window header. Actually, "left of the 'Close Chat' (X) button" might just mean `right: calc(2rem + 60px)` inside the chat window? Wait, the BackToTop is global. Let's just position it cleanly. If `isChatOpen` is false, it should be right above the floating toggle button, e.g., `bottom: 100px`, `right: 2rem` (32px). If `isChatOpen` is true, put it at `bottom: calc(95px + 550px + 20px)` or just stick to the top of the chat window but slightly to the left. Just use a clean transition.
   - Apply a transition: `transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)`.

Please implement these changes and write a handoff report when done.
