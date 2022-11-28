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
import { ProductListOptions } from 'Query/ProductList.type';
import { updateNoMatchStore } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { updateProductListStore } from 'Store/ProductList/ProductList.action';
import { NetworkError } from 'Type/Common.type';
import { getIndexedProducts } from 'Util/Product';
import { fetchCancelableQuery, isAbortError } from 'Util/Request/BroadCast';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { ProductListDispatcherData } from './ProductList.type';

/**
 * Product List Dispatcher
 * @class ProductListDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ProductList/Dispatcher
 */
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
}

export default new ProductListDispatcher();
