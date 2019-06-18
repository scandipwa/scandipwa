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

class CartQuery {
    getCartQuery(quoteId) {
        const query = new Field('getCartForCustomer')
            .addFieldList(this._getCartTotalsFields())
            .addField(this._getCartItemsField())
            .setAlias('cartData');

        if (!isSignedIn()) query.addArgument('guestCartId', 'String', quoteId);

        return query;
    }

    getCreateEmptyCartMutation() {
        return new Field('createEmptyCart');
    }

    getSaveCartItemMutation(product, quoteId) {
        const mutation = new Field('saveCartItem')
            .addArgument('cartItem', 'CartItemInput!', product);

        if (!isSignedIn()) mutation.addArgument('guestCartId', 'String', quoteId);

        mutation.addField(this.getCartQuery(quoteId));

        return mutation;
    }

    getRemoveCartItemMutation(product, quoteId) {
        const { item_id } = product;

        const mutation = new Field('removeCartItem')
            .addArgument('item_id', 'Int!', item_id);

        if (!isSignedIn()) mutation.addArgument('guestCartId', 'String', quoteId);

        mutation.addField(this.getCartQuery(quoteId));

        return mutation;
    }

    _getCartTotalsFields() {
        return [
            'tax_amount',
            'subtotal',
            'discount_amount',
            'subtotal_with_discount',
            'grand_total',
            'items_qty',
            'base_currency_code'
        ];
    }

    _getCartItemsField() {
        return new Field('items')
            .addFieldList([
                'price', 'tax_amount', 'row_total', 'tax_percent',
                'discount_amount', 'discount_percent',
                'item_id', 'qty', 'sku'
            ])
            .addField(ProductListQuery._prepareItemsField(
                { getConfigurableData: true, isSingleProduct: true },
                new Field('product')
            ));
    }
}

export { CartQuery };

export default new CartQuery();
