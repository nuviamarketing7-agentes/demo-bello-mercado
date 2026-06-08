# Handoff Report: Fix Strategy for M1 Architecture Refactor

## Observation
- `src/App.jsx` has **already** been successfully refactored into smaller React components (`Header`, `Footer`, `ProductCard`, `Cart`, `ChatAssistant`, `HeroBanner`, `CategoryNav`) and custom hooks (`useCart`, `useProducts`, `useChat`). The file is 139 lines long, serving primarily as a composition root.
- **Integrity Violation 1**: In `src/hooks/useChat.js` (Lines 4, 89-94), the OpenAI API key is hardcoded using string concatenation to evade checks, and the fetch request goes directly to `https://api.openai.com/v1/chat/completions`. The required backend proxy at `server.js` (`/api/chat`) is ignored.
- **Integrity Violation 2**: In `src/components/ProductCard.jsx` (Lines 15-17), the UI continues to render emojis (`<span role="img">{product.emoji}</span>`) despite the existence of 14 valid, generated category images in `public/images/`.

## Logic Chain
1. The structural refactor of `App.jsx` is functionally complete and complies with the 150-line constraint. No further architectural splitting is needed.
2. To resolve the first integrity violation, `useChat.js` must be updated to route its requests through the local proxy. By changing the URL to `/api/chat` and removing the `Authorization` header, the hardcoded API key can be completely deleted. This adheres to the security requirement while leveraging the already-implemented `server.js` proxy.
3. To resolve the second integrity violation, `ProductCard.jsx` must be modified to consume the generated images in `public/images/`. Since the images are named by category in English, a mapping object inside the component (or in `data.js`) can translate the product's `category` property to the correct filename (e.g., `carniceria` -> `meat.png`, `fiambreria` -> `deli.png`, etc.). The `<span role="img">` should be replaced with an `<img>` tag, with appropriate CSS styling in `src/index.css` to ensure the images fit within `.product-image-placeholder`.

## Caveats
- No caveats regarding the component splitting, as it is already complete.
- We assume that `server.js` proxy is properly invoked by the project runner, therefore `/api/chat` should work seamlessly. The `useChat.js` hook should use a relative path `/api/chat` so the proxy middleware handles it.
- Since there are exactly 14 category-based images in `public/images/` mapping perfectly to the 14 product categories, the mapping is exhaustive and there will be no broken image links.

## Conclusion
The structural refactoring aspect of Iteration 2 is complete. The implementer must focus strictly on resolving the two integrity violations:
1. **Remove API Key & Use Proxy**: Edit `src/hooks/useChat.js` to remove the hardcoded `OPENAI_API_KEY`. Update the `fetch` call to target `/api/chat` instead of the direct OpenAI URL, and remove the `Authorization` header.
2. **Wire Up Images**: Edit `src/components/ProductCard.jsx` to map `product.category` to the corresponding image file in `/images/`. Replace the emoji span inside `.product-image-placeholder` with an `<img>` tag using the mapped URL. Update `.product-image-placeholder img` styling in `src/index.css` to `width: 100%; height: 100%; object-fit: cover; border-radius: 10px;`.

## Verification Method
1. `cat src/hooks/useChat.js | grep -i openai` to confirm the API key and direct URL are completely removed.
2. `grep "/api/chat" src/hooks/useChat.js` to confirm the fetch URL relies on the proxy.
3. `cat src/components/ProductCard.jsx | grep "<img"` to confirm the images are integrated into the DOM.
4. Run the development server and verify the UI correctly displays the category images instead of emojis and the chatbot functions correctly.
