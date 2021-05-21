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
import { showNotification } from 'Store/Notification/Notification.action';
import {
    updateRecentlyViewedProducts
} from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.action';
import { QueryDispatcher } from 'Util/Request';

/**
 * Product List Info Dispatcher
 * @class ProductListInfoDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ProductListInfo/Dispatcher
 */
export class RecentlyViewedProductsDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct('recentlyViewedProducts');
    }

    onSuccess({ products }, dispatch) {
        const { items = {} } = products;
        dispatch(updateRecentlyViewedProducts(items));
    }

    onError(error, dispatch) {
        dispatch(showNotification('error', __('Error fetching Recently Viewed Products Information!'), error));
    }

    /**
     * Prepare recentlyViewedProducts query
     * @return {Query} ProductList query
     * @memberof recentlyViewedProductsDispatcher
     * @param recentlyViewedProducts
     */
    prepareRequest(options) {
        const { recentProducts, store } = options;
        const recentlyViewedProductsSKUs = recentProducts[store].reduce((productSKUs, item) => {
            const { sku } = item;
            return [...productSKUs, `${ sku.replace(/ /g, '%20') }`];
        }, []);

        return [
            ProductListQuery.getQuery({
                args: {
                    filter: {
                        productsSkuArray: recentlyViewedProductsSKUs
                    }
                },
                notRequireInfo: true
            })
        ];
    }
}

export default new RecentlyViewedProductsDispatcher();
