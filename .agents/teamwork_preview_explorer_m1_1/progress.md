# Progress
- Last visited: 2026-06-08T11:02:00Z
- Investigated `server.js` and `useChat.js`.
- Discovered missing `model` parameter.
- Discovered API key variable mismatch (`OPENAI_API_KEY` vs `VITE_OPENAI_API_KEY`).
- Discovered missing `response.ok` check in `useChat.js` masking the error as "Lo siento".
- Handoff report generated in `handoff.md`.
