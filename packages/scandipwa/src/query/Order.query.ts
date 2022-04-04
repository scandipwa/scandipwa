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

import { OrdersOptions } from './Query.type';

/**
 * Order Query
 * @class OrderQuery
 * @namespace Query/Order/Query */
export class OrderQuery {
    getReorder(incrementId: string): Field {
        return new Field('reorderItems')
            .addArgument('orderNumber', 'String!', incrementId)
            .addField(this._getReorderField());
    }

    getOrderListQuery(options: OrdersOptions): Field {
        return new Field('customer')
            .addFieldList(this._getOrderListFields(options));
    }

    _getOrderListFields(options: OrdersOptions): Field[] {
        return [
            this._getOrdersField(options)
        ];
    }

    _getOrdersField(options: OrdersOptions): Field {
        const { orderId, page = 1 } = options || {};
        const ordersField = new Field('orders');

        if (orderId) {
            return ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { entity_id: { eq: orderId } })
                .addFieldList(this._getOrdersFields(true));
        }

        return ordersField
            .addArgument('currentPage', 'Int', page)
            .addFieldList(this._getOrdersFields());
    }

    _getOrdersFields(isSingleOrder = false): Array<string | Field> {
        return [
            'total_count',
            this._getOrderItemsField(isSingleOrder),
            this._getSearchResultPageInfoField()
        ];
    }

    _getSearchResultPageInfoField(): Field {
        return new Field('page_info')
            .addFieldList(this._getSearchResultPageInfoFields());
    }

    _getSearchResultPageInfoFields(): string[] {
        return [
            'current_page',
            'page_size',
            'total_pages'
        ];
    }

    _getOrderItemsField(isSingleOrder: boolean): Field {
        return new Field('items')
            .addFieldList(this._getOrderItemsFields(isSingleOrder));
    }

    _getOrderItemsFields(isSingleOrder: boolean): Array<string | Field> {
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

    _getSingleOrderFields(): Array<string | Field> {
        return [
            'carrier',
            this._getOrderShipmentsField(),
            this._getOrderItemsProductsField(),
            this._getOrderInvoicesField(),
            this._getOrderRefundsField(),
            this._getOrderShippingAddressField(),
            this._getOrderBillingAddressField(),
            this._getOrderPaymentMethodsField(),
            this._getOrderShippingMethodField(),
            this._getOrderCommentsField()
        ];
    }

    _getOrderCommentsField(): Field {
        return new Field('comments')
            .addFieldList(this._getOrderCommentsFields());
    }

    _getOrderCommentsFields(): string[] {
        return [
            'timestamp',
            'message'
        ];
    }

    _getOrderItemTotalField(): Field {
        return new Field('total')
            .addFieldList(this._getOrderItemTotalFields());
    }

    _getOrderItemTotalFields(): Field[] {
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

    _getOrderTaxesField(): Field {
        return new Field('taxes')
            .addFieldList(this._getOrderTaxesFields());
    }

    _getOrderTaxesFields(): Array<string | Field> {
        return [
            'rate',
            'title',
            this._getOrderAmountField()
        ];
    }

    _getOrderShippingHandlingField(): Field {
        return new Field('shipping_handling')
            .addFieldList(this._getOrderShippingHandlingFields());
    }

    _getOrderShippingHandlingFields(): Field[] {
        return [
            this._getOrderShippingAmountExclTaxField(),
            this._getOrderShippingAmountInclTaxField(),
            this._getOrderShippingDiscountsField(),
            this._getOrderShippingHandlingTotalField(),
            this._getOrderTaxesField()
        ];
    }

    _getOrderShippingDiscountsField(): Field {
        return new Field('discounts')
            .addFieldList(this._getOrderShippingDiscountsFields());
    }

    _getOrderShippingDiscountsFields(): Field[] {
        return [
            this._getOrderAmountField()
        ];
    }

    _getOrderShippingAmountExclTaxField(): Field {
        return new Field('amount_excluding_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderShippingAmountInclTaxField(): Field {
        return new Field('amount_including_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderShippingHandlingTotalField(): Field {
        return new Field('total_amount')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderTotalTaxField(): Field {
        return new Field('total_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderTotalShippingField(): Field {
        return new Field('total_shipping')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderBaseGrantTotalField(): Field {
        return new Field('base_grand_total')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderSubtotalField(): Field {
        return new Field('subtotal')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderGrandTotalField(): Field {
        return new Field('grand_total')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderPriceFields(): string[] {
        return [
            'value',
            'currency'
        ];
    }

    _getOrderShipmentsField(): Field {
        return new Field('shipments')
            .addFieldList(this._getOrderShipmentsFields());
    }

    _getOrderShipmentsFields(): Array<string | Field> {
        return [
            'id',
            'number',
            this._getOrderCommentsField(),
            this._getOrderShipmentTrackingField(),
            this._getShipmentsItemsProductsField()
        ];
    }

    _getShipmentsItemsProductsField(): Field {
        return new Field('items')
            .addFieldList(this._getShipmentsItemsProductsFields());
    }

    _getShipmentsItemsProductsFields(): Array<string | Field> {
        return [
            'quantity_shipped',
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getOrderShipmentTrackingField(): Field {
        return new Field('tracking')
            .addFieldList(this._getOrderShipmentTrackingFields());
    }

    _getOrderShipmentTrackingFields(): string[] {
        return [
            'carrier',
            'number',
            'title'
        ];
    }

    _getOrderRefundsField(): Field {
        return new Field('credit_memos')
            .addFieldList(this._getOrderRefundsFields());
    }

    _getOrderRefundsFields(): Array<string | Field> {
        return [
            'id',
            'number',
            this._getOrderCommentsField(),
            this._getRefundsItemsProductsField(),
            this._getOrderItemTotalField()
        ];
    }

    _getOrderDiscountsField(): Field {
        return new Field('discounts')
            .addFieldList(this._getOrderDiscountsFields());
    }

    _getOrderDiscountsFields(): Array<string | Field> {
        return [
            'label',
            this._getOrderAmountField()
        ];
    }

    _getOrderAmountField(): Field {
        return new Field('amount')
            .addFieldList(this._getOrderPriceFields());
    }

    _getRefundsItemsProductsField(): Field {
        return new Field('items')
            .addFieldList(this._getRefundsItemsProductsFields());
    }

    _getRefundsItemsProductsFields(): Array<string | Field> {
        return [
            'quantity_refunded',
            ...this._getBaseOrderItemProductsFields(),
            this._getRefundsItemInformationField(),
            this._getOrderProductRowSubtotalField(),
            this._getOrderDiscountsField()
        ];
    }

    _getRefundsItemInformationField(): Field {
        return new Field('order_item')
            .addFieldList(this._getOrderItemProductsFields());
    }

    _getOrderInvoicesField(): Field {
        return new Field('invoices')
            .addFieldList(this._getOrderInvoicesFields());
    }

    _getOrderInvoicesFields(): Array<string | Field> {
        return [
            'id',
            'number',
            this._getOrderCommentsField(),
            this._getInvoiceItemsProductsField(),
            this._getOrderItemTotalField()
        ];
    }

    _getInvoiceItemsProductsField(): Field {
        return new Field('items')
            .addFieldList(this._getInvoiceItemProductsFields());
    }

    _getInvoiceItemProductsFields(): Array<string | Field> {
        return [
            'quantity_invoiced',
            this._getOrderProductRowSubtotalField(),
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getOrderItemsProductsField(): Field {
        return new Field('items')
            .addFieldList(this._getOrderItemProductsFields());
    }

    _getOrderItemProductsFields(): Array<string | Field> {
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

    _getBaseOrderItemProductsFields(): Array<string | Field> {
        return [
            'product_name',
            'product_sku',
            this._getOrderProductSalePriceField()
        ];
    }

    _getOrderProductRowSubtotalField(): Field {
        return new Field('row_subtotal')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderProductRowSubtotalInclTaxField(): Field {
        return new Field('row_subtotal_incl_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderProductEnteredOptionsField(): Field {
        return new Field('entered_options')
            .addFieldList(this._getOrderProductOptionsFields());
    }

    _getOrderProductSelectedOptionsField(): Field {
        return new Field('selected_options')
            .addFieldList(this._getOrderProductOptionsFields());
    }

    _getOrderProductOptionsFields(): Array<string | Field> {
        return [
            'label',
            'value',
            this._getOrderProductBundleOptionItemsField(),
            'linkItems'
        ];
    }

    _getOrderProductBundleOptionItemsField(): Field {
        return new Field('items')
            .addFieldList(this._getOrderProductBundleOptionItemsFields());
    }

    _getOrderProductBundleOptionItemsFields(): string[] {
        return [
            'title',
            'qty',
            'price'
        ];
    }

    _getOrderProductSalePriceField(): Field {
        return new Field('product_sale_price')
            .addFieldList(this._getOrderPriceFields());
    }

    _getReorderField(): Field {
        return new Field('userInputErrors')
            .addFieldList(this._getReorderFields());
    }

    _getReorderFields(): string[] {
        return [
            'code',
            'message',
            'path'
        ];
    }

    _getOrderShippingAddressField(): Field {
        return new Field('shipping_address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderBillingAddressField(): Field {
        return new Field('billing_address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderAddressFields(): Array<string | Field> {
        return [
            'city',
            'country_id',
            'firstname',
            'lastname',
            'postcode',
            'region',
            'region_id',
            'telephone',
            'vat_id',
            this._getOrderAddressStreetField()
        ];
    }

    _getOrderAddressStreetField(): Field {
        return new Field('street');
    }

    _getOrderPaymentMethodsField(): Field {
        return new Field('payment_methods')
            .addFieldList(this._getOrderPaymentMethodsFields());
    }

    _getOrderPaymentMethodsFields(): Array<string | Field> {
        return [
            'name',
            'type',
            'purchase_number',
            this._getOrderPaymentMethodAdditionalField()
        ];
    }

    _getOrderPaymentMethodAdditionalField(): Field {
        return new Field('additional_data')
            .addFieldList(this._getOrderPaymentMethodAdditionalFields());
    }

    _getOrderPaymentMethodAdditionalFields(): string[] {
        return [
            'name',
            'value'
        ];
    }

    _getOrderShippingMethodField(): Field {
        return new Field('shipping_method');
    }

    getDownloadableQuery(): Field {
        return new Field('customerDownloadableProducts')
            .addField(this._getDownloadableField());
    }

    getOrderByIdQuery(orderId: number): Field {
        return this._getOrderByIdField(orderId);
    }

    linkOrderMutation(customerEmail: string): Field {
        return new Field('linkOrder')
            .addArgument('customer_email', 'String!', customerEmail);
    }

    _getOrderByIdField(orderId: number): Field {
        return new Field('Customer')
            .addArgument('id', 'Int!', orderId)
            .addFieldList(this._getOrderItemsFields(false));
    }

    _getDownloadableField(): Field {
        return new Field('items')
            .addFieldList(this._getDownloadableFields());
    }

    _getDownloadableFields(): string[] {
        return [
            'order_id',
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
