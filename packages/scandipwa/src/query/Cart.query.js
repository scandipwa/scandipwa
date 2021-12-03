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
import { isSignedIn } from 'Util/Auth';
import { Field } from 'Util/Query';

/** @namespace Query/Cart/Query */
export class CartQuery {
    //#region MUTATIONS
    getAddProductToCartMutation(cartId, cartItems) {
        return new Field('addProductsToCart')
            .addArgument('cartId', 'String!', cartId)
            .addArgument('cartItems', '[CartItemInput!]!', cartItems)
            .addField(this._getUserErrorsField());
    }

    getUpdateCartItemsMutation(input) {
        return new Field('updateCartItems')
            .addArgument('input', 'UpdateCartItemsInput', input)
            .addField(this._getCartUpdateField());
    }

    getCreateEmptyCartMutation() {
        return new Field('createEmptyCart');
    }
    //#endregion

    //#region QUERIES
    getCartQuery(quoteId) {
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
    _getUserErrorsFields() {
        return [
            'message',
            'code'
        ];
    }

    _getUserErrorsField() {
        return new Field('user_errors')
            .addFieldList(this._getUserErrorsFields());
    }
    //#endregion

    _getCartUpdateField() {
        return new Field('cart')
            .addField('id');
    }

    getRemoveCartItemMutation(item_id, quoteId) {
        const mutation = new Field('removeCartItem')
            .addArgument('item_id', 'Int!', item_id)
            .addFieldList(this._getRemoveCartItemFields(quoteId));

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', quoteId);
        }

        return mutation;
    }

    getApplyCouponMutation(couponCode, quoteId) {
        const mutation = new Field('applyCoupon')
            .addArgument('coupon_code', 'String!', couponCode)
            .addField(this.getCartQuery(quoteId));

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', quoteId);
        }

        return mutation;
    }

    getRemoveCouponMutation(quoteId) {
        const mutation = new Field('removeCoupon')
            .addField(this.getCartQuery(quoteId));

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', quoteId);
        }

        return mutation;
    }

    getCartDisplayConfig() {
        return new Field('getCartDisplayConfig')
            .setAlias('cartDisplayConfig')
            .addFieldList(this._getCartDisplayConfigFields());
    }

    getMergeCartQuery(sourceCartId, destinationCartId) {
        return new Field('mergeCarts')
            .addArgument('source_cart_id', 'String!', sourceCartId)
            .addArgument('destination_cart_id', 'String!', destinationCartId)
            .addField('id');
    }

    _getSaveCartItemFields(quoteId) {
        return [
            this.getCartQuery(quoteId)
        ];
    }

    _getRemoveCartItemFields(quoteId) {
        return [
            this.getCartQuery(quoteId)
        ];
    }

    _getCartTotalsFields() {
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

    _getBundleOptionValuesFields() {
        return [
            'id',
            'label',
            'quantity',
            'price'
        ];
    }

    _getBundleOptionValuesField() {
        return new Field('values')
            .addFieldList(this._getBundleOptionValuesFields());
    }

    _getBundleOptionsFields() {
        return [
            'id',
            'label',
            this._getBundleOptionValuesField()
        ];
    }

    _getBundleOptionsField() {
        return new Field('bundle_options')
            .addFieldList(this._getBundleOptionsFields());
    }

    _getCustomizableOptionValueFields() {
        return [
            'id',
            'label',
            'value'
        ];
    }

    _getCustomizableOptionValueField() {
        return new Field('values')
            .addFieldList(this._getCustomizableOptionValueFields());
    }

    _getCustomizableOptionsFields() {
        return new Field('customizable_options')
            .addFieldList([
                'id',
                'label',
                this._getCustomizableOptionValueField()
            ]);
    }

    _getDownloadableLinksField() {
        return new Field('downloadable_links')
            .addFieldList(this._getDownloadableLinksFields());
    }

    _getDownloadableLinksFields() {
        return [
            'id',
            'label'
        ];
    }

    _getCartItemFields() {
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

    _getProductField() {
        return new Field('product')
            .addFieldList(ProductListQuery._getCartProductInterfaceFields());
    }

    _getCartItemsField() {
        return new Field('items')
            .addFieldList(this._getCartItemFields());
    }

    _getCartDisplayConfigFields() {
        return [
            'display_tax_in_price',
            'display_tax_in_subtotal',
            'display_tax_in_shipping_amount',
            'include_tax_in_order_total',
            'display_full_tax_summary',
            'display_zero_tax_subtotal'
        ];
    }

    _getAppliedTaxesField() {
        return new Field('applied_taxes')
            .addField(this._getAppliedTaxesRatesField());
    }

    _getAppliedTaxesRatesField() {
        return new Field('rates')
            .addFieldList(this._getAppliedTaxesRatesFields());
    }

    _getAppliedTaxesRatesFields() {
        return [
            'percent',
            'title'
        ];
    }
}

export default new CartQuery();
