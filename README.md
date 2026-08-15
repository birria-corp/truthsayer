# Truthsayer

A recurring segment on the podcast [Escape Hatch](https://www.escapehatch.fm). Each week, two plausible fictions and one true fact — the audience finds the truth.

**Version:** 1.1  
**Segment count:** 161 and counting  
**Podcast:** Escape Hatch  
**Host:** birria  
**Live:** https://birria-corp.github.io/truthsayer/

---

## What's New in v1.1

- Full PWA — installable on mobile, works offline
- Firebase-backed segment management app
- Dashboard with stats and recent segments
- New segment form with entry builder and word count
- Archive with search and filter
- Google auth — birria only can write; all can read

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
| All true | All 3 turn out to be true | Pulp Fiction, Casablanca |
| Count format | Guess a specific number | Goonies |
| Trivia race | Real things competing | Batman & Robin (Coolio ratings) |

---

## File Structure

```
truthsayer/
├── index.html              — PWA app (all CSS + JS inline)
├── sw.js                   — Service worker
├── manifest.json           — PWA manifest
├── version.json            — { "version": "1.1" }
├── icon.png                — App icon (Truthsayer logo)
├── README.md               — This file
├── CONTEXT.md              — Claude session resumption file
├── LOG.md                  — Running segment table
├── _config.yml             — Jekyll config
├── archive/                — One .md file per completed segment
└── segments-in-progress/   — Drafts and upcoming segments
```

---

## Update Workflow

### Publishing a new segment
1. Write and finalize segment in the Claude Truthsayer project
2. Open the app at `https://birria-corp.github.io/truthsayer/`
3. Sign in with Google
4. Go to New Segment — fill in all fields, paste final text
5. Hit Publish — segment saves to Firestore instantly
6. Also add to `archive/TS-[number]-[slug].md` and `LOG.md` in this repo

### Deploying a new app version
1. GitHub Desktop → Pull origin
2. Copy updated files into local repo folder
3. Bump version in: `index.html` (APP_VERSION), `version.json`, `sw.js` (CACHE_VERSION)
4. Commit: `vX.X — [what changed]`
5. Push origin

---

## Firebase

- **Project:** zeptrack-f8720
- **Firestore collection:** `segments`
- **Auth:** Google sign-in, birria only
- **Read access:** Public (no auth required)
- **Hosting:** GitHub Pages (not Firebase Hosting)

---

## Version History

| Version | Changes |
|---------|---------|
| v1.1 | PWA app with Firebase, segment management, archive, dashboard |
| v1.0 | Static GitHub Pages archive site |
