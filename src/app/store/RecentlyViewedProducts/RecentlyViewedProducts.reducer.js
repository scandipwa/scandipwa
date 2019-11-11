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
import BrowserDatabase from 'Util/BrowserDatabase';
import {
    UPDATE_RECENTLY_VIEWED_PRODUCTS
} from 'Store/RecentlyViewedProducts';
import {
    RECENTLY_VIEWED_PRODUCTS
} from 'Component/RecentlyViewedProducts/RecentlyViewedProducts.component';

export const initialState = {
    recentlyViewedProducts: BrowserDatabase.getItem(RECENTLY_VIEWED_PRODUCTS) || []
};

const RecentlyViewedProductsReducer = (state = initialState, action) => {
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
