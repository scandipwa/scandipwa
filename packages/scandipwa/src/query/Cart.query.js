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
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.config';
import { isSignedIn } from 'Util/Auth';
import { Field, Fragment } from 'Util/Query';

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
    getCartQuery2(quoteId) {
        const query = new Field('getCartForCustomer')
            .addFieldList(this._getCartTotalsFields2())
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

    _getCartTotalsFields2() {
        const { pathname = '' } = location;
        const checkoutData = (
            pathname.includes(CHECKOUT_URL)
                ? [this._getOrderShippingAddressField2()]
                : []
        );

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
            ...checkoutData,
            'is_in_store_pickup_available',
            this._getCartItemsField2(),
            this._getAppliedTaxesField2(),
            this._getMinimumOrderAmount()
        ];
    }

    _getOrderShippingAddressField2() {
        return new Field('shipping_address')
            .addFieldList(this._getOrderAddressFields2());
    }

    _getOrderAddressFields2() {
        return [
            'city',
            'country_id',
            'firstname',
            'lastname',
            'postcode',
            'region',
            'telephone',
            'vat_id',
            'email',
            'street'
        ];
    }

    _getBundleOptionValuesFields2() {
        return [
            'id',
            'label',
            'quantity',
            'price'
        ];
    }

    _getBundleOptionValuesField2() {
        return new Field('values')
            .addFieldList(this._getBundleOptionValuesFields2());
    }

    _getBundleOptionsFields2() {
        return [
            'id',
            'label',
            this._getBundleOptionValuesField2()
        ];
    }

    _getBundleOptionsField2() {
        return new Field('bundle_options')
            .addFieldList(this._getBundleOptionsFields2());
    }

    _getCustomizableOptionValueFields2() {
        return [
            'id',
            'label',
            'value'
        ];
    }

    _getCustomizableOptionValueField2() {
        return new Field('values')
            .addFieldList(this._getCustomizableOptionValueFields2());
    }

    _getCustomizableOptionsFields2() {
        return new Field('customizable_options')
            .addFieldList([
                'id',
                'label',
                this._getCustomizableOptionValueField2()
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
            this._getCustomizableOptionsFields2(),
            this._getDownloadableLinksField(),
            this._getBundleOptionsField2(),
            this._getProductField()
        ];
    }

    _getProductField() {
        return new Field('product')
            .addFieldList(ProductListQuery._getCartProductInterfaceFields());
    }

    _getCartItemsField2() {
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

    _getAppliedTaxesField2() {
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

    _getMinimumOrderAmount() {
        return new Field('minimum_order_amount')
            .addFieldList(this._getMinimumOrderAmountFields());
    }

    _getMinimumOrderAmountFields() {
        return [
            'minimum_order_amount_reached',
            'minimum_order_description'
        ];
    }

    /*
    * Data for new cart
    */

    getCartQuery(cartId) {
        return new Field('cart')
            .setAlias('cartData')
            .addArgument('cart_id', 'String!', cartId)
            .addFieldList(this._getCartTotalsFields());
    }

    _getCartTotalsFields() {
        return [
            'id',
            'email',
            this._getPricesField(),
            this._getShippingAddressesField(),
            this._getMinimumOrderAmount(),
            this._getCartItemsField(),
            'total_quantity',
            'is_virtual',
            'is_in_store_pickup_available'
        ];
    }

    _getPriceField() {
        return [
            'value',
            'currency'
        ];
    }

    _getAmountField() {
        return new Field('amount')
            .addFieldList(this._getPriceField());
    }

    _getBaseAmountField() {
        return new Field('base_amount')
            .addFieldList(this._getPriceField());
    }

    _getCartItemsField() {
        return new Field('items')
            .addFieldList(this._getCartItemsFields());
    }

    _getCartItemsFields() {
        return [
            'id',
            'uid',
            'sku',
            'quantity',
            this._getCartItemProduct(),
            this._getCartItemPricesField(),
            this._getCartDownloadableProductLinkField(),
            this._getCartBundleProductFragment(),
            this._getCartConfigurableProductFragment()
        ];
    }

    _getCartItemProduct() {
        return new Field('product')
            .addFieldList(ProductListQuery._getCartProductInterfaceFields());
    }

    _getCartDownloadableProductLinkField() {
        return new Fragment('DownloadableCartItem')
            .addFieldList([
                this._getDownloadableLinkField(),
                this._getDownloadableSamplesField()
            ]);
    }

    _getDownloadableLinkField() {
        return new Field('links')
            .addFieldList(this._getDownloadableLinkFields());
    }

    _getDownloadableLinkFields() {
        return [
            'id',
            'title',
            'sort_order',
            'price'
        ];
    }

    _getDownloadableSamplesField() {
        return new Field('samples')
            .addFieldList(this._getDownloadableSamplesFields());
    }

    _getDownloadableSamplesFields() {
        return [
            'id',
            'title'
        ];
    }

    _getCartBundleProductFragment() {
        return new Fragment('BundleCartItem')
            .addFieldList([
                this._getBundleOptionsField(),
                this._getCustomizableOptionsField()
            ]);
    }

    _getBundleOptionsField() {
        return new Field('bundle_options')
            .addFieldList(this._getBundleOptionsFields());
    }

    _getBundleOptionsFields() {
        return [
            'id',
            'label',
            'type',
            this._getBundleOptionValuesField()
        ];
    }

    _getBundleOptionValuesField() {
        return new Field('values')
            .addFieldList(this._getBundleOptionValuesFields());
    }

    _getBundleOptionValuesFields() {
        return [
            'id',
            'label',
            'quantity',
            'price'
        ];
    }

    _getCartConfigurableProductFragment() {
        return new Fragment('ConfigurableCartItem')
            .addFieldList([
                this._getConfigurableOptionsField()
            ]);
    }

    _getConfigurableOptionsField() {
        return new Field('configurable_options')
            .addFieldList(this._getConfigurableOptionsFields());
    }

    _getConfigurableOptionsFields() {
        return [
            'id',
            'option_label',
            'value_label'
        ];
    }

    _getCustomizableOptionsField() {
        return new Field('customizable_options')
            .addFieldList(this._getCustomizableOptionsFields());
    }

    _getCustomizableOptionsFields() {
        return [
            'id',
            'label',
            'label',
            'type',
            'sort_order',
            'is_required',
            this._getCustomizableOptionValueField()
        ];
    }

    _getCustomizableOptionValueField() {
        return new Field('values')
            .addFieldList(this._getCustomizableOptionValueFields());
    }

    _getCustomizableOptionValueFields() {
        return [
            'id',
            'label',
            'value'
        ];
    }

    _getCartItemPricesField() {
        return new Field('prices')
            .addFieldList(this._getCartItemPricesFields());
    }

    _getCartItemPricesFields() {
        return [
            this._getCartItemPriceField(),
            this._getCartItemRowTotalField(),
            this._getCartItemRowTotalInclTaxField(),
            this._getCartItemTotalDiscountField()
        ];
    }

    _getCartItemPriceField() {
        return new Field('price')
            .addFieldList(this._getPriceField());
    }

    _getCartItemRowTotalField() {
        return new Field('row_total')
            .addFieldList(this._getPriceField());
    }

    _getCartItemRowTotalInclTaxField() {
        return new Field('row_total_including_tax')
            .addFieldList(this._getPriceField());
    }

    _getCartItemDiscountsField() {
        return new Field('discounts')
            .addFieldList(this._getPriceField());
    }

    _getCartItemTotalDiscountField() {
        return new Field('total_item_discount')
            .addFieldList(this._getPriceField());
    }

    _getPricesField() {
        return new Field('prices')
            .addFieldList(this._getPricesFields());
    }

    _getPricesFields() {
        return [
            'applied_rule_ids',
            'coupon_code',
            'quote_currency_code',
            this._getGrandTotalField(),
            this._getSubtotalInclTaxField(),
            this._getSubtotalExclTaxField(),
            this._getSubtotalWithDiscountExclTaxField(),
            this._getDiscountField(),
            this._getAppliedTaxesField()
        ];
    }

    _getGrandTotalField() {
        return new Field('grand_total')
            .addFieldList(this._getPriceField());
    }

    _getSubtotalInclTaxField() {
        return new Field('subtotal_including_tax')
            .addFieldList(this._getPriceField());
    }

    _getSubtotalExclTaxField() {
        return new Field('subtotal_excluding_tax')
            .addFieldList(this._getPriceField());
    }

    _getSubtotalWithDiscountExclTaxField() {
        return new Field('subtotal_with_discount_excluding_tax')
            .addFieldList(this._getPriceField());
    }

    _getDiscountField() {
        return new Field('discount')
            .addFieldList(this._getDiscountFields());
    }

    _getDiscountFields() {
        return [
            'label',
            this._getAmountField()
        ];
    }

    _getAppliedTaxesField() {
        return new Field('applied_taxes')
            .addFieldList(this._getAppliedTaxesFields());
    }

    _getAppliedTaxesFields() {
        return [
            'label',
            'percent',
            this._getAmountField()
        ];
    }

    _getShippingAddressesField() {
        return new Field('shipping_addresses')
            .addFieldList(this._getShippingAddressesFields());
    }

    _getShippingAddressesFields() {
        return [
            this._getAvailableShippingMethodField(),
            this._getSelectedShippingMethodField(),
            'customer_notes'
        ];
    }

    _getAvailableShippingMethodField() {
        return new Field('available_shipping_methods')
            .addFieldList(this._getAvailableShippingMethodFields());
    }

    _getAvailableShippingMethodFields() {
        return [
            'available',
            'method_code',
            'carrier_code',
            'carrier_title',
            'error_message'
        ];
    }

    _getSelectedShippingMethodField() {
        return new Field('selected_shipping_method')
            .addFieldList(this._getSelectedShippingMethodFields());
    }

    _getSelectedShippingMethodFields() {
        const { pathname = '' } = location;
        const checkoutData = (
            pathname.includes(CHECKOUT_URL)
                ? [this._getOrderShippingAddressField()]
                : []
        );

        return [
            'amount_incl_tax',
            'carrier_code',
            'carrier_title',
            'method_code',
            'method_title',
            'tax_amount',
            this._getAmountField(),
            ...checkoutData
        ];
    }

    _getOrderShippingAddressField() {
        return new Field('address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderAddressFields() {
        return [
            'city',
            this._getCountryField(),
            'firstname',
            'lastname',
            'postcode',
            this._getRegionField(),
            'telephone',
            'vat_id',
            'email',
            'street'
        ];
    }

    _getCountryField() {
        return new Field('country')
            .addFieldList(this._getCountryFields());
    }

    _getCountryFields() {
        return [
            'code'
        ];
    }

    _getRegionField() {
        return new Field('region')
            .addFieldList(this._getRegionFields());
    }

    _getRegionFields() {
        return [
            'label',
            'region_id'
        ];
    }
}

export default new CartQuery();
