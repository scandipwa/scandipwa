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

import { QueryDispatcher } from 'Util/Request';
import { ProductListQuery } from 'Query';
import { updateProductDetails, updateGroupedProductQuantity, clearGroupedProductQuantity } from 'Store/Product';
import { updateNoMatch } from 'Store/NoMatch';
import { RelatedProductsDispatcher } from 'Store/RelatedProducts';

/**
 * Product List Dispatcher
 * @class ProductDispatcher
 * @extends ProductDispatcher
 */
export class ProductDispatcher extends QueryDispatcher {
    constructor() {
        super('Product', 86400);
    }

    onSuccess(data, dispatch) {
        const { products: { items } } = data;

        if (!(items && items.length > 0)) return dispatch(updateNoMatch(true));

        const [productItem] = items;
        const product = productItem.type_id === 'grouped'
            ? this._prepareGroupedProduct(productItem) : productItem;

        // TODO: make one request per description & related in this.prepareRequest
        if (productItem && productItem.product_links && Object.keys(productItem.product_links).length > 0) {
            const { product_links } = productItem;
            const productsSkuArray = product_links.map(item => `"${item.linked_product_sku}"`);

            RelatedProductsDispatcher.handleData(dispatch, { productsSkuArray });
        } else {
            RelatedProductsDispatcher.clearRelatedProducts(dispatch);
        }

        return dispatch(updateProductDetails(product));
    }

    onError(_, dispatch) {
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

    /**
     * Update Grouped Products quantity list
     * @param {Function} dispatch
     * @param {{product: Object, quantity: Number}} options A object containing different aspects of query, each item can be omitted
     * @memberof ProductDispatcher
     */
    updateGroupedProductQuantity(dispatch, options) {
        const { product, quantity } = options;

        return dispatch(updateGroupedProductQuantity(product, quantity));
    }

    /**
     * Clear Grouped Products quantity list
     * @param {Function} dispatch
     * @memberof ProductDispatcher
     */
    clearGroupedProductQuantity(dispatch) {
        return dispatch(clearGroupedProductQuantity());
    }

    /**
     * Prepare Grouped Product for dispatch
     * @param {Object} groupProduct
     * @return {Object} prepared product
     * @memberof ProductDispatcher
     */
    _prepareGroupedProduct(groupProduct) {
        const { items } = groupProduct;
        const newItems = items.map(item => ({
            product: {
                ...item.product,
                url_key: groupProduct.url_key
            }
        }));

        return {
            ...groupProduct,
            items: newItems
        };
    }
}

export default new ProductDispatcher();
