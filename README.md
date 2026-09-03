# Truthsayer

A recurring segment on the podcast [Escape Hatch](https://www.escapehatch.fm). Each week, two plausible fictions and one true fact — the audience finds the truth.

**Version:** 4.8
**Live:** https://birria-corp.github.io/truthsayer/

---

## Features

- Library of all segments with search + sort
- Game mode — random playable segment with audio
- ▶ Play / View buttons on each library card
- Admin Segment Builder (Google sign-in required)
- Audio playback in segment modals and game view
- PWA — installable on Android/iOS/desktop
- Auto-publish when airDate passes
- Export library as JSON

---

## File Structure

```
truthsayer/
├── index.html          — PWA app (all CSS + JS inline)
├── sw.js               — Service worker
├── manifest.json       — PWA manifest
├── version.json        — { "version": "4.6" }
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

## Firebase

- **Project:** zeptrack-f8720 (birria corp apps)
- **Firestore collection:** segments
- **Storage bucket:** gs://zeptrack-f8720.firebasestorage.app
- **Auth:** Google sign-in, admin UID gated writes
- **Read:** Public
- **Hosting:** GitHub Pages (birria-corp.github.io/truthsayer)

---

## Update Workflow

GitHub Desktop → Pull origin → copy updated files → Commit → Push origin

---

## Version History

| Version | Changes |
|---------|---------|
| v4.8 | Sticky tab row; Game button (replaces Play, no arrow); blue 🔊 speaker button on cards with audio; specialAudioUrl field support (modal, edit UI, upload, game card) |
| v4.7 | Library cards redesigned as single compact row — title · topic inline, Play/View/date/status all in one horizontal strip |
| v4.6 | EP/TS numbers left-justified on library cards; Exit Preview button in game view; ▶ Play + View buttons on each card (published + audio-only); Play button gates on published status + valid entries |
| v4.5 | Audio migration complete — 174 segments in Firebase Storage; questionAudioUrl + revealAudioUrl in Firestore; audio playback in segment modals and game view |
| v4.4 | Game view with audio (question + reveal); makeAudioPlayer helper; game card render uses Firestore audio URLs |
| v4.3 | Firestore data model adds questionAudioUrl, revealAudioUrl, setupText, revealText fields |
| v4.2 | Segment modal shows questionAudioUrl / revealAudioUrl audio players when present |
| v4.1 | Game tab; random segment picker; game landing → game playing state machine |
| v4.0 | Firebase project migrated to zeptrack-f8720 (Blaze plan); Storage enabled |
| v2.8 | Fixed export function referencing stale button IDs; fixed module/script scope blocking admin UI; fixed _loadSegments sort order; header version now dynamic |
| v2.7 | Admin Settings panel (gear icon in header) — Check for Updates, Export Library JSON, sign out; Export moved out of Segment Builder |
| v2.6 | Desktop sign-in uses popup; mobile uses redirect — fixes GitHub Pages Chrome auth loop |
| v2.5 | Fixed ADMIN_UIDS UID typo (O→0) blocking admin access; fixed sign-out using wrong auth check; switched sign-in from popup to redirect (COOP fix); bumped sw.js cache version |
| v2.4 | Admin-only Segment Builder tab; ADMIN_UIDS constant; Segment Builder and edit/delete/export gated to admin UID; Truthsayer logo as app icon (icon.png) |
| v2.3 | Truthsayer artwork logo replaces placeholder icon — tab favicon, PWA install, home screen, Chrome tag |
| v2.2 | Scheduled status added; Coming Soon cards for signed-out users; draft segments hidden from public; auto-publish when airDate passes; Firestore query filters drafts client-side |
| v2.1 | Export Library JSON button in Segment Builder — exports full Firestore collection as dated JSON for bulk edit workflows |
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
