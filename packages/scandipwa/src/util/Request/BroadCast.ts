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

import { NetworkError } from 'Type/Common.type';
import { prepareQuery } from 'Util/Query';

import { executeGet, listenForBroadCast } from './Request';

export const ONE_MONTH_IN_SECONDS = 2592000;

window.abortControllers = {};

/** @namespace Util/Request/BroadCast/isAbortError */
export const isAbortError = (error: NetworkError): boolean => {
    if (error.message.includes('AbortError')) {
        return true;
    }

    return false;
};

/** @namespace Util/Request/BroadCast/fetchCancelableQuery */
export const fetchCancelableQuery = async <Data>(
    rawQueries: Query<any, any, any> | Query<any, any, any>[],
    name: string,
    cacheTTL = ONE_MONTH_IN_SECONDS,
): Promise<Data> => {
    const { abortControllers } = window;
    const { [name]: existingController, ...rest } = abortControllers;

    const queries = rawQueries instanceof Query ? [rawQueries] : rawQueries;

    if (existingController) {
        existingController.abort();
    }

    window.abortControllers[name] = new AbortController();

    const promise = await executeGet<Data>(prepareQuery(queries), name, cacheTTL, window.abortControllers[name].signal);

    if (promise) {
        window.abortControllers = { ...rest };

        return promise;
    }

    const broadcast = await listenForBroadCast<Data>(name);

    window.abortControllers = { ...rest };

    return broadcast;
};
