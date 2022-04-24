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

import { Query } from '@tilework/opus';
import { PureComponent } from 'react';

import { noopFn } from 'Util/Common';
import { makeCancelable } from 'Util/Promise';
import { CancelablePromise } from 'Util/Promise/Promise.type';
import { prepareQuery } from 'Util/Query';
import { executeGet, listenForBroadCast } from 'Util/Request';
import { hash } from 'Util/Request/Hash';

import { ONE_MONTH_IN_SECONDS } from './QueryDispatcher';

/** @namespace Util/Request/DataContainer */
export class DataContainer<
P = Record<string, unknown>,
S = Record<string, unknown>
> extends PureComponent<P, S> {
    protected dataModelName = '';

    protected isShouldListenForBroadcast = true;

    protected cacheTTL = ONE_MONTH_IN_SECONDS;

    protected promise?: CancelablePromise<unknown>;

    __construct(
        props: P,
        dataModelName = '',
        isShouldListenForBroadcast = true,
        cacheTTL = ONE_MONTH_IN_SECONDS
    ): void {
        super.__construct?.(props);

        this.dataModelName = dataModelName;
        this.isShouldListenForBroadcast = isShouldListenForBroadcast;
        this.cacheTTL = cacheTTL;
        this.promise = undefined;
    }

    componentWillUnmount(): void {
        if (this.promise) {
            this.promise.cancel();
        }
    }

    fetchData<T = unknown>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rawQueries: Query<string, any, boolean>[],
        onSuccess: (x: T) => void = noopFn,
        onError: (x: unknown) => void = noopFn,
        takeFromWindowCache = true
    ): void {
        const preparedQuery = prepareQuery(rawQueries);
        const { query, variables } = preparedQuery;
        const queryHash = hash(query + JSON.stringify(variables));

        if (!window.dataCache) {
            window.dataCache = {};
        }

        if (takeFromWindowCache && window.dataCache[queryHash]) {
            onSuccess(window.dataCache[queryHash] as T);

            return;
        }

        this.promise = makeCancelable(
            executeGet(preparedQuery, this.dataModelName, this.cacheTTL)
        );

        this.promise.promise.then(
            /** @namespace Util/Request/DataContainer/DataContainer/fetchData/then */
            (response) => {
                (window.dataCache || {})[queryHash] = response;
                onSuccess(response as T);
            },
            /** @namespace Util/Request/DataContainer/DataContainer/fetchData/then/onError/catch */
            (err) => onError(err)
        );

        if (this.isShouldListenForBroadcast) {
            listenForBroadCast<T>(this.dataModelName).then(
                /** @namespace Util/Request/DataContainer/DataContainer/fetchData/listenForBroadCast/then/onSuccess */
                onSuccess
            );
        }
    }
}

export default DataContainer;
