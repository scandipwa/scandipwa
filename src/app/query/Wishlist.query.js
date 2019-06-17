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

import { Field } from 'Util/Query';
import { ProductListQuery } from 'Query';

class Wishlist {
    getWishlistQuery() {
        const items = new Field('items');
        this._getWishlistItemField(items, true);

        const query = new Field('wishlist')
            .addField('items_count')
            .addField('updated_at')
            .addField(items);

        return query;
    }

    getAddProductToWishlistMutation(product) {
        const { sku } = product;
        const mutation = new Field('addProductToWishlist')
            .addArgument('productSku', 'String!', sku);

        this._getWishlistItemField(mutation);

        return mutation;
    }

    getRemoveProductFromWishlistMutation(product) {
        const { item_id } = product;

        const mutation = new Field('removeProductFromWishlist')
            .addArgument('itemId', 'String!', item_id);

        return mutation;
    }

    _getWishlistItemField(field, requestProduct) {
        field
            .addField('id');

        if (requestProduct) {
            field.addField(ProductListQuery._prepareItemsField(
                { getConfigurableData: true, isSingleProduct: true },
                new Field('product')
            ));
        }
    }
}

export { Wishlist };

export default new Wishlist();
