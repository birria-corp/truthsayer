const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

const args = process.argv.slice(2);
const keyIdx = args.indexOf('--key');
const keyPath = keyIdx !== -1 ? args[keyIdx + 1] : './serviceAccountKey.json';

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function main() {
  // By doc ID patterns
  const candidates = ['ep-250', 'ep-250-the-empire-strikes-back', 'ep-250-empire-strikes-back'];
  for (const id of candidates) {
    const d = await db.collection('segments').doc(id).get();
    if (d.exists) {
      console.log(`Found by doc ID: ${id}`);
      console.log(JSON.stringify(d.data(), null, 2));
      return;
    }
  }

  // By episodeNumber
  const q = await db.collection('segments').where('episodeNumber', '==', 250).limit(5).get();
  if (!q.empty) {
    q.docs.forEach(d => {
      console.log(`doc ID: ${d.id}`);
      console.log(`  segmentId: ${d.data().segmentId}`);
      console.log(`  film: ${d.data().film}`);
      console.log(`  questionAudioUrl: ${d.data().questionAudioUrl || '—'}`);
      console.log(`  revealAudioUrl: ${d.data().revealAudioUrl || '—'}`);
    });
  } else {
    console.log('Not found by episodeNumber=250');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
