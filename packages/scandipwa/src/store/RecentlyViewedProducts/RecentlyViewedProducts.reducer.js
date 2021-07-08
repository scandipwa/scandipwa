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
    ADD_RECENTLY_VIEWED_PRODUCT,
    UPDATE_RECENTLY_VIEWED_PRODUCTS
} from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.action';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProducts } from 'Util/Product';

/** @namespace Store/RecentlyViewedProducts/Reducer/getInitialState */
export const getInitialState = () => ({
    recentlyViewedProducts: BrowserDatabase.getItem(RECENTLY_VIEWED_PRODUCTS) || {},
    shouldBeUpdated: true
});

/** @namespace Store/RecentlyViewedProducts/Reducer/recentlyViewedProductsReducer */
export const RecentlyViewedProductsReducer = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case ADD_RECENTLY_VIEWED_PRODUCT:
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

        return {
            ...state,
            recentlyViewedProducts: newRecentProducts,
            shouldBeUpdated: true
        };

    case UPDATE_RECENTLY_VIEWED_PRODUCTS:
        const {
            products,
            storeCode
        } = action;
        const { recentlyViewedProducts: recent = {} } = state;

        const indexedProducts = getIndexedProducts(products);
        const recentProductsFromStorage = BrowserDatabase.getItem(RECENTLY_VIEWED_PRODUCTS) || [];

        // Remove product from storage if it is not available
        recentProductsFromStorage[storeCode] = recentProductsFromStorage[storeCode]
            .filter((storageItem) => !indexedProducts.every((indexedItem) => indexedItem.id !== storageItem.id));

        BrowserDatabase.setItem(recentProductsFromStorage, RECENTLY_VIEWED_PRODUCTS);

        // Sort products same as it is localstorage recentlyViewedProducts
        const sortedRecentProducts = recentProductsFromStorage[storeCode].reduce((acc, { sku }) => {
            const sortedProduct = indexedProducts.find((item) => item.sku === sku);

            return [...acc, sortedProduct];
        }, []);

        const updatedRecentViewedProducts = {
            ...recent,
            [storeCode]: sortedRecentProducts
        };

        return {
            ...state,
            recentlyViewedProducts: updatedRecentViewedProducts,
            shouldBeUpdated: false
        };
    default:
        return state;
    }
};

export default RecentlyViewedProductsReducer;
