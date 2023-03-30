self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('first-app')
        .then(function(cache) {
          cache.addAll([
            '/',
            'https://bubleygum.github.io/index.html',
            'https://bubleygum.github.io/app.css',
            'https://bubleygum.github.io/app.js'
          ])
        })
    );
    return self.clients.claim();
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(res) {
          return res;
        })
    );
  });
  
