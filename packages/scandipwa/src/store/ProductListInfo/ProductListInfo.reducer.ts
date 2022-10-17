/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Reducer } from 'redux';

import { Aggregation, AggregationOption } from 'Query/ProductList.type';

import {
    ProductListFilter,
    ProductListInfoAction,
    ProductListInfoActionType,
    ProductListInfoStore,
} from './ProductListInfo.type';

/** @namespace Store/ProductListInfo/Reducer/reduceFilters */
export const reduceFilters = (filters: Aggregation[]): Record<string, ProductListFilter> => filters.reduce((
    co,
    item,
) => {
    const {
        request_var: attribute_code,
        name: attribute_label,
        position: attribute_position,
        filter_items,
        is_boolean,
        has_swatch,
    } = item;

    const { attribute_values, attribute_options } = filter_items.reduce(
        (
            attribute: { attribute_values: string[]; attribute_options: Record<string, AggregationOption> },
            option,
        ) => {
            const { value_string } = option;
            const { attribute_values, attribute_options } = attribute;

            attribute_values.push(value_string);

            return {
                ...attribute,
                attribute_options: {
                    ...attribute_options,
                    [value_string]: option,
                },
            };
        },
        { attribute_values: [], attribute_options: {} },
    );

    return {
        ...co,
        [attribute_code]: {
            attribute_code,
            attribute_label,
            attribute_position,
            attribute_values,
            attribute_type: 'select',
            attribute_options,
            is_boolean,
            has_swatch,
        },
    };
}, {});

/** @namespace Store/ProductListInfo/Reducer/getInitialState */
export const getInitialState = (): ProductListInfoStore => ({
    minPrice: 0,
    maxPrice: 0,
    sortFields: {},
    filters: {},
    isLoading: true,
    selectedFilter: {},
});

/** @namespace Store/ProductListInfo/Reducer/ProductListReducer */
export const ProductListReducer: Reducer<ProductListInfoStore, ProductListInfoAction> = (
    state: ProductListInfoStore = getInitialState(),
    action,
) => {
    const { type } = action;

    switch (type) {
    case ProductListInfoActionType.UPDATE_PRODUCT_LIST_INFO: {
        const {
            selectedFilter,
            products: {
                filters: availableFilters = [],
                sort_fields: sortFields = {},
            } = {},
        } = action;

        return {
            ...state,
            filters: reduceFilters(availableFilters),
            sortFields,
            isLoading: false,
            selectedFilter,
        };
    }

    case ProductListInfoActionType.UPDATE_INFO_LOAD_STATUS: {
        const { isLoading } = action;

        return {
            ...state,
            isLoading,
        };
    }

    default:
        return state;
    }
};

export default ProductListReducer;
