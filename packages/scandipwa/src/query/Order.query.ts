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

import { Field, Query } from '@tilework/opus';

import {
    GQLBundleOption,
    GQLCheckoutUserInputError,
    GQLCreditMemo,
    GQLCreditMemoItemInterface,
    GQLCustomer,
    GQLCustomerDownloadableProduct,
    GQLCustomerDownloadableProducts,
    GQLCustomerOrders,
    GQLDiscount,
    GQLEnteredOptionInput,
    GQLInvoice,
    GQLInvoiceItemInterface,
    GQLMoney,
    GQLOrderAddress,
    GQLOrderItemInterface,
    GQLOrderItemOption,
    GQLOrderPaymentMethod,
    GQLOrderShipment,
    GQLOrderTotal,
    GQLPaymentMethodAdditionalData,
    GQLReorderItemsOutput,
    GQLSalesCommentItem,
    GQLSearchResultPageInfo,
    GQLShipmentItemInterface,
    GQLShipmentTracking,
    GQLShippingHandling,
    GQLTaxItem
} from 'Type/Graphql.type';

import { CommonField, OrdersOptions } from './Query.type';

/**
 * Order Query
 * @class OrderQuery
 * @namespace Query/Order/Query */
export class OrderQuery {
    getReorder(incrementId: string): Query<'reorderItems', GQLReorderItemsOutput & {
        userInputErrors: GQLCheckoutUserInputError[];
    }> {
        return new Query<'reorderItems', GQLReorderItemsOutput>('reorderItems')
            .addArgument('orderNumber', 'String!', incrementId)
            .addField(this._getReorderField());
    }

    getOrderListQuery(options: OrdersOptions): Query<'customer', GQLCustomer & {
        orders: GQLCustomerOrders;
    }> {
        return new Query<'customer', GQLCustomer>('customer')
            .addFieldList(this._getOrderListFields(options));
    }

    _getOrderListFields(options: OrdersOptions): Field<'orders', GQLCustomerOrders, false>[] {
        return [
            this._getOrdersField(options)
        ];
    }

    _getOrdersField(options: OrdersOptions): Field<'orders', GQLCustomerOrders> {
        const { orderId, page = 1 } = options || {};
        const ordersField = new Field<'orders', GQLCustomerOrders>('orders');

        if (orderId) {
            return ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { entity_id: { eq: orderId } })
                .addFieldList(this._getOrdersFields(true));
        }

        return ordersField
            .addArgument('currentPage', 'Int', page)
            .addFieldList(this._getOrdersFields());
    }

    _getOrdersFields(isSingleOrder = false): CommonField[] {
        return [
            'total_count',
            this._getOrderItemsField(isSingleOrder),
            this._getSearchResultPageInfoField()
        ];
    }

    _getSearchResultPageInfoField(): Field<'page_info', GQLSearchResultPageInfo> {
        return new Field<'page_info', GQLSearchResultPageInfo>('page_info')
            .addFieldList(this._getSearchResultPageInfoFields());
    }

    _getSearchResultPageInfoFields(): string[] {
        return [
            'current_page',
            'page_size',
            'total_pages'
        ];
    }

    _getOrderItemsField(isSingleOrder: boolean): Field<'items', GQLOrderItemInterface, true> {
        return new Field<'items', GQLOrderItemInterface, true>('items', true)
            .addFieldList(this._getOrderItemsFields(isSingleOrder));
    }

    _getOrderItemsFields(isSingleOrder: boolean): CommonField[] {
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

    _getSingleOrderFields(): CommonField[] {
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

    _getOrderCommentsField(): Field<'comments', GQLSalesCommentItem, true> {
        return new Field<'comments', GQLSalesCommentItem, true>('comments', true)
            .addFieldList(this._getOrderCommentsFields());
    }

    _getOrderCommentsFields(): string[] {
        return [
            'timestamp',
            'message'
        ];
    }

    _getOrderItemTotalField(): Field<'total', GQLOrderTotal> {
        return new Field<'total', GQLOrderTotal>('total')
            .addFieldList(this._getOrderItemTotalFields());
    }

    _getOrderItemTotalFields(): CommonField[] {
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

    _getOrderTaxesField(): Field<'taxes', GQLTaxItem, true> {
        return new Field<'taxes', GQLTaxItem, true>('taxes', true)
            .addFieldList(this._getOrderTaxesFields());
    }

    _getOrderTaxesFields(): CommonField[] {
        return [
            'rate',
            'title',
            this._getOrderAmountField()
        ];
    }

    _getOrderShippingHandlingField(): Field<'shipping_handling', GQLShippingHandling> {
        return new Field<'shipping_handling', GQLShippingHandling>('shipping_handling')
            .addFieldList(this._getOrderShippingHandlingFields());
    }

    _getOrderShippingHandlingFields(): CommonField[] {
        return [
            this._getOrderShippingAmountExclTaxField(),
            this._getOrderShippingAmountInclTaxField(),
            this._getOrderShippingDiscountsField(),
            this._getOrderShippingHandlingTotalField(),
            this._getOrderTaxesField()
        ];
    }

    _getOrderShippingDiscountsField(): Field<'discounts', GQLDiscount, true> {
        return new Field<'discounts', GQLDiscount, true>('discounts', true)
            .addFieldList(this._getOrderShippingDiscountsFields());
    }

    _getOrderShippingDiscountsFields(): Field<'amount', GQLMoney, false>[] {
        return [
            this._getOrderAmountField()
        ];
    }

    _getOrderShippingAmountExclTaxField(): Field<'amount_excluding_tax', GQLMoney> {
        return new Field<'amount_excluding_tax', GQLMoney>('amount_excluding_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderShippingAmountInclTaxField(): Field<'amount_including_tax', GQLMoney> {
        return new Field<'amount_including_tax', GQLMoney>('amount_including_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderShippingHandlingTotalField(): Field<'total_amount', GQLMoney> {
        return new Field<'total_amount', GQLMoney>('total_amount')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderTotalTaxField(): Field<'total_tax', GQLMoney> {
        return new Field<'total_tax', GQLMoney>('total_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderTotalShippingField(): Field<'total_shipping', GQLMoney> {
        return new Field<'total_shipping', GQLMoney>('total_shipping')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderBaseGrantTotalField(): Field<'base_grand_total', GQLMoney> {
        return new Field<'base_grand_total', GQLMoney>('base_grand_total')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderSubtotalField(): Field<'subtotal', GQLMoney> {
        return new Field<'subtotal', GQLMoney>('subtotal')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderGrandTotalField(): Field<'grand_total', GQLMoney> {
        return new Field<'grand_total', GQLMoney>('grand_total')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderPriceFields(): string[] {
        return [
            'value',
            'currency'
        ];
    }

    _getOrderShipmentsField(): Field<'shipments', GQLOrderShipment, true> {
        return new Field<'shipments', GQLOrderShipment, true>('shipments', true)
            .addFieldList(this._getOrderShipmentsFields());
    }

    _getOrderShipmentsFields(): CommonField[] {
        return [
            'id',
            'number',
            this._getOrderCommentsField(),
            this._getOrderShipmentTrackingField(),
            this._getShipmentsItemsProductsField()
        ];
    }

    _getShipmentsItemsProductsField(): Field<'items', GQLShipmentItemInterface, true> {
        return new Field<'items', GQLShipmentItemInterface, true>('items', true)
            .addFieldList(this._getShipmentsItemsProductsFields());
    }

    _getShipmentsItemsProductsFields(): CommonField[] {
        return [
            'quantity_shipped',
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getOrderShipmentTrackingField(): Field<'tracking', GQLShipmentTracking, true> {
        return new Field<'tracking', GQLShipmentTracking, true>('tracking', true)
            .addFieldList(this._getOrderShipmentTrackingFields());
    }

    _getOrderShipmentTrackingFields(): string[] {
        return [
            'carrier',
            'number',
            'title'
        ];
    }

    _getOrderRefundsField(): Field<'credit_memos', GQLCreditMemo, true> {
        return new Field<'credit_memos', GQLCreditMemo, true>('credit_memos', true)
            .addFieldList(this._getOrderRefundsFields());
    }

    _getOrderRefundsFields(): CommonField[] {
        return [
            'id',
            'number',
            this._getOrderCommentsField(),
            this._getRefundsItemsProductsField(),
            this._getOrderItemTotalField()
        ];
    }

    _getOrderDiscountsField(): Field<'discounts', GQLDiscount, true> {
        return new Field<'discounts', GQLDiscount, true>('discounts', true)
            .addFieldList(this._getOrderDiscountsFields());
    }

    _getOrderDiscountsFields(): CommonField[] {
        return [
            'label',
            this._getOrderAmountField()
        ];
    }

    _getOrderAmountField(): Field<'amount', GQLMoney> {
        return new Field<'amount', GQLMoney>('amount')
            .addFieldList(this._getOrderPriceFields());
    }

    _getRefundsItemsProductsField(): Field<'items', GQLCreditMemoItemInterface, true> {
        return new Field<'items', GQLCreditMemoItemInterface, true>('items', true)
            .addFieldList(this._getRefundsItemsProductsFields());
    }

    _getRefundsItemsProductsFields(): CommonField[] {
        return [
            'quantity_refunded',
            ...this._getBaseOrderItemProductsFields(),
            this._getRefundsItemInformationField(),
            this._getOrderProductRowSubtotalField(),
            this._getOrderDiscountsField()
        ];
    }

    _getRefundsItemInformationField(): Field<'order_item', GQLOrderItemInterface> {
        return new Field<'order_item', GQLOrderItemInterface>('order_item')
            .addFieldList(this._getOrderItemProductsFields());
    }

    _getOrderInvoicesField(): Field<'invoices', GQLInvoice, true> {
        return new Field<'invoices', GQLInvoice, true>('invoices', true)
            .addFieldList(this._getOrderInvoicesFields());
    }

    _getOrderInvoicesFields(): CommonField[] {
        return [
            'id',
            'number',
            this._getOrderCommentsField(),
            this._getInvoiceItemsProductsField(),
            this._getOrderItemTotalField()
        ];
    }

    _getInvoiceItemsProductsField(): Field<'items', GQLInvoiceItemInterface, true> {
        return new Field<'items', GQLInvoiceItemInterface, true>('items', true)
            .addFieldList(this._getInvoiceItemProductsFields());
    }

    _getInvoiceItemProductsFields(): CommonField[] {
        return [
            'quantity_invoiced',
            this._getOrderProductRowSubtotalField(),
            ...this._getBaseOrderItemProductsFields()
        ];
    }

    _getOrderItemsProductsField(): Field<'items', GQLOrderItemInterface, true> {
        return new Field<'items', GQLOrderItemInterface, true>('items', true)
            .addFieldList(this._getOrderItemProductsFields());
    }

    _getOrderItemProductsFields(): CommonField[] {
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

    _getBaseOrderItemProductsFields(): CommonField[] {
        return [
            'product_name',
            'product_sku',
            this._getOrderProductSalePriceField()
        ];
    }

    _getOrderProductRowSubtotalField(): Field<'row_subtotal', GQLMoney> {
        return new Field<'row_subtotal', GQLMoney>('row_subtotal')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderProductRowSubtotalInclTaxField(): Field<'row_subtotal_incl_tax', GQLMoney> {
        return new Field<'row_subtotal_incl_tax', GQLMoney>('row_subtotal_incl_tax')
            .addFieldList(this._getOrderPriceFields());
    }

    _getOrderProductEnteredOptionsField(): Field<'entered_options', GQLEnteredOptionInput, true> {
        return new Field<'entered_options', GQLEnteredOptionInput, true>('entered_options', true)
            .addFieldList(this._getOrderProductOptionsFields());
    }

    _getOrderProductSelectedOptionsField(): Field<'selected_options', GQLOrderItemOption, true> {
        return new Field<'selected_options', GQLOrderItemOption, true>('selected_options', true)
            .addFieldList(this._getOrderProductOptionsFields());
    }

    _getOrderProductOptionsFields(): CommonField[] {
        return [
            'label',
            'value',
            this._getOrderProductBundleOptionItemsField(),
            'linkItems'
        ];
    }

    _getOrderProductBundleOptionItemsField(): Field<'items', GQLBundleOption, true> {
        return new Field<'items', GQLBundleOption, true>('items', true)
            .addFieldList(this._getOrderProductBundleOptionItemsFields());
    }

    _getOrderProductBundleOptionItemsFields(): string[] {
        return [
            'title',
            'qty',
            'price'
        ];
    }

    _getOrderProductSalePriceField(): Field<'product_sale_price', GQLMoney> {
        return new Field<'product_sale_price', GQLMoney>('product_sale_price')
            .addFieldList(this._getOrderPriceFields());
    }

    _getReorderField(): Field<'userInputErrors', GQLCheckoutUserInputError, true> {
        return new Field<'userInputErrors', GQLCheckoutUserInputError, true>('userInputErrors', true)
            .addFieldList(this._getReorderFields());
    }

    _getReorderFields(): string[] {
        return [
            'code',
            'message',
            'path'
        ];
    }

    _getOrderShippingAddressField(): Field<'shipping_address', GQLOrderAddress> {
        return new Field<'shipping_address', GQLOrderAddress>('shipping_address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderBillingAddressField(): Field<'billing_address', GQLOrderAddress> {
        return new Field<'billing_address', GQLOrderAddress>('billing_address')
            .addFieldList(this._getOrderAddressFields());
    }

    _getOrderAddressFields(): CommonField[] {
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

    _getOrderAddressStreetField(): Field<'street', string, true> {
        return new Field<'street', string, true>('street', true);
    }

    _getOrderPaymentMethodsField(): Field<'payment_methods', GQLOrderPaymentMethod, true> {
        return new Field<'payment_methods', GQLOrderPaymentMethod, true>('payment_methods', true)
            .addFieldList(this._getOrderPaymentMethodsFields());
    }

    _getOrderPaymentMethodsFields(): CommonField[] {
        return [
            'name',
            'type',
            'purchase_number',
            this._getOrderPaymentMethodAdditionalField()
        ];
    }

    _getOrderPaymentMethodAdditionalField(): Field<'additional_data', GQLPaymentMethodAdditionalData> {
        return new Field<'additional_data', GQLPaymentMethodAdditionalData>('additional_data')
            .addFieldList(this._getOrderPaymentMethodAdditionalFields());
    }

    _getOrderPaymentMethodAdditionalFields(): string[] {
        return [
            'name',
            'value'
        ];
    }

    _getOrderShippingMethodField(): Field<'shipping_method', string> {
        return new Field<'shipping_method', string>('shipping_method');
    }

    getDownloadableQuery(): Query<'customerDownloadableProducts', GQLCustomerDownloadableProducts & {
        items: GQLCustomerDownloadableProduct[];
    }> {
        return new Query<'customerDownloadableProducts', GQLCustomerDownloadableProducts>(
            'customerDownloadableProducts'
        )
            .addField(this._getDownloadableField());
    }

    linkOrderMutation(customerEmail: string): Field<'linkOrder', boolean> {
        return new Field<'linkOrder', boolean>('linkOrder')
            .addArgument('customer_email', 'String!', customerEmail);
    }

    _getDownloadableField(): Field<'items', GQLCustomerDownloadableProduct, true> {
        return new Field<'items', GQLCustomerDownloadableProduct, true>('items', true)
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
