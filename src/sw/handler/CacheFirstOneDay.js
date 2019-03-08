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
