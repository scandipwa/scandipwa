import generateCustomResponse from '../util/CustomResponse';

/**
 *
 * @param {Request} request
 * @returns {boolean}
 */
const flushCache = (request) => {
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
};

/**
 *
 * @param event
 * @returns {Promise<Response>}
 */
const flushCacheHandler = (event) => {
    console.log('flush cache handler', event);
    if (flushCache(event.event.request)) return generateCustomResponse('ok');
    return generateCustomResponse('', 502, 'Cache flush request is missing or has wrong Cache-purge header');
};

export default flushCacheHandler;
export { flushCache };
