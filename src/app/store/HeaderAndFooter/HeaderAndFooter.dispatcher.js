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
import { MenuQuery, CmsBlockQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import { updateMenu, toggleHeaderAndFooter } from 'Store/HeaderAndFooter';
import { updateCmsBlocks } from 'Store/CmsBlocksAndSlider';

export class HeaderAndFooterDispatcher extends QueryDispatcher {
    constructor() {
        super('HeaderAndFooter', 86400);
    }

    onSuccess(options, dispatch) {
        if (options) {
            const { menu, cmsBlocks } = options;
            dispatch(updateMenu(menu));
            dispatch(updateCmsBlocks(cmsBlocks));
        }
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Header or Footer!', error));
    }

    /**
     * Prepare Header and Footer requests
     * @param {{ menuId: String }} options A object containing different aspects of query, each item can be omitted
     * @return {Query} Menu query
     * @memberof HeaderAndFooterDispatcher
     */
    prepareRequest(options) {
        return [
            MenuQuery.getQuery(options.menu),
            CmsBlockQuery.getQuery(options.footer)
        ];
    }

    toggleHeaderAndFooter(dispatch, options) {
        return dispatch(toggleHeaderAndFooter(options.isHeaderAndFooterVisible));
    }
}

export default new HeaderAndFooterDispatcher();
