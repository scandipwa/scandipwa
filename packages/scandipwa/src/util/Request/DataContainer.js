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
import { executeGet } from 'Util/Request';
import { hash } from 'Util/Request/Hash';

import { ONE_MONTH_IN_SECONDS } from './QueryDispatcher';

/** @namespace Util/Request/DataContainer */
export class DataContainer extends PureComponent {
    dataModelName = 'DataContainer';

    componentWillUnmount() {
        if (this.promise) {
            this.promise.cancel();
        }
    }

    fetchData(rawQueries, onSuccess = noopFn, onError = noopFn) {
        const preparedQuery = prepareQuery(rawQueries);
        const { query, variables } = preparedQuery;
        const queryHash = hash(query + JSON.stringify(variables));

        if (!window.dataCache) {
            window.dataCache = {};
        }

        if (window.dataCache[queryHash]) {
            onSuccess(window.dataCache[queryHash]);

            return;
        }

        this.promise = makeCancelable(
            executeGet(preparedQuery, this.dataModelName, ONE_MONTH_IN_SECONDS)
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
    }
}

export default DataContainer;
