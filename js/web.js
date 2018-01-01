'use strict'

window.onload = function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js', {
                scope: './'
            }).then((registration) => {})
            .catch((e) => {
                console.error(e);
            });
    }
}