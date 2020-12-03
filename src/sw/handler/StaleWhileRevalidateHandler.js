/* eslint-disable */

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

export const RESPONSE_OK = 200;

/** @namespace SW/Handler/StaleWhileRevalidateHandler/makeRequestAndUpdateCache */
const makeRequestAndUpdateCache = (request, cache) => fetch(request).then((response) => {
    const isValid = response.status === RESPONSE_OK;
    const responseToCache = response.clone();
    if (isValid) cache.put(request.url, responseToCache);
    return response;
});

/** @namespace SW/Handler/StaleWhileRevalidateHandler/shouldBeRevalidated */
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

/** @namespace SW/Handler/StaleWhileRevalidateHandler/staleWhileRevalidate */
const staleWhileRevalidate = async (event) => {
    const { request, request: url } = event;
    const cache = await caches.open(self.CACHE_NAME);
    const response = await cache.match(url);

    if (response) {
        shouldBeRevalidated(request, cache);
        return response;
    }

    return makeRequestAndUpdateCache(request, cache);
};

/** @namespace SW/Handler/StaleWhileRevalidateHandler/staleWhileRevalidateHandler */
const staleWhileRevalidateHandler = (workboxEvent) => {
    const { event } = workboxEvent;
    event.respondWith(staleWhileRevalidate(event));
};

export default staleWhileRevalidateHandler;
