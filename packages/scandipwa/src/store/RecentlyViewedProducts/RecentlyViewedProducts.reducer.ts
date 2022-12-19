/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Reducer } from 'redux';

import { RECENTLY_VIEWED_PRODUCTS } from 'Component/RecentlyViewedWidget/RecentlyViewedWidget.config';
import { ProductItem } from 'Query/ProductList.type';
import BrowserDatabase from 'Util/BrowserDatabase';
import { IndexedBaseProduct } from 'Util/Product/Product.type';

import {
    RecentlyViewedProductItem,
    RecentlyViewedProductsActionType,
    RecentlyViewedProductsStore,
} from './RecentlyViewedProducts.type';

/** @namespace Store/RecentlyViewedProducts/Reducer/convertToRecentlyViewedProduct */
export const convertToRecentlyViewedProduct = (
    products: IndexedBaseProduct<ProductItem>[],
): RecentlyViewedProductItem[] => products.map((product) => {
    const {
        canonical_url,
        categories,
        configurable_options,
        description,
        items,
        meta_description,
        meta_keyword,
        meta_title,
        options,
        product_links,
        reviews,
        short_description,
        variants,
        ...result
    } = product;

    return result;
});

/** @namespace Store/RecentlyViewedProducts/Reducer/getInitialState */
export const getInitialState = (): RecentlyViewedProductsStore => ({
    recentlyViewedProducts: BrowserDatabase.getItem(RECENTLY_VIEWED_PRODUCTS) || {},
    isLoading: true,
});

/** @namespace Store/RecentlyViewedProducts/Reducer/RecentlyViewedProductsReducer */
export const RecentlyViewedProductsReducer: Reducer<RecentlyViewedProductsStore> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (RecentlyViewedProductsActionType.UPDATE_RECENTLY_VIEWED_PRODUCTS_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default RecentlyViewedProductsReducer;
