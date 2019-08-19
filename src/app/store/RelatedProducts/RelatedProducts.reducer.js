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

/* eslint-disable no-param-reassign */
import { getIndexedProducts } from 'Util/Product';
import {
    UPDATE_RELATED_PRODUCTS
} from './RelatedProducts.action';

const initialState = {
    relatedProducts: {}
};

const RelatedProductsReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_RELATED_PRODUCTS:
        const { relatedProducts: { products, products: { items: initialItems = [] } } } = action;

        const items = getIndexedProducts(initialItems);

        return { ...state, relatedProducts: { ...products, items } };

    default:
        return state;
    }
};

export default RelatedProductsReducer;
