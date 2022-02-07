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

import { isSignedIn } from 'Util/Auth';
import { Field, Fragment } from 'Util/Query';

/** @namespace Query/Cart/Query */
export class CartQuery {
    //#region MUTATIONS
    getAddProductToCartMutation(cartId, cartItems) {
        return new Field('addProductsToCart')
            .addArgument('cartId', 'String!', cartId)
            .addArgument('cartItems', '[CartItemInput!]!', cartItems)
            .addField(this._getCartField());
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
        const query = new Field('cart')
            .addArgument('cart_id', 'String!', isSignedIn() ? '' : quoteId)
            .addFieldList(this._getCartFields())
            .setAlias('cartData');

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

    //#region ITEMS
    _getProductPricesFields() {
        return [
            this._getMoneyField('row_total'),
            this._getMoneyField('row_total_including_tax'),
            this._getMoneyField('total_item_discount')
        ];
    }

    _getProductPricesField() {
        return new Field('prices')
            .addFieldList(this._getProductPricesFields());
    }

    _getConfigOptionsField() {
        return new Field('configurable_options')
            .addFieldList([
                'option_label',
                'value_label',
                'configurable_product_option_value_uid',
                'configurable_product_option_uid'
            ]);
    }

    _getConfigOptionsFragmentFields() {
        return [
            this._getConfigOptionsField(),
            this._getCustomizableOptionsField('customizable_options_config')
        ];
    }

    _getConfigOptionsFragmentField() {
        return new Fragment('ConfigurableCartItem')
            .addFieldList(this._getConfigOptionsFragmentFields());
    }

    _getBundleOptionsValueField() {
        return new Field('values')
            .addFieldList([
                'uid',
                'label',
                'quantity'
            ]);
    }

    _getBundleOptionsField() {
        return new Field('bundle_options')
            .addFieldList([
                'uid',
                'label',
                this._getBundleOptionsValueField()
            ]);
    }

    _getBundleOptionsFragmentFields() {
        return [
            this._getBundleOptionsField(),
            this._getCustomizableOptionsField('customizable_options_bundle')
        ];
    }

    _getBundleOptionsFragmentField() {
        return new Fragment('BundleCartItem')
            .addFieldList(this._getBundleOptionsFragmentFields());
    }

    _getDownloadableLinkTitleField() {
        return new Field('title')
            .setAlias('label');
    }

    _getDownloadableLinkField() {
        return new Field('links')
            .addFieldList([
                'uid',
                this._getDownloadableLinkTitleField()
            ]).setAlias('downloadable_links');
    }

    _getDownloadableOptionsFragmentFields() {
        return [
            this._getDownloadableLinkField(),
            this._getCustomizableOptionsField('customizable_options_downloadable')
        ];
    }

    _getDownloadableOptionsFragmentField() {
        return new Fragment('DownloadableCartItem')
            .addFieldList(this._getDownloadableOptionsFragmentFields());
    }

    _getSimpleOptionsFragmentField() {
        return new Fragment('SimpleCartItem')
            .addField(this._getCustomizableOptionsField('customizable_options_simple'));
    }

    _getVirtualOptionsFragmentField() {
        return new Fragment('VirtualCartItem')
            .addField(this._getCustomizableOptionsField('customizable_options_virtual'));
    }

    _getCustomizableOptionsValueField() {
        return new Field('values')
            .addFieldList([
                'customizable_option_value_uid',
                'label',
                'value'
            ]);
    }

    _getCustomizableOptionsFields() {
        return [
            'customizable_option_uid',
            'label',
            this._getCustomizableOptionsValueField()
        ];
    }

    _getCustomizableOptionsField(alias = 'customizable_options') {
        return new Field('customizable_options')
            .addFieldList(this._getCustomizableOptionsFields())
            .setAlias(alias);
    }

    _getItemImageField() {
        return new Field('thumbnail').addFieldList(['url']);
    }

    _getConfigurableProductFields() {
        return new Field('configurable_options')
            .addFieldList(['uid', 'attribute_code']);
    }

    _getConfigurableProductField() {
        return new Fragment('ConfigurableProduct')
            .addField(this._getConfigurableProductFields());
    }

    _getStockItemFields() {
        return [
            'min_sale_qty',
            'max_sale_qty',
            'qty_increments'
        ];
    }

    _getStockItemField() {
        return new Field('stock_item')
            .addFieldList(this._getStockItemFields());
    }

    _getItemProductFields() {
        return [
            'name',
            'sku',
            'url',
            this._getStockItemField(),
            this._getItemImageField(),
            this._getConfigurableProductField()
        ];
    }

    _getItemProductField() {
        return new Field('product')
            .addFieldList(this._getItemProductFields());
    }

    _getItemsFields() {
        return [
            'uid',
            'quantity',
            'status',
            this._getProductPricesField(),
            this._getItemProductField(),
            this._getConfigOptionsFragmentField(),
            this._getDownloadableOptionsFragmentField(),
            this._getBundleOptionsFragmentField(),
            this._getVirtualOptionsFragmentField(),
            this._getSimpleOptionsFragmentField()
        ];
    }

    _getItemsField() {
        return new Field('items')
            .addFieldList(this._getItemsFields());
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

    _getPriceGroupFields(extraFields = []) {
        return [
            'label',
            this._getMoneyField('amount'),
            ...extraFields
        ];
    }

    _getPriceGroupField(fieldName, extraFields = []) {
        return new Field(fieldName)
            .addFieldList(this._getPriceGroupFields(extraFields));
    }

    _getPricesFields() {
        return [
            this._getMoneyField('grand_total'),
            this._getMoneyField('subtotal_excluding_tax'),
            this._getMoneyField('subtotal_including_tax'),
            this._getPriceGroupField('discounts'),
            this._getPriceGroupField('applied_taxes', ['title', 'percent'])
        ];
    }

    _getPricesField() {
        return new Field('prices')
            .addFieldList(this._getPricesFields());
    }
    //#endregion

    //#region COUPONS
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

    //#region SHIPPING ADDRESSES
    _getSelectedShippingMethodFields() {
        return [
            'method_code',
            // 'carrier_code',
            'carrier_title',
            'method_title',
            this._getMoneyField('amount'),
            this._getMoneyField('amount_with_tax')
        ];
    }

    _getSelectedShippingMethodField() {
        return new Field('selected_shipping_method')
            .addFieldList(this._getSelectedShippingMethodFields());
    }

    _getShippingAddressesFields() {
        return [
            this._getSelectedShippingMethodField()
        ];
    }

    _getShippingAddressesField() {
        return new Field('shipping_addresses')
            .addFieldList(this._getShippingAddressesFields());
    }
    //#endregion

    //#region CART
    _getTotalQuantityField() {
        return new Field('total_quantity').setAlias('items_qty');
    }

    _getCartFields() {
        return [
            this._getTotalQuantityField(),
            this._getPricesField(),
            this._getAppliedCouponsField(),
            this._getItemsField(),
            this._getShippingAddressesField()
        ];
    }

    _getCartField() {
        return new Field('cart')
            .addFieldList(this._getCartFields());
    }
    //#endregion

    _getUserErrorsField() {
        return new Field('cart')
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

    _getRemoveCartItemFields(quoteId) {
        return [
            this.getCartQuery(quoteId)
        ];
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
}

export default new CartQuery();
