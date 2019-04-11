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

class Cart {
    getCartItemsQuery(quoteId) {
        const query = new Field('getCartItems');

        if (quoteId) query.addArgument('quoteId', 'String!', quoteId);

        this._getCartItemField(query);

        return query;
    }

    getCreateEmptyCartMutation() {
        return new Field('createEmptyCart');
    }

    getSaveCartItemMutation(product, quoteId = null) {
        const {
            sku,
            qty,
            item_id
        } = product;

        const mutation = new Field('saveCartItem')
            .addArgument('sku', 'String!', sku)
            .addArgument('qty', 'Int!', qty);

        this._getCartItemField(mutation);

        if (quoteId) mutation.addArgument('quoteId', 'String', quoteId);

        if (item_id) mutation.addArgument('item_id', 'Int!', item_id);

        return mutation;
    }

    getRemoveCartItemMutation(product, quoteId = null) {
        const { item_id } = product;

        const mutation = new Field('removeCartItem')
            .addArgument('item_id', 'Int!', item_id);

        if (quoteId) mutation.addArgument('quoteId', 'String', quoteId);

        return mutation;
    }

    _getCartItemField(field) {
        field
            .addField('item_id')
            .addField('name')
            .addField('price')
            .addField('product_type')
            .addField('qty')
            .addField('quote_id')
            .addField('sku');
    }
}

export default new Cart();
