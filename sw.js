const CACHE_NAME = 'btsccst-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap'
];

// Installation — mise en cache des fichiers essentiels
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Cache ouvert');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation — suppression des anciens caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch — stratégie "network first, cache fallback"
// Les fiches Drive sont servies depuis le réseau
// Le reste depuis le cache si hors ligne
self.addEventListener('fetch', function(e) {
  // Ne pas intercepter les requêtes Google Drive (PDF)
  if (e.request.url.includes('drive.google.com') ||
      e.request.url.includes('docs.google.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        // Mettre en cache la réponse fraîche
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(function() {
        // Hors ligne : servir depuis le cache
        return caches.match(e.request).then(function(cached) {
          if (cached) return cached;
          // Page de fallback hors ligne
          if (e.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
