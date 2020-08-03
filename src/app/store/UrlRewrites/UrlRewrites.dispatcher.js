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
import { updateUrlRewrite, clearUrlRewrite, setIsUrlRewritesLoading } from 'Store/UrlRewrites';

/**
 * Url Rewrite Dispathcer
 * @class UrlRewritesDispatcher
 * @extends RequestDispatcher
 * @namespace Store/UrlRewrites/Dispatcher
 */
export class UrlRewritesDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct('UrlRewrites');
    }

    onSuccess({ urlResolver }, dispatch) {
        dispatch(updateUrlRewrite(urlResolver || { notFound: true }));
    }

    onError(error, dispatch) {
        dispatch(setIsUrlRewritesLoading(false));
        dispatch(showNotification('error', 'Error fetching URL-rewrites!', error));
    }

    /**
     * Prepare UrlRewrite requests
     * @param {Object} options A object containing different aspects of query, each item can be omitted
     * @return {Query} UrlRewrite query
     * @memberof UrlRewritesDispatcher
     */
    prepareRequest(options, dispatch) {
        dispatch(setIsUrlRewritesLoading(true));
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

export default new (UrlRewritesDispatcher)();
