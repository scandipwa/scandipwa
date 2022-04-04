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
    GQLAddProductsToWishlistOutput,
    GQLShareWishlistInput,
    GQLUpdateProductsInWishlistOutput,
    GQLWishlistItemInput,
    GQLWishlistItemUpdateInput,
    GQLWishlistOutput,
    GQLWishListUserInputError
} from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';
import { getGuestQuoteId } from 'Util/Cart';

import { CommonField } from './Query.type';

/** @namespace Query/Wishlist/Query */
export class WishlistQuery {
    //#region MUTATION
    addProductsToWishlist(
        wishlistId: string,
        wishlistItems: GQLWishlistItemInput[]
    ): Mutation<
        'addProductsToWishlist',
        GQLAddProductsToWishlistOutput & { user_errors: GQLWishListUserInputError[] }
        > {
        return new Mutation<'addProductsToWishlist', GQLAddProductsToWishlistOutput>('addProductsToWishlist')
            .addArgument('wishlistId', 'ID!', wishlistId)
            .addArgument('wishlistItems', '[WishlistItemInput!]!', wishlistItems)
            .addField(this._getWishlistErrorsField());
    }

    updateProductsInWishlist(
        wishlistId: string,
        wishlistItems: GQLWishlistItemUpdateInput
    ): Mutation<
        'updateProductsInWishlist',
        GQLUpdateProductsInWishlistOutput & { user_errors: GQLWishListUserInputError[] }
        > {
        return new Mutation<'updateProductsInWishlist', GQLUpdateProductsInWishlistOutput>('updateProductsInWishlist')
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

    _getWishlistErrorsField(): Field<'user_errors', GQLWishListUserInputError, true> {
        return new Field<'user_errors', GQLWishListUserInputError, true>('user_errors', true)
            .addFieldList(this._getWishlistErrorsFields());
    }
    //#endregion

    getWishlistQuery(sharingCode: string): Query<'wishlist', GQLWishlistOutput> {
        const field = new Query<'s_wishlist', GQLWishlistOutput>('s_wishlist')
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

    getClearWishlist(): Query<'clearWishlist', boolean> {
        return new Query<'s_clearWishlist', boolean>('s_clearWishlist')
            .setAlias('clearWishlist');
    }

    getMoveWishlistToCart(sharingCode: string): Query<'moveWishlistToCart', boolean> {
        const field = new Query<'s_moveWishlistToCart', boolean>('s_moveWishlistToCart')
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

    getRemoveProductFromWishlistMutation(item_id: string): Mutation<'removeProductFromWishlist', boolean> {
        return new Mutation<'s_removeProductFromWishlist', boolean>('s_removeProductFromWishlist')
            .setAlias('removeProductFromWishlist')
            .addArgument('itemId', 'ID!', item_id);
    }

    _getWishlistFields(): CommonField[] {
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

    _getItemOptionsField(): CommonField {
        return new Field('options')
            .addFieldList(this._getItemOptionsFields());
    }

    _getWishlistItemsFields(): CommonField[] {
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

    _getItemsFields(): CommonField[] {
        return [
            ...this._getWishlistItemsFields(),
            this._getProductField()
        ];
    }

    _getProductField(): CommonField {
        return new Field('product')
            .addFieldList(ProductListQuery._getProductInterfaceFields(false, false, true));
    }

    _getItemsField(): CommonField {
        return new Field('items')
            .addFieldList(this._getItemsFields());
    }
}

export default new WishlistQuery();
