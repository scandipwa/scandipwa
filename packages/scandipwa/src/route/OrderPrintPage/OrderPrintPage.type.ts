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

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { PrintTypes } from 'Component/MyAccountOrderPrint/MyAccountOrderPrint.config';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OrderPrintPageMapStateProps {}

export interface OrderPrintPageMapDispatchProps {
    getOrderInvoice: (invoiceId: number) => any;
    getOrderShipment: (shipmentId: number) => any;
    getOrderRefund: (refundId: number) => any;
}

export interface OrderPrintPageBaseProps {
    match;
    orderPrintRequest;
}

export interface OrderPrintMapItem {
    activeTab: OrderTabs;
    request?: (id: number) => Promise<any>;
}

export type OrderPrintMapItems = Record<PrintTypes, OrderPrintMapItem>;
