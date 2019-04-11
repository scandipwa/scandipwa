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

import { RequestDispatcher } from 'Util/Request';
import { UrlRewritesQuery, CmsBlockQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import { updateMenu } from 'Store/UrlRewrites';
import { updateCmsBlocks } from 'Store/CmsBlocksAndSlider';

class UrlRewritesDispatcher extends RequestDispatcher {
    constructor() {
        super('UrlRewrites', 86400);
    }

    onSuccess({ menu, cmsBlocks }, dispatch) {
        // dispatch(updateMenu(menu));
        // dispatch(updateCmsBlocks(cmsBlocks));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Menu!', error));
    }

    /**
     * Prepare Header and Footer requests
     * @param {{ menuId: String }} options A object containing different aspects of query, each item can be omitted
     * @return {Query} Menu query
     * @memberof UrlRewritesDispatcher
     */
    prepareRequest(options) {
        console.log('PREPARING REQUEST: ', options);
        return [UrlRewritesQuery.getQuery(options)];
    }
}

export default new UrlRewritesDispatcher();
