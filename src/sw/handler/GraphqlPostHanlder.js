import objectHash from 'object-hash';
import Logger from '../util/Logger';
import CacheTimestampsModel from '../model/Expiration';

const logger = new Logger('post handler', { groupCollapsed: '#0f306a' });

class GraphqlPostHanlder {
    /**
     * @param {String} storeName
     * @param {Object} config
     * @param {string} [config.type] The type of response: json|text|blob|arrayBuffer|formData
     */
    constructor(storeName, config) {
        GraphqlPostHanlder._validateConfig(config);
        this.type = config.type;
        this.timestampModel = new CacheTimestampsModel(storeName);
    }

    /**
     *
     * @param {Object} config
     * @private
     */
    static _validateConfig(config) {
        if (!Object.hasOwnProperty.call(config, 'type')) {
            throw new Error('Handler type must be set!');
        }
        const supportedTypes = ['blob', 'json', 'text', 'arrayBuffer', 'formData'];
        if (supportedTypes.indexOf(config.type) < 0) {
            throw new Error(`"${config.type}" is unsupported handler type`);
        }
    }

    /**
     *
     * @param record
     * @param maxAgeSeconds
     * @returns {boolean}
     * @private
     */
    _hasInvalidTimestamp(record, maxAgeSeconds) {
        return record.timestamp < Date.now() - (maxAgeSeconds * 1000);
    }

    /**
     * @param request
     * @returns {Promise<T | never>}
     *
     * @private
     */
    static _requestHash(request) {
        return request.clone().text().then((req) => {
            const reqHash = objectHash(req);
            return Promise.resolve(reqHash);
        });
    }

    /**
     * Get hash from request and request from db
     * @param request
     * @returns {*|PromiseLike<T | never>|Promise<T | never>}
     *
     * @private
     */
    _getFromDbByRequest(request) {
        return GraphqlPostHanlder._requestHash(request)
            .then(reqHash => this.timestampModel.getTimestamp(reqHash));
    }

    static fetchErrorHandler(error) {
        const errorBc = new BroadcastChannel('network-error');
        errorBc.postMessage(error);
        errorBc.close();
        return error;
    }

    /**
     *
     * @param {Request} request
     * @returns {Promise<any>}
     * @private
     */
    _fetch(request) {
        return new Promise((resolve) => {
            fetch(request.clone())
                .then(
                    response => resolve(response),
                    () => Handler.fetchErrorHandler({ offline: true, message: 'Fetch failed' }));
        });
    }

    /**
     *
     * @param {Response} response
     * @returns {*}
     */
    processResponse(response) {
        return new Promise((resolve) => {
            response[this.type]()
                .then(json => resolve(json),
                    () => GraphqlPostHanlder.fetchErrorHandler({ offline: false, message: 'Error parsing JSON' }));
        });
    }

    /**
     * Test if string is an integer
     * @param { String } str
     */
    _isInteger(str) {
        return str && /^\+?(0|[1-9]\d*)$/.test(str);
    }

    /**
     *
     * @param {Request} request
     * @returns {Promise<json>}
     */
    dataRequest(request) {
        return new Promise((resolve) => {
            this._fetch(request).then(this.processResponse.bind(this))
                .then((json) => {
                    GraphqlPostHanlder._requestHash(request)
                        .then(newHash => this.timestampModel.setTimestamp(newHash, json));
                    resolve(json);
                });
        });
    }

    /**
     * Checking if user is online, if he is, we are triggering all the requests in queue
     * otherwise writing it down in our IndexedDB
     *
     * @param request
     * @returns {*|PromiseLike<T | never>|Promise<T | never>}
     *
     */
    staleWhileRevalidate({ event: { request } }) {
        // cachedResponse should be implemented to work with cached data
        // basic response used for proof of concept
        const appModel = request.headers.get('Application-Model');
        const maxAge = request.headers.get('SW-Cache-Age');
        const maxAgeSeconds = this._isInteger(maxAge) ? parseInt(maxAge, 10) : 0;
        return this._getFromDbByRequest(request.clone()).then((cached) => {
            logger.groupCollapsed(`POST Handler is responding to: ${appModel}`);
            logger.log(`Max-Age for cache is '${maxAgeSeconds}' seconds.`);
            if (cached) {
                logger.log('Cache is present.');
                logger.groupCollapsed('View cached response body here.');
                logger.unprefixed.log(cached.body);
                logger.groupEnd();
                if (this._hasInvalidTimestamp(cached, maxAgeSeconds)) {
                    logger.log('Timestamp is invalid, re-validating request.');
                    this.dataRequest(request.clone()).then((body) => {
                        logger.groupCollapsed(`POST Handler has re-validated ${appModel}`);
                        logger.groupCollapsed('View fetch response body here.');
                        logger.unprefixed.log(body);
                        logger.groupEnd();
                        const bc = new BroadcastChannel(appModel);
                        bc.postMessage({ payload: body, type: appModel });
                        bc.close();
                        logger.log(`Message posted to BroadcastChannel ${appModel}`);
                        logger.groupEnd();
                    });
                } else {
                    logger.log('Timestamp is valid. No re-validation.');
                }
                logger.groupEnd();
                return new Response(JSON.stringify(cached.body));
            }

            logger.log('No cache present, fetching request.');
            return this.dataRequest(request.clone()).then((body) => {
                logger.groupCollapsed('View fetch response body here.');
                logger.unprefixed.log(body);
                logger.groupEnd();
                logger.groupEnd();
                return new Response(JSON.stringify(body));
            });
        });
    }
}

export default new GraphqlPostHanlder('gql_month', { type: 'json' });
export { GraphqlPostHanlder };
