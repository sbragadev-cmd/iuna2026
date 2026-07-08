const CACHE_NAME = 'iuna-app-v2-cache-v1';
const ASSETS = ['/', '/index.html', '/css/style.css', '/css/mobile.css', '/js/app.js', '/manifest.json'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
