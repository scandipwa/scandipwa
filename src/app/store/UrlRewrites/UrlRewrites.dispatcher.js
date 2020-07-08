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

import UrlRewritesQuery from 'Query/UrlRewrites.query';
import { showNotification } from 'Store/Notification';
import { clearUrlRewrite, setIsUrlRewritesLoading, updateUrlRewrite } from 'Store/UrlRewrites';
import { QueryDispatcher } from 'Util/Request';

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

export default new UrlRewritesDispatcher();
