/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
/* eslint-disable no-undef */
import cacheFirstOneYear from './handler/CacheFirstOneYear';
import staleWhileRevalidateHandler, { RESPONSE_OK } from './handler/StaleWhileRevalidateHandler';
import workbox from './util/Workbox';

// ====== Register SW ======
if (self.__precacheManifest) {
    self.__precacheManifest.push({
        revision: new Date().getTime(),
        url: '/'
    });
    workbox.precaching.precacheAndRoute(self.__precacheManifest);
}

export const respondOffline = async (event) => {
    const cache = await caches.open(self.CACHE_NAME);
    const responseFromCache = await cache.match('/');

    if (!navigator.onLine) {
        return responseFromCache; // respond from cache
    }

    if (!responseFromCache) {
        const rootResponse = await fetch('/'); // respond from server

        if (rootResponse.status === RESPONSE_OK) { // cache only 200 responses
            cache.put('/', rootResponse.clone());
        }
    }

    return fetch(event.request); // respond from server
};

export const onFetch = (event) => {
    const { request: { url, destination } } = event;
    const { hostname } = new URL(url);

    if (destination !== 'document') { // skip all NON documents
        return;
    }

    if (hostname !== self.location.hostname) { // skip requests to other domains
        return;
    }

    event.respondWith(respondOffline(event));
};

// Custom handler for offline document response
self.addEventListener('fetch', onFetch);

self.addEventListener('install', () => {
    self.skipWaiting();
});

const clearCache = () => (
    Promise.all([
        // clear all caches
        caches.keys().then((cacheNames) => (
            Promise.all(
                cacheNames.map((cacheName) => caches.delete(cacheName))
            )
        )),
        // clear indexed DB
        new Promise((resolve) => {
            if (!indexedDB) {
                resolve();
            }

            const request = indexedDB.deleteDatabase(self.CACHE_NAME);
            request.onerror = () => resolve();
            request.onsuccess = () => resolve();
        })
    ])
);

self.addEventListener('activate', (event) => { // clears all caches on re-deploy
    event.waitUntil(clearCache());
});

// ====== Register routes ======

self.CACHE_NAME = 'app-runtime-static';

// handle GraphQL
workbox.routing.registerRoute(new RegExp(/\/graphql/), staleWhileRevalidateHandler);

// handle static assets responses
workbox.routing.registerRoute(new RegExp(/(\/assets|\.css|\.js)/), cacheFirstOneYear);
