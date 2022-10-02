/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

export enum OrderTabs {
    ORDER_ITEMS = 'Items',
    ORDER_INVOICES = 'Invoice',
    ORDER_SHIPMENTS = 'Shipment',
    ORDER_REFUNDS = 'Refund',
}

export const ORDER_ID = 'ORDER_ID';

export const ORDER_ACTION_LABELS: Record<OrderTabs, Record<string, string>> = {
    [OrderTabs.ORDER_INVOICES]: {
        print: __('Print Invoice'),
        printUrl: '/sales/order/printInvoice/invoice_id',
        printAll: __('Print All Invoices'),
        printAllUrl: '/sales/order/printInvoice/order_id',
    },
    [OrderTabs.ORDER_SHIPMENTS]: {
        print: __('Print Shipment'),
        printUrl: '/sales/order/printShipment/shipment_id',
        printAll: __('Print All Shipments'),
        printAllUrl: '/sales/order/printShipment/order_id',
    },
    [OrderTabs.ORDER_REFUNDS]: {
        print: __('Print Refund'),
        printUrl: '/sales/order/printCreditmemo/creditmemo_id',
        printAll: __('Print All Refunds'),
        printAllUrl: '/sales/order/printCreditmemo/order_id',
    },
    [OrderTabs.ORDER_ITEMS]: {},
};
