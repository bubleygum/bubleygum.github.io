var title = document.querySelector('.title');
var courseFeatureElements = document.querySelectorAll('.course-feature');
var button = document.querySelector('button');

navigator.serviceWorker.register('https://bubleygum.github.io/sw.js');

function animate() {
    title.classList.remove('animate-in');
    for (var i = 0; i < courseFeatureElements.length; i++) {
        courseFeatureElements[i].classList.remove('animate-in');
    }
    button.classList.remove('animate-in');

    setTimeout(function () {
        title.classList.add('animate-in');
    }, 1000);

    setTimeout(function () {
        courseFeatureElements[0].classList.add('animate-in');
    }, 3000);

    setTimeout(function () {
        courseFeatureElements[1].classList.add('animate-in');
    }, 4500);

    setTimeout(function () {
        courseFeatureElements[2].classList.add('animate-in');
    }, 6000);

    setTimeout(function () {
        courseFeatureElements[3].classList.add('animate-in');
    }, 7500);

    setTimeout(function () {
        courseFeatureElements[4].classList.add('animate-in');
    }, 9000);

    setTimeout(function () {
        courseFeatureElements[5].classList.add('animate-in');
    }, 10500);

    setTimeout(function () {
        courseFeatureElements[6].classList.add('animate-in');
    }, 12000);

    setTimeout(function () {
        button.classList.add('animate-in');
    }, 13500);
}

animate();

button.addEventListener('click', function () {
    animate();
});

var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
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

fetch('https://httpbin.org/post', {
  method: 'post',
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  },
    mode: 'cors',
    body: JSON.stringify({message: 'Does this work?'})
  })
  .then(function(response) {
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
        cache.add('/src/js/app.js')
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
          '/src/js/app.js',
          '/src/js/feed.js',
          '/src/js/promise.js',
          '/src/js/fetch.js',
          '/src/js/material.min.js',
          '/src/css/app.css',
          '/src/css/feed.css',
          '/src/images/main-image.jpg',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
        ]);
      })
  )
});

