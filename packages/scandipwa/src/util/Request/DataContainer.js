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

import { PureComponent } from 'react';

import { noopFn } from 'Util/Common';
import { makeCancelable } from 'Util/Promise';
import { prepareQuery } from 'Util/Query';
import { executeGet, listenForBroadCast } from 'Util/Request';
import { hash } from 'Util/Request/Hash';

import { ONE_MONTH_IN_SECONDS } from './QueryDispatcher';

/** @namespace Util/Request/DataContainer */
export class DataContainer extends PureComponent {
    __construct(props, dataModelName, isShouldListenForBroadcast = true, cacheTTL = ONE_MONTH_IN_SECONDS) {
        super.__construct(props);
        this.dataModelName = dataModelName;
        this.isShouldListenForBroadcast = isShouldListenForBroadcast;
        this.cacheTTL = cacheTTL;
        this.promise = null;
    }

    componentWillUnmount() {
        if (this.promise) {
            this.promise.cancel();
        }
    }

    fetchData(rawQueries, onSuccess = noopFn, onError = noopFn, takeFromWindowCache = true) {
        const preparedQuery = prepareQuery(rawQueries);
        const { query, variables } = preparedQuery;
        const queryHash = hash(query + JSON.stringify(variables));

        if (!window.dataCache) {
            window.dataCache = {};
        }

        if (takeFromWindowCache && window.dataCache[queryHash]) {
            onSuccess(window.dataCache[queryHash]);

            return;
        }

        this.promise = makeCancelable(
            executeGet(preparedQuery, this.dataModelName, this.cacheTTL)
        );

        this.promise.promise.then(
            /** @namespace Util/Request/DataContainer/DataContainer/fetchData/then */
            (response) => {
                window.dataCache[queryHash] = response;
                onSuccess(response);
            },
            /** @namespace Util/Request/DataContainer/DataContainer/fetchData/then/onError/catch */
            (err) => onError(err)
        );

        if (this.isShouldListenForBroadcast) {
            listenForBroadCast(this.dataModelName).then(
                /** @namespace Util/Request/DataContainer/DataContainer/fetchData/listenForBroadCast/then/onSuccess */
                onSuccess
            );
        }
    }
}

export default DataContainer;
