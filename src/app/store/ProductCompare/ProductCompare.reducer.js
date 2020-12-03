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
    SET_COMPARE_LIST,
    TOGGLE_LOADER
} from './ProductCompare.action';

/** @namespace Store/ProductCompare/Reducer/getInitialState */
export const getInitialState = () => ({
    isLoading: false,
    count: 0,
    products: []
});

/** @namespace Store/ProductCompare/Reducer */
export const ProductCompareReducer = (state = getInitialState(), action) => {
    const {
        type,
        isLoading,
        count,
        products = []
    } = action;

    switch (type) {
    case TOGGLE_LOADER:
        return {
            ...state,
            isLoading
        };

    case SET_COMPARE_LIST:
        return {
            ...state,
            count,
            products
        };

    default:
        return state;
    }
};

export default ProductCompareReducer;
