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
import BrowserDatabase from 'Util/BrowserDatabase';
import { GUEST_QUOTE_ID } from 'Store/Cart';

/** @namespace Query/Wishlist */
export class WishlistQuery extends ExtensibleClass {
    getWishlistQuery(sharingCode) {
        const field = new Field('wishlist')
            .addFieldList(this._getWishlistFields());

        if (sharingCode) {
            field.addArgument('sharing_code', 'ID', sharingCode);
        }

        return field;
    }

    getSaveWishlistItemMutation(wishlistItem) {
        return new Field('saveWishlistItem')
            .addArgument('wishlistItem', 'WishlistItemInput!', wishlistItem)
            .addFieldList(this._getItemsFields());
    }

    getShareWishlistMutation(input) {
        return new Field('shareWishlist')
            .addArgument('input', 'ShareWishlistInput!', input);
    }

    getClearWishlist() {
        return new Field('clearWishlist');
    }

    getMoveWishlistToCart(sharingCode) {
        const field = new Field('moveWishlistToCart');

        if (sharingCode) {
            field.addArgument('sharingCode', 'ID', sharingCode);

            if (!isSignedIn()) {
                const guestQuoteId = BrowserDatabase.getItem(GUEST_QUOTE_ID);
                field.addArgument('guestCartId', 'ID', guestQuoteId);
            }
        }

        return field;
    }

    getRemoveProductFromWishlistMutation(item_id) {
        return new Field('removeProductFromWishlist')
            .addArgument('itemId', 'ID!', item_id);
    }

    _getWishlistFields() {
        return [
            'updated_at',
            'items_count',
            'creators_name',
            this._getItemsField()
        ];
    }

    _getItemsFields() {
        return [
            'id',
            'sku',
            'qty',
            'description',
            this._getProductField()
        ];
    }

    _getProductField() {
        return new Field('product')
            .addFieldList(ProductListQuery._getProductInterfaceFields());
    }

    _getItemsField() {
        return new Field('items')
            .addFieldList(this._getItemsFields());
    }
}

export default new (WishlistQuery)();
