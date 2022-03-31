/* eslint-disable spaced-comment */
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
import { GQLShareWishlistInput, GQLWishlistItemInput, GQLWishlistItemUpdateInput } from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';
import { getGuestQuoteId } from 'Util/Cart';
import { Field } from 'Util/Query';

/** @namespace Query/Wishlist/Query */
export class WishlistQuery {
    //#region MUTATION
    addProductsToWishlist(wishlistId: string, wishlistItems: GQLWishlistItemInput[]): Field {
        return new Field('addProductsToWishlist')
            .addArgument('wishlistId', 'ID!', wishlistId)
            .addArgument('wishlistItems', '[WishlistItemInput!]!', wishlistItems)
            .addField(this._getWishlistErrorsField());
    }

    updateProductsInWishlist(wishlistId: string, wishlistItems: GQLWishlistItemUpdateInput): Field {
        return new Field('updateProductsInWishlist')
            .addArgument('wishlistId', 'ID!', wishlistId)
            .addArgument('wishlistItems', '[WishlistItemUpdateInput!]!', wishlistItems)
            .addField(this._getWishlistErrorsField());
    }
    //#endregion

    //#region ERROR
    _getWishlistErrorsFields(): string[] {
        return [
            'message',
            'code'
        ];
    }

    _getWishlistErrorsField(): Field {
        return new Field('user_errors')
            .addFieldList(this._getWishlistErrorsFields());
    }
    //#endregion

    getWishlistQuery(sharingCode: string): Field {
        const field = new Field('s_wishlist')
            .setAlias('wishlist')
            .addFieldList(this._getWishlistFields());

        if (sharingCode) {
            field.addArgument('sharing_code', 'ID', sharingCode);
        }

        return field;
    }

    getShareWishlistMutation(input: GQLShareWishlistInput): Field {
        return new Field('s_shareWishlist')
            .setAlias('shareWishlist')
            .addArgument('input', 'ShareWishlistInput!', input);
    }

    getClearWishlist(): Field {
        return new Field('s_clearWishlist')
            .setAlias('clearWishlist');
    }

    getMoveWishlistToCart(sharingCode: string): Field {
        const field = new Field('s_moveWishlistToCart')
            .setAlias('moveWishlistToCart');

        if (sharingCode) {
            field.addArgument('sharingCode', 'ID', sharingCode);

            if (!isSignedIn()) {
                const guestQuoteId = getGuestQuoteId();
                field.addArgument('guestCartId', 'ID', guestQuoteId);
            }
        }

        return field;
    }

    getRemoveProductFromWishlistMutation(item_id: string): Field {
        return new Field('s_removeProductFromWishlist')
            .setAlias('removeProductFromWishlist')
            .addArgument('itemId', 'ID!', item_id);
    }

    _getWishlistFields(): Array<string | Field> {
        return [
            'id',
            'updated_at',
            'items_count',
            'creators_name',
            this._getItemsField()
        ];
    }

    _getItemOptionsFields(): string[] {
        return [
            'label',
            'value'
        ];
    }

    _getItemOptionsField(): Field {
        return new Field('options')
            .addFieldList(this._getItemOptionsFields());
    }

    _getWishlistItemsFields(): Array<string | Field> {
        return [
            'id',
            'sku',
            'qty',
            'description',
            'price',
            'price_without_tax',
            'buy_request',
            this._getItemOptionsField()
        ];
    }

    _getItemsFields(): Array<string | Field> {
        return [
            ...this._getWishlistItemsFields(),
            this._getProductField()
        ];
    }

    _getProductField(): Field {
        return new Field('product')
            .addFieldList(ProductListQuery._getProductInterfaceFields(false, false, true));
    }

    _getItemsField(): Field {
        return new Field('items')
            .addFieldList(this._getItemsFields());
    }
}

export default new WishlistQuery();
