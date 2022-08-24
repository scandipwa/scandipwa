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
    GQLCartItemInput,
    GQLCartUserInputErrorType,
    GQLUpdateCartItemsInput
} from 'Type/Graphql.type';
import { isSignedIn } from 'Util/Auth';

import {
    AppliedTaxItem,
    AppliedTaxItemRate,
    CartDisplayConfig,
    CartProductItem,
    CartUserInputError,
    CartWithId,
    QuoteData,
    SelectedBundleOption,
    SelectedBundleOptionValue,
    SelectedCustomizableOption,
    SelectedCustomizableOptionValue,
    SelectedDownloadableLinks,
    TotalsItem
} from './Cart.type';

/** @namespace Query/Cart/Query */
export class CartQuery {
    //#region MUTATIONS
    getAddProductToCartMutation(
        cartId: string,
        cartItems: GQLCartItemInput[]
    ): Mutation<'addProductsToCart', {
            cart: CartWithId;
            user_errors: CartUserInputError[];
        }> {
        return new Mutation<'addProductsToCart', {
            cart: CartWithId;
            user_errors: CartUserInputError[];
        }>('addProductsToCart')
            .addArgument('cartId', 'String!', cartId)
            .addArgument('cartItems', '[CartItemInput!]!', cartItems)
            .addField(this._getUserErrorsField());
    }

    getUpdateCartItemsMutation(
        input: GQLUpdateCartItemsInput
    ): Mutation<'updateCartItems', { cart: CartWithId }> {
        return new Mutation<'updateCartItems', { cart: CartWithId }>('updateCartItems')
            .addArgument('input', 'UpdateCartItemsInput', input)
            .addField(this._getCartUpdateField());
    }

    getCreateEmptyCartMutation(): Mutation<'createEmptyCart', string> {
        return new Mutation<'createEmptyCart', string>('createEmptyCart');
    }
    //#endregion

    //#region QUERIES
    getCartQuery(quoteId: string): Query<'cartData', QuoteData> {
        const query = new Query<'getCartForCustomer', QuoteData>('getCartForCustomer')
            .addFieldList(this._getCartTotalsFields())
            .setAlias('cartData');

        if (!isSignedIn()) {
            query.addArgument('guestCartId', 'String', quoteId);
        }

        return query;
    }
    //#endregion

    /* Cart config */

    getCartDisplayConfig(): Query<'cartDisplayConfig', CartDisplayConfig> {
        return new Query<'getCartDisplayConfig', CartDisplayConfig>('getCartDisplayConfig')
            .setAlias('cartDisplayConfig')
            .addFieldList(this._getCartDisplayConfigFields());
    }

    _getCartDisplayConfigFields(): Array<
    Field<'display_tax_in_price', string>
    | Field<'display_tax_in_subtotal', string>
    | Field<'display_tax_in_shipping_amount', string>
    | Field<'include_tax_in_order_total', boolean>
    | Field<'display_full_tax_summary', boolean>
    | Field<'display_zero_tax_subtotal', boolean>
    > {
        return [
            new Field<'display_tax_in_price', string>('display_tax_in_price'),
            new Field<'display_tax_in_subtotal', string>('display_tax_in_subtotal'),
            new Field<'display_tax_in_shipping_amount', string>('display_tax_in_shipping_amount'),
            new Field<'include_tax_in_order_total', boolean>('include_tax_in_order_total'),
            new Field<'display_full_tax_summary', boolean>('display_full_tax_summary'),
            new Field<'display_zero_tax_subtotal', boolean>('display_zero_tax_subtotal')
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
            this._getCartConfigurableProductFragment(),
            this._getCartVirtualProductFragments(),
            this._getCartSimpleProductFragments()
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
                this._getDownloadableSamplesField(),
                this._getCustomizableOptionsField('downloadable_customizable_options')
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
                this._getCustomizableOptionsField('bundle_customizable_options')
            ]);
    }

    _getCartConfigurableProductFragment() {
        return new Fragment('ConfigurableCartItem')
            .addFieldList([
                this._getConfigurableOptionsField(),
                this._getCustomizableOptionsField('configurable_customizable_options')
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

    _getCartSimpleProductFragments() {
        return new Fragment('SimpleCartItem')
            .addFieldList([
                this._getCustomizableOptionsField('simple_customizable_options')
            ]);
    }

    _getCartVirtualProductFragments() {
        return new Fragment('VirtualCartItem')
            .addFieldList([
                this._getCustomizableOptionsField('virtual_customizable_options')
            ]);
    }

    _getCustomizableOptionsField(alias) {
        return new Field('customizable_options')
            .setAlias(alias)
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

    //#region ERROR
    _getUserErrorsFields(): Array<
    Field<'message', string>
    | Field<'code', GQLCartUserInputErrorType>
    > {
        return [
            new Field<'message', string>('message'),
            new Field<'code', GQLCartUserInputErrorType>('code')
        ];
    }

    _getUserErrorsField(): Field<'user_errors', CartUserInputError, true> {
        return new Field<'user_errors', CartUserInputError, true>('user_errors', true)
            .addFieldList(this._getUserErrorsFields());
    }
    //#endregion

    _getCartUpdateField(): Field<'cart', CartWithId> {
        return new Field<'cart', CartWithId>('cart')
            .addField('id');
    }

    getRemoveCartItemMutation(item_id: number, quoteId: string): Mutation<'removeCartItem', { cartData: QuoteData }> {
        const mutation = new Mutation<'removeCartItem', { cartData: QuoteData }>('removeCartItem')
            .addArgument('item_id', 'Int!', item_id)
            .addFieldList(this._getRemoveCartItemFields(quoteId));

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', quoteId);
        }

        return mutation;
    }

    getMergeCartQuery(sourceCartId: string, destinationCartId: string): Mutation<'mergeCarts', CartWithId> {
        return new Mutation<'mergeCarts', CartWithId>('mergeCarts')
            .addArgument('source_cart_id', 'String!', sourceCartId)
            .addArgument('destination_cart_id', 'String!', destinationCartId)
            .addField('id');
    }

    _getSaveCartItemFields(quoteId: string): Query<'cartData', QuoteData>[] {
        return [
            this.getCartQuery(quoteId)
        ];
    }

    _getRemoveCartItemFields(quoteId: string): Field<'cartData', QuoteData>[] {
        return [
            this._getCartQueryField(quoteId)
        ];
    }

    _getCartQueryField(quoteId: string): Field<'cartData', QuoteData> {
        const query = new Field<'getCartForCustomer', QuoteData>('getCartForCustomer')
            .addFieldList(this._getCartTotalsFields())
            .setAlias('cartData');

        if (!isSignedIn()) {
            query.addArgument('guestCartId', 'String', quoteId);
        }

        return query;
    }

    _getCartTotalsFields(): Array<
    Field<'id', string>
    | Field<'subtotal', number>
    | Field<'subtotal_incl_tax', number>
    | Field<'items_qty', number>
    | Field<'tax_amount', number>
    | Field<'grand_total', number>
    | Field<'discount_amount', number>
    | Field<'quote_currency_code', string>
    | Field<'subtotal_with_discount', number>
    | Field<'coupon_code', string>
    | Field<'shipping_amount', number>
    | Field<'shipping_incl_tax', number>
    | Field<'shipping_tax_amount', number>
    | Field<'is_virtual', boolean>
    | Field<'applied_rule_ids', string>
    | Field<'shipping_method', string>
    | Field<'is_in_store_pickup_available', boolean>
    | Field<'items', TotalsItem, true>
    | Field<'applied_taxes', AppliedTaxItem, true>
    > {
        return [
            new Field<'id', string>('id'),
            new Field<'subtotal', number>('subtotal'),
            new Field<'subtotal_incl_tax', number>('subtotal_incl_tax'),
            new Field<'items_qty', number>('items_qty'),
            new Field<'tax_amount', number>('tax_amount'),
            new Field<'grand_total', number>('grand_total'),
            new Field<'discount_amount', number>('discount_amount'),
            new Field<'quote_currency_code', string>('quote_currency_code'),
            new Field<'subtotal_with_discount', number>('subtotal_with_discount'),
            new Field<'coupon_code', string>('coupon_code'),
            new Field<'shipping_amount', number>('shipping_amount'),
            new Field<'shipping_incl_tax', number>('shipping_incl_tax'),
            new Field<'shipping_tax_amount', number>('shipping_tax_amount'),
            new Field<'is_virtual', boolean>('is_virtual'),
            new Field<'applied_rule_ids', string>('applied_rule_ids'),
            new Field<'shipping_method', string>('shipping_method'),
            new Field<'is_in_store_pickup_available', boolean>('is_in_store_pickup_available'),
            this._getCartItemsField(),
            this._getAppliedTaxesField()
        ];
    }

    _getBundleOptionValuesFields(): Array<
    Field<'id', number>
    | Field<'label', string>
    | Field<'quantity', number>
    | Field<'price', number>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'label', string>('label'),
            new Field<'quantity', number>('quantity'),
            new Field<'price', number>('price')
        ];
    }

    _getBundleOptionValuesField(): Field<'values', SelectedBundleOptionValue, true> {
        return new Field<'values', SelectedBundleOptionValue, true>('values', true)
            .addFieldList(this._getBundleOptionValuesFields());
    }

    _getBundleOptionsFields(): Array<
    Field<'id', number>
    | Field<'label', string>
    | Field<'type', string>
    | Field<'values', SelectedBundleOptionValue, true>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'label', string>('label'),
            new Field<'type', string>('type'),
            this._getBundleOptionValuesField()
        ];
    }

    _getBundleOptionsField(): Field<'bundle_options', SelectedBundleOption, true> {
        return new Field<'bundle_options', SelectedBundleOption, true>('bundle_options', true)
            .addFieldList(this._getBundleOptionsFields());
    }

    _getCustomizableOptionValueFields(): Array<
    Field<'id', number>
    | Field<'label', string>
    | Field<'value', string>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'label', string>('label'),
            new Field<'value', string>('value')
        ];
    }

    _getCustomizableOptionValueField(): Field<'values', SelectedCustomizableOptionValue, true> {
        return new Field<'values', SelectedCustomizableOptionValue, true>('values', true)
            .addFieldList(this._getCustomizableOptionValueFields());
    }

    _getDownloadableLinksField(): Field<'downloadable_links', SelectedDownloadableLinks, true> {
        return new Field<'downloadable_links', SelectedDownloadableLinks, true>('downloadable_links', true)
            .addFieldList(this._getDownloadableLinksFields());
    }

    _getDownloadableLinksFields(): Array<
    Field<'id', number>
    | Field<'label', string>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'label', string>('label')
        ];
    }

    _getCartItemFields(): Array<
    Field<'qty', number>
    | Field<'sku', string>
    | Field<'price', number>
    | Field<'item_id', number>
    | Field<'row_total', number>
    | Field<'row_total_incl_tax', number>
    | Field<'tax_amount', number>
    | Field<'tax_percent', number>
    | Field<'discount_amount', number>
    | Field<'discount_percent', number>
    | Field<'customizable_options', SelectedCustomizableOption>
    | Field<'downloadable_links', SelectedDownloadableLinks, true>
    | Field<'bundle_options', SelectedBundleOption, true>
    | Field<'product', CartProductItem>
    > {
        return [
            new Field<'qty', number>('qty'),
            new Field<'sku', string>('sku'),
            new Field<'price', number>('price'),
            new Field<'item_id', number>('item_id'),
            new Field<'row_total', number>('row_total'),
            new Field<'row_total_incl_tax', number>('row_total_incl_tax'),
            new Field<'tax_amount', number>('tax_amount'),
            new Field<'tax_percent', number>('tax_percent'),
            new Field<'discount_amount', number>('discount_amount'),
            new Field<'discount_percent', number>('discount_percent'),
            this._getCustomizableOptionsFields(),
            this._getDownloadableLinksField(),
            this._getBundleOptionsField(),
            this._getProductField()
        ];
    }

    _getProductField(): Field<'product', CartProductItem> {
        return new Field<'product', CartProductItem>('product')
            .addFieldList(ProductListQuery._getCartProductInterfaceFields());
    }

    _getCartItemsField(): Field<'items', TotalsItem, true> {
        return new Field<'items', TotalsItem, true>('items', true)
            .addFieldList(this._getCartItemFields());
    }

    _getAppliedTaxesField(): Field<'applied_taxes', AppliedTaxItem, true> {
        return new Field<'applied_taxes', AppliedTaxItem, true>('applied_taxes', true)
            .addField(this._getAppliedTaxesRatesField());
    }

    _getAppliedTaxesRatesField(): Field<'rates', AppliedTaxItemRate, true> {
        return new Field<'rates', AppliedTaxItemRate, true>('rates', true)
            .addFieldList(this._getAppliedTaxesRatesFields());
    }

    _getAppliedTaxesRatesFields(): Array<
    Field<'percent', number> | Field<'title', string>
    > {
        return [
            new Field<'percent', number>('percent'),
            new Field<'title', string>('title')
        ];
    }
}

export default new CartQuery();
