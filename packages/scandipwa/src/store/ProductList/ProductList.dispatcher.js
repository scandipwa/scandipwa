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

import ProductListQuery from 'Query/ProductList.query';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import { showNotification } from 'Store/Notification/Notification.action';
import {
    appendPage,
    updateLoadStatus,
    updatePageLoadingStatus,
    updateProductListItems
} from 'Store/ProductList/ProductList.action';
import { QueryDispatcher } from 'Util/Request';

/**
 * Product List Dispatcher
 * @class ProductListDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ProductList/Dispatcher
 */
export class ProductListDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct('ProductList');
    }

    onSuccess(data, dispatch, options) {
        const {
            products: {
                items,
                total_count,
                page_info: { total_pages } = {}
            } = {}
        } = data;

        const { args, isNext } = options;
        const { currentPage } = args;

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

    onError(error, dispatch) {
        dispatch(showNotification('error', __('Error fetching Product List!'), error));
        dispatch(updateNoMatch(true));
    }

    prepareRequest(options, dispatch) {
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
