'use strict'

const SW_VERSION_UUID = '4ec674c5-3f14-4bd8-8ae5-598a1972487c';
const CACHE_NAME = Date.now().toString();
const urlsToCache = [
    './index.html',
    './css/style.css',
    './js/web.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }).then(skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        clients.claim().then(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
        ));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            } else {
                let fetchRequest = event.request.clone();
                return fetch(fetchRequest)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        let responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        }).catch(e => {
                            console.error(e);
                        });
                        return response;
                    });
            }
        })
    );
})