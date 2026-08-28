const CACHE_NAME = 'mileage-log-v4-mobile-redesign';
const ASSETS = [
  './mileage_log.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './expense_template.xlsx',
  './monthly_mileage_template.xlsx'
];

// Install: cache all assets, activate this version immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clear old caches, take control of open tabs right away
// (important here — this version replaces local-storage saving with
// Firebase, so everyone needs to be moved onto it, not left on the old cache)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network.
// Firebase's own requests (auth/firestore/storage) are cross-origin and pass
// straight through — only same-origin app files are cached here.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
