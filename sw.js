self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('first-app')
        .then(function(cache) {
          cache.addAll([
            '/',
            '/index.html',
            '/styles.css',
            '/app.js'
          ])
        })
    );
    return self.clients.claim();
  });

  //install
  self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    self.skipWaiting(); //PENTING bila ada versi baru!!
    event.waitUntil(
      caches.open('static')
        .then(function(cache) {
          console.log('[Service Worker] Precaching App Shell');
          cache.addAll([
            '/',
            '/index.html',
            '/blog.html',
            '/contact.html',
            '/about.html',
            '/app.js',
            '/styles.css',
            '/images/about-header.jpg',
            '/images/contact-image.jpg',
            '/images/example-blog01.jpg',
            '/images/example-blog02.jpg',
            '/images/example-blog03.jpg',
            '/images/example-blog04.jpg',
            '/images/example-blog05.jpg',
            '/images/example-blog06.jpg',
            '/images/example-blog07.jpg',
            '/images/example-work01.jpg',
            '/images/example-work02.jpg',
            '/images/example-work03.jpg',
            '/images/example-work04.jpg',
            '/images/example-work05.jpg',
            '/images/example-work06.jpg',
            '/images/example-work07.jpg',
            '/images/example-work08.jpg',
            '/images/example-work09.jpg',
            'https://fonts.googleapis.com/css?family=Roboto:400,700',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
          ]);
        })
    )
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(res) {
          return res;
        })
    );
  });
  
  fetch('https://httpbin.org/ip').
  then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
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
  
  
//   //cache then network
//   self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.open(CACHE_DYNAMIC_NAME)
//         .then(function(cache) {
//           return fetch(event.request)
//             .then(function(res) {
//               cache.put(event.request, res.clone());
//               return res;
//             });
//         })
//     );
//   });
  