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

import { QueryDispatcher, executePost } from 'Util/Request';
import { MenuQuery, CmsBlockQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import { updateMenu, toggleHeaderAndFooter, getCountryList } from 'Store/HeaderAndFooter';
import { updateCmsBlocks } from 'Store/CmsBlocksAndSlider';
import { prepareQuery } from 'Util/Query';
import HeaderAndFooter from 'Query/HeaderAndFooter.query';

class HeaderAndFooterDispatcher extends QueryDispatcher {
    constructor() {
        super('HeaderAndFooter', 86400);
    }

    onSuccess({ menu, cmsBlocks }, dispatch) {
        dispatch(updateMenu(menu));
        dispatch(updateCmsBlocks(cmsBlocks));
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
            CmsBlockQuery.getQuery(options.footer)
        ];
    }

    toggleHeaderAndFooter(dispatch, options) {
        return dispatch(toggleHeaderAndFooter(options.isHeaderAndFooterVisible));
    }

    getCountriesList(dispatch) {
        const query = HeaderAndFooter.getCountriesList();

        return executePost(prepareQuery([query])).then(
            ({ countries }) => dispatch(getCountryList(countries)),
            // eslint-disable-next-line no-console
            error => console.log(error)
        );
    }
}

export default new HeaderAndFooterDispatcher();
