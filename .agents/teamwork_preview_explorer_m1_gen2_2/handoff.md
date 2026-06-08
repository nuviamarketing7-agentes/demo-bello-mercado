# Handoff Report: M1 Architecture Refactor (Iteration 2 Fix)

## Observation
- `src/App.jsx` has already been correctly refactored into smaller components (e.g., `Header`, `ProductCard`, `ChatAssistant` in `src/components/`) and hooks (e.g., `useCart`, `useProducts`, `useChat` in `src/hooks/`). The file is 139 lines long, satisfying the <150 lines constraint.
- `src/hooks/useChat.js` (lines 4-5) hardcodes the `OPENAI_API_KEY` using string concatenation to evade detection and makes direct `fetch` calls to `https://api.openai.com/v1/chat/completions` (line 89). This bypasses the backend proxy.
- `src/components/ProductCard.jsx` (lines 15-17) still uses emojis (`<span role="img">{product.emoji}</span>`) inside `.product-image-placeholder` instead of the 14 generated category images located in `public/images/`.
- `server.js` (line 22) correctly implements the `/api/chat` endpoint and listens on port 3000 (line 13).
- `vite.config.js` currently does not have a proxy configured for `/api` requests.

## Logic Chain
1. The structural refactoring of `App.jsx` into `src/components/` and `src/hooks/` is complete and successful.
2. The integrity violation in `useChat.js` exposes the OpenAI API key to the client. To resolve this, the hardcoded key must be removed, and the `fetch` request must be updated to target `/api/chat`. To avoid CORS and port mismatches during development, `vite.config.js` should be updated to proxy `/api` requests to `http://localhost:3000`.
3. The integrity violation in `ProductCard.jsx` constitutes a failure to integrate the required visual assets. This can be resolved by creating a mapping of `product.category` to the corresponding image file in `public/images/` (e.g., `carniceria: '/images/meat.png'`, `fiambreria: '/images/deli.png'`, etc.) and replacing the emoji span with an `<img src={categoryImageMap[product.category]} alt={product.name} className="product-image" />`. The placeholder CSS (`.product-image-placeholder`) might need its font-size or flex properties adjusted if the image is direct, or we can use `object-fit: cover` on the image.

## Caveats
- Since Vite and Express run on different ports in development, a proxy in `vite.config.js` is the cleanest approach, allowing `useChat.js` to simply fetch `/api/chat`.
- The images in `public/images/` match the categories defined in `src/data.js`, but an explicit mapping is required in `ProductCard.jsx` to wire them properly.

## Conclusion
The architectural structure is sound. The implementer MUST address the integrity violations to pass the audit. 
1. **Remove API Key & Use Proxy**: Edit `src/hooks/useChat.js` to delete `OPENAI_API_KEY` and change the fetch URL to `/api/chat`. 
2. **Configure Vite Proxy**: Edit `vite.config.js` to proxy `/api` to `http://localhost:3000`.
3. **Wire Images**: Edit `src/components/ProductCard.jsx` to map `product.category` to the images in `public/images/` and replace the emoji with an `<img src={...} />` tag.

## Verification Method
1. Inspect `src/hooks/useChat.js` to confirm the OpenAI key is removed and the fetch points to `/api/chat`.
2. Inspect `vite.config.js` to confirm the proxy configuration.
3. Inspect `src/components/ProductCard.jsx` to confirm the image mapping and the presence of an `<img>` tag referencing `/images/...`.
4. Start the frontend (`npm run dev`) and backend (`node server.js`) to verify chat functionality and that images render correctly in the UI.
