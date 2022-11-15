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

import { prepareQuery } from 'Util/Query';

import { executeGet, listenForBroadCast } from './Request';

export const ONE_MONTH_IN_SECONDS = 2592000;

window.abortControllers = {};

/** @namespace Util/Request/BroadCast/fetchQuery */
export const fetchQuery = async <Data>(
    rawQueries: any,
    name: string,
    cacheTTL = ONE_MONTH_IN_SECONDS,
): Promise<Data> => {
    const queries = rawQueries instanceof Query ? [rawQueries] : rawQueries;

    if (window.abortControllers[name]) {
        window.abortControllers[name].abort();
    }

    window.abortControllers[name] = new AbortController();

    const promise = await executeGet<Data>(prepareQuery(queries), name, cacheTTL, window.abortControllers[name].signal);

    if (promise) {
        delete window.abortControllers[name];

        return promise;
    }

    const broadcast = await listenForBroadCast<Data>(name);

    delete window.abortControllers[name];

    return broadcast;
};
