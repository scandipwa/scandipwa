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
    UPDATE_GROUPED_PRODUCT_QUANTITY,
    CLEAR_GROUPED_PRODUCT_QUANTITY
} from './Product.action';

export const initialState = {
    product: {},
    formattedConfigurableOptions: {},
    groupedProductQuantity: {}
};

export const formatConfigurableOptions = configurable_options => configurable_options
    .reduce((prev, option) => {
        const {
            attribute_id,
            label,
            attribute_code
        } = option;

        return {
            ...prev,
            [attribute_code]: {
                attribute_id,
                label
            }
        };
    }, {});

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_PRODUCT_DETAILS:
        const { product, product: { attributes, variants } } = action;

        attributes.forEach(({ attribute_code, attribute_value }) => {
            product[attribute_code] = attribute_value;
        });

        if (variants) {
            variants.forEach(({ product: { attributes } }, i) => {
                if (attributes) {
                    attributes.forEach(({ attribute_code, attribute_value }) => {
                        product.variants[i].product[attribute_code] = attribute_value;
                    });
                }
            });
        }

        const { configurable_options } = product;

        return {
            ...state,
            product,
            formattedConfigurableOptions: configurable_options
                ? formatConfigurableOptions(configurable_options)
                : {}
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

    case CLEAR_GROUPED_PRODUCT_QUANTITY:
        return {
            ...state,
            groupedProductQuantity: {}
        };

    default:
        return state;
    }
};

export default ProductReducer;
