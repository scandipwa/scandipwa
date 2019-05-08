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
import { isSignedIn } from 'Util/Auth';

class Cart {
    getCartItemsQuery(quoteId) {
        const query = new Field('getCartItems');

        if (!isSignedIn()) query.addArgument('guestCartId', 'String', quoteId);

        this._getCartItemField(query, true);

        return query;
    }

    getCreateEmptyCartMutation() {
        return new Field('createEmptyCart');
    }

    getSaveCartItemMutation(product, quoteId) {
        const mutation = new Field('saveCartItem')
            .addArgument('cartItem', 'CartItemInput!', product);

        if (!isSignedIn()) mutation.addArgument('guestCartId', 'String', quoteId);

        this._getCartItemField(mutation);

        return mutation;
    }

    getRemoveCartItemMutation(product, quoteId) {
        const { item_id } = product;

        const mutation = new Field('removeCartItem')
            .addArgument('item_id', 'Int!', item_id);

        if (!isSignedIn()) mutation.addArgument('guestCartId', 'String', quoteId);

        return mutation;
    }

    _getCartItemField(field, requestProduct) {
        field
            .addField('item_id')
            .addField('name')
            .addField('price')
            .addField('product_type')
            .addField('qty')
            .addField('quote_id')
            .addField('sku');

        if (requestProduct) {
            field.addField(ProductListQuery._prepareItemsField(
                { getConfigurableData: true, isSingleProduct: true },
                new Field('product')
            ));
        }
    }
}

export default new Cart();
