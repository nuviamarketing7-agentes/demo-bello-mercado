# Tier 2: Boundary & Corner Case Test Design

This document contains 40 boundary and corner case test descriptions (Tier 2) for the 8 features of the Bello Mercado Web application, adhering to the requirements specified in `TEST_INFRA.md`.

## F1: Product Grid & Category Filter
1. **Empty Category (Lower Boundary):** Select a category filter that has 0 products to verify the empty state messaging and layout.
2. **Single Item Category (Boundary):** Select a category filter that contains exactly 1 product to verify grid alignment and display logic for single elements.
3. **Race Condition on Filter Switching (Corner Case):** Rapidly click between 3-4 different category filters before the products finish loading to verify that only the last selected category's products are displayed and no race conditions occur.
4. **Invalid Category URL (Corner Case):** Navigate directly to the application URL with an invalid or non-existent category parameter to verify error handling and default state fallback.
5. **Pagination/Scroll Limit (Upper Boundary):** Scroll continuously on a category with an extremely large number of items (if applicable) or verify behavior when all products are fully loaded on screen.

## F2: Search Bar
1. **Empty Submission (Lower Boundary):** Submit a search with an empty string (0 characters) to verify that no search is performed or it gracefully returns to the default state.
2. **Single Character Search (Boundary):** Submit a search query with exactly 1 character to verify the minimum length threshold and result relevance.
3. **Maximum Length Exceeded (Upper Boundary):** Submit an extremely long search string (e.g., 10,000 characters) to test input field limits, text overflow, and backend rejection/truncation.
4. **Whitespace Only / Trimming (Corner Case):** Submit a query consisting entirely of spaces, or leading/trailing spaces around a valid term, to verify input sanitization.
5. **Special Characters & Scripts (Corner Case):** Submit a search query containing HTML tags, emojis, and special characters (e.g., `<script>alert(1)</script> 🛒!`) to verify XSS prevention and safe rendering of no-results states.

## F3: Add to Cart & Toast
1. **Rapid Interaction (Corner Case):** Rapidly double-click or click the "Add to Cart" button 10 times in 1 second to verify debounce behavior and accurate quantity increments without UI freezing.
2. **Toast Stack Overflow (Upper Boundary):** Trigger 5-10 distinct "Add to Cart" actions sequentially to spawn multiple toast notifications simultaneously, verifying that the UI limits the visible toasts or stacks them without overlapping the entire screen.
3. **Long Product Title (Corner Case):** Add a product with an extremely long title to the cart and verify that the resulting toast notification gracefully wraps or truncates the text without breaking the layout.
4. **Interrupted Animation (Corner Case):** Click to dismiss a toast notification exactly while it is in the middle of its fade-out or slide-out animation to ensure no JavaScript errors occur.
5. **Offline Action (Corner Case):** Disconnect network access and click "Add to Cart" to verify graceful degradation (e.g., an error toast or local queuing) instead of an unhandled crash.

## F4: Cart Management (Quantity)
1. **Zero Quantity (Lower Boundary):** Decrease the quantity of an item in the cart from 1 to 0 and verify that it correctly prompts for removal or removes the item entirely.
2. **Maximum Input Limit (Upper Boundary):** Manually type a very large number (e.g., 99999) into the quantity input field to verify max value constraints and prevent UI/pricing overflow.
3. **Invalid Data Types (Corner Case):** Attempt to enter negative numbers (`-5`), decimals (`1.5`), or non-numeric characters (`abc`) into the quantity input to verify strict input validation.
4. **Final Item Removal (Boundary):** Remove the very last item in the cart to verify the transition to the "Empty Cart" state, including button disabling (like checkout) and empty state UI rendering.
5. **State Sync on Checkout (Corner Case):** Change the quantity of an item and immediately click the "Checkout" button within milliseconds to verify that the final modified quantity is registered.

## F5: Checkout via WhatsApp
1. **Zero Item Checkout (Lower Boundary):** Attempt to trigger the checkout process when the cart has 0 items to verify that the action is blocked and a warning is shown.
2. **Large Payload Checkout (Upper Boundary):** Add 50+ distinct items to the cart and proceed to checkout to verify that the generated WhatsApp URL does not exceed browser/OS URL length limits and formats correctly.
3. **Special Character Encoding (Corner Case):** Checkout with a cart containing products that have emojis, ampersands, or foreign characters in their names to verify proper URL encoding in the WhatsApp message.
4. **Zero Total Checkout (Boundary):** Checkout with a cart total of $0.00 (e.g., free items or fully discounted) to verify that the message handles formatting of zero-value totals correctly without failing.
5. **Rapid Double Checkout (Corner Case):** Rapidly double-click the "Checkout via WhatsApp" button to verify that it opens only a single new tab or window.

## F6: AI Chat Interaction
1. **Empty Message (Lower Boundary):** Attempt to send an empty message (0 characters) to the AI chat to verify that the send button is disabled or the submission is ignored.
2. **Maximum Payload Size (Upper Boundary):** Paste and submit a message exceeding 2000 characters to verify input field max-length restrictions and server rejection handling.
3. **Whitespace Only Message (Corner Case):** Send a message consisting entirely of newlines and spaces to verify that it is trimmed and treated as an empty submission.
4. **Rapid Consecutive Messages (Corner Case):** Rapidly submit 3-4 messages before the AI has finished replying to the first to verify request queuing and UI handling of interrupted responses.
5. **Markdown/Formatting Injection (Corner Case):** Send complex markdown structures (tables, bold, code blocks) to verify that the UI renders the AI's mirrored or generated response safely without breaking chat layout.

## F7: Chat History Persistence
1. **Interrupted Streaming (Corner Case):** Reload the browser tab while the AI is in the middle of actively typing/streaming a response to verify that history recovers cleanly upon reload.
2. **Storage Limit Exhaustion (Upper Boundary):** Generate a massive chat history (100+ long messages) to verify behavior as LocalStorage limits are approached (e.g., old messages purging, UI performance).
3. **Concurrent Multi-tab Access (Corner Case):** Open the application in two separate tabs, chat in one, and verify if the second tab handles history synchronization or overrides without crashing.
4. **Local Data Wiping (Corner Case):** Manually clear LocalStorage/SessionStorage while the application is open and refresh to verify it gracefully initializes a fresh session without throwing errors.
5. **Session Expiry (Boundary):** Leave a chat session idle for an extended period (simulated by advancing system time or modifying storage timestamps) and reload to verify session expiration boundaries.

## F8: UI Layout Elements (Footer, Back to top)
1. **Scroll Threshold Exact Match (Boundary):** Scroll down to the exact pixel value configured to trigger the "Back to top" button visibility to verify the boolean toggle behavior.
2. **Input Override During Scroll (Corner Case):** Click the "Back to top" button and manually scroll down rapidly with the mouse wheel while the smooth scroll animation is executing to verify that manual input interrupts or overrides the animation.
3. **Zero Scroll Position (Lower Boundary):** Ensure the "Back to top" button is completely invisible and unclickable when the page is loaded at a scroll Y position of 0.
4. **Zoom Overlap (Corner Case):** Increase the browser zoom to 300% and verify that fixed elements (like "Back to top" or Chat widget) do not entirely obscure critical footer elements or main content on small screens.
5. **Minimum Viewport Height (Lower Boundary):** Resize the browser window vertically to an extremely short height (e.g., 200px) to verify that footer elements do not break the layout and remain accessible by scrolling.
