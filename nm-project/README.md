# N & M — A Conversation That Became Something More

A private, cinematic personal website. Everything runs client-side — no backend, no database, no tracking.

## How to use it

1. Open `index.html` in a browser (double-click it, or drag it into a browser tab). No build step, no server needed.
2. Everything you'll want to personalize lives in **`script.js`**, in the `CONFIG` object and the clearly labeled sections above it:
   - `CONFIG.whatsappNumber` — your real number in international format, digits only (e.g. `"919876543210"`), no `+` or spaces.
   - `CONFIG.whatsappMessage` — the pre-filled message for the "I want to talk about it" option.
   - `chatMessages` — replace the placeholder lines with real moments from your actual conversations.
   - `observations` — replace with specific, real things you've noticed about her.
   - `quizQuestions` — edit or replace the quiz.
   - `finalLines` — the closing message.
3. (Optional) Music: drop an MP3 at `assets/audio/music.mp3` and an optional short notification sound at `assets/audio/notify.mp3`. Music is **off by default** — she has to tap "♫ Music" to turn it on, since browsers block autoplay anyway. If the files aren't there, the site still works perfectly; the button just won't produce sound.

## Structure

```
index.html      → page structure, all screens
style.css       → cinematic dark theme, animations, responsive rules
script.js       → CONFIG, content, and all interaction logic
assets/audio/   → optional music.mp3 and notify.mp3
assets/images/  → reserved if you ever want to add a photo later
```

## Notes

- Fully responsive — tested down to small phone widths, no horizontal scroll, 44px+ tap targets.
- Respects `prefers-reduced-motion` — animations simplify automatically if she has that setting on.
- Nothing is sent anywhere. There's no analytics, no data collection, no auto-sending of messages. The only outbound action is the WhatsApp link, and only if she chooses to tap it.
- The whole flow is skip-proof in the sense that every button does exactly what it says — no dead ends, no fake choices, no forced "yes."
- To replay the experience, use the "Replay Experience ↻" button on the final screen — it simply reloads the page.

Built with code, and a little courage.
