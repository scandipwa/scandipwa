/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

export type CacheMap = {
    cache: Record<string, any>;
};

/**
 * Prefetches images
 * @param urls
 * @returns {Promise<void>}
 * @namespace Util/Cache/cacheImages
 */
export const cacheImages = (urls: string[]): void => {
    if (!Array.isArray(urls) || urls.length === 0) {
        return;
    }

    // Prefetched images require persistent variable
    // to prevent browser from creating repeated requests
    if (!window.prefetchedImages) {
        window.prefetchedImages = {};
    }

    const filteredUrls = urls.filter((url) => !window.prefetchedImages[url]);

    filteredUrls.forEach((url) => {
        const img = new Image();

        img.src = url;
        window.prefetchedImages[url] = img;
    });
};

/**
 * Returns result from global cache for fn
 * @param {function} fn
 * @param {array} args
 * @returns function response
 * @namespace Util/Cache/fromCache
 */
export const fromCache = (fn: any, args: any): any => {
    // Checks if cache is defined
    if ((fromCache as unknown as CacheMap).cache === undefined) {
        (fromCache as unknown as CacheMap).cache = {};
    }

    // Checks if function is registered into cache
    const { name } = fn;

    if ((fromCache as unknown as CacheMap).cache[name] === undefined) {
        (fromCache as unknown as CacheMap).cache[name] = {};
    }

    // Generates key from args
    const key = JSON.stringify(args);

    // Finds response
    const { cache, cache: { [name]: { [key]: cachedResponse } = {} } = {} } = (fromCache as unknown as CacheMap);

    // If already cached then returns cache value
    if (cachedResponse) {
        return cachedResponse;
    }

    // If not get response, caches it and return value
    const response = fn(...args);

    cache[name][key] = response;

    return response;
};

/**
 * Clears functions cache from global cache register
 * @param {function} fn
 * @namespace Util/Cache/clearCacheFor
 */
export const clearCacheFor = (fn: any): void => {
    if ((fromCache as unknown as CacheMap).cache === undefined) {
        return;
    }

    const { name } = fn;

    (fromCache as unknown as CacheMap).cache[name] = {};
};

export default fromCache;
