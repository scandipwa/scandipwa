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

import { QueryDispatcher } from 'Util/Request';
import { UrlRewritesQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import { updateUrlRewrite, clearUrlRewrite } from 'Store/UrlRewrites';

/**
 * Url Rewrite Dispathcer
 * @class UrlRewritesDispatcher
 * @extends RequestDispatcher
 */
export class UrlRewritesDispatcher extends QueryDispatcher {
    constructor() {
        super('UrlRewrites');
    }

    onSuccess({ urlResolver }, dispatch) {
        dispatch(updateUrlRewrite(urlResolver || { notFound: true }));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Menu!', error));
    }

    /**
     * Prepare UrlRewrite requests
     * @param {Object} options A object containing different aspects of query, each item can be omitted
     * @return {Query} UrlRewrite query
     * @memberof UrlRewritesDispatcher
     */
    prepareRequest(options) {
        return [UrlRewritesQuery.getQuery(options)];
    }

    /**
     * Clear url rewrites
     * @param {Function} dispatch
     * @memberof UrlRewritesDispatcher
     */
    clearUrlRewrites(dispatch) {
        dispatch(clearUrlRewrite());
    }
}

export default new UrlRewritesDispatcher();
