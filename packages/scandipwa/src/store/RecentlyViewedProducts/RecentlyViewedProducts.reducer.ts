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

import { Reducer } from 'redux';

import {
    MAX_NUMBER_OF_RECENT_PRODUCTS,
    RECENTLY_VIEWED_PRODUCTS
} from 'Component/RecentlyViewedWidget/RecentlyViewedWidget.config';
import { ProductItem } from 'Query/ProductList.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedProducts } from 'Util/Product';
import { IndexedProduct } from 'Util/Product/Product.type';

import {
    RecentlyViewedProductsAction,
    RecentlyViewedProductsActionType,
    RecentlyViewedProductsStore
} from './RecentlyViewedProducts.type';

/** @namespace Store/RecentlyViewedProducts/Reducer/getInitialState */
export const getInitialState = (): RecentlyViewedProductsStore => ({
    recentlyViewedProducts: BrowserDatabase.getItem(RECENTLY_VIEWED_PRODUCTS) || {},
    isLoading: true
});

/** @namespace Store/RecentlyViewedProducts/Reducer/RecentlyViewedProductsReducer */
export const RecentlyViewedProductsReducer: Reducer<RecentlyViewedProductsStore, RecentlyViewedProductsAction> = (
    state: RecentlyViewedProductsStore = getInitialState(),
    action: RecentlyViewedProductsAction
) => {
    switch (action.type) {
    case RecentlyViewedProductsActionType.ADD_RECENTLY_VIEWED_PRODUCT: {
        const {
            product,
            product: { sku: newSku }
        } = action;

        const { recentlyViewedProducts = {} } = state;
        const { store } = action;
        const storeProducts = recentlyViewedProducts[store] ?? [];

        if (storeProducts?.length === MAX_NUMBER_OF_RECENT_PRODUCTS) {
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
            recentlyViewedProducts: newRecentProducts
        };
    }

    case RecentlyViewedProductsActionType.UPDATE_RECENTLY_VIEWED_PRODUCTS: {
        const {
            products,
            storeCode
        } = action;
        const { recentlyViewedProducts: recent = {} } = state;

        const indexedProducts = getIndexedProducts(products);
        const recentProductsFromStorage: Record<string, ProductItem[]> = BrowserDatabase.getItem(
            RECENTLY_VIEWED_PRODUCTS
        ) || { [storeCode]: [] };

        // Remove product from storage if it is not available
        recentProductsFromStorage[storeCode] = recentProductsFromStorage[storeCode]
            .filter((storageItem) => !indexedProducts.every((indexedItem) => indexedItem.id !== storageItem.id));

        BrowserDatabase.setItem(recentProductsFromStorage, RECENTLY_VIEWED_PRODUCTS);

        // Sort products same as it is localstorage recentlyViewedProducts
        const sortedRecentProducts = recentProductsFromStorage[storeCode].reduce(
            (acc: IndexedProduct<Partial<ProductItem>>[], { sku }) => {
                const sortedProduct = indexedProducts.find((item) => item.sku === sku);

                if (sortedProduct) {
                    return [...acc, sortedProduct];
                }

                return acc;
            },
            []
        );

        const updatedRecentViewedProducts = {
            ...recent,
            [storeCode]: sortedRecentProducts
        } as Record<string, ProductItem[]>;

        return {
            ...state,
            recentlyViewedProducts: updatedRecentViewedProducts,
            isLoading: false
        };
    }

    case RecentlyViewedProductsActionType.UPDATE_LOAD_STATUS: {
        const {
            isLoading
        } = action;

        return {
            ...state,
            isLoading
        };
    }

    default:
        return state;
    }
};

export default RecentlyViewedProductsReducer;
