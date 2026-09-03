/**
 * migrate-missing.js
 * Uploads audio for segments that were missed in the original batch migration.
 * Only processes segments with confirmed Google Drive file IDs.
 *
 * Usage:
 *   node migrate-missing.js --key ./serviceAccountKey.json [--dry-run] [--force]
 *
 * --dry-run  : show what would happen, write nothing
 * --force    : overwrite existing Firestore URLs even if already set
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore }        = require('firebase-admin/firestore');
const { getStorage }          = require('firebase-admin/storage');
const { google }              = require('googleapis');
const fs   = require('fs');
const path = require('path');
const os   = require('os');

// ── CLI args ──────────────────────────────────────────────────────────────────
const args    = process.argv.slice(2);
const keyIdx  = args.indexOf('--key');
const keyPath = keyIdx !== -1 ? args[keyIdx + 1] : './serviceAccountKey.json';
const DRY_RUN = args.includes('--dry-run');
const FORCE   = args.includes('--force');

// ── Segments with confirmed Drive IDs ─────────────────────────────────────────
// These two were in the Drive folder but absent from the original mapping sheet.
const SEGMENTS = [
  {
    segmentId:      'ep-215-manhunter',
    film:           'Manhunter (1986)',
    questionFileId: '1jp9KI-ZE99lF8LjxI_BsGISILSTe_cDX',
    revealFileId:   '1rvVfosh2exCZp-NGFqZ6u3vnVl_RP913',
  },
  {
    segmentId:      'ep-224-colossus-the-forbin-project',
    film:           'Colossus: The Forbin Project (1970)',
    questionFileId: '1mPnqQHbvMbtGes9CfloU-pHRzXBkRGhp',
    revealFileId:   '1yyt9osd5yi4Pq3gHgQmFjzTjIX1Do8fq',
  },
];

// Segments with no Drive recordings found — reported but not processed.
const NO_RECORDING = [
  'ep-281-rushmore',
  'ep-283-the-running-man-live',
  'ep-297-the-cable-guy',
  'ep-299-argo',
  'ep-300-the-shining',
  'ep-301-project-hail-mary',
  'ep-302-hard-boiled',
];

// ── Firebase config ───────────────────────────────────────────────────────────
const BUCKET      = 'zeptrack-f8720.firebasestorage.app';
const COLLECTION  = 'segments';

// ── Init ──────────────────────────────────────────────────────────────────────
const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

initializeApp({
  credential:  cert(serviceAccount),
  storageBucket: BUCKET,
});

const db      = getFirestore();
const bucket  = getStorage().bucket();

// Drive auth uses the same service account
const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes:  ['https://www.googleapis.com/auth/drive.readonly'],
});
const drive = google.drive({ version: 'v3', auth });

// ── Helpers ───────────────────────────────────────────────────────────────────

async function downloadFromDrive(fileId, destPath) {
  const res = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );
  return new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(destPath);
    res.data.on('error', reject);
    dest.on('error', reject);
    dest.on('finish', resolve);
    res.data.pipe(dest);
  });
}

async function uploadToStorage(localPath, storagePath) {
  await bucket.upload(localPath, {
    destination: storagePath,
    metadata: { contentType: 'audio/mpeg' },
  });
  // Make public-readable
  const file = bucket.file(storagePath);
  await file.makePublic();
  return `https://storage.googleapis.com/${BUCKET}/${storagePath}`;
}

async function getFirestoreDoc(segmentId) {
  // Try by document ID first
  let snap = await db.collection(COLLECTION).doc(segmentId).get();
  if (snap.exists) return { id: snap.id, data: snap.data() };

  // Fall back to query by segmentId field
  const q = await db.collection(COLLECTION)
    .where('segmentId', '==', segmentId)
    .limit(1)
    .get();
  if (!q.empty) {
    const doc = q.docs[0];
    return { id: doc.id, data: doc.data() };
  }
  return null;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function processSegment(seg) {
  const { segmentId, film, questionFileId, revealFileId } = seg;
  console.log(`\n── ${film} (${segmentId}) ──`);

  const doc = await getFirestoreDoc(segmentId);
  if (!doc) {
    console.log(`  ✗ Not found in Firestore — skipping`);
    return { segmentId, status: 'not_in_firestore' };
  }

  const { id: docId, data } = doc;
  const alreadyHasQ = !!data.questionAudioUrl;
  const alreadyHasA = !!data.revealAudioUrl;

  if (alreadyHasQ && alreadyHasA && !FORCE) {
    console.log(`  ✓ Already has audio URLs — skipping (use --force to overwrite)`);
    return { segmentId, status: 'skipped_existing' };
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-migrate-'));
  const qPath  = path.join(tmpDir, 'question.mp3');
  const aPath  = path.join(tmpDir, 'reveal.mp3');

  try {
    const storageQ = `segments/${docId}/question.mp3`;
    const storageA = `segments/${docId}/reveal.mp3`;

    // Question audio
    if (!alreadyHasQ || FORCE) {
      console.log(`  ↓ Downloading question audio from Drive...`);
      if (!DRY_RUN) await downloadFromDrive(questionFileId, qPath);
      console.log(`  ↑ Uploading to ${storageQ}...`);
      let questionUrl = `https://storage.googleapis.com/${BUCKET}/${storageQ}`;
      if (!DRY_RUN) questionUrl = await uploadToStorage(qPath, storageQ);
      console.log(`  ✓ questionAudioUrl: ${questionUrl}`);
      if (!DRY_RUN) await db.collection(COLLECTION).doc(docId).update({ questionAudioUrl: questionUrl });
    }

    // Reveal audio
    if (!alreadyHasA || FORCE) {
      console.log(`  ↓ Downloading reveal audio from Drive...`);
      if (!DRY_RUN) await downloadFromDrive(revealFileId, aPath);
      console.log(`  ↑ Uploading to ${storageA}...`);
      let revealUrl = `https://storage.googleapis.com/${BUCKET}/${storageA}`;
      if (!DRY_RUN) revealUrl = await uploadToStorage(aPath, storageA);
      console.log(`  ✓ revealAudioUrl: ${revealUrl}`);
      if (!DRY_RUN) await db.collection(COLLECTION).doc(docId).update({ revealAudioUrl: revealUrl });
    }

    return { segmentId, status: DRY_RUN ? 'dry_run' : 'success' };

  } finally {
    // Clean up temp files
    if (fs.existsSync(qPath)) fs.unlinkSync(qPath);
    if (fs.existsSync(aPath)) fs.unlinkSync(aPath);
    fs.rmdirSync(tmpDir, { recursive: true });
  }
}

async function main() {
  console.log(`\n=== Truthsayer Missing Audio Migration ===`);
  if (DRY_RUN) console.log(`DRY RUN — no files will be written\n`);

  const results = [];

  for (const seg of SEGMENTS) {
    try {
      const result = await processSegment(seg);
      results.push(result);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
      results.push({ segmentId: seg.segmentId, status: 'error', error: err.message });
    }
  }

  console.log(`\n=== Summary ===`);
  for (const r of results) {
    const icon = r.status === 'success' ? '✓' : r.status === 'dry_run' ? '~' : '✗';
    console.log(`  ${icon} ${r.segmentId}: ${r.status}${r.error ? ` — ${r.error}` : ''}`);
  }

  console.log(`\n=== No Drive Recording Found (manual upload required) ===`);
  for (const id of NO_RECORDING) {
    console.log(`  ⚠ ${id}`);
  }

  console.log(`\nDone.`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
