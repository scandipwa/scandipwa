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

export class Wishlist {
    getWishlistQuery() {
        return new Field('wishlist')
            .addFieldList(this._getWishlistFields());
    }

    getSaveWishlistItemMutation(wishlistItem) {
        return new Field('saveWishlistItem')
            .addArgument('wishlistItem', 'WishlistItemInput!', wishlistItem)
            .addFieldList(this._getItemsFields());
    }

    getClearWishlist() {
        return new Field('clearWishlist');
    }

    getMoveWishlistToCart() {
        return new Field('moveWishlistToCart');
    }

    getRemoveProductFromWishlistMutation(item_id) {
        return new Field('removeProductFromWishlist')
            .addArgument('itemId', 'ID!', item_id);
    }

    _getWishlistFields() {
        return [
            'items_count',
            'updated_at',
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

export default new Wishlist();
