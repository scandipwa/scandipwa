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

import { Reducer } from 'react';

import { getIndexedProduct } from 'Util/Product';

import { ProductActionType, ProductStore, UpdateProductDetailsAction } from './Product.type';

/** @namespace Store/Product/Reducer/getInitialState */
export const getInitialState = (): ProductStore => ({
    product: {}
} as ProductStore);

/** @namespace Store/Product/Reducer/ProductReducer */
export const ProductReducer: Reducer<ProductStore, UpdateProductDetailsAction> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case ProductActionType.UPDATE_PRODUCT_DETAILS: {
        const { product } = action;

        return {
            ...state,
            product: getIndexedProduct(product)
        } as ProductStore;
    }

    default:
        return state;
    }
};

export default ProductReducer;
