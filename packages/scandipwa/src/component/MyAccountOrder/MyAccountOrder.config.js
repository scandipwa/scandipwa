/* eslint-disable import/prefer-default-export */

import { } from 'Util/Url';

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

export const ORDER_ITEMS = 'Items';
export const ORDER_INVOICES = 'Invoice';
export const ORDER_SHIPMENTS = 'Shipment';
export const ORDER_REFUNDS = 'Refund';

export const ORDER_ACTION_LABELS = {
    [ORDER_INVOICES]: {
        print: __('Print Invoice'),
        printUrl: 'sales/order/printInvoice/invoice_id',
        printAll: __('Print All Invoices'),
        printAllUrl: 'sales/order/printInvoice/order_id'
    },
    [ORDER_SHIPMENTS]: {
        print: __('Print Shipment'),
        printUrl: 'sales/order/printShipment/shipment_ID',
        printAll: __('Print All Shipments'),
        printAllUrl: 'sales/order/printShipment/order_id'
    },
    [ORDER_REFUNDS]: {
        print: __('Print Refund'),
        printUrl: 'sales/order/printCreditmemo/creditmemo_id',
        printAll: __('Print All Refunds'),
        printAllUrl: 'sales/order/printCreditmemo/order_id'
    }
};
