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

import { getVariantsWithParams } from 'Util/Product';
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

        const { items } = products;
        if (items) {
            items.forEach(({
                variants, configurable_options, type_id, attributes
            }, i) => {
                const brandAttribute = attributes.find(({ attribute_code }) => attribute_code === 'brand');
                if (brandAttribute) items[i].brand = brandAttribute.attribute_value;

                if (type_id === 'configurable' && variants) {
                    const requiredParams = configurable_options.map(({ attribute_code }) => attribute_code);
                    items[i].variants = getVariantsWithParams(variants, requiredParams);
                }
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
