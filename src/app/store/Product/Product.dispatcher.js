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
import { updateProductDetails } from 'Store/Product';
import { updateNoMatch } from 'Store/NoMatch';
import { RelatedProductsDispatcher } from 'Store/RelatedProducts';

/**
 * Product List Dispatcher
 * @class ProductDispatcher
 * @extends ProductDispatcher
 */
export class ProductDispatcher extends QueryDispatcher {
    constructor() {
        super('Product');
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
            const productsSkuArray = product_links.filter(({ link_type }) => link_type === 'related')
                .map(item => `"${item.linked_product_sku}"`);

            RelatedProductsDispatcher.handleData(
                dispatch,
                { args: { filter: { productsSkuArray } } }
            );
        } else {
            RelatedProductsDispatcher.clearRelatedProducts(dispatch);
        }

        return dispatch(updateProductDetails(product));
    }

    onError(_, dispatch) {
        dispatch(updateNoMatch(true));
    }

    prepareRequest(options) {
        return ProductListQuery.getQuery(options);
    }

    _prepareGroupedProduct(groupProduct) {
        const { items } = groupProduct;
        const newItems = items.map((item) => {
            const { product, order, qty } = item;
            return {
                product: {
                    ...product,
                    url_key: groupProduct.url_key
                },
                order,
                qty
            };
        }).sort(({ order }, { order: order2 }) => order - order2);

        return {
            ...groupProduct,
            items: newItems
        };
    }
}

export default new ProductDispatcher();
