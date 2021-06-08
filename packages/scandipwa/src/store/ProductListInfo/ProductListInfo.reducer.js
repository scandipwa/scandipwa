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
    UPDATE_INFO_LOAD_STATUS,
    UPDATE_PRODUCT_LIST_INFO
} from 'Store/ProductListInfo/ProductListInfo.action';

/** @namespace Store/ProductListInfo/Reducer/reduceFilters */
export const reduceFilters = (filters) => filters.reduce((co, item) => {
    const {
        request_var: attribute_code,
        name: attribute_label,
        position: attribute_position,
        filter_items,
        is_boolean
    } = item;

    const { attribute_values, attribute_options } = filter_items.reduce((attribute, option) => {
        const { value_string } = option;
        const { attribute_values, attribute_options } = attribute;

        attribute_values.push(value_string);

        return {
            ...attribute,
            attribute_options: {
                ...attribute_options,
                [value_string]: option
            }
        };
    }, { attribute_values: [], attribute_options: {} });

    return {
        ...co,
        [attribute_code]: {
            attribute_code,
            attribute_label,
            attribute_position,
            attribute_values,
            attribute_type: 'select',
            attribute_options,
            is_boolean
        }
    };
}, {});

/** @namespace Store/ProductListInfo/Reducer/getInitialState */
export const getInitialState = () => ({
    minPrice: 0,
    maxPrice: 0,
    sortFields: {},
    filters: {},
    isLoading: true
});

/** @namespace Store/ProductListInfo/Reducer */
export const ProductListReducer = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case UPDATE_PRODUCT_LIST_INFO: {
        const {
            selectedFilter,
            products: {
                filters: availableFilters = [],
                min_price,
                max_price,
                sort_fields: sortFields
            } = {}
        } = action;

        return {
            ...state,
            filters: reduceFilters(availableFilters),
            sortFields,
            minPrice: Math.floor(min_price),
            maxPrice: Math.ceil(max_price),
            isLoading: false,
            selectedFilter
        };
    }

    case UPDATE_INFO_LOAD_STATUS: {
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };
    }

    default:
        return state;
    }
};

export default ProductListReducer;
