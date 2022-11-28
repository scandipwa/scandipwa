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

import ProductListQuery from 'Query/ProductList.query';
import { Aggregation, AggregationOption, ProductListOptions } from 'Query/ProductList.type';
import { updateNoMatchStore } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import {
    updateProductListInfoStore,
} from 'Store/ProductListInfo/ProductListInfo.action';
import { NetworkError } from 'Type/Common.type';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { ProductListFilter, ProductListInfoDispatcherData } from './ProductListInfo.type';

/** @namespace Store/ProductListInfo/Dispatcher/reduceFilters */
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

/**
  * Product List Info Dispatcher
  * @class ProductListInfoDispatcher
  * @extends QueryDispatcher
  * @namespace Store/ProductListInfo/Dispatcher
  */
export class ProductListInfoDispatcher extends SimpleDispatcher {
    async getProductListInfo(
        options: Partial<ProductListOptions>,
    ) {
        this.dispatch(updateProductListInfoStore({ isLoading: true }));

        try {
            const rawQueries = ProductListQuery.getQuery({
                ...options,
                requireInfo: true,
            });

            const {
                products: {
                    filters: availableFilters = [],
                    sort_fields: sortFields = {},
                } = {},
            } = await fetchCancelableQuery<ProductListInfoDispatcherData>(rawQueries, 'ProductListInfo');

            const {
                args: {
                    filter = {},
                } = {},
            } = options;

            this.dispatch(updateProductListInfoStore({
                filters: reduceFilters(availableFilters),
                sortFields,
                isLoading: false,
                selectedFilter: filter,
            }));
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                this.dispatch(showNotification(NotificationType.ERROR, __('Error fetching Product List Information!'), err));
                this.dispatch(updateNoMatchStore({ noMatch: true }));
            }
        }
    }
}

export default new ProductListInfoDispatcher();
