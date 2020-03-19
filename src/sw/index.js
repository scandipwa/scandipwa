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
import cacheFirstOneYear from './handler/CacheFirstOneYear';
import { cacheUrlHandler, getCacheUrlMatchRegex } from './handler/UrlHandler';
import staleWhileRevalidateHandler from './handler/StaleWhileRevalidateHandler';

// ====== Register SW ======

if (self.__precacheManifest) {
    self.__precacheManifest.push({
        revision: new Date().getTime(),
        url: '/'
    });

    workbox.precaching.precacheAndRoute(self.__precacheManifest);
}

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

// ====== Register routes ======

self.CACHE_NAME = 'app-runtime-static';

/**
 * Handle URLs (not assets)
 *
 * @return {void}
 */
workbox.routing.registerRoute(getCacheUrlMatchRegex(), cacheUrlHandler);

/**
 * Handle GraphQL responses
 *
 * @return {void}
 */
workbox.routing.registerRoute(new RegExp(/\/graphql/), staleWhileRevalidateHandler);

/**
 * Handle static assets responses
 *
 * @return {void}
 */
workbox.routing.registerRoute(new RegExp(/(\/assets|\.css|\.js)/), cacheFirstOneYear);
