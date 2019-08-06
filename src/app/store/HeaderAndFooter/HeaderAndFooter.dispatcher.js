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
import { MenuQuery, CmsBlockQuery, RegionQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import { updateMenu, toggleHeaderAndFooter, getCountryList } from 'Store/HeaderAndFooter';
import { updateCmsBlocks } from 'Store/CmsBlocksAndSlider';

class HeaderAndFooterDispatcher extends QueryDispatcher {
    constructor() {
        super('HeaderAndFooter', 31536000);
    }

    onSuccess(options, dispatch) {
        if (options) {
            const { menu, cmsBlocks, countries } = options;
            dispatch(updateMenu(menu));
            dispatch(updateCmsBlocks(cmsBlocks));
            dispatch(getCountryList(countries));
        }
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', 'Error fetching Menu!', error));
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
            CmsBlockQuery.getQuery(options.footer),
            RegionQuery.getCountriesList()
        ];
    }
}

export default new HeaderAndFooterDispatcher();
