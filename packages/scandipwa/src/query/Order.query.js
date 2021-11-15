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

import { Field } from 'Util/Query';

/**
 * Order Query
 * @class OrderQuery
 * @namespace Query/Order/Query */
export class OrderQuery {
    getReorder(incrementId) {
        return new Field('reorderItems')
            .addArgument('orderNumber', 'String!', incrementId)
            .addField(this._getReorderField());
    }

    getSubscribeToOrderStatus(incrementId) {
        return new Field('subscribeToOrderStatus')
            .addArgument('orderNumber', 'String!', incrementId)
            .addFieldList(this._getSubscribeToOrderStatusOutputFields());
    }

    getOrderListQuery(options) {
        return new Field('customer')
            .addFieldList(this._getOrderListFields(options));
    }

    _getOrderListFields(options) {
        return [
            this._getOrdersField(options)
        ];
    }

    _getOrdersField(options) {
        const { orderId } = options || {};
        const ordersField = new Field('orders');

        if (orderId) {
            return ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { entity_id: { eq: orderId } })
                .addFieldList(this._getOrdersFields(true));
        }

        return ordersField
            // eslint-disable-next-line no-magic-numbers
            .addArgument('pageSize', 'Int', 60)
            .addFieldList(this._getOrdersFields());
    }

    _getOrdersFields(isSingleOrder = false) {
        return [
            this._getOrderItemsField(isSingleOrder)
        ];
    }

    _getOrderItemsField(isSingleOrder) {
        return new Field('items')
            .addFieldList(this._getOrderItemsFields(isSingleOrder));
    }

    _getOrderItemsFields(isSingleOrder) {
        const basicFields = [
            'id',
            'increment_id',
            'order_date',
            'status',
            'can_reorder',
            'rss_link',
            this._getOrderItemTotalField()
        ];

        if (isSingleOrder) {
            return [...basicFields, ...this._getSingleOrderFields()];
        }

        return basicFields;
    }

    _getSingleOrderFields() {
        return [
            'carrier',
            this._getOrderShipmentsField(),
            this._getOrderItemsProductsField(),
            this._getOrderInvoicesField(),
            this._getOrderRefundsField(),
            this._getOrderShippingAddressField(),
            this._getOrderBillingAddressField(),
            this._getOrderPaymentMethodsField(),
            this._getOrderShippingMethodField()
        ];
    }

    _getOrderItemTotalField() {
        return new Field('total')
            .addFieldList(this._getOrderItemTotalFields());
    }

    _getOrderItemTotalFields() {
        return [
            this._getOrderGrandTotalField(),
            this._getOrderDiscountsField(),
            this._getOrderBaseGrantTotalField(),
            this._getOrderSubtotalField(),
            this._getOrderTotalShippingField(),
            this._getOrderTotalTaxField(),
            this._getOrderShippingHandlingField(),
            this._getOrderTaxesField()
        ];
    }

    _getOrderTaxesField() {
        return new Field('taxes')
            .addFieldList(this._getOrderTaxesFields());
    }

    _getOrderTaxesFields() {
        return [
            'rate',
            'title',
            this._getOrderAmountField()
        ];
    }

    _getOrderShippingHandlingField() {
        return new Field('shipping_handling')
            .addFieldList(this._getOrderShippingHandlingFields());
    }

    _getOrderShippingHandlingFields() {
        return [
            this._getOrderShippingAmountExclTaxField(),
            this._getOrderShippingAmountInclTaxField(),
            this._getOrderShippingDiscountsField(),
            this._getOrderShippingHandlingTotalField(),
            this._getOrderTaxesField()
        ];
    }

    _getOrderShippingDiscountsField() {
        return new Field('discounts')
            .addFieldList(this._getOrderShippingDiscountsFields());
    }

    _getOrderShippingDiscountsFields() {
        return [
            this._getOrderAmountField()
        ];
    }

    _getOrderShippingAmountExclTaxField() {
        return new Field('amount_excluding_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderShippingAmountInclTaxField() {
        return new Field('amount_including_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderShippingHandlingTotalField() {
        return new Field('total_amount')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderTotalTaxField() {
        return new Field('total_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderTotalShippingField() {
        return new Field('total_shipping')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderBaseGrantTotalField() {
        return new Field('base_grand_total')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderSubtotalField() {
        return new Field('subtotal')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderGrandTotalField() {
        return new Field('grand_total')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderPriceFields() {
        return [
            'value',
            'currency'
        ];
    }

    _getOrderShipmentsField() {
        return new Field('shipments')
            .addFieldList(this._getOrderShipmentsFields());
    }

    _getOrderShipmentsFields() {
        return [
            'id',
            'number',
            this._getOrderShipmentTrackingField(),
            this._getShipmentsItemsProductsField()
        ];
    }

    _getShipmentsItemsProductsField() {
        return new Field('items')
            .addFieldList(this._getShipmentsItemsProductsFields());
    }

    _getShipmentsItemsProductsFields() {
        return [
            'quantity_shipped',
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getOrderShipmentTrackingField() {
        return new Field('tracking')
            .addFieldList(this._getOrderShipmentTrackingFields());
    }

    _getOrderShipmentTrackingFields() {
        return [
            'carrier',
            'number',
            'title'
        ];
    }

    _getOrderRefundsField() {
        return new Field('credit_memos')
            .addFieldList(this._getOrderRefundsFields());
    }

    _getOrderRefundsFields() {
        return [
            'id',
            'number',
            this._getRefundsItemsProductsField()
        ];
    }

    _getOrderDiscountsField() {
        return new Field('discounts')
            .addFieldList(this._getOrderDiscountsFields());
    }

    _getOrderDiscountsFields() {
        return [
            'label',
            this._getOrderAmountField()
        ];
    }

    _getOrderAmountField() {
        return new Field('amount')
            .addFieldList(this._getOrderPriceFields());
    }

    _getRefundsItemsProductsField() {
        return new Field('items')
            .addFieldList(this._getRefundsItemsProductsFields());
    }

    _getRefundsItemsProductsFields() {
        return [
            'quantity_refunded',
            ...this._getBaseOrderItemProductsFields(),
            this._getRefundsItemInformationField(),
            this._getOrderProductRowSubtotalField(),
            this._getOrderDiscountsField()
        ];
    }

    _getRefundsItemInformationField() {
        return new Field('order_item')
            .addFieldList(this._getOrderItemProductsFields());
    }

    _getOrderInvoicesField() {
        return new Field('invoices')
            .addFieldList(this._getOrderInvoicesFields());
    }

    _getOrderInvoicesFields() {
        return [
            'id',
            'number',
            this._getInvoiceItemsProductsField()
        ];
    }

    _getInvoiceItemsProductsField() {
        return new Field('items')
            .addFieldList(this._getInvoiceItemProductsFields());
    }

    _getInvoiceItemProductsFields() {
        return [
            'quantity_invoiced',
            this._getOrderProductRowSubtotalField(),
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getOrderItemsProductsField() {
        return new Field('items')
            .addFieldList(this._getOrderItemProductsFields());
    }

    _getOrderItemProductsFields() {
        return [
            'product_url_key',
            'quantity_ordered',
            'quantity_shipped',
            'quantity_refunded',
            'quantity_canceled',
            this._getOrderProductEnteredOptionsField(),
            this._getOrderProductSelectedOptionsField(),
            this._getOrderProductRowSubtotalField(),
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getBaseOrderItemProductsFields() {
        return [
            'product_name',
            'product_sku',
            this._getOrderProductSalePriceField()
        ];
    }

    _getOrderProductRowSubtotalField() {
        return new Field('row_subtotal')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderProductRowSubtotalInclTaxField() {
        return new Field('row_subtotal_incl_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderProductEnteredOptionsField() {
        return new Field('entered_options')
            .addFieldList(this._getOrderProductOptionsFields());
    }

    _getOrderProductSelectedOptionsField() {
        return new Field('selected_options')
            .addFieldList(this._getOrderProductOptionsFields());
    }

    _getOrderProductOptionsFields() {
        return [
            'label',
            'value',
            this._getOrderProductBundleOptionItemsField(),
            'linkItems'
        ];
    }

    _getOrderProductBundleOptionItemsField() {
        return new Field('items')
            .addFieldList(this._getOrderProductBundleOptionItemsFields());
    }

    _getOrderProductBundleOptionItemsFields() {
        return [
            'title',
            'qty',
            'price'
        ];
    }

    _getOrderProductSalePriceField() {
        return new Field('product_sale_price')
            .addFieldList(this._getOrderPriceFields());
    }

    _getReorderField() {
        return new Field('userInputErrors')
            .addFieldList(this._getReorderFields());
    }

    _getReorderFields() {
        return [
            'code',
            'message',
            'path'
        ];
    }

    _getOrderShippingAddressField() {
        return new Field('shipping_address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderBillingAddressField() {
        return new Field('billing_address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderAddressFields() {
        return [
            'city',
            'country_code',
            'firstname',
            'lastname',
            'postcode',
            'region',
            'region_id',
            'telephone',
            this._getOrderAddressStreetField()
        ];
    }

    _getOrderAddressStreetField() {
        return new Field('street');
    }

    _getOrderPaymentMethodsField() {
        return new Field('payment_methods')
            .addFieldList(this._getOrderPaymentMethodsFields());
    }

    _getOrderPaymentMethodsFields() {
        return [
            'name'
        ];
    }

    _getOrderShippingMethodField() {
        return new Field('shipping_method');
    }

    getDownloadableQuery() {
        return new Field('customerDownloadableProducts')
            .addField(this._getDownloadableField());
    }

    getOrderByIdQuery(orderId) {
        return this._getOrderByIdField(orderId);
    }

    linkOrderMutation(customerEmail) {
        return new Field('linkOrder')
            .addArgument('customer_email', 'String!', customerEmail);
    }

    _getOrderByIdField(orderId) {
        return new Field('Customer')
            .addArgument('id', 'Int!', orderId)
            .addFieldList(this._getOrderItemsFields());
    }

    _getOrderProductsField() {
        return new Field('order_products')
            .addFieldList(this._getOrderProductsFields());
    }

    _getOrderProductsFields() {
        return [
            ...this._getDefaultFields(),
            ...this._prepareImageFields(),
            this._prepareAttributes()
        ];
    }

    _prepareImageFields() {
        return [
            new Field('thumbnail')
                .addFieldList(this._prepareThumbnailFields()),
            new Field('small_image')
                .addFieldList(this._prepareSmallImageFields())
        ];
    }

    _prepareSmallImageFields() {
        return [
            'url',
            'label',
            'path'
        ];
    }

    _prepareThumbnailFields() {
        return [
            'url',
            'label',
            'path'
        ];
    }

    _prepareAttributes() {
        return new Field('s_attributes')
            .setAlias('attributes')
            .addFieldList(this._prepareAttributesFields());
    }

    _prepareAttributesFields() {
        return [
            'attribute_value',
            'attribute_code',
            'attribute_type',
            'attribute_label',
            this._getAttributeOptions()
        ];
    }

    _getAttributeOptions() {
        return new Field('attribute_options')
            .addFieldList(this._getAttributeOptionsFields());
    }

    _getAttributeOptionsFields() {
        return [
            'label',
            'value',
            new Field('swatch_data')
                .addField('value')
        ];
    }

    _getDefaultFields() {
        return [
            'id',
            'name',
            (new Field('short_description').addField('html')),
            'sku',
            'qty',
            'row_total',
            'original_price',
            'license_key'
        ];
    }

    _prepareShippingInfo() {
        return new Field('shipping_info')
            .addFieldList(this._prepareShippingInfoFields());
    }

    _prepareShippingInfoFields() {
        return [
            'shipping_method',
            'shipping_description',
            'shipping_incl_tax',
            'shipping_amount',
            this._prepareOrderCustomerAddressInfo()
        ];
    }

    _prepareOrderCustomerAddressInfo() {
        return new Field('shipping_address')
            .addFieldList(this._prepareOrderCustomerAddressInfoFields());
    }

    _prepareOrderCustomerAddressInfoFields() {
        return [
            'city',
            'company',
            'firstname',
            'lastname',
            'telephone',
            'postcode',
            'street',
            'region'
        ];
    }

    _getBaseOrderInfoField(isList) {
        return new Field('base_order_info')
            .addFieldList(this._getBaseOrderInfoFields(isList));
    }

    _getBaseOrderInfoFields(isList) {
        return [
            'id',
            'increment_id',
            'created_at',
            'status_label',
            'grand_total',
            'currency_code',
            ...(isList ? [] : ['sub_total'])
        ];
    }

    _getPaymentInfoField() {
        return new Field('payment_info')
            .addFieldList(this._getPaymentInfoFields());
    }

    _getPaymentInfoFields() {
        return [
            'method',
            this._getAdditionalInformationField()
        ];
    }

    _getAdditionalInformationField() {
        return new Field('additional_information')
            .addFieldList(this._getAdditionalInformationFields());
    }

    _getAdditionalInformationFields() {
        return [
            'bank',
            'method_title',
            'credit_type',
            'month',
            this._getCustomerInfoField()
        ];
    }

    _getCustomerInfoField() {
        return new Field('customer_info')
            .addFieldList(this._getCustomerInfoFields());
    }

    _getCustomerInfoFields() {
        return [
            'first_name',
            'last_name',
            'phone'
        ];
    }

    _getDownloadableField() {
        return new Field('items')
            .addFieldList(this._getDownloadableFields());
    }

    _getDownloadableFields() {
        return [
            'order_increment_id',
            'date',
            'status',
            'download_url',
            'link_title',
            'remaining_downloads',
            'title'
        ];
    }
}

export default new OrderQuery();
