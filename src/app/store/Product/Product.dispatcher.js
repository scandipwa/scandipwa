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

import { RequestDispatcher } from 'Util/Request';
import { ProductListQuery } from 'Query';
import { updateProductDetails } from 'Store/Product';
import { updateNoMatch } from 'Store/NoMatch';
import { RelatedProductsDispatcher } from 'Store/RelatedProducts';

/**
 * Product List Dispatcher
 * @class ProductDispatcher
 * @extends ProductDispatcher
 */
class ProductDispatcher extends RequestDispatcher {
    constructor() {
        super('ProductList', 86400);
    }

    onSuccess(data, dispatch) {
        const { products: { items, filters } } = data;
        const productItem = items[0];

        // TODO: make one request per description & related in this.prepareRequest
        if (productItem && productItem.product_links && Object.keys(productItem.product_links).length > 0) {
            const { product_links } = productItem;
            const productsSkuArray = product_links.map(item => `"${item.linked_product_sku}"`);

            RelatedProductsDispatcher.handleData(dispatch, { productsSkuArray });
        } else {
            RelatedProductsDispatcher.clearRelatedProducts(dispatch);
        }

        return (items && items.length > 0)
            ? dispatch(updateProductDetails(productItem, filters))
            : dispatch(updateNoMatch(true));
    }

    onError(error, dispatch) {
        dispatch(updateNoMatch(true));
    }

    /**
     * Prepare ProductList query
     * @param  {{search: String, categoryIds: Array<String|Number>, categoryUrlPath: String, activePage: Number, priceRange: {min: Number, max: Number}, sortKey: String, sortDirection: String, productPageSize: Number}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} ProductList query
     * @memberof ProductDispatcher
     */
    prepareRequest(options) {
        return ProductListQuery.getQuery(options);
    }
}

export default new ProductDispatcher();
