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

const ONE_YEAR_IN_SECONDS = 2630000;

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
const CacheFirstOneYear = event => cacheFirst(ONE_YEAR_IN_SECONDS).handle(event); // one day cache

export default CacheFirstOneYear;
export { cacheFirst };
