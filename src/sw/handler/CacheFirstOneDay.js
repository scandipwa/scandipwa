/* eslint-disable no-undef */
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

/**
 *
 * @param time
 * @returns {workbox.strategies.CacheFirst}
 */
const cacheFirst = time => new workbox.strategies.CacheFirst({
    cacheName: CACHE_NAME,
    plugins: [
        new workbox.expiration.Plugin({
            maxAgeSeconds: time
        })
    ]
});

/**
 * @param event
 * @returns {void|*}
 */
const cacheFirstOneDay = event => cacheFirst(24 * 60 * 60).handle(event); // one day cache

export default cacheFirstOneDay;
export { cacheFirst };
