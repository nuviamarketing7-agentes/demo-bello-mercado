# Forensic Audit Fix Strategy & Handoff

## 1. Observation
- `src/App.jsx` has **already** been refactored correctly; it currently imports smaller components from `src/components/` and custom hooks from `src/hooks/`, and its length is 139 lines (under the 150 line limit).
- In `src/hooks/useChat.js`, lines 4-5 contain a hardcoded OpenAI API key obfuscated via string concatenation (`'sk-proj-bzTF...' + '...'`).
- In `src/hooks/useChat.js`, lines 89-94 directly hit `https://api.openai.com/v1/chat/completions` instead of passing through the local proxy.
- In `server.js`, an express server is defined which exposes `POST /api/chat` to forward requests to OpenAI securely using the server's environment variable.
- In `src/components/ProductCard.jsx`, lines 15-17 render an emoji inside `<div className="product-image-placeholder">`.
- `public/images/` contains 14 generated images (e.g., `meat.png`, `dairy.png`, `poultry.png`) corresponding to the catalog categories.

## 2. Logic Chain
- The first requirement, breaking `App.jsx` into components and extracting logic into hooks, was successfully completed during the previous iteration. `App.jsx` is currently acting merely as a composition root.
- The facade proxy evasion violation is occurring because `useChat.js` intentionally avoids the `server.js` proxy and directly calls OpenAI with a hardcoded key. To resolve this, the hardcoded API key must be completely removed, and the `fetch` call in `handleChatSend` must point to `/api/chat`. No `Authorization` header is needed on the frontend since `server.js` injects it.
- The orphaned image artifacts violation is occurring because the images generated into `public/images/` are never utilized by `ProductCard.jsx`. To resolve this, `ProductCard.jsx` needs a dictionary mapping `product.category` to the corresponding English filename (e.g., `'carniceria': 'meat.png'`), and the emoji span must be replaced with an `<img />` element referencing the matched path.

## 3. Caveats
- I am assuming that the proxy server (`server.js`) will run locally and serve the frontend or is configured so that `/api/chat` correctly resolves. If running in a split dev environment (e.g., Vite on port 5173, Express on 3000), the `fetch` call might need to target `http://localhost:3000/api/chat` directly if proxying isn't configured in `vite.config.js`. I recommend using the full `http://localhost:3000/api/chat` or ensuring CORS/proxying is set up.
- The images provided do not have one-to-one Spanish names; they use English (e.g., `cerdo` -> `pork.png`). A mapping object is strictly necessary.

## 4. Conclusion
No structural changes are needed for `App.jsx` since it is already compliant. The implementer must focus exclusively on fixing the two integrity violations:

**Task 1: Fix Proxy Evasion in `useChat.js`**
- Delete `OPENAI_API_KEY` from `src/hooks/useChat.js`.
- Update the `fetch` call to target `http://localhost:3000/api/chat`.
- Remove the `Authorization` header from the frontend `fetch` request.

**Task 2: Fix Orphaned Artifacts in `ProductCard.jsx`**
- Create a category-to-image mapping in `ProductCard.jsx`:
  ```javascript
  const categoryImageMap = {
    carniceria: 'meat.png',
    fiambreria: 'deli.png',
    pollos: 'poultry.png',
    cerdo: 'pork.png',
    pescados: 'fish.png',
    verduras: 'vegetables.png',
    lacteos: 'dairy.png',
    bebidas: 'beverages.png',
    envasados: 'packaged.png',
    panaderia: 'bakery.png',
    congelados: 'frozen.png',
    limpieza: 'cleaning.png',
    higiene: 'hygiene.png',
    lenya: 'charcoal.png'
  };
  ```
- Replace the emoji `<span>` with an `<img src={\`/images/\${categoryImageMap[product.category] || 'meat.png'}\`} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />` or something similar inside `.product-image-placeholder`.

## 5. Verification Method
- **Proxy**: Run `npm run dev` and `node server.js`. Trigger a chat message in the UI and verify via network tab that the request goes to `http://localhost:3000/api/chat` (or similar proxy), not `api.openai.com`. Ensure no `sk-proj` string exists anywhere in `src/`.
- **Images**: Render the app and visually confirm that product cards display the generated images rather than emojis. Inspect DOM elements in `ProductCard.jsx` to ensure `<img>` tags are present.
