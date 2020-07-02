/* eslint-disable */
import { RESPONSE_OK } from './StaleWhileRevalidateHandler';

/**
 * Allow send data to this hosts without cache
 * Should be in regex format. Example: (?!^.*cloudpayments\.ru)
 *
 * @type {Array}
 * @namespace SW/Handler/UrlHandler/getBypassCacheHosts
 */
const getBypassCacheHosts = () => ([
    // Project specific
    '(?!^.*admin)', // Magento Admin
    '(?!^.*graphql)', // GraphQL
    '(?!^.*sockjs)', // Local socket for webpack hot-reload
    '(?!^.*maildev)', // Mail-dev (could be unused, legacy)
    // Miscellaneous
    '(?!^.*youtube)',
    '(?!^.*vimeo)',
    // Payment endpoints
    '(?!^.*paypal)', // PayPal
    '(?!^.*braintree)', // Braintree
    '(?!^.*klarna)', // Klarna
    // GTM endpoints
    '(?!^.*googletagmanager\\.com)',
    '(?!^.*onthe\\.io)',
    '(?!^.*google\\-analytics\\.com)',
    '(?!^.*facebook\\.net )',
    '(?!^.*doubleclick\\.net)',
    '(?!^.*yandex\\.ru)',
    '(?!^.*ringostat\\.net)'
]);

/**
 * Build regex to cache some request. Or bypass some domains from caching
 *
 * @return {RegExp}
 * @namespace SW/Handler/UrlHandler/getCacheUrlMatchRegex
 */
const getCacheUrlMatchRegex = () => {
    const bypassHosts = getBypassCacheHosts().join('');
    return new RegExp(`(?=^.*[^.]{6}$)${bypassHosts}.*`);
};

/** @namespace SW/Handler/UrlHandler/cacheUrl */
const cacheUrl = async (workboxEvent) => {
    const { url: { hostname } } = workboxEvent;

    if (hostname !== self.location.hostname) {
        return;
    }

    const cache = await caches.open(self.CACHE_NAME);
    const responseFromCache = await cache.match('/');

    if (responseFromCache) {
        return responseFromCache;
    }

    const rootResponse = await fetch('/');

    // if status 200 – cache
    if (rootResponse.status === RESPONSE_OK) {
        cache.put('/', rootResponse.clone());
        return rootResponse;
    }
};

/** @namespace SW/Handler/UrlHandler/cacheUrlHandler */
const cacheUrlHandler = (workboxEvent) => {
    const { event } = workboxEvent;
    event.respondWith(cacheUrl(workboxEvent));
};

export { cacheUrlHandler, getCacheUrlMatchRegex };
