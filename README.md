# Truthsayer

A recurring segment on the podcast [Escape Hatch](https://www.escapehatch.fm). Each week, two plausible fictions and one true fact — the audience finds the truth.

**Version:** 1.2  
**Segment count:** 161 and counting  
**Podcast:** Escape Hatch  
**Host:** birria  
**Live:** https://birria-corp.github.io/truthsayer/

---

## What's New in v1.2

- UI scaled up 20% across all elements
- JSON import — paste a segment JSON block to populate the form automatically
- Review and edit all fields before publishing
- Word count indicator on full text field

## What's in v1.1

- Full PWA — installable on mobile, works offline
- Firebase-backed segment management
- Dashboard with stats and recent segments
- New segment form with entry builder
- Archive with search and filter
- Google auth — birria only can write; all can read

---

## Segment JSON Format

When finishing a segment in Claude, request a JSON block in this format:

```json
{
  "tsNumber": 162,
  "episodeNumber": 320,
  "airDate": "2026-08-22",
  "film": "Film Title (Year)",
  "topic": "Topic / angle",
  "variant": "standard",
  "entries": [
    { "text": "Entry one text", "isTrue": false },
    { "text": "Entry two text — the true one", "isTrue": true },
    { "text": "Entry three text", "isTrue": false }
  ],
  "trueStory": "One line summary of the true answer",
  "closer": "The closing line before Here ends the Truthsayer",
  "fullText": "Complete final segment text here"
}
```

Paste into New Segment → Import box → click Import → review → Publish.

---

## Segment Format

1. Short intro tying topic to the film
2. Setup: two false, one true
3. **"Time for the Truthsayer."**
4. Numbered entries
5. **"Alright — which of these [X] stories is true?"**
6. Reveal + brief explanation (2–4 lines max)
7. Thematic closer
8. **"Here ends the Truthsayer."**

**Length:** 90–120 seconds / 225–300 words (hard limit)

---

## File Structure

```
truthsayer/
├── index.html              — PWA app (all CSS + JS inline)
├── sw.js                   — Service worker
├── manifest.json           — PWA manifest
├── version.json            — { "version": "1.2" }
├── icon.png                — App icon
├── README.md               — This file
├── CONTEXT.md              — Claude session resumption file
├── LOG.md                  — Running segment table
├── _config.yml             — Jekyll config
├── archive/                — One .md per completed segment
└── segments-in-progress/   — Drafts
```

---

## Version Bump Checklist

When releasing a new version, update all three locations simultaneously:
- `APP_VERSION` in `index.html`
- `version.json`
- `CACHE_VERSION` in `sw.js`

## Deployment

GitHub Desktop → Pull origin → copy files → Commit → Push origin  
Pages auto-deploys from `main` branch root.

---

## Firebase

- **Project:** truthsayer-4c3ee
- **Firestore collection:** `segments`
- **Auth:** Google sign-in, birria only writes
- **Read access:** Public
- **Hosting:** GitHub Pages

---

## Version History

| Version | Changes |
|---------|---------|
| v1.2 | 20% UI scale increase, JSON import for segment form |
| v1.1 | PWA app with Firebase, segment management, archive, dashboard |
| v1.0 | Static GitHub Pages archive site |
