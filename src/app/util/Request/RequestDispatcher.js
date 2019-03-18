/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { makeGraphqlRequest, listenForBroadCast } from 'Util/Request/Request';
import { prepareQuery, Field } from 'Util/Query';
import { makeCancelable } from 'Util/Promise';

/**
 * Abstract request dispatcher.
 * IMPORTANT: it is required to implement `prepareRequest(options)` before using!
 * @class RequestDispatcher
 */
class RequestDispatcher {
    /**
     * Creates an instance of RequestDispatcher.
     * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
     * @param  {Number} cacheTTL Cache TTL (in seconds) for ServiceWorker to cache responses
     * @memberof RequestDispatcher
     */
    constructor(name, cacheTTL) {
        this.name = name;
        this.cacheTTL = cacheTTL;
        this.promise = null;
    }

    /**
     * Is responsible for request routing and manages `onError`, `onSuccess`, `onUpdate` functions triggers.
     * @param  {Function} dispatch Store changing function from Redux (dispatches actions)
     * @param  {any} options Any options received from Container
     * @return {void}@memberof RequestDispatcher
     */
    handleData(dispatch, options) {
        const { name, cacheTTL } = this;
        const rawQueries = this.prepareRequest(options, dispatch);
        const queries = rawQueries instanceof Field ? [rawQueries] : rawQueries;

        if (this.promise) this.promise.cancel();

        this.promise = makeCancelable(
            new Promise((resolve, reject) => {
                makeGraphqlRequest(prepareQuery(queries), name, cacheTTL)
                    .then(data => resolve(data), error => reject(error));
            })
        );

        this.promise.promise.then(
            data => this.onSuccess(data, dispatch, options),
            error => this.onError(error, dispatch, options),
        );

        listenForBroadCast(name).then(
            data => this.onUpdate(data, dispatch),
        );
    }

    /**
     * Is triggered by BroadCast updated from ServiceWorker.
     * Should dispatch some action.
     * @param  {any} data Data received from fetch of GraphQL endpoint
     * @param  {Function} dispatch Store changing function from Redux (dispatches actions)
     * @return {void}
     * @memberof RequestDispatcher
     */
    onUpdate(data, dispatch) {
        this.onSuccess(data, dispatch);
    }

    /**
     * Is responsible for request building (request & mutation preparation)
     * @param  {any} options Any options received from Container
     * @param {Function} dispatch
     * @return {Array<Field>|Field} Array or single item of Field instances
     * @memberof RequestDispatcher
     */
    prepareRequest(options, dispatch) {}

    /**
     * Is triggered on successful fetch of GraphQL endpoint.
     * IMPORTANT: If there are any errors in response (`errors` field in JSON response from GraphQL), this function won't trigger!
     * Should dispatch some action.
     * @param  {any} data
     * @param  {any} dispatch
     * @return {void}@memberof RequestDispatcher
     */
    onSuccess(data, dispatch) {}

    /**
     * Is triggered on error in fetch of GraphQL endpoint.
     * IMPORTANT: If there are any errors in response (`errors` field in JSON response from GraphQL), this function will trigger!
     * Should dispatch some action.
     * @param  {any} error
     * @param  {any} dispatch
     * @return {void}@memberof RequestDispatcher
     */
    onError(error, dispatch) {}
}

export default RequestDispatcher;
