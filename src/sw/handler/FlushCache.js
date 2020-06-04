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

import generateCustomResponse from '../util/CustomResponse';

/**
 * @param {Request} request
 * @returns {boolean}
 */
const flushCache = middleware(
    (request) => {
        if (!request.headers.has('Cache-purge') || !request.headers.get('Cache-purge')) return false;
        const resource = request.headers.get('Cache-purge');
        if (resource[0] !== '/') {
            caches.open(resource).then((cache) => {
                cache.keys().then((elements) => {
                    elements.forEach((element) => {
                        cache.delete(element);
                    });
                });
            });
        } else {
            caches.open(CACHE_NAME).then((cache) => {
                console.log(`Purging cache: ${resource}`);
                cache.delete(resource);
            });
        }

        return true;
    },
    'SW/Handler/StaleWhileRevalidateHandler/flushCache'
);

/**
 * @param event
 * @returns {Promise<Response>}
 */
const flushCacheHandler = middleware(
    (event) => {
        console.log('flush cache handler', event);
        if (flushCache(event.event.request)) return generateCustomResponse('ok');
        const ERROR_CODE_502 = 502;
        return generateCustomResponse('', ERROR_CODE_502, 'Cache flush request is missing or has wrong Cache-purge header');
    },
    'SW/Handler/StaleWhileRevalidateHandler/flushCacheHandler'
);

export default flushCacheHandler;
export { flushCache };
