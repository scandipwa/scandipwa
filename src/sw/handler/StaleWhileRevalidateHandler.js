/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

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

const makeRequestAndUpdateCache = (request, cache) => fetch(request).then((response) => {
    const isValid = response.status === 200;
    const responseToCache = response.clone();
    if (isValid) cache.put(request.url, responseToCache);
    return response;
});

const shouldBeRevalidated = (request, cache) => {
    const type = request.headers.get('Application-Model');

    makeRequestAndUpdateCache(request, cache)
        .then((response) => {
            const responseClone = response.clone();
            responseClone.json().then((payload) => {
                const bc = new BroadcastChannel(type);
                bc.postMessage({ payload, type });
                bc.close();
            }, err => console.log(err));
        }, err => console.log(err));

    return true;
};

const StaleWhileRevalidateHandler = (event) => {
    const { request, request: url } = event;
    event.respondWith(caches.open(self.CACHE_NAME)
        .then(cache => cache.match(url)
            .then(cachedResponse => (!cachedResponse
                ? makeRequestAndUpdateCache(request, cache)
                : shouldBeRevalidated(request, cache) && cachedResponse
            ))));
};

export default StaleWhileRevalidateHandler;
