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
import { GQLCartItemInput, GQLUpdateCartItemsInput } from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';
import { Field } from 'Util/Query';

/** @namespace Query/Cart/Query */
export class CartQuery {
    //#region MUTATIONS
    getAddProductToCartMutation(cartId: string, cartItems: GQLCartItemInput): Field {
        return new Field('addProductsToCart')
            .addArgument('cartId', 'String!', cartId)
            .addArgument('cartItems', '[CartItemInput!]!', cartItems)
            .addField(this._getUserErrorsField());
    }

    getUpdateCartItemsMutation(input: GQLUpdateCartItemsInput): Field {
        return new Field('updateCartItems')
            .addArgument('input', 'UpdateCartItemsInput', input)
            .addField(this._getCartUpdateField());
    }

    getCreateEmptyCartMutation(): Field {
        return new Field('createEmptyCart');
    }
    //#endregion

    //#region QUERIES
    getCartQuery(quoteId: string): Field {
        const query = new Field('getCartForCustomer')
            .addFieldList(this._getCartTotalsFields())
            .setAlias('cartData');

        if (!isSignedIn()) {
            query.addArgument('guestCartId', 'String', quoteId);
        }

        return query;
    }
    //#endregion

    //#region ERROR
    _getUserErrorsFields(): string[] {
        return [
            'message',
            'code'
        ];
    }

    _getUserErrorsField(): Field {
        return new Field('user_errors')
            .addFieldList(this._getUserErrorsFields());
    }
    //#endregion

    _getCartUpdateField(): Field {
        return new Field('cart')
            .addField('id');
    }

    getRemoveCartItemMutation(item_id: number, quoteId: string): Field {
        const mutation = new Field('removeCartItem')
            .addArgument('item_id', 'Int!', item_id)
            .addFieldList(this._getRemoveCartItemFields(quoteId));

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', quoteId);
        }

        return mutation;
    }

    getApplyCouponMutation(couponCode: string, quoteId: string): Field {
        const mutation = new Field('applyCoupon')
            .addArgument('coupon_code', 'String!', couponCode)
            .addField(this.getCartQuery(quoteId));

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', quoteId);
        }

        return mutation;
    }

    getRemoveCouponMutation(quoteId: string): Field {
        const mutation = new Field('removeCoupon')
            .addField(this.getCartQuery(quoteId));

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', quoteId);
        }

        return mutation;
    }

    getCartDisplayConfig(): Field {
        return new Field('getCartDisplayConfig')
            .setAlias('cartDisplayConfig')
            .addFieldList(this._getCartDisplayConfigFields());
    }

    getMergeCartQuery(sourceCartId: string, destinationCartId: string): Field {
        return new Field('mergeCarts')
            .addArgument('source_cart_id', 'String!', sourceCartId)
            .addArgument('destination_cart_id', 'String!', destinationCartId)
            .addField('id');
    }

    _getSaveCartItemFields(quoteId: string): Field[] {
        return [
            this.getCartQuery(quoteId)
        ];
    }

    _getRemoveCartItemFields(quoteId: string): Field[] {
        return [
            this.getCartQuery(quoteId)
        ];
    }

    _getCartTotalsFields(): Array<string | Field> {
        return [
            'id',
            'subtotal',
            'subtotal_incl_tax',
            'items_qty',
            'tax_amount',
            'grand_total',
            'discount_amount',
            'quote_currency_code',
            'subtotal_with_discount',
            'coupon_code',
            'shipping_amount',
            'shipping_incl_tax',
            'shipping_tax_amount',
            'is_virtual',
            'applied_rule_ids',
            'shipping_amount',
            'shipping_incl_tax',
            'shipping_tax_amount',
            'shipping_method',
            'is_in_store_pickup_available',
            this._getCartItemsField(),
            this._getAppliedTaxesField()
        ];
    }

    _getBundleOptionValuesFields(): string[] {
        return [
            'id',
            'label',
            'quantity',
            'price'
        ];
    }

    _getBundleOptionValuesField(): Field {
        return new Field('values')
            .addFieldList(this._getBundleOptionValuesFields());
    }

    _getBundleOptionsFields(): Array<string | Field> {
        return [
            'id',
            'label',
            this._getBundleOptionValuesField()
        ];
    }

    _getBundleOptionsField(): Field {
        return new Field('bundle_options')
            .addFieldList(this._getBundleOptionsFields());
    }

    _getCustomizableOptionValueFields(): string[] {
        return [
            'id',
            'label',
            'value'
        ];
    }

    _getCustomizableOptionValueField(): Field {
        return new Field('values')
            .addFieldList(this._getCustomizableOptionValueFields());
    }

    _getCustomizableOptionsFields(): Field {
        return new Field('customizable_options')
            .addFieldList([
                'id',
                'label',
                this._getCustomizableOptionValueField()
            ]);
    }

    _getDownloadableLinksField(): Field {
        return new Field('downloadable_links')
            .addFieldList(this._getDownloadableLinksFields());
    }

    _getDownloadableLinksFields(): string[] {
        return [
            'id',
            'label'
        ];
    }

    _getCartItemFields(): Array<string | Field> {
        return [
            'qty',
            'sku',
            'price',
            'item_id',
            'row_total',
            'row_total_incl_tax',
            'tax_amount',
            'tax_percent',
            'discount_amount',
            'discount_percent',
            this._getCustomizableOptionsFields(),
            this._getDownloadableLinksField(),
            this._getBundleOptionsField(),
            this._getProductField()
        ];
    }

    _getProductField(): Field {
        return new Field('product')
            .addFieldList(ProductListQuery._getCartProductInterfaceFields());
    }

    _getCartItemsField(): Field {
        return new Field('items')
            .addFieldList(this._getCartItemFields());
    }

    _getCartDisplayConfigFields(): string[] {
        return [
            'display_tax_in_price',
            'display_tax_in_subtotal',
            'display_tax_in_shipping_amount',
            'include_tax_in_order_total',
            'display_full_tax_summary',
            'display_zero_tax_subtotal'
        ];
    }

    _getAppliedTaxesField(): Field {
        return new Field('applied_taxes')
            .addField(this._getAppliedTaxesRatesField());
    }

    _getAppliedTaxesRatesField(): Field {
        return new Field('rates')
            .addFieldList(this._getAppliedTaxesRatesFields());
    }

    _getAppliedTaxesRatesFields(): string[] {
        return [
            'percent',
            'title'
        ];
    }
}

export default new CartQuery();
