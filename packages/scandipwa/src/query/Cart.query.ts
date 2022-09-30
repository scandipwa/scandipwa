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

import {
    Field, InlineFragment, Mutation, Query,
} from '@tilework/opus';

import ProductListQuery from 'Query/ProductList.query';
import { CheckoutStepUrl } from 'Route/Checkout/Checkout.config';
import {
    GQLCartItemInput, GQLCurrencyEnum, GQLUpdateCartItemsInput,
} from 'Type/Graphql.type';

import {
    AppliedTax,
    AvailableShippingMethod,
    CartAddress,
    CartBundleItem,
    CartBundleOption,
    CartBundleOptionValue,
    CartConfigurableItem,
    CartConfigurableOption,
    CartCustomizableOption,
    CartCustomizableOptionValue,
    CartDisplayConfig,
    CartDownloadableItem,
    CartDownloadableProductLink,
    CartDownloadableProductSample,
    CartItem,
    CartItemPrices,
    CartItemProduct,
    CartPrices,
    CartShippingAddress,
    CartSimpleItem,
    CartTotals,
    CartVirtualItem,
    Discount,
    MinimumOrderAmount,
    Money,
    Region,
    SelectedShippingMethod,
    UserErrors,
} from './Cart.type';

/** @namespace Query/Cart/Query */
export class CartQuery {
    // #region MUTATIONS
    getAddProductToCartMutation(cartId: string, cartItems: GQLCartItemInput[]): Mutation<
    'addProductsToCart',
    { user_errors: UserErrors }
    > {
        return new Mutation<'addProductsToCart', { user_errors: UserErrors }>('addProductsToCart')
            .addArgument('cartId', 'String!', cartId)
            .addArgument('cartItems', '[CartItemInput!]!', cartItems)
            .addField(this._getUserErrorsField());
    }

    getUpdateCartItemsMutation(input: GQLUpdateCartItemsInput): Mutation<'updateCartItems', { cart: { id: string } }> {
        return new Mutation<'updateCartItems', { cart: { id: string } }>('updateCartItems')
            .addArgument('input', 'UpdateCartItemsInput', input)
            .addField(this._getCartUpdateField());
    }

    getCreateEmptyCartMutation(): Mutation<'createEmptyCart', { createEmptyCart: string }> {
        return new Mutation<'createEmptyCart', { createEmptyCart: string }>('createEmptyCart');
    }
    // #endregion

    // #region ERROR
    _getUserErrorsFields(): Array<
    Field<'message', string>
    | Field<'code', string>
    > {
        return [
            new Field<'message', string>('message'),
            new Field<'code', string>('code'),
        ];
    }

    _getUserErrorsField(): Field<'user_errors', UserErrors> {
        return new Field<'user_errors', UserErrors>('user_errors')
            .addFieldList(this._getUserErrorsFields());
    }
    // #endregion

    _getCartUpdateField(): Field<'cart', { id: string }> {
        return new Field<'cart', { id: string }>('cart')
            .addField(new Field<'id', string>('id'));
    }

    getRemoveCartItemMutation(
        item_id: number,
        quoteId: string,
    ): Mutation<'removeItemFromCart', { cartData: CartTotals }> {
        const input = {
            cart_id: quoteId,
            cart_item_id: item_id,
        };

        return new Mutation<'removeItemFromCart', { cartData: CartTotals }>('removeItemFromCart')
            .addArgument('input', 'RemoveItemFromCartInput', input)
            .addField(this._getCart());
    }

    getMergeCartQuery(sourceCartId: string, destinationCartId: string): Mutation<'mergeCarts', { id: string }> {
        return new Mutation<'mergeCarts', { id: string }>('mergeCarts')
            .addArgument('source_cart_id', 'String!', sourceCartId)
            .addArgument('destination_cart_id', 'String!', destinationCartId)
            .addField(new Field<'id', string>('id'));
    }

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
            new Field<'display_zero_tax_subtotal', boolean>('display_zero_tax_subtotal'),
        ];
    }

    /* Data for new cart */

    getCartQuery(cartId: string): Query<'cartData', CartTotals> {
        return new Query<'cart', CartTotals>('cart')
            .setAlias('cartData')
            .addArgument('cart_id', 'String!', cartId)
            .addFieldList(this._getCartTotalsFields());
    }

    _getCartTotalsFields(): Array<
    Field<'id', string>
    | Field<'email', string>
    | Field<'prices', CartPrices>
    | Field<'shipping_addresses', CartShippingAddress, true>
    | Field<'minimum_order_amount', MinimumOrderAmount>
    | Field<'items', CartItem, true>
    | Field<'total_quantity', number>
    | Field<'is_virtual', boolean>
    | Field<'is_in_store_pickup_available', boolean>
    > {
        return [
            new Field<'id', string>('id'),
            new Field<'email', string>('email'),
            this._getPricesField(),
            this._getShippingAddressesField(),
            this._getMinimumOrderAmount(),
            this._getCartItemsField(),
            new Field<'total_quantity', number>('total_quantity'),
            new Field<'is_virtual', boolean>('is_virtual'),
            new Field<'is_in_store_pickup_available', boolean>('is_in_store_pickup_available'),
        ];
    }

    _getPriceField(): Array<
    Field<'value', number>
    | Field<'currency', GQLCurrencyEnum>
    > {
        return [
            new Field<'value', number>('value'),
            new Field<'currency', GQLCurrencyEnum>('currency'),
        ];
    }

    _getAmountField(): Field<'amount', Money> {
        return new Field<'amount', Money>('amount')
            .addFieldList(this._getPriceField());
    }

    _getBaseAmountField(): Field<'base_amount', Money> {
        return new Field<'base_amount', Money>('base_amount')
            .addFieldList(this._getPriceField());
    }

    _getCartItemsField(): Field<'items', CartItem, true> {
        return new Field<'items', CartItem, true>('items', true)
            .addFieldList(this._getCartItemsFields());
    }

    _getCartItemsFields(): Array<
    Field<'id', number>
    | Field<'uid', string>
    | Field<'sku', string>
    | Field<'quantity', number>
    | Field<'product', CartItemProduct>
    | Field<'prices', CartItemPrices>
    | InlineFragment<'DownloadableCartItem', CartDownloadableItem>
    | InlineFragment<'BundleCartItem', CartBundleItem>
    | InlineFragment<'ConfigurableCartItem', CartConfigurableItem>
    | InlineFragment<'VirtualCartItem', CartVirtualItem>
    | InlineFragment<'SimpleCartItem', CartSimpleItem>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'uid', string>('uid'),
            new Field<'sku', string>('sku'),
            new Field<'quantity', number>('quantity'),
            this._getCartItemProduct(),
            this._getCartItemPricesField(),
            this._getCartDownloadableProductLinkField(),
            this._getCartBundleProductFragment(),
            this._getCartConfigurableProductFragment(),
            this._getCartVirtualProductFragments(),
            this._getCartSimpleProductFragments(),
        ];
    }

    _getCartItemProduct(): Field<'product', CartItemProduct> {
        return new Field<'product', CartItemProduct>('product')
            .addFieldList(ProductListQuery._getCartProductInterfaceFields());
    }

    _getCartDownloadableProductLinkField(): InlineFragment<
    'DownloadableCartItem',
    CartDownloadableItem
    > {
        return new InlineFragment<
        'DownloadableCartItem',
        CartDownloadableItem
        >('DownloadableCartItem')
            .addFieldList([
                this._getDownloadableLinkField(),
                this._getDownloadableSamplesField(),
                this._getCustomizableOptionsField('downloadable_customizable_options'),
            ]);
    }

    _getDownloadableLinkField(): Field<'links', CartDownloadableProductLink, true> {
        return new Field<'links', CartDownloadableProductLink, true>('links', true)
            .addFieldList(this._getDownloadableLinkFields());
    }

    _getDownloadableLinkFields(): Array<
    Field<'id', number>
    | Field<'title', string>
    | Field<'sort_order', number>
    | Field<'price', number>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'title', string>('title'),
            new Field<'sort_order', number>('sort_order'),
            new Field<'price', number>('price'),
        ];
    }

    _getDownloadableSamplesField(): Field<'samples', CartDownloadableProductSample, true> {
        return new Field<'samples', CartDownloadableProductSample, true>('samples', true)
            .addFieldList(this._getDownloadableSamplesFields());
    }

    _getDownloadableSamplesFields(): Array<
    Field<'id', number>
    | Field<'title', string>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'title', string>('title'),
        ];
    }

    _getCartBundleProductFragment(): InlineFragment<'BundleCartItem', CartBundleItem> {
        return new InlineFragment<'BundleCartItem', CartBundleItem>('BundleCartItem')
            .addFieldList([
                this._getBundleOptionsField(),
                this._getCustomizableOptionsField('bundle_customizable_options'),
            ]);
    }

    _getBundleOptionsField(): Field<'bundle_options', CartBundleOption, true> {
        return new Field<'bundle_options', CartBundleOption, true>('bundle_options')
            .addFieldList(this._getBundleOptionsFields());
    }

    _getBundleOptionsFields(): Array<
    Field<'id', number>
    | Field<'label', string>
    | Field<'type', string>
    | Field<'values', CartBundleOptionValue, true>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'label', string>('label'),
            new Field<'type', string>('type'),
            this._getBundleOptionValuesField(),
        ];
    }

    _getBundleOptionValuesField(): Field<'values', CartBundleOptionValue, true> {
        return new Field<'values', CartBundleOptionValue, true>('values', true)
            .addFieldList(this._getBundleOptionValuesFields());
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
            new Field<'price', number>('price'),
        ];
    }

    _getCartConfigurableProductFragment(): InlineFragment<'ConfigurableCartItem', CartConfigurableItem> {
        return new InlineFragment<'ConfigurableCartItem', CartConfigurableItem>('ConfigurableCartItem')
            .addFieldList([
                this._getConfigurableOptionsField(),
                this._getCustomizableOptionsField('configurable_customizable_options'),
            ]);
    }

    _getConfigurableOptionsField(): Field<'configurable_options', CartConfigurableOption> {
        return new Field<'configurable_options', CartConfigurableOption>('configurable_options')
            .addFieldList(this._getConfigurableOptionsFields());
    }

    _getConfigurableOptionsFields(): Array<
    Field<'id', number>
    | Field<'option_label', string>
    | Field<'value_label', string>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'option_label', string>('option_label'),
            new Field<'value_label', string>('value_label'),
        ];
    }

    _getCartSimpleProductFragments(): InlineFragment<
    'SimpleCartItem',
    CartSimpleItem
    > {
        return new InlineFragment<
        'SimpleCartItem',
        CartSimpleItem
        >('SimpleCartItem')
            .addFieldList([
                this._getCustomizableOptionsField('simple_customizable_options'),
            ]);
    }

    _getCartVirtualProductFragments(): InlineFragment<
    'VirtualCartItem',
    CartVirtualItem
    > {
        return new InlineFragment<
        'VirtualCartItem',
        CartVirtualItem
        >('VirtualCartItem')
            .addFieldList([
                this._getCustomizableOptionsField('virtual_customizable_options'),
            ]);
    }

    _getCustomizableOptionsField<A extends string>(
        alias: A,
    ): Field<A, CartCustomizableOption, true> {
        return new Field<'customizable_options', CartCustomizableOption, true>('customizable_options', true)
            .setAlias(alias)
            .addFieldList(this._getCustomizableOptionsFields());
    }

    _getCustomizableOptionsFields(): Array<
    Field<'id', number>
    | Field<'label', string>
    | Field<'type', string>
    | Field<'sort_order', number>
    | Field<'is_required', boolean>
    | Field<'values', CartCustomizableOptionValue, true>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'label', string>('label'),
            new Field<'type', string>('type'),
            new Field<'sort_order', number>('sort_order'),
            new Field<'is_required', boolean>('is_required'),
            this._getCustomizableOptionValueField(),
        ];
    }

    _getCustomizableOptionValueField(): Field<'values', CartCustomizableOptionValue, true> {
        return new Field<'values', CartCustomizableOptionValue, true>('values', true)
            .addFieldList(this._getCustomizableOptionValueFields());
    }

    _getCustomizableOptionValueFields(): Array<
    Field<'id', number>
    | Field<'label', string>
    | Field<'value', string>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'label', string>('label'),
            new Field<'value', string>('value'),
        ];
    }

    _getCartItemPricesField(): Field<'prices', CartItemPrices> {
        return new Field<'prices', CartItemPrices>('prices')
            .addFieldList(this._getCartItemPricesFields());
    }

    _getCartItemPricesFields(): Array<
    Field<'price', Money>
    | Field<'row_total', Money>
    | Field<'row_total_including_tax', Money>
    | Field<'discounts', Money>
    | Field<'total_item_discount', Money>
    > {
        return [
            this._getCartItemPriceField(),
            this._getCartItemRowTotalField(),
            this._getCartItemRowTotalInclTaxField(),
            this._getCartItemTotalDiscountField(),
        ];
    }

    _getCartItemPriceField(): Field<'price', Money> {
        return new Field<'price', Money>('price')
            .addFieldList(this._getPriceField());
    }

    _getCartItemRowTotalField(): Field<'row_total', Money> {
        return new Field<'row_total', Money>('row_total')
            .addFieldList(this._getPriceField());
    }

    _getCartItemRowTotalInclTaxField(): Field<'row_total_including_tax', Money> {
        return new Field<'row_total_including_tax', Money>('row_total_including_tax')
            .addFieldList(this._getPriceField());
    }

    _getCartItemDiscountsField(): Field<'discounts', Money, true> {
        return new Field<'discounts', Money, true>('discounts', true)
            .addFieldList(this._getPriceField());
    }

    _getCartItemTotalDiscountField(): Field<'total_item_discount', Money> {
        return new Field<'total_item_discount', Money>('total_item_discount')
            .addFieldList(this._getPriceField());
    }

    _getPricesField(): Field<'prices', CartPrices> {
        return new Field<'prices', CartPrices>('prices')
            .addFieldList(this._getPricesFields());
    }

    _getPricesFields(): Array<
    Field<'applied_rule_ids', string>
    | Field<'coupon_code', string>
    | Field<'quote_currency_code', string>
    | Field<'grand_total', Money>
    | Field<'subtotal_including_tax', Money>
    | Field<'subtotal_excluding_tax', Money>
    | Field<'subtotal_with_discount_excluding_tax', Money>
    | Field<'discount', Discount>
    | Field<'applied_taxes', AppliedTax>
    > {
        return [
            new Field<'applied_rule_ids', string>('applied_rule_ids'),
            new Field<'coupon_code', string>('coupon_code'),
            new Field<'quote_currency_code', string>('quote_currency_code'),
            this._getGrandTotalField(),
            this._getSubtotalInclTaxField(),
            this._getSubtotalExclTaxField(),
            this._getSubtotalWithDiscountExclTaxField(),
            this._getDiscountField(),
            this._getAppliedTaxesField(),
        ];
    }

    _getGrandTotalField(): Field<'grand_total', Money> {
        return new Field<'grand_total', Money>('grand_total')
            .addFieldList(this._getPriceField());
    }

    _getSubtotalInclTaxField(): Field<'subtotal_including_tax', Money> {
        return new Field<'subtotal_including_tax', Money>('subtotal_including_tax')
            .addFieldList(this._getPriceField());
    }

    _getSubtotalExclTaxField(): Field<'subtotal_excluding_tax', Money> {
        return new Field<'subtotal_excluding_tax', Money>('subtotal_excluding_tax')
            .addFieldList(this._getPriceField());
    }

    _getSubtotalWithDiscountExclTaxField(): Field<'subtotal_with_discount_excluding_tax', Money> {
        return new Field<'subtotal_with_discount_excluding_tax', Money>('subtotal_with_discount_excluding_tax')
            .addFieldList(this._getPriceField());
    }

    _getDiscountField(): Field<'discount', Discount> {
        return new Field<'discount', Discount>('discount')
            .addFieldList(this._getDiscountFields());
    }

    _getDiscountFields(): Array<
    Field<'label', string>
    | Field<'amount', Money>
    > {
        return [
            new Field<'label', string>('label'),
            this._getAmountField(),
        ];
    }

    _getAppliedTaxesField(): Field<'applied_taxes', AppliedTax> {
        return new Field<'applied_taxes', AppliedTax>('applied_taxes')
            .addFieldList(this._getAppliedTaxesFields());
    }

    _getAppliedTaxesFields(): Array<
    Field<'label', string>
    | Field<'percent', number>
    | Field<'amount', Money>
    > {
        return [
            new Field<'label', string>('label'),
            new Field<'percent', number>('percent'),
            this._getAmountField(),
        ];
    }

    _getShippingAddressesField(): Field<'shipping_addresses', CartShippingAddress, true> {
        return new Field<'shipping_addresses', CartShippingAddress, true>('shipping_addresses', true)
            .addFieldList(this._getShippingAddressesFields());
    }

    _getShippingAddressesFields(): Array<
    Field<'available_shipping_methods', AvailableShippingMethod, true>
    | Field<'selected_shipping_method', SelectedShippingMethod>
    | Field<'customer_notes', string>
    > {
        return [
            this._getAvailableShippingMethodField(),
            this._getSelectedShippingMethodField(),
            new Field<'customer_notes', string>('customer_notes'),
        ];
    }

    _getAvailableShippingMethodField(): Field<'available_shipping_methods', AvailableShippingMethod, true> {
        return new Field<
        'available_shipping_methods',
        AvailableShippingMethod,
        true
        >('available_shipping_methods', true)
            .addFieldList(this._getAvailableShippingMethodFields());
    }

    _getAvailableShippingMethodFields(): Array<
    Field<'available', boolean>
    | Field<'method_code', string>
    | Field<'carrier_code', string>
    | Field<'carrier_title', string>
    | Field<'error_message', string>
    > {
        return [
            new Field<'available', boolean>('available'),
            new Field<'method_code', string>('method_code'),
            new Field<'carrier_code', string>('carrier_code'),
            new Field<'carrier_title', string>('carrier_title'),
            new Field<'error_message', string>('error_message'),
        ];
    }

    _getSelectedShippingMethodField(): Field<'selected_shipping_method', SelectedShippingMethod> {
        return new Field<'selected_shipping_method', SelectedShippingMethod>('selected_shipping_method')
            .addFieldList(this._getSelectedShippingMethodFields());
    }

    _getSelectedShippingMethodFields(): Array<
    Field<'amount_incl_tax', number>
    | Field<'carrier_code', string>
    | Field<'carrier_title', string>
    | Field<'method_code', string>
    | Field<'method_title', string>
    | Field<'tax_amount', number>
    | Field<'amount', Money>
    | Field<'address', CartAddress>
    > {
        const { pathname = '' } = location;
        const checkoutData = (
            pathname.includes(CheckoutStepUrl.CHECKOUT_URL)
                ? [this._getOrderShippingAddressField()]
                : []
        );

        return [
            new Field<'amount_incl_tax', number>('amount_incl_tax'),
            new Field<'carrier_code', string>('carrier_code'),
            new Field<'carrier_title', string>('carrier_title'),
            new Field<'method_code', string>('method_code'),
            new Field<'method_title', string>('method_title'),
            new Field<'tax_amount', number>('tax_amount'),
            this._getAmountField(),
            ...checkoutData,
        ];
    }

    _getOrderShippingAddressField(): Field<'address', CartAddress> {
        return new Field<'address', CartAddress>('address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderAddressFields(): Array<
    Field<'city', string>
    | Field<'country', { code: string }>
    | Field<'firstname', string>
    | Field<'lastname', string>
    | Field<'postcode', string>
    | Field<'region', Region>
    | Field<'telephone', string>
    | Field<'vat_id', string>
    | Field<'email', string>
    | Field<'street', string>
    > {
        return [
            new Field<'city', string>('city'),
            this._getCountryField(),
            new Field<'firstname', string>('firstname'),
            new Field<'lastname', string>('lastname'),
            new Field<'postcode', string>('postcode'),
            this._getRegionField(),
            new Field<'telephone', string>('telephone'),
            new Field<'vat_id', string>('vat_id'),
            new Field<'email', string>('email'),
            new Field<'street', string>('street'),
        ];
    }

    _getCountryField(): Field<'country', { code: string }> {
        return new Field<'country', { code: string }>('country')
            .addFieldList(this._getCountryFields());
    }

    _getCountryFields(): Array<Field<'code', string>> {
        return [
            new Field<'code', string>('code'),
        ];
    }

    _getRegionField(): Field<'region', Region> {
        return new Field<'region', Region>('region')
            .addFieldList(this._getRegionFields());
    }

    _getRegionFields(): Array<
    Field<'label', string>
    | Field<'region_id', number>
    > {
        return [
            new Field<'label', string>('label'),
            new Field<'region_id', number>('region_id'),
        ];
    }

    _getMinimumOrderAmount(): Field<'minimum_order_amount', MinimumOrderAmount> {
        return new Field<'minimum_order_amount', MinimumOrderAmount>('minimum_order_amount')
            .addFieldList(this._getMinimumOrderAmountFields());
    }

    _getMinimumOrderAmountFields(): Array<
    Field<'minimum_order_amount_reached', boolean>
    | Field<'minimum_order_description', string>
    > {
        return [
            new Field<'minimum_order_amount_reached', boolean>('minimum_order_amount_reached'),
            new Field<'minimum_order_description', string>('minimum_order_description'),
        ];
    }

    /* Cart coupon */

    _getCart(): Field<'cartData', CartTotals> {
        return new Field<'cart', CartTotals>('cart')
            .setAlias('cartData')
            .addFieldList(this._getCartTotalsFields());
    }

    getApplyCouponMutation(
        couponCode: string,
        quoteId: string,
    ): Mutation<'applyCouponToCart', { cartData: CartTotals }> {
        const input = {
            cart_id: quoteId,
            coupon_code: couponCode,
        };

        return new Mutation<'applyCouponToCart', { cartData: CartTotals }>('applyCouponToCart')
            .addArgument('input', 'ApplyCouponToCartInput', input)
            .addField(this._getCart());
    }

    getRemoveCouponMutation(quoteId: string): Mutation<'removeCouponFromCart', { cartData: CartTotals }> {
        return new Mutation<'removeCouponFromCart', { cartData: CartTotals }>('removeCouponFromCart')
            .addArgument('input', 'RemoveCouponFromCartInput', { cart_id: quoteId })
            .addField(this._getCart());
    }
}

export default new CartQuery();
