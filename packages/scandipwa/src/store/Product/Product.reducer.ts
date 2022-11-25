/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
*/

import { Reducer } from 'redux';

import {
    ProductActionType,
    ProductStore,
} from './Product.type';

/** @namespace Store/Product/Reducer/getInitialState */
export const getInitialState = (): ProductStore => ({
    product: {},
});

/** @namespace Store/Product/Reducer/ProductReducer */
export const ProductReducer: Reducer<ProductStore> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (ProductActionType.UPDATE_PRODUCT_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default ProductReducer;
