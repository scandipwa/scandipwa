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

import { GQLCurrencyEnum } from 'Type/Graphql.type';

import {
    BundleOption,
    CheckoutUserInputError,
    CreditMemo,
    CustomerDownloadableProduct,
    CustomerOrders,
    Discount,
    Invoice,
    InvoiceItem,
    Money,
    OrderAddress,
    OrderItem,
    OrderItemProduct,
    OrderPaymentMethod,
    OrderProductSelectedOption,
    OrderShipment,
    OrdersOptions,
    OrderTotal,
    PaymentMethodAdditionalData,
    RefundItem,
    SalesCommentItem,
    SearchResultPageInfo,
    ShipmentItemInterface,
    ShipmentTracking,
    ShippingHandling,
    TaxItem
} from './Order.type';

/**
 * Order Query
 * @class OrderQuery
 * @namespace Query/Order/Query */
export class OrderQuery {
    getReorder(incrementId: string): Mutation<'reorderItems', { userInputErrors: CheckoutUserInputError[] }> {
        return new Mutation<'reorderItems', { userInputErrors: CheckoutUserInputError[] }>('reorderItems')
            .addArgument('orderNumber', 'String!', incrementId)
            .addField(this._getReorderField());
    }

    getOrderListQuery(options: OrdersOptions): Query<'customer', { orders: CustomerOrders[] }> {
        return new Query<'customer', { orders: CustomerOrders[] }>('customer')
            .addFieldList(this._getOrderListFields(options));
    }

    _getOrderListFields(options: OrdersOptions): Field<'orders', CustomerOrders, true>[] {
        return [
            this._getOrdersField(options)
        ];
    }

    _getOrdersField(options: OrdersOptions): Field<'orders', CustomerOrders, true> {
        const { orderId, page = 1 } = options || {};
        const ordersField = new Field<'orders', CustomerOrders, true>('orders', true);

        if (orderId) {
            return ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { entity_id: { eq: orderId } })
                .addFieldList(this._getOrdersFields(true));
        }

        return ordersField
            .addArgument('currentPage', 'Int', page)
            .addFieldList(this._getOrdersFields());
    }

    _getOrdersFields(isSingleOrder = false): Array<
    Field<'total_count', number>
    | Field<'items', OrderItem, true>
    | Field<'page_info', SearchResultPageInfo>
    > {
        return [
            new Field<'total_count', number>('total_count'),
            this._getOrderItemsField(isSingleOrder),
            this._getSearchResultPageInfoField()
        ];
    }

    _getSearchResultPageInfoField(): Field<'page_info', SearchResultPageInfo> {
        return new Field<'page_info', SearchResultPageInfo>('page_info')
            .addFieldList(this._getSearchResultPageInfoFields());
    }

    _getSearchResultPageInfoFields(): Array<
    Field<'current_page', number>
    | Field<'page_size', number>
    | Field<'total_pages', number>
    > {
        return [
            new Field<'current_page', number>('current_page'),
            new Field<'page_size', number>('page_size'),
            new Field<'total_pages', number>('total_pages')
        ];
    }

    _getOrderItemsField(isSingleOrder: boolean): Field<'items', OrderItem, true> {
        return new Field<'items', OrderItem, true>('items', true)
            .addFieldList(this._getOrderItemsFields(isSingleOrder));
    }

    _getOrderItemsFields(isSingleOrder: boolean): Array<
    Field<'id', number>
    | Field<'increment_id', number>
    | Field<'order_date', string>
    | Field<'status', string>
    | Field<'can_reorder', boolean>
    | Field<'rss_link', string>
    | Field<'total', OrderTotal>
    | Field<'carrier', string>
    | Field<'shipments', OrderShipment, true>
    | Field<'items', OrderItemProduct, true>
    | Field<'invoices', Invoice, true>
    | Field<'credit_memos', CreditMemo, true>
    | Field<'shipping_address', OrderAddress>
    | Field<'billing_address', OrderAddress>
    | Field<'payment_methods', OrderPaymentMethod, true>
    | Field<'shipping_method', string>
    | Field<'comments', SalesCommentItem, true>
    > {
        const basicFields = [
            new Field<'id', number>('id'),
            new Field<'increment_id', number>('increment_id'),
            new Field<'order_date', string>('order_date'),
            new Field<'status', string>('status'),
            new Field<'can_reorder', boolean>('can_reorder'),
            new Field<'rss_link', string>('rss_link'),
            this._getOrderItemTotalField()
        ];

        if (isSingleOrder) {
            return [...basicFields, ...this._getSingleOrderFields()];
        }

        return basicFields;
    }

    _getSingleOrderFields(): Array<
    Field<'carrier', string>
    | Field<'shipments', OrderShipment, true>
    | Field<'items', OrderItemProduct, true>
    | Field<'invoices', Invoice, true>
    | Field<'credit_memos', CreditMemo, true>
    | Field<'shipping_address', OrderAddress>
    | Field<'billing_address', OrderAddress>
    | Field<'payment_methods', OrderPaymentMethod, true>
    | Field<'shipping_method', string>
    | Field<'comments', SalesCommentItem, true>
    > {
        return [
            new Field<'carrier', string>('carrier'),
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

    _getOrderCommentsField(): Field<'comments', SalesCommentItem, true> {
        return new Field<'comments', SalesCommentItem, true>('comments', true)
            .addFieldList(this._getOrderCommentsFields());
    }

    _getOrderCommentsFields(): Array<
    Field<'timestamp', string>
    | Field<'message', string>
    > {
        return [
            new Field<'timestamp', string>('timestamp'),
            new Field<'message', string>('message')
        ];
    }

    _getOrderItemTotalField(): Field<'total', OrderTotal> {
        return new Field<'total', OrderTotal>('total')
            .addFieldList(this._getOrderItemTotalFields());
    }

    _getOrderItemTotalFields(): Array<
    Field<'grand_total', Money>
    | Field<'discounts', Discount, true>
    | Field<'base_grand_total', Money>
    | Field<'subtotal', Money>
    | Field<'total_shipping', Money>
    | Field<'total_tax', Money>
    | Field<'shipping_handling', ShippingHandling>
    | Field<'taxes', TaxItem, true>
    > {
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

    _getOrderTaxesField(): Field<'taxes', TaxItem, true> {
        return new Field<'taxes', TaxItem, true>('taxes', true)
            .addFieldList(this._getOrderTaxesFields());
    }

    _getOrderTaxesFields(): Array<
    Field<'rate', number>
    | Field<'title', string>
    | Field<'amount', Money>
    > {
        return [
            new Field<'rate', number>('rate'),
            new Field<'title', string>('title'),
            this._getOrderAmountField()
        ];
    }

    _getOrderShippingHandlingField(): Field<'shipping_handling', ShippingHandling> {
        return new Field<'shipping_handling', ShippingHandling>('shipping_handling')
            .addFieldList(this._getOrderShippingHandlingFields());
    }

    _getOrderShippingHandlingFields(): Array<
    Field<'amount_excluding_tax', Money>
    | Field<'amount_including_tax', Money>
    | Field<'discounts', Discount, true>
    | Field<'total_amount', Money>
    | Field<'taxes', TaxItem, true>
    > {
        return [
            this._getOrderShippingAmountExclTaxField(),
            this._getOrderShippingAmountInclTaxField(),
            this._getOrderShippingDiscountsField(),
            this._getOrderShippingHandlingTotalField(),
            this._getOrderTaxesField()
        ];
    }

    _getOrderShippingDiscountsField(): Field<'discounts', Discount, true> {
        return new Field<'discounts', Discount, true>('discounts', true)
            .addFieldList(this._getOrderShippingDiscountsFields());
    }

    _getOrderShippingDiscountsFields(): Field<'amount', Money>[] {
        return [
            this._getOrderAmountField()
        ];
    }

    _getOrderShippingAmountExclTaxField(): Field<'amount_excluding_tax', Money> {
        return new Field<'amount_excluding_tax', Money>('amount_excluding_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderShippingAmountInclTaxField(): Field<'amount_including_tax', Money> {
        return new Field<'amount_including_tax', Money>('amount_including_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderShippingHandlingTotalField(): Field<'total_amount', Money> {
        return new Field<'total_amount', Money>('total_amount')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderTotalTaxField(): Field<'total_tax', Money> {
        return new Field<'total_tax', Money>('total_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderTotalShippingField(): Field<'total_shipping', Money> {
        return new Field<'total_shipping', Money>('total_shipping')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderBaseGrantTotalField(): Field<'base_grand_total', Money> {
        return new Field<'base_grand_total', Money>('base_grand_total')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderSubtotalField(): Field<'subtotal', Money> {
        return new Field<'subtotal', Money>('subtotal')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderGrandTotalField(): Field<'grand_total', Money> {
        return new Field<'grand_total', Money>('grand_total')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderPriceFields(): Array<
    Field<'value', string>
    | Field<'currency', GQLCurrencyEnum>
    > {
        return [
            new Field<'value', string>('value'),
            new Field<'currency', GQLCurrencyEnum>('currency')
        ];
    }

    _getOrderShipmentsField(): Field<'shipments', OrderShipment, true> {
        return new Field<'shipments', OrderShipment, true>('shipments', true)
            .addFieldList(this._getOrderShipmentsFields());
    }

    _getOrderShipmentsFields(): Array<
    Field<'id', number>
    | Field<'number', string>
    | Field<'comments', SalesCommentItem, true>
    | Field<'tracking', ShipmentTracking, true>
    | Field<'items', ShipmentItemInterface, true>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'number', string>('number'),
            this._getOrderCommentsField(),
            this._getOrderShipmentTrackingField(),
            this._getShipmentsItemsProductsField()
        ];
    }

    _getShipmentsItemsProductsField(): Field<'items', ShipmentItemInterface, true> {
        return new Field<'items', ShipmentItemInterface, true>('items', true)
            .addFieldList(this._getShipmentsItemsProductsFields());
    }

    _getShipmentsItemsProductsFields(): Array<
    Field<'quantity_shipped', number>
    | Field<'product_name', string>
    | Field<'product_sku', string>
    | Field<'product_sale_price', Money>
    > {
        return [
            new Field<'quantity_shipped', number>('quantity_shipped'),
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getOrderShipmentTrackingField(): Field<'tracking', ShipmentTracking, true> {
        return new Field<'tracking', ShipmentTracking, true>('tracking', true)
            .addFieldList(this._getOrderShipmentTrackingFields());
    }

    _getOrderShipmentTrackingFields(): Array<
    Field<'carrier', string>
    | Field<'number', string>
    | Field<'title', string>
    > {
        return [
            new Field<'carrier', string>('carrier'),
            new Field<'number', string>('number'),
            new Field<'title', string>('title')
        ];
    }

    _getOrderRefundsField(): Field<'credit_memos', CreditMemo, true> {
        return new Field<'credit_memos', CreditMemo, true>('credit_memos', true)
            .addFieldList(this._getOrderRefundsFields());
    }

    _getOrderRefundsFields(): Array<
    Field<'id', number>
    | Field<'number', string>
    | Field<'comments', SalesCommentItem, true>
    | Field<'items', RefundItem, true>
    | Field<'total', OrderTotal>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'number', string>('number'),
            this._getOrderCommentsField(),
            this._getRefundsItemsProductsField(),
            this._getOrderItemTotalField()
        ];
    }

    _getOrderDiscountsField(): Field<'discounts', Discount, true> {
        return new Field<'discounts', Discount, true>('discounts', true)
            .addFieldList(this._getOrderDiscountsFields());
    }

    _getOrderDiscountsFields(): Array<
    Field<'label', string>
    | Field<'amount', Money>
    > {
        return [
            new Field<'label', string>('label'),
            this._getOrderAmountField()
        ];
    }

    _getOrderAmountField(): Field<'amount', Money> {
        return new Field<'amount', Money>('amount')
            .addFieldList(this._getOrderPriceFields());
    }

    _getRefundsItemsProductsField(): Field<'items', RefundItem, true> {
        return new Field<'items', RefundItem, true>('items', true)
            .addFieldList(this._getRefundsItemsProductsFields());
    }

    _getRefundsItemsProductsFields(): Array<
    Field<'quantity_refunded', number>
    | Field<'product_name', string>
    | Field<'product_sku', string>
    | Field<'product_sale_price', Money>
    | Field<'order_item', OrderItemProduct>
    | Field<'row_subtotal', Money>
    | Field<'discounts', Discount, true>
    > {
        return [
            new Field<'quantity_refunded', number>('quantity_refunded'),
            ...this._getBaseOrderItemProductsFields(),
            this._getRefundsItemInformationField(),
            this._getOrderProductRowSubtotalField(),
            this._getOrderDiscountsField()
        ];
    }

    _getRefundsItemInformationField(): Field<'order_item', OrderItemProduct> {
        return new Field<'order_item', OrderItemProduct>('order_item')
            .addFieldList(this._getOrderItemProductsFields());
    }

    _getOrderInvoicesField(): Field<'invoices', Invoice, true> {
        return new Field<'invoices', Invoice, true>('invoices', true)
            .addFieldList(this._getOrderInvoicesFields());
    }

    _getOrderInvoicesFields(): Array<
    Field<'id', number>
    | Field<'number', string>
    | Field<'comments', SalesCommentItem, true>
    | Field<'items', InvoiceItem, true>
    | Field<'total', OrderTotal>
    > {
        return [
            new Field<'id', number>('id'),
            new Field<'number', string>('number'),
            this._getOrderCommentsField(),
            this._getInvoiceItemsProductsField(),
            this._getOrderItemTotalField()
        ];
    }

    _getInvoiceItemsProductsField(): Field<'items', InvoiceItem, true> {
        return new Field<'items', InvoiceItem, true>('items', true)
            .addFieldList(this._getInvoiceItemProductsFields());
    }

    _getInvoiceItemProductsFields(): Array<
    Field<'quantity_invoiced', number>
    | Field<'row_subtotal', Money>
    | Field<'product_name', string>
    | Field<'product_sku', string>
    | Field<'product_sale_price', Money>
    > {
        return [
            new Field<'quantity_invoiced', number>('quantity_invoiced'),
            this._getOrderProductRowSubtotalField(),
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getOrderItemsProductsField(): Field<'items', OrderItemProduct, true> {
        return new Field<'items', OrderItemProduct, true>('items', true)
            .addFieldList(this._getOrderItemProductsFields());
    }

    _getOrderItemProductsFields(): Array<
    Field<'product_url_key', string>
    | Field<'quantity_ordered', number>
    | Field<'quantity_shipped', number>
    | Field<'quantity_refunded', number>
    | Field<'quantity_canceled', number>
    | Field<'entered_options', OrderProductSelectedOption, true>
    | Field<'selected_options', OrderProductSelectedOption, true>
    | Field<'row_subtotal', Money>
    | Field<'product_name', string>
    | Field<'product_sku', string>
    | Field<'product_sale_price', Money>
    > {
        return [
            new Field<'product_url_key', string>('product_url_key'),
            new Field<'quantity_ordered', number>('quantity_ordered'),
            new Field<'quantity_shipped', number>('quantity_shipped'),
            new Field<'quantity_refunded', number>('quantity_refunded'),
            new Field<'quantity_canceled', number>('quantity_canceled'),
            this._getOrderProductEnteredOptionsField(),
            this._getOrderProductSelectedOptionsField(),
            this._getOrderProductRowSubtotalField(),
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getBaseOrderItemProductsFields(): Array<
    Field<'product_name', string>
    | Field<'product_sku', string>
    | Field<'product_sale_price', Money>
    > {
        return [
            new Field<'product_name', string>('product_name'),
            new Field<'product_sku', string>('product_sku'),
            this._getOrderProductSalePriceField()
        ];
    }

    _getOrderProductRowSubtotalField(): Field<'row_subtotal', Money> {
        return new Field<'row_subtotal', Money>('row_subtotal')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderProductRowSubtotalInclTaxField(): Field<'row_subtotal_incl_tax', Money> {
        return new Field<'row_subtotal_incl_tax', Money>('row_subtotal_incl_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderProductEnteredOptionsField(): Field<'entered_options', OrderProductSelectedOption, true> {
        return new Field<'entered_options', OrderProductSelectedOption, true>('entered_options', true)
            .addFieldList(this._getOrderProductOptionsFields());
    }

    _getOrderProductSelectedOptionsField(): Field<'selected_options', OrderProductSelectedOption, true> {
        return new Field<'selected_options', OrderProductSelectedOption, true>('selected_options', true)
            .addFieldList(this._getOrderProductOptionsFields());
    }

    _getOrderProductOptionsFields(): Array<
    Field<'label', string>
    | Field<'value', string>
    | Field<'items', BundleOption, true>
    | Field<'linkItems', string, true>
    >{
        return [
            new Field<'label', string>('label'),
            new Field<'value', string>('value'),
            this._getOrderProductBundleOptionItemsField(),
            new Field<'linkItems', string, true>('linkItems', true)
        ];
    }

    _getOrderProductBundleOptionItemsField(): Field<'items', BundleOption, true> {
        return new Field<'items', BundleOption, true>('items', true)
            .addFieldList(this._getOrderProductBundleOptionItemsFields());
    }

    _getOrderProductBundleOptionItemsFields(): Array<
    Field<'title', string>
    | Field<'qty', number>
    | Field<'price', number>
    > {
        return [
            new Field<'title', string>('title'),
            new Field<'qty', number>('qty'),
            new Field<'price', number>('price')
        ];
    }

    _getOrderProductSalePriceField(): Field<'product_sale_price', Money> {
        return new Field<'product_sale_price', Money>('product_sale_price')
            .addFieldList(this._getOrderPriceFields());
    }

    _getReorderField(): Field<'userInputErrors', CheckoutUserInputError, true> {
        return new Field<'userInputErrors', CheckoutUserInputError, true>('userInputErrors', true)
            .addFieldList(this._getReorderFields());
    }

    _getReorderFields(): Array<
    Field<'code', string>
    | Field<'message', string>
    | Field<'path', string>
    > {
        return [
            new Field<'code', string>('code'),
            new Field<'message', string>('message'),
            new Field<'path', string>('path')
        ];
    }

    _getOrderShippingAddressField(): Field<'shipping_address', OrderAddress> {
        return new Field<'shipping_address', OrderAddress>('shipping_address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderBillingAddressField(): Field<'billing_address', OrderAddress> {
        return new Field<'billing_address', OrderAddress>('billing_address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderAddressFields(): Array<
    Field<'city', string>
    | Field<'country_id', number>
    | Field<'firstname', string>
    | Field<'lastname', string>
    | Field<'postcode', string>
    | Field<'region', string>
    | Field<'region_id', number>
    | Field<'telephone', string>
    | Field<'vat_id', string>
    | Field<'street', string, true>
    > {
        return [
            new Field<'city', string>('city'),
            new Field<'country_id', number>('country_id'),
            new Field<'firstname', string>('firstname'),
            new Field<'lastname', string>('lastname'),
            new Field<'postcode', string>('postcode'),
            new Field<'region', string>('region'),
            new Field<'region_id', number>('region_id'),
            new Field<'telephone', string>('telephone'),
            new Field<'vat_id', string>('vat_id'),
            this._getOrderAddressStreetField()
        ];
    }

    _getOrderAddressStreetField(): Field<'street', string, true> {
        return new Field<'street', string, true>('street', true);
    }

    _getOrderPaymentMethodsField(): Field<'payment_methods', OrderPaymentMethod, true> {
        return new Field<'payment_methods', OrderPaymentMethod, true>('payment_methods', true)
            .addFieldList(this._getOrderPaymentMethodsFields());
    }

    _getOrderPaymentMethodsFields(): Array<
    Field<'name', string>
    | Field<'type', string>
    | Field<'purchase_number', string>
    | Field<'additional_data', PaymentMethodAdditionalData>
    > {
        return [
            new Field<'name', string>('name'),
            new Field<'type', string>('type'),
            new Field<'purchase_number', string>('purchase_number'),
            this._getOrderPaymentMethodAdditionalField()
        ];
    }

    _getOrderPaymentMethodAdditionalField(): Field<'additional_data', PaymentMethodAdditionalData> {
        return new Field<'additional_data', PaymentMethodAdditionalData>('additional_data')
            .addFieldList(this._getOrderPaymentMethodAdditionalFields());
    }

    _getOrderPaymentMethodAdditionalFields(): Array<
    Field<'name', string>
    | Field<'value', string>
    > {
        return [
            new Field<'name', string>('name'),
            new Field<'value', string>('value')
        ];
    }

    _getOrderShippingMethodField(): Field<'shipping_method', string> {
        return new Field<'shipping_method', string>('shipping_method');
    }

    getDownloadableQuery(): Query<'customerDownloadableProducts', { items: CustomerDownloadableProduct[] }> {
        return new Query<'customerDownloadableProducts', { items: CustomerDownloadableProduct[] }>(
            'customerDownloadableProducts'
        )
            .addField(this._getDownloadableField());
    }

    linkOrderMutation(customerEmail: string): Field<'linkOrder', boolean> {
        return new Field<'linkOrder', boolean>('linkOrder')
            .addArgument('customer_email', 'String!', customerEmail);
    }

    _getDownloadableField(): Field<'items', CustomerDownloadableProduct, true> {
        return new Field<'items', CustomerDownloadableProduct, true>('items', true)
            .addFieldList(this._getDownloadableFields());
    }

    _getDownloadableFields(): Array<
    Field<'order_id', string>
    | Field<'order_increment_id', number>
    | Field<'date', string>
    | Field<'status', string>
    | Field<'download_url', string>
    | Field<'link_title', string>
    | Field<'remaining_downloads', number>
    | Field<'title', string>
    > {
        return [
            new Field<'order_id', string>('order_id'),
            new Field<'order_increment_id', number>('order_increment_id'),
            new Field<'date', string>('date'),
            new Field<'status', string>('status'),
            new Field<'download_url', string>('download_url'),
            new Field<'link_title', string>('link_title'),
            new Field<'remaining_downloads', number>('remaining_downloads'),
            new Field<'title', string>('title')
        ];
    }
}

export default new OrderQuery();
