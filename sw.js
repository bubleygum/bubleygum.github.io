

//fetch
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (res) {
            return res;
        })
    );
});

//cache then network
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_DYNAMIC_NAME)
        .then(function (cache) {
            return fetch(event.request)
                .then(function (res) {
                    cache.put(event.request, res.clone());
                    return res;
                });
        })
    );
});