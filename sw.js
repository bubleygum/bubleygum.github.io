//install
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('first-app')
        .then(function(cache) {
          cache.addAll([
            '/',
            '/index.html',
            '/src/css/app.css',
            '/src/js/app.js'
          ])
        })
    );
    return self.clients.claim();
  });
  
//fetch
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(res) {
          return res;
        })
    );
  });

//cache
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
      caches.open('static')
        .then(function(cache) {
          console.log('[Service Worker] Precaching App Shell');
          cache.add('/app.js')
        })
    )
  });
  
  self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
    return self.clients.claim();
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
  });
  