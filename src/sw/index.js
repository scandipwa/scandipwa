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

import workbox from './util/Workbox';
import { flushCache } from './handler/FlushCache';
import cacheFirstOneDay, { cacheFirst } from './handler/CacheFirstOneDay';
import StaleWhileRevalidateHandler from './handler/StaleWhileRevalidateHandler';

// ====== Register routes ======

self.CACHE_NAME = 'app-runtime-static';

self.addEventListener('fetch', (event) => {
    const { request: { url } } = event;

    const { hostname } = new URL(url);
    if (hostname !== self.location.hostname) return;

    if (url.match(new RegExp(/(?=^.*[^.]{6}$)(?!^.*sockjs)(?!^.*graphql)(?!^.*admin).*/))) {
        event.respondWith(caches.open(self.CACHE_NAME)
            .then(cache => cache.match('/')
                .then(r => (!r
                    ? fetch('/').then((r) => {
                        if (r.status === 200) cache.put('/', r.clone()); // if status 200 – cache
                        return r; // return true response
                    }) // if does not, fetch
                    : r // if response exists, return
                ))));
    }

    if (url.match(new RegExp(/\/graphql/))) {
        StaleWhileRevalidateHandler(event);
    }
});

self.addEventListener('install', () => {
    self.skipWaiting();

    const flushCacheByHeader = (name, value) => {
        const headers = new Headers();
        headers.append(name, value);
        const r = new Request('/', { headers });
        flushCache(r);
    };

    const { core: { cacheNames: { precache } } } = workbox;

    flushCacheByHeader('Cache-purge', self.CACHE_NAME);
    flushCacheByHeader('Cache-purge', precache);
});

workbox.routing.registerRoute(new RegExp(/\/assets/), event => cacheFirst(60 * 60 * 24 * 30).handle(event));
workbox.routing.registerRoute(new RegExp(/\.css/), cacheFirstOneDay);
workbox.routing.registerRoute(new RegExp(/\.js/), cacheFirstOneDay);

if (self.__precacheManifest) {
    self.__precacheManifest.push({
        revision: new Date().getTime(),
        url: '/'
    });

    workbox.precaching.precacheAndRoute(self.__precacheManifest);
}
