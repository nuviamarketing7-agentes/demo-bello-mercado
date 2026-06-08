# Minor UI Fix Task

In `src/components/BackToTop.jsx`, the requirement says:
"When the chat window is OPEN: Position the button to the left of the 'Close Chat' (X) button."

Currently, it sets `bottom: 'calc(95px + 550px + 20px)'` and `right: '2rem'`, which places it *above* the chat window.
To place it *to the left* of the Close Chat button (which is inside the chat window's header at the top right):
- `bottom` should be `calc(95px + 550px - 50px)` (or around `595px` so it aligns with the header vertically)
- `right` should be `calc(2rem + 60px)` (so it's shifted leftwards from the close button)

Please update `src/components/BackToTop.jsx`:
```javascript
        bottom: isChatOpen ? 'calc(95px + 550px - 40px)' : '100px',
        right: isChatOpen ? 'calc(2rem + 50px)' : '2rem',
```
(Adjust values to make it look exactly to the left of the Close button).
Write a brief handoff.md when done.
