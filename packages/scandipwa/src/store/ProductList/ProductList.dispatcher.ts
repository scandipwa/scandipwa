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
import { updateProductListStore } from 'Store/ProductList/ProductList.action';
import { NetworkError } from 'Type/Common.type';
import { getIndexedProducts } from 'Util/Product';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { ProductListDispatcherData, ProductListFilter } from './ProductList.type';

/**
 * Product List Dispatcher
 * @class ProductListDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ProductList/Dispatcher/reduceFilters */

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
/** @namespace Store/ProductList/Dispatcher */
export class ProductListDispatcher extends SimpleDispatcher {
    async getProductList(options: Partial<ProductListOptions>) {
        const { isNext } = options;

        if (!isNext) {
            this.dispatch(updateProductListStore({ isPageLoading: true }));
        }

        try {
            const {
                products: {
                    items = [],
                    total_count = 0,
                    page_info: { total_pages = 0 } = {},
                } = {},
            } = await fetchCancelableQuery<ProductListDispatcherData>(ProductListQuery.getQuery(options), 'ProductList');

            const { args = {}, isNext } = options;
            const { ...state } = this.storeState.ProductListReducer;

            const { currentPage = 0 } = args;

            if (isNext) {
                this.dispatch(
                    updateProductListStore({
                        isPageLoading: false,
                        pages: {
                            ...state.pages,
                            [currentPage]: getIndexedProducts(items),
                        },
                    }),
                );

                return;
            }

            this.dispatch(
                updateProductListStore({
                    pages: { [currentPage]: getIndexedProducts(items) },
                    isLoading: false,
                    totalItems: total_count,
                    totalPages: total_pages,
                    currentArgs: args,
                }),
            );
        } catch (err) {
            if (!isAbortError(err as NetworkError)) {
                this.dispatch(showNotification(NotificationType.ERROR, __('Error fetching Product List!'), err));
                this.dispatch(updateNoMatchStore({ noMatch: true }));
            }
        }
    }

    async getProductListInfo(
        options: Partial<ProductListOptions>,
    ) {
        this.dispatch(updateProductListStore({ isLoading: true }));

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
            } = await fetchCancelableQuery<ProductListDispatcherData>(rawQueries, 'ProductListInfo');

            const {
                args: {
                    filter = {},
                } = {},
            } = options;

            this.dispatch(updateProductListStore({
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

export default new ProductListDispatcher();
