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
    UPDATE_PRODUCT_DETAILS,
    UPDATE_GROUPED_PRODUCT_QUANTITY
} from './Product.action';

const initialState = {
    product: {},
    groupedProductQuantity: {}
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_PRODUCT_DETAILS:
        const { product, filters } = action;

        return {
            ...state,
            product,
            filters
        };

    case UPDATE_GROUPED_PRODUCT_QUANTITY:
        const newQuantity = {};
        const { product: { id }, quantity } = action;

        newQuantity[id] = quantity;

        return {
            ...state,
            groupedProductQuantity: {
                ...state.groupedProductQuantity,
                ...newQuantity
            }
        };

    default:
        return state;
    }
};

export default ProductReducer;
