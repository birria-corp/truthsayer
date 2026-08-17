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
- **Current version:** v2.5
- **Stack:** Single-file HTML, vanilla JS, Firebase Firestore + Auth, GitHub Pages

---

## Current State

### Library
- **158 segments** in Firestore — TS 1–158, fully normalized and audited
- TS numbers increase with episode numbers — no gaps, no duplicates, no ordering issues
- TS 14–29 gap is intentional — episodes in that range had no recorded Truthsayer segment
- Two Dune Part 2 segments share ep 185 (TS 47 and TS 48)
- Dark Knight (TS-158, ep 319) is status: scheduled, air date Aug 23 2026

### Auth / Admin
- Google sign-in via Firebase Auth
- Admin UID: `7svXy0VugrT0LgK33R82eHqKp6f2` (zeros at positions 6 and 12, not letter O)
- ADMIN_UIDS array in index.html — add future admins here
- Segment Builder tab hidden from non-admins
- Edit/delete/export gated to admin

### Visibility Model
- `published` — full card, clickable, visible to all
- `scheduled` — Coming Soon card (title + air date only) for signed-out users; full card for admin; auto-promotes to published display when airDate passes
- `draft` — hidden from public entirely; visible to admin only

---

## Active Features

- **The Library tab** — hero row (logo, Frank Herbert quote, segment count), search, filter, sort, segment cards
- **Segment cards** — Ep# above TS# (left), film + topic inline (center), Rec/Air dates + status (right)
- **Modal** — full segment detail; Edit button flips to inline edit mode for admin
- **Segment Builder tab** (admin only) — new segment form with auto-increment episode#, live segmentId preview, record date + air date fields, JSON import
- **Bulk Import / Batch Edit** — collapsible toggle section; Import New skips duplicates by tsNumber; Batch Edit matches by `_matchTs` field and merges updates
- **Export Library JSON** — downloads full Firestore collection sorted by TS# as dated JSON

---

## Key Technical Decisions

### Version Bumping (all 3 simultaneously)
- `APP_VERSION` constant in index.html
- `version.json`
- `CACHE_VERSION` in sw.js

### segmentId format
- `ep-{episodeNumber}-{film-slug}` when episode number present
- Falls back to `ts-{tsNumber}-{film-slug}`

### Batch Edit `_matchTs`
- Batch edit tool matches on `_matchTs` field if present, falls back to `tsNumber`
- `_matchTs` and `_old_ts` fields stripped before writing to Firestore

### Firestore Rules
- Public: `allow read: if true`
- Write: `allow write: if request.auth.uid == '7svXy0VugrT0LgK33R82eHqKp6f2'`

### Skip Episodes (no Truthsayer segment)
138, 183, 186, 197, 198, 227, 228, 235, 239, 241, 243, 245, 247, 249, 251, 253, 254, 262, 263, 274, 276, 284, 288, 289, 296, 312

---

## Segment Data Model

```json
{
  "tsNumber": 158,
  "episodeNumber": 319,
  "segmentId": "ep-319-the-dark-knight-2008",
  "recordDate": "2026-08-18",
  "airDate": "2026-08-23",
  "film": "The Dark Knight (2008)",
  "topic": "True story from Michael Caine's lean years before fame",
  "variant": "standard",
  "entries": [{"text": "...", "isTrue": false}],
  "trueStory": "...",
  "closer": "...",
  "fullText": "...",
  "status": "scheduled",
  "authorUid": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Version History

| Version | Changes |
|---------|---------|
| v2.5 | Fixed ADMIN_UIDS UID typo (O→0); fixed sign-out auth check; switched to signInWithRedirect |
| v2.4 | Admin-only Segment Builder; ADMIN_UIDS constant; Truthsayer logo as app icon |
| v2.3 | Truthsayer artwork logo as icon.png |
| v2.2 | Scheduled status; Coming Soon cards; draft hidden from public; auto-publish by airDate |
| v2.1 | Export Library JSON in Segment Builder |
| v2.0 | Library tab replaces Dashboard + Archive; redesigned segment cards |
| v1.9 | Bulk Import/Batch Edit toggle |
| v1.8 | Modal edit mode; Segment Builder rename; auto-increment episode#; segmentId |
| v1.7 | Dashboard logo; Frank Herbert quote |
| v1.6 | Archive hides answers; modal shows full text first |
| v1.5 | Sort controls; dual date display |
| v1.4 | Duplicate check; auto-clear on bulk import |
| v1.3 | Drag-and-drop bulk import |
| v1.2 | 20% UI scale; JSON import for form |
| v1.1 | PWA with Firebase; dashboard; archive; segment builder |
| v1.0 | Static GitHub Pages archive |

---

## Deployment Workflow

GitHub Desktop → Pull origin → copy files into repo folder → Commit with version message → Push origin → GitHub Pages auto-deploys (~2 min)

## Source Files for Segment Archive
- `Truthsayer.txt` — full segment archive, newest first
- `EH_Ep_Numbers_and_dates.csv` — authoritative episode numbers and air dates
- Both TS numbers and episode numbers increase over time; lower = older
