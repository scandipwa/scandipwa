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
import { MenuQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import { updateMenu, toggleHeaderAndFooter } from 'Store/HeaderAndFooter';

export class HeaderAndFooterDispatcher extends QueryDispatcher {
    constructor() {
        super('HeaderAndFooter', 2628000);
    }

    onSuccess(options, dispatch) {
        if (options) {
            const { menu } = options;
            dispatch(updateMenu(menu));
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
            MenuQuery.getQuery(options.menu)
        ];
    }

    toggleHeaderAndFooter(dispatch, options) {
        return dispatch(toggleHeaderAndFooter(options.isHeaderAndFooterVisible));
    }
}

export default new HeaderAndFooterDispatcher();
