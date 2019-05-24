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

import {
    UPDATE_RELATED_PRODUCTS
} from './RelatedProducts.action';

const initialState = {
    relatedProducts: {}
};

const RelatedProductsReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_RELATED_PRODUCTS:
        const { relatedProducts: { products } } = action;

        if (products.items) {
            products.items.forEach(({ attributes }, i) => {
                attributes.forEach(({ attribute_code, attribute_value }) => {
                    products.items[i][attribute_code] = attribute_value;
                });    
            });
        }

        return {
            ...state,
            relatedProducts: products
        };

    default:
        return state;
    }
};

export default RelatedProductsReducer;
