/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import ProductListQuery from 'Query/ProductList.query';
import { CHECKOUT_URL } from 'Route/Checkout/Checkout.config';
import { Field, Fragment } from 'Util/Query';

/** @namespace Query/Cart/Query */
export class CartQuery {
    // #region MUTATIONS
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
    // #endregion

    // #region ERROR
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
    // #endregion

    _getCartUpdateField() {
        return new Field('cart')
            .addField('id');
    }

    getRemoveCartItemMutation(item_id, quoteId) {
        const input = {
            cart_id: quoteId,
            cart_item_id: item_id
        };

        return new Field('removeItemFromCart')
            .addArgument('input', 'RemoveItemFromCartInput', input)
            .addField(this._getCart());
    }

    getMergeCartQuery(sourceCartId, destinationCartId) {
        return new Field('mergeCarts')
            .addArgument('source_cart_id', 'String!', sourceCartId)
            .addArgument('destination_cart_id', 'String!', destinationCartId)
            .addField('id');
    }

    /* Cart config */

    getCartDisplayConfig() {
        return new Field('getCartDisplayConfig')
            .setAlias('cartDisplayConfig')
            .addFieldList(this._getCartDisplayConfigFields());
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

    /* Data for new cart */

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

    /* Cart coupon */

    _getCart() {
        return new Field('cart')
            .setAlias('cartData')
            .addFieldList(this._getCartTotalsFields());
    }

    getApplyCouponMutation(couponCode, quoteId) {
        const input = {
            cart_id: quoteId,
            coupon_code: couponCode
        };

        return new Field('applyCouponToCart')
            .addArgument('input', 'ApplyCouponToCartInput', input)
            .addField(this._getCart());
    }

    getRemoveCouponMutation(quoteId) {
        return new Field('removeCouponFromCart')
            .addArgument('input', 'RemoveCouponFromCartInput', { cart_id: quoteId })
            .addField(this._getCart());
    }
}

export default new CartQuery();
