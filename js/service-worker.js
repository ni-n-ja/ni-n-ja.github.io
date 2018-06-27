'use strict'

const SW_VERSION_UUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

const urlsToCache = [
    './index.html',
    './css/style.css',
    './js/web.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(SW_VERSION_UUID).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheVersionsArray) => {
            return Promise.all(
                cacheVersionsArray.map((cacheVersion) => {
                    if (cacheVersion !== SW_VERSION_UUID) {
                        return caches.delete(cacheVersion);
                    }
                })
            );
        })
    );
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
                        caches.open(SW_VERSION_UUID).then((cache) => {
                            cache.put(event.request, responseToCache);
                        }).catch(e => {
                            console.error(e);
                        });
                        return response;
                    });
            }
        })
    );
});