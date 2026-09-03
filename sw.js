const CACHE_VERSION = 'truthsayer-v4.7';
const NETWORK_FIRST = ['index.html', 'version.json', 'sw.js'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_VERSION).then(cache =>
      cache.addAll(['/truthsayer/', '/truthsayer/index.html', '/truthsayer/manifest.json', '/truthsayer/icon.png'])
    )
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Always network-first for HTML, version check, and sw itself
  const isNetworkFirst = NETWORK_FIRST.some(f => url.pathname.endsWith(f))
    || url.pathname === '/truthsayer/'
    || url.pathname === '/truthsayer';

  if (isNetworkFirst) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(e.request, clone));
        }
        return res;
      }))
    );
  }
});
