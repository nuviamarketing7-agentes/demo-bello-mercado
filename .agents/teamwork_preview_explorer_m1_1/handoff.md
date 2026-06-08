# Handoff Report: 502 / proxy / "Lo siento" issue

## 1. Observation
- In `src/hooks/useChat.js` (lines 94-106), the `fetch('/api/chat', ...)` request body only contains `messages`. It is missing the `model`, `max_tokens`, and `temperature` parameters that were present before the code was refactored into an Express proxy.
- In `server.js` (lines 22-48), the Express proxy passes `req.body` directly to `https://api.openai.com/v1/chat/completions` without appending the `model` parameter.
- When tested locally with `node server.js` and a mock request, the proxy returns `STATUS: 400` with the body `{"error":{"message":"you must provide a model parameter","type":"invalid_request_error","param":null,"code":null}}`.
- In `src/hooks/useChat.js` (lines 108-109), the response is parsed via `response.json()` regardless of `response.ok`. When an OpenAI error JSON is returned (like 400 or 401), `data.choices` is undefined, causing the fallback text `"Lo siento, no pude procesar tu consulta."` to be displayed.
- In `.env.easypanel`, the API key is defined as `VITE_OPENAI_API_KEY`. However, `server.js` (line 28) explicitly requests `process.env.OPENAI_API_KEY`, which will evaluate to `undefined` in production unless configured otherwise, resulting in a 401 Unauthorized error (which also triggers the "Lo siento" message).

## 2. Logic Chain
1. The frontend (`useChat.js`) sends a payload to the backend (`server.js`) containing only `messages`.
2. The backend acts as a direct proxy and forwards this incomplete payload to OpenAI.
3. OpenAI rejects the request with a 400 Bad Request error because the `model` parameter is required.
4. (Additionally, if the EasyPanel environment only contains `VITE_OPENAI_API_KEY`, the backend sends `Bearer undefined`, causing OpenAI to reject the request with a 401 Unauthorized error.)
5. The backend (`server.js`) relays this non-200 HTTP status and JSON error object back to the frontend.
6. The frontend (`useChat.js`) blindly parses the JSON payload without checking `response.ok`. Since the error JSON from OpenAI has an `error` key instead of a `choices` array, `data.choices?.[0]` evaluates to `undefined`.
7. This causes the frontend to display its hardcoded fallback string: `"Lo siento, no pude procesar tu consulta."`

## 3. Caveats
- I did not have access to the live EasyPanel logs to see if a literal 502 Bad Gateway is *also* occurring due to port mismatches, but the symptoms ("Lo siento, no pude procesar tu consulta.") explicitly point to the frontend successfully parsing an API error payload. The 502 mentioned in the prompt might be a misdiagnosis of the 400/401 errors, or a secondary issue. The port configuration (`PORT=3000`) appears correct for Nixpacks.
- I assumed that `.env.easypanel` accurately reflects the production environment variables.

## 4. Conclusion
The issue is caused by the frontend omitting the `model` parameter from the chat payload, and the backend expecting an environment variable (`OPENAI_API_KEY`) that is potentially mismatched in production (`VITE_OPENAI_API_KEY`). Furthermore, the frontend improperly handles non-200 HTTP responses.

**Recommended Fix Strategy for the Worker:**
1. **Backend (`server.js`):**
   - Inject the `model` parameter (and optionally `temperature`/`max_tokens`) before forwarding the request to OpenAI.
   - Support both `process.env.OPENAI_API_KEY` and `process.env.VITE_OPENAI_API_KEY` for the Authorization header.
2. **Frontend (`src/hooks/useChat.js`):**
   - Add a check for `!response.ok` immediately after the `fetch` call and `throw new Error(...)` so it properly falls into the `catch` block and displays a meaningful connection error.

## 5. Verification Method
1. Start the server using `npm run start` (`node server.js`).
2. Run a `POST /api/chat` request locally containing only `{"messages": [{"role": "user", "content": "hola"}]}`. You will receive a 400 error about the missing model parameter.
3. Apply the backend fixes. Run the same request again and verify it returns a 200 OK with `choices`.
4. Test the frontend behavior by entering an invalid API key, ensuring the UI correctly displays the fallback error message from the `catch` block instead of the "Lo siento" message.
