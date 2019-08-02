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
        const { relatedProducts: { products, products: { items } } } = action;

        if (items) {
            items.forEach(({ attributes }, i) => {
                const brandAttribute = attributes.find(({ attribute_code }) => attribute_code === 'brand');
                if (brandAttribute) items[i].brand = brandAttribute.attribute_value;
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
