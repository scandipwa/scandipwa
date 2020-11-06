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

import {
    RECENTLY_VIEWED_PRODUCTS
} from 'Component/RecentlyViewedWidget/RecentlyViewedWidget.config';
import {
    UPDATE_RECENTLY_VIEWED_PRODUCTS
} from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.action';
import BrowserDatabase from 'Util/BrowserDatabase';

/** @namespace Store/RecentlyViewedProducts/Reducer/getInitialState */
export const getInitialState = () => ({
    recentlyViewedProducts: BrowserDatabase.getItem(RECENTLY_VIEWED_PRODUCTS) || []
});

/** @namespace Store/RecentlyViewedProducts/Reducer/recentlyViewedProductsReducer */
export const RecentlyViewedProductsReducer = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case UPDATE_RECENTLY_VIEWED_PRODUCTS:
        const { recentlyViewedProducts = [] } = action;

        BrowserDatabase.setItem(recentlyViewedProducts, RECENTLY_VIEWED_PRODUCTS);

        return { ...state, recentlyViewedProducts };

    default:
        return state;
    }
};

export default RecentlyViewedProductsReducer;
