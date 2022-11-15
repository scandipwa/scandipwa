/* eslint-disable no-unused-vars */
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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import { NetworkError } from 'Type/Common.type';
import { CancelablePromise } from 'Util/Promise/Promise.type';
import { prepareQuery } from 'Util/Query';
import { executeGet, listenForBroadCast } from 'Util/Request/Request';

export const ONE_MONTH_IN_SECONDS = 2592000;
export const FIVE_MINUTES_IN_SECONDS = 300;

/**
 * Abstract request dispatcher.
 * IMPORTANT: it is required to implement `prepareRequest(options)` before using!
 * @class QueryDispatcher
 * @namespace Util/Request/QueryDispatcher
 */
export abstract class QueryDispatcher<Options, Data, Error = NetworkError | NetworkError[]> {
    protected name = '';

    protected cacheTTL = 0;

    protected promise: CancelablePromise<Data> | null = null;

    protected controller: AbortController | null = null;

    /**
     * Creates an instance of QueryDispatcher.
     * @param  {String} name Name of model for ServiceWorker to send BroadCasts updates to
     * @param  {Number} cacheTTL Cache TTL (in seconds) for ServiceWorker to cache responses
     * @memberof QueryDispatcher
     */
    __construct(name: string, cacheTTL = ONE_MONTH_IN_SECONDS): void {
        this.name = name;
        this.cacheTTL = cacheTTL;
        this.promise = null;
        this.controller = null;
    }

    async handleData(dispatch: Dispatch, options: Options): Promise<void> {
        const { name, cacheTTL } = this;

        const rawQueries = this.prepareRequest(options, dispatch);

        if (!rawQueries) {
            return;
        }

        const queries = rawQueries instanceof Query ? [rawQueries] : rawQueries;

        this.controller = new AbortController();

        try {
            this.promise = await executeGet(prepareQuery(queries), name, cacheTTL, this.controller.signal);

            if (this.promise) {
                this.onSuccess(this.promise, dispatch, options);
            }
        } catch (err) {
            if (!(err as NetworkError).message.includes('abort')) {
                this.onError(err as NetworkError, dispatch, options);
            }
        }

        const broadcast = await listenForBroadCast<Data>(name);

        this.onUpdate(broadcast, dispatch, options);
    }

    /**
     * Is triggered by BroadCast updated from ServiceWorker.
     * Should dispatch some action.
     * @param  {any} data Data received from fetch of GraphQL endpoint
     * @param  {Function} dispatch Store changing function from Redux (dispatches actions)
     * @return {void}
     * @memberof QueryDispatcher
     */
    onUpdate(data: Data, dispatch: Dispatch, options: Options): void {
        this.onSuccess(data, dispatch, options);
    }

    /**
     * Is responsible for request building (request & mutation preparation)
     * @param  {any} options Any options received from Container
     * @param {Function} dispatch
     * @return {Array<Field>|Field} Array or single item of Field instances
     * @memberof QueryDispatcher
     */
    abstract prepareRequest(
        options: Options,
        dispatch: Dispatch
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Query<any, any, any> | Query<any, any, any>[];

    /**
     * Is triggered on successful fetch of GraphQL endpoint.
     * IMPORTANT: If there are any errors in response (`errors` field in JSON response from GraphQL), this function won't trigger!
     * Should dispatch some action.
     * @param  {any} data
     * @param  {any} dispatch
     * @return {void}@memberof QueryDispatcher
     */
    abstract onSuccess(data: Data | CancelablePromise<Data>, dispatch: Dispatch, options: Options): void;

    /**
     * Is triggered on error in fetch of GraphQL endpoint.
     * IMPORTANT: If there are any errors in response (`errors` field in JSON response from GraphQL), this function will trigger!
     * Should dispatch some action.
     * @param  {any} error
     * @param  {any} dispatch
     * @return {void}@memberof QueryDispatcher
     */
    abstract onError(error: Error | NetworkError, dispatch: Dispatch, options: Options): void;
}

export default QueryDispatcher;
