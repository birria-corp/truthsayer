# Truthsayer

A recurring segment on the podcast [Escape Hatch](https://www.escapehatch.fm). Each week, two plausible fictions and one true fact — the audience finds the truth.

**Segment count:** 161 and counting  
**Podcast:** Escape Hatch  
**Host:** birria

---

## Format

1. Short intro tying topic to the film
2. Setup: two false, one true
3. **"Time for the Truthsayer."**
4. Numbered entries (#1, #2, #3 — or more for list variants)
5. **"Alright — which of these [X] stories is true?"**
6. Reveal + brief explanation (2–4 lines max)
7. Thematic closer — film dialogue, quote, or dry callback
8. **"Here ends the Truthsayer."**

**Length:** 90–120 seconds / 225–300 words (hard limit)

---

## Structural Variants

| Variant | Description | Example |
|---------|-------------|---------|
| Standard | 3 entries, 2 false 1 true | Almost Famous (Lester Bangs) |
| List — find the false | 5+ entries, find the one she wasn't in | ET (Dee Wallace horror films) |
| List — find the true | 5+ entries, find who didn't work with X | Adaptation (Spike Jonze) |
| All true | All 3 turn out to be true | Pulp Fiction (Travolta), Casablanca (Lorre) |
| Count format | Guess a specific number | Goonies (how many "shits") |
| Trivia race | Real things competing | Batman & Robin (Coolio Letterboxd ratings) |

---

## Tone Guidelines

- Intelligent but accessible
- Slightly playful, occasionally dry
- False entries: 1–2 tight sentences, no trailing explanation
- Reveal: short — trust the image
- Dry anachronistic commentary is fair game ("We used to be a real country")
- Film dialogue as a closer is strongly preferred over constructed lines
- Personal asides welcome but brief
- Never reach for the poetic button when a shorter punch works

---

## File Structure

```
truthsayer/
├── README.md               — This file
├── CONTEXT.md              — Claude session resumption file
├── LOG.md                  — Running segment table
├── index.html              — GitHub Pages site
├── _config.yml             — Jekyll config
├── archive/                — One .md file per completed segment
│   ├── TS-161-dark-knight.md
│   ├── TS-160-et.md
│   └── ...
└── segments-in-progress/   — Drafts and upcoming segments
```

---

## Update Workflow

After each new segment:
1. Add final text to `archive/TS-[number]-[slug].md`
2. Add row to `LOG.md`
3. Update `CONTEXT.md` archive table
4. Commit with message: `Add TS-[number]: [Film]`
5. Push to origin

---

## Deployment

Hosted via GitHub Pages from `main` branch.  
Live at: `https://spencer-thompson-2-vu.github.io/truthsayer/`

---

## Version History

| Segment | Film | Date |
|---------|------|------|
| TS-161 | The Dark Knight | 2026-08-15 (est) |
| TS-160 | E.T. the Extra-Terrestrial | 2026-08-07 |
| TS-159 | Barton Fink | 2026-08-02 |
| TS-158 | The Odyssey | 2026-07-22 |
| TS-157 | O Brother, Where Art Thou? | 2026-07-17 |
| TS-156 | Star Trek VI: The Undiscovered Country | 2026-07-12 |
| TS-155 | Eternal Sunshine of the Spotless Mind | 2026-07-05 |
| TS-150 | Batman & Robin | 2026-05-14 |
| ... | ... | ... |
| TS-1 | Aquaman | ~2022 |
