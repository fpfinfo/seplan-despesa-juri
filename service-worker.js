const CACHE_NAME = 'estudo-tjpa-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', evt => {
  evt.waitUntil(caches.keys().then(keys => 
    Promise.all(keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); }))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', evt => {
  evt.respondWith(caches.match(evt.request).then(resp => resp || fetch(evt.request)));
});