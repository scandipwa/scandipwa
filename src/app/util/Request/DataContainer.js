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
import { executeGet } from 'Util/Request';
import { prepareQuery } from 'Util/Query';
import { hash } from 'Util/Request/Hash';
import { makeCancelable } from 'Util/Promise';
import { ONE_MONTH_IN_SECONDS } from './QueryDispatcher';

export class DataContainer extends PureComponent {
    dataModelName = 'DataContainer';

    componentWillUnmount() {
        if (this.promise) {
            this.promise.cancel();
        }
    }

    fetchData(rawQueries, onSucces = () => {}, onError = () => {}) {
        const preparedQuery = prepareQuery(rawQueries);
        const { query, variables } = preparedQuery;
        const queryHash = hash(query + JSON.stringify(variables));

        if (!window.dataCache) {
            window.dataCache = {};
        }

        if (window.dataCache[queryHash]) {
            onSucces(window.dataCache[queryHash]);
            return;
        }

        this.promise = makeCancelable(
            executeGet(preparedQuery, this.dataModelName, ONE_MONTH_IN_SECONDS)
        );

        this.promise.promise.then(
            (response) => {
                window.dataCache[queryHash] = response;
                onSucces(response);
            },
            err => onError(err)
        );
    }
}

export default DataContainer;
