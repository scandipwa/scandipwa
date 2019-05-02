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

const initialState = {
    product: {},
    filters: [],
    formattedConfigurableOptions: {},
    groupedProductQuantity: {}
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_PRODUCT_DETAILS:
        const { product, filters } = action;

        const { configurable_options } = product;

        const formattedConfigurableOptions = configurable_options.reduce((prev, option) => {
            const {
                attribute_id,
                label,
                attribute_code,
                values: rawValues
            } = option;

            const values = rawValues.map(({ value_index, label }) => {
                const quickData = {
                    id: value_index,
                    label
                };

                const { filter_items: filterItems } = filters.find(
                    ({ request_var }) => request_var === attribute_code
                ) || {};

                if (!filterItems) return quickData;

                const { swatch_data: swatchData } = filterItems.find(
                    ({ value_string }) => value_index == value_string
                ) || {};

                const typemap = {
                    0: 'text',
                    1: 'color',
                    2: 'image'
                };

                if (!swatchData) return quickData;

                const { type, value } = swatchData;

                return ({
                    ...quickData,
                    type: typemap[type],
                    value
                });
            });

            return {
                ...prev,
                [attribute_code]: {
                    attribute_id,
                    label,
                    values
                }
            };
        }, {});

        return {
            ...state,
            product,
            filters,
            formattedConfigurableOptions
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
