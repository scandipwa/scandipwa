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
 * Prefetches image
 * - By fetching one image at time, this allows us to inject request between caching.
 * @param curr
 * @param next
 * @namespace Util/Cache/cacheImage
 */
export const cacheImage = (curr, next = []) => {
    const img = new Image();

    if (next.length > 0) {
        img.onload = () => {
            cacheImage(next[0], next.slice(1, next.length - 1));
        };
    }

    img.importance = 'low';
    img.src = curr;
    window.prefetchedImages[curr] = img;
};

/**
 * Prefetches images
 * @param urls
 * @returns {Promise<void>}
 * @namespace Util/Cache/cacheImages
 */
export const cacheImages = (urls = []) => {
    if (!Array.isArray(urls) || urls.length === 0) {
        return;
    }

    // Prefetched images require persistent variable
    // to prevent browser from creating repeated requests
    if (!window.prefetchedImages) {
        window.prefetchedImages = {};
    }

    const filteredUrls = urls.filter((url) => !window.prefetchedImages[url]);
    cacheImage(filteredUrls[0], filteredUrls.slice(1, filteredUrls.length - 1));
};

/**
 * Returns result from global cache for fn
 * @param {function} fn
 * @param {array} args
 * @returns function response
 * @namespace Util/Cache/fromCache
 */
export const fromCache = (fn, args) => {
    // Checks if cache is defined
    if (fromCache.cache === undefined) {
        fromCache.cache = {};
    }

    // Checks if function is registered into cache
    const { name } = fn;

    if (fromCache.cache[name] === undefined) {
        fromCache.cache[name] = {};
    }

    // Generates key from args
    const key = JSON.stringify(args);

    // Finds response
    const { cache, cache: { [name]: { [key]: cachedResponse } = {} } = {} } = fromCache;

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
export const clearCacheFor = (fn) => {
    if (fromCache.cache === undefined) {
        return;
    }

    const { name } = fn;
    fromCache.cache[name] = {};
};

export default fromCache;
