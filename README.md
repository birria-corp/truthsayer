# Truthsayer

A recurring segment on the podcast [Escape Hatch](https://www.escapehatch.fm). Each week, two plausible fictions and one true fact — the audience finds the truth.

**Version:** 2.0
**Live:** https://birria-corp.github.io/truthsayer/

---

## What's New in v2.0

- Dashboard and Archive consolidated into a single **Library** tab
- Library hero row: logo, Frank Herbert quote, segment count — all in one borderless row
- Segment cards redesigned: Ep# stacked above TS# on left, film + topic inline in center, Rec/Air dates + status on right
- Single sort + search controls the full library view
- Archive tab removed

## Version History

| Version | Changes |
|---------|---------|
| v2.0 | Library tab replaces Dashboard + Archive. Redesigned segment cards. |
| v1.9 | Bulk Import/Batch Edit toggle in one collapsible section |
| v1.8 | Modal edit mode, Segment Builder rename, auto-increment episode number, segmentId |
| v1.7 | Dashboard logo artwork, Frank Herbert quote |
| v1.6 | Archive hides true story answers, modal shows full text first |
| v1.5 | Sort controls and dual date display on all cards |
| v1.4 | Duplicate check and auto-clear on bulk import |
| v1.3 | Drag-and-drop bulk import inside Segment Builder |
| v1.2 | 20% UI scale increase, JSON import for segment form |
| v1.1 | PWA app with Firebase segment management, dashboard, archive |
| v1.0 | Static GitHub Pages archive site |

---

## Segment JSON Format

```json
{
  "tsNumber": 162,
  "episodeNumber": 320,
  "recordDate": "2026-08-29",
  "airDate": "2026-09-03",
  "film": "Film Title (Year)",
  "topic": "Topic / angle",
  "variant": "standard",
  "entries": [
    { "text": "Entry one text", "isTrue": false },
    { "text": "Entry two — the true one", "isTrue": true },
    { "text": "Entry three text", "isTrue": false }
  ],
  "trueStory": "One line summary of the true answer",
  "closer": "The closing line before Here ends the Truthsayer",
  "fullText": "Complete final segment text here"
}
```

---

## Segment Format

1. Short intro tying topic to the film
2. Setup: two false, one true
3. **"Time for the Truthsayer."**
4. Numbered entries
5. **"Alright — which of these [X] stories is true?"**
6. Reveal + brief explanation
7. Thematic closer
8. **"Here ends the Truthsayer."**

**Length:** 90–120 seconds / 225–300 words (hard limit)

---

## File Structure

```
truthsayer/
├── index.html          — PWA app (all CSS + JS inline)
├── sw.js               — Service worker
├── manifest.json       — PWA manifest
├── version.json        — { "version": "2.0" }
├── icon.png            — App icon / tab favicon
├── logo-dashboard.jpg  — Library hero image
├── README.md
├── CONTEXT.md
├── LOG.md
├── _config.yml
├── archive/
└── segments-in-progress/
```

---

## Firebase

- **Project:** truthsayer-4c3ee
- **Firestore collection:** segments
- **Auth:** Google sign-in, birria only writes
- **Read:** Public
- **Hosting:** GitHub Pages (birria-corp.github.io/truthsayer)

## Deployment

GitHub Desktop → Pull origin → copy files → Commit → Push origin
