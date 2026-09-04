# Claude Session Context — The Truthsayer

## Who I Am
- **Name:** Doctor (Spencer Thompson) — goes by "Birria" in some contexts
- **GitHub account:** `birria-corp`
- **Claude goes by:** Fez

---

## This Project

- **Name:** The Truthsayer
- **Type:** PWA App + Weekly Podcast Segment Production
- **Goal:** Manage and produce the Truthsayer segment for the Escape Hatch podcast
- **Status:** Active
- **Repo:** https://github.com/birria-corp/truthsayer
- **Live URL:** https://birria-corp.github.io/truthsayer/
- **Current version:** v5.0
- **Stack:** Single-file HTML, vanilla JS, Firebase Firestore + Storage + Auth, GitHub Pages

---

## Current State

### Library
- **166 segments** in Firestore (eps 137–321, with gaps)
- Firestore doc IDs are **auto-generated** — segmentId is a field on the doc, not the doc ID
- Library default sort: **Ep # descending**
- Sort options: Ep #, Film, Release Date
- TS # is retired as a sort field (non-standard segments don't have one)

### Audio
- **questionAudioUrl** / **revealAudioUrl** — standard Q/A segments (hosted in Firebase Storage)
- **specialAudioUrl** — non-standard / monologue segments
- CORS configured on Storage bucket via `set-cors.js` — browser uploads from GitHub Pages work
- ~40 new Q/A pairs migrated (eps 231–321) via `migrate-qa-new.js`
- Special audio migrated for ep-165, ep-227, ep-244, ep-289 via `migrate-special-v2.js`
- ep-250 renamed: old doc `ep-250-the-empire-strikes-back` deleted; new doc created with correct ID; specialAudioUrl preserved (Storage file path unchanged)

### Auth / Admin
- Google sign-in via Firebase Auth
- Admin UID: `ZbRaWy2Ld5MPG0AtzyElphKWUiZ2`
- Storage rules: `allow write: if request.auth.uid == 'ZbRaWy2Ld5MPG0AtzyElphKWUiZ2'`
- Firestore rules: `allow write: if request.auth.uid == 'ZbRaWy2Ld5MPG0AtzyElphKWUiZ2'`
- Admin can upload audio directly from Segment Builder

### Firebase
- **Project:** zeptrack-f8720 (birria corp apps, Blaze plan)
- **Firestore collection:** segments
- **Storage bucket:** gs://zeptrack-f8720.firebasestorage.app
- **Auth:** Google sign-in

### Visibility Model
- `published` — full card, clickable, visible to all
- `scheduled` — Coming Soon card for signed-out users; full card for admin; auto-promotes when airDate passes
- `draft` — hidden from public; visible to admin only

### Game Mode
- Random published segment with audio (questionAudioUrl or specialAudioUrl required)
- Game button condition: `playable !== false && status === 'published' && entries.some(e => e.isTrue)`

---

## Active Features

- **Library tab** — search, filter by status, sort (Ep #, Film, Release Date)
- **Segment cards** — compact single-row; speaker 🔊 icon when audio present; Play + View buttons
- **Two-row mobile layout** — flex-wrap at 600px; title preserved, topic hidden
- **Sticky tab row**
- **Modal** — full segment detail; audio players for Q/A and special audio; Edit mode for admin
- **Segment Builder** (admin only) — new segment form, audio upload to Storage, live segmentId preview
- **Game tab** — random playable segment; Q/A audio playback; reveal on answer
- **Export Library JSON** — exports full Firestore collection sorted by Ep # as dated JSON
- **Auto-update checker** — compares APP_VERSION against version.json on mount

---

## Key Technical Decisions

### Version Bumping (all 3 simultaneously)
- `APP_VERSION` constant in index.html
- `version.json`
- `CACHE_VERSION` in sw.js

### segmentId format (field, not doc ID)
- `ep-{episodeNumber}-{film-slug}` — primary format
- Falls back to `ts-{tsNumber}-{film-slug}` for older segments
- Firestore doc IDs are auto-generated; always query by segmentId field, not doc ID

### Sort Default
- Library: `episodeNumber` descending
- Archive (admin): `episodeNumber` descending
- Initial load: sorted by `episodeNumber` ascending

### Firestore Rules
- Public: `allow read: if true`
- Write: `allow write: if request.auth.uid == 'ZbRaWy2Ld5MPG0AtzyElphKWUiZ2'`

### Storage CORS
- Set via `node set-cors.js --key ./serviceAccountKey.json` from `Desktop\FirebaseLoad\`
- Allows PUT/POST from `https://birria-corp.github.io`

---

## Segment Data Model

```json
{
  "segmentId": "ep-321-the-fly-1986",
  "tsNumber": 163,
  "episodeNumber": 321,
  "recordDate": "2026-08-XX",
  "airDate": "2026-09-XX",
  "film": "The Fly (1986)",
  "topic": "...",
  "variant": "standard",
  "entries": [{"text": "...", "isTrue": false}],
  "trueStory": "...",
  "setupText": "...",
  "revealText": "...",
  "closer": "...",
  "fullText": "...",
  "questionAudioUrl": "https://storage.googleapis.com/...",
  "revealAudioUrl": "https://storage.googleapis.com/...",
  "specialAudioUrl": null,
  "status": "published",
  "playable": true,
  "authorUid": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Firebase Scripts (Desktop\FirebaseLoad\)

| Script | Purpose |
|--------|---------|
| `set-cors.js` | Set CORS on Storage bucket |
| `batch-update-firestore.js` | Bulk update metadata from JSON export (preserves audio URLs) |
| `migrate-special-v2.js` | Migrate special audio for specific eps |
| `migrate-qa-new.js` | Migrate Q/A audio pairs from Drive |
| `cleanup-old-docs.js` | Remove pre-batch duplicate Firestore docs |
| `fix-ep231.js` | One-off fix for Constantine entries + revealText |
| `lookup-ep231.js` | Diagnostic: find doc by episodeNumber |
| `fix-remaining-audio.js` | Upload Q/A audio for ep-294 (Point Blank) and ep-223 (Star Trek TMP); idempotent |

**Critical:** `batch-update-firestore.js` uses segmentId as the Firestore doc ID key — this creates new docs if a segment's existing doc has an auto-generated ID. Always run `cleanup-old-docs.js` after a batch update to remove the old duplicates.

---

## Open Items

None — audio migration complete as of 2026-09-04.

---

## Version History

| Version | Changes |
|---------|---------|
| v5.0 | Library default sort changed to Ep # (was TS #); TS # sort removed; Release Date added as sort option |
| v4.9 | Mobile card two-row layout fix; topic hidden on mobile; CORS enabled for Storage browser uploads |
| v4.8 | Sticky tab row; Game button; blue 🔊 speaker on audio cards; specialAudioUrl field support |
| v4.7 | Library cards redesigned as compact single row |
| v4.6 | EP/TS numbers left-justified; Exit Preview; Play + View buttons on cards |
| v4.5 | Audio migration complete — 174 segments in Storage; questionAudioUrl + revealAudioUrl in Firestore |
| v4.4 | Game view with audio; makeAudioPlayer helper |
| v4.3 | Firestore model adds questionAudioUrl, revealAudioUrl, setupText, revealText |
| v4.2 | Segment modal shows audio players |
| v4.1 | Game tab; random segment picker |
| v4.0 | Firebase migrated to zeptrack-f8720 (Blaze plan); Storage enabled |
| v2.8–2.5 | Various auth, export, and admin fixes |
| v2.4 | Admin-only Segment Builder; ADMIN_UIDS |
| v2.0 | Library tab replaces Dashboard + Archive |
| v1.0 | Static GitHub Pages archive |

---

## Deployment Workflow

1. GitHub Desktop → Pull origin
2. Copy updated files into repo folder
3. Commit with message: `v5.0 — [description]`
4. Push origin → GitHub Pages auto-deploys (~2 min)
