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
    MAX_NUMBER_OF_RECENT_PRODUCTS,
    RECENTLY_VIEWED_PRODUCTS
} from 'Component/RecentlyViewedWidget/RecentlyViewedWidget.config';
import {
    UPDATE_RECENTLY_VIEWED_PRODUCTS
} from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.action';
import BrowserDatabase from 'Util/BrowserDatabase';

/** @namespace Store/RecentlyViewedProducts/Reducer/getInitialState */
export const getInitialState = () => ({
    recentlyViewedProducts: BrowserDatabase.getItem(RECENTLY_VIEWED_PRODUCTS) || {}
});

/** @namespace Store/RecentlyViewedProducts/Reducer/recentlyViewedProductsReducer */
export const RecentlyViewedProductsReducer = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case UPDATE_RECENTLY_VIEWED_PRODUCTS:
        const {
            product,
            product: { sku: newSku }
        } = action;

        const { recentlyViewedProducts = {} } = state;
        const { store } = action;
        const storeProducts = recentlyViewedProducts[store] ?? [];

        if (storeProducts.length === MAX_NUMBER_OF_RECENT_PRODUCTS) {
            storeProducts.pop();
        }

        // Remove product from existing recentProducts to add it later in the beginning
        const newStoreRecentProducts = storeProducts.filter(({ sku }) => (newSku !== sku));
        newStoreRecentProducts.unshift(product);

        const newRecentProducts = {
            ...recentlyViewedProducts,
            [store]: newStoreRecentProducts
        };

        BrowserDatabase.setItem(newRecentProducts, RECENTLY_VIEWED_PRODUCTS);

        return { ...state, recentlyViewedProducts: newRecentProducts };

    default:
        return state;
    }
};

export default RecentlyViewedProductsReducer;
