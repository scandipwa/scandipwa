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
import { Field, Fragment } from 'Util/Query';

/** @namespace Query/Cart */
export class CartQuery {
    //#region MUTATIONS
    getAddProductToCartMutation(cartId, cartItems) {
        return new Field('addProductsToCart')
            .addArgument('cartId', 'String!', cartId)
            .addArgument('cartItems', '[CartItemInput!]!', cartItems)
            // .addField(this._getCartFields())
            .addField(this._getUserErrorsField());
    }
    //#endregion

    //#region QUERIES
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

    //#region CART INTERFACE
    _getCartFields() {
        return new Field('cart')
            .addField(this._getAppliedCouponsField())
            .addField('is_virtual')
            .addField(this._getPricesField())
            .addField('total_quantity')
            .addField('id')
            .addField(this._getCartItemsField2());
    }

    _getCartItemsFields() {
        return [
            'uid',
            'quantity',
            this._getPricesField(),
            this._getCartItemFragments(),
            this._getCartProductField()
        ];
    }

    _getCartItemsField2() {
        return new Field('items')
            .addFieldList(this._getCartItemsFields());
    }

    _getCartItemFragments() {
        return [
            this._getBundleItemFragment(),
            this._getCustomizableItemFragment(),
            this._getConfigurableItemFragment(),
            this._getDownloadableItemFragment()
        ];
    }
    //#endregion

    //#region CART PRODUCT
    _getCartProductFields() {
        return [
            'stock_status',
            'name',
            'sku',
            'uid',
            'type_id',
            ProductListQuery._getProductThumbnailField()
        ];
    }

    _getCartProductField() {
        return new Field('product')
            .addFieldList(this._getCartProductFields());
    }
    //#endregion

    //#region COUPON
    _getAppliedCouponsFields() {
        return [
            'code'
        ];
    }

    _getAppliedCouponsField() {
        return new Field('applied_coupons')
            .addFieldList(this._getAppliedCouponsFields());
    }
    //#endregion

    //#region PRICE
    _getMoneyFields() {
        return [
            'value',
            'currency'
        ];
    }

    _getMoneyField(fieldName) {
        return new Field(fieldName)
            .addFieldList(this._getMoneyFields());
    }

    _getAppliedTaxesFields2() {
        return [
            this._getMoneyField('amount'),
            'label'
        ];
    }

    _getAppliedTaxesField2() {
        return new Field('applied_taxes')
            .addFieldList(this._getAppliedTaxesFields2());
    }

    _getDiscountsFields() {
        return [
            this._getMoneyField('amount'),
            'label'
        ];
    }

    _getDiscountsField() {
        return new Field('discounts')
            .addFieldList(this._getDiscountsFields());
    }

    _getPricesFields() {
        return [
            // this._getMoneyField('price'),
            // this._getMoneyField('row_total'),
            // this._getMoneyField('row_total_including_tax'),
            // this._getMoneyField('total_item_discount'),
            this._getDiscountsField()
            // this._getAppliedTaxesField2()
        ];
    }

    _getPricesField() {
        return new Field('prices')
            .addFieldList(this._getPricesFields());
    }
    //#endregion

    //#region BUNDLE FRAGMENT
    _getBundleItemValueFields() {
        return [
            'label',
            'price',
            'quantity'
        ];
    }

    _getBundleItemValueField() {
        return new Field('values')
            .addFieldList(this._getBundleItemValueFields());
    }

    _getBundleItemFields() {
        return [
            'label',
            'type',
            this._getBundleItemValueField()
        ];
    }

    _getBundleItemField() {
        return new Field('bundle_options')
            .addFieldList(this._getBundleItemFields());
    }

    _getBundleItemFragment() {
        return new Fragment('BundleCartItem')
            .addField(this._getBundleItemField());
    }
    //#endregion

    //#region CUSTOMIZABLE FRAGMENT
    _getCustomizableItemValueFields() {
        return [
            'value'
        ];
    }

    _getCustomizableItemValueField() {
        return new Field('values')
            .addFieldList(this._getCustomizableItemValueFields());
    }

    _getCustomizableItemFields() {
        return [
            'label',
            this._getCustomizableItemValueField()
        ];
    }

    _getCustomizableItemField() {
        return new Field('customizable_options')
            .addFieldList(this._getCustomizableItemFields());
    }

    _getCustomizableItemFragment() {
        return new Fragment('CustomizableCartItem')
            .addField(this._getCustomizableItemField());
    }
    //#endregion

    //#region DOWNLOADABLE FRAGMENT
    _getDownloadableLinksFields2() {
        return [
            'title',
            'price'
        ];
    }

    _getDownloadableLinksField2() {
        return new Field('links')
            .addFieldList(this._getDownloadableLinksFields2());
    }

    _getDownloadableItemFragment() {
        return new Fragment('DownloadableCartItem')
            .addField(this._getDownloadableLinksField2());
    }
    //#endregion

    //#region CONFIGURABLE FRAGMENT
    _getConfigurableOptionsFields() {
        return [
            'option_label'
        ];
    }

    _getConfigurableOptionsField() {
        return new Field('configurable_options')
            .addFieldList(this._getConfigurableOptionsFields());
    }

    _getConfigurableItemFragment() {
        return new Fragment('ConfigurableCartItem')
            .addField(this._getConfigurableOptionsField());
    }
    //#endregion

    getCartQuery(quoteId) {
        const query = new Field('getCartForCustomer')
            .addFieldList(this._getCartTotalsFields())
            .setAlias('cartData');

        if (!isSignedIn()) {
            query.addArgument('guestCartId', 'String', quoteId);
        }

        return query;
    }

    getCreateEmptyCartMutation() {
        return new Field('createEmptyCart');
    }

    getSaveCartItemMutation(product, quoteId) {
        const mutation = new Field('saveCartItem')
            .addArgument('cartItem', 'CartItemInput!', product)
            .addFieldList(this._getSaveCartItemFields(quoteId));

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', quoteId);
        }

        return mutation;
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
            'type',
            this._getBundleOptionValuesField()
        ];
    }

    _getBundleOptionsField() {
        return new Field('bundle_options')
            .addFieldList(this._getBundleOptionsFields());
    }

    _getCustomizableOptionPriceFields() {
        return [
            'value',
            'units',
            'type'
        ];
    }

    _getCustomizableOptionPriceField() {
        return new Field('price')
            .addFieldList(this._getCustomizableOptionPriceFields());
    }

    _getCustomizableOptionValueFields() {
        return [
            'id',
            'label',
            'value',
            this._getCustomizableOptionPriceField()
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
                'is_required',
                this._getCustomizableOptionValueField(),
                'sort_order'
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
        ProductListQuery.options.isForLinkedProducts = true;

        const productQuery = new Field('product')
            .addFieldList(ProductListQuery._getProductInterfaceFields(false, true));

        ProductListQuery.options.isForLinkedProducts = false;

        return productQuery;
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
