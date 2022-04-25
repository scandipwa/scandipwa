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

import { Query } from '@tilework/opus';
import { Dispatch } from 'redux';

import ProductListQuery from 'Query/ProductList.query';
import { ProductListOptions, ProductsQueryOutput } from 'Query/ProductList.type';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import {
    appendPage,
    updateLoadStatus,
    updatePageLoadingStatus,
    updateProductListItems
} from 'Store/ProductList/ProductList.action';
import { NetworkError } from 'Type/Common.type';
import { QueryDispatcher } from 'Util/Request';

import {
    AppendPageAction,
    ProductListDispatcherData,
    UpdateProductListItemsAction
} from './ProductList.type';

/**
 * Product List Dispatcher
 * @class ProductListDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ProductList/Dispatcher
 */
export class ProductListDispatcher extends QueryDispatcher<
Partial<ProductListOptions>,
ProductListDispatcherData
> {
    __construct(): void {
        super.__construct('ProductList');
    }

    onSuccess(
        data: ProductListDispatcherData,
        dispatch: Dispatch,
        options: Partial<ProductListOptions>
    ): AppendPageAction | UpdateProductListItemsAction {
        const {
            products: {
                items = [],
                total_count = 0,
                page_info: { total_pages = 0 } = {}
            } = {}
        } = data;

        const { args = {}, isNext } = options;
        const { currentPage = 0 } = args;

        if (isNext) {
            return dispatch(
                appendPage(
                    items,
                    currentPage
                )
            );
        }

        return dispatch(
            updateProductListItems(
                items,
                currentPage,
                total_count,
                total_pages,
                args
            )
        );
    }

    onError(error: NetworkError | NetworkError[], dispatch: Dispatch): void {
        dispatch(showNotification(NotificationType.ERROR, __('Error fetching Product List!'), error));
        dispatch(updateNoMatch(true));
    }

    prepareRequest(
        options: Partial<ProductListOptions>,
        dispatch: Dispatch
    ): Query<'products', ProductsQueryOutput> {
        const { isNext } = options;

        if (!isNext) {
            dispatch(updateLoadStatus(true));
        } else {
            dispatch(updatePageLoadingStatus());
        }

        return ProductListQuery.getQuery(options);
    }
}

export default new ProductListDispatcher();
