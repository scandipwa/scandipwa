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

import { Field, Mutation, Query } from '@tilework/opus';

import ProductListQuery from 'Query/ProductList.query';
import {
    GQLShareWishlistInput,
    GQLWishlistItemInput,
    GQLWishlistItemUpdateInput
} from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';
import { getCartId } from 'Util/Cart';

import { ProductItem } from './ProductList.type';
import {
    ItemOption,
    Wishlist,
    WishlistItem,
    WishListUserInputError
} from './Wishlist.type';

/** @namespace Query/Wishlist/Query */
export class WishlistQuery {
    //#region MUTATION
    addProductsToWishlist(
        wishlistId: string,
        wishlistItems: GQLWishlistItemInput[]
    ): Mutation<'addProductsToWishlist', { user_errors: WishListUserInputError[] }> {
        return new Mutation<'addProductsToWishlist', { user_errors: WishListUserInputError[] }>('addProductsToWishlist')
            .addArgument('wishlistId', 'ID!', wishlistId)
            .addArgument('wishlistItems', '[WishlistItemInput!]!', wishlistItems)
            .addField(this._getWishlistErrorsField());
    }

    updateProductsInWishlist(
        wishlistId: string,
        wishlistItems: GQLWishlistItemUpdateInput[]
    ): Mutation<'updateProductsInWishlist', { user_errors: WishListUserInputError[] }> {
        return new Mutation<'updateProductsInWishlist', { user_errors: WishListUserInputError[] }>(
            'updateProductsInWishlist'
        )
            .addArgument('wishlistId', 'ID!', wishlistId)
            .addArgument('wishlistItems', '[WishlistItemUpdateInput!]!', wishlistItems)
            .addField(this._getWishlistErrorsField());
    }
    //#endregion

    //#region ERROR
    _getWishlistErrorsFields(): Array<
    Field<'message', string>
    | Field<'code', string>
    > {
        return [
            new Field<'message', string>('message'),
            new Field<'code', string>('code')
        ];
    }

    _getWishlistErrorsField(): Field<'user_errors', WishListUserInputError, true> {
        return new Field<'user_errors', WishListUserInputError, true>('user_errors', true)
            .addFieldList(this._getWishlistErrorsFields());
    }
    //#endregion

    getWishlistQuery(sharingCode = ''): Query<'wishlist', Wishlist> {
        const field = new Query<'s_wishlist', Wishlist>('s_wishlist')
            .setAlias('wishlist')
            .addFieldList(this._getWishlistFields());

        if (sharingCode) {
            field.addArgument('sharing_code', 'ID', sharingCode);
        }

        return field;
    }

    getShareWishlistMutation(input: GQLShareWishlistInput): Mutation<'shareWishlist', boolean> {
        return new Mutation<'s_shareWishlist', boolean>('s_shareWishlist')
            .setAlias('shareWishlist')
            .addArgument('input', 'ShareWishlistInput!', input);
    }

    getClearWishlist(): Mutation<'clearWishlist', boolean> {
        return new Mutation<'s_clearWishlist', boolean>('s_clearWishlist')
            .setAlias('clearWishlist');
    }

    getMoveWishlistToCart(sharingCode: string): Mutation<'moveWishlistToCart', boolean> {
        const field = new Mutation<'s_moveWishlistToCart', boolean>('s_moveWishlistToCart')
            .setAlias('moveWishlistToCart');

        if (sharingCode) {
            field.addArgument('sharingCode', 'ID', sharingCode);

            if (!isSignedIn()) {
                const cartId = getCartId();

                field.addArgument('guestCartId', 'ID', cartId);
            }
        }

        return field;
    }

    getRemoveProductFromWishlistMutation(item_id: string): Mutation<'removeProductFromWishlist', boolean> {
        return new Mutation<'s_removeProductFromWishlist', boolean>('s_removeProductFromWishlist')
            .setAlias('removeProductFromWishlist')
            .addArgument('itemId', 'ID!', item_id);
    }

    _getWishlistFields(): Array<
    Field<'id', number>
    | Field<'updated_at', string>
    | Field<'items_count', number>
    | Field<'creators_name', string>
    | Field<'items', WishlistItem, true>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'updated_at', string>('updated_at'),
            new Field<'items_count', number>('items_count'),
            new Field<'creators_name', string>('creators_name'),
            this._getItemsField()
        ];
    }

    _getItemOptionsFields(): Array<
    Field<'label', string>
    | Field<'value', string>
    > {
        return [
            new Field<'label', string>('label'),
            new Field<'value', string>('value')
        ];
    }

    _getItemOptionsField(): Field<'options', ItemOption, true> {
        return new Field<'options', ItemOption, true>('options')
            .addFieldList(this._getItemOptionsFields());
    }

    _getWishlistItemsFields(): Array<
    Field<'id', number>
    | Field<'sku', string>
    | Field<'qty', number>
    | Field<'description', string>
    | Field<'price', number>
    | Field<'price_without_tax', number>
    | Field<'buy_request', string>
    | Field<'options', ItemOption, true>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'sku', string>('sku'),
            new Field<'qty', number>('qty'),
            new Field<'description', string>('description'),
            new Field<'price', number>('price'),
            new Field<'price_without_tax', number>('price_without_tax'),
            new Field<'buy_request', string>('buy_request'),
            this._getItemOptionsField()
        ];
    }

    _getItemsFields(): Array<
    Field<'id', number>
    | Field<'sku', string>
    | Field<'qty', number>
    | Field<'description', string>
    | Field<'price', number>
    | Field<'price_without_tax', number>
    | Field<'buy_request', string>
    | Field<'options', ItemOption, true>
    | Field<'product', ProductItem>
    > {
        return [
            ...this._getWishlistItemsFields(),
            this._getProductField()
        ];
    }

    _getProductField(): Field<'product', ProductItem> {
        return new Field<'product', ProductItem>('product')
            .addFieldList(ProductListQuery._getProductInterfaceFields(false, false, true));
    }

    _getItemsField(): Field<'items', WishlistItem, true> {
        return new Field<'items', WishlistItem, true>('items')
            .addFieldList(this._getItemsFields());
    }
}

export default new WishlistQuery();
