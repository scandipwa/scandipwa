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

import { match } from 'react-router';

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { PrintTypes } from 'Component/MyAccountOrderPrint/MyAccountOrderPrint.config';
import { OrderItem } from 'Query/Order.type';

export interface OrderPrintPageContainerMapStateProps {}

export interface OrderPrintPageContainerMapDispatchProps {
    getOrderInvoice: (invoiceId: number) => Promise<OrderItem | null>;
    getOrderShipment: (shipmentId: number) => Promise<OrderItem | null>;
    getOrderRefund: (refundId: number) => Promise<OrderItem | null>;
}

export interface OrderPrintPageContainerBaseProps {
    match: match<{
        invoiceId?: string;
        shipmentId?: string;
        refundId?: string;
    }>;
    orderPrintRequest: PrintTypes;
}

export interface OrderPrintPageContainerProps extends OrderPrintPageContainerMapStateProps,
    OrderPrintPageContainerMapDispatchProps,
    OrderPrintPageContainerBaseProps {}

export interface OrderPrintPageComponentProps {
    match: match<{
        invoiceId?: string;
        shipmentId?: string;
        refundId?: string;
    }>;
    orderPrintRequest: PrintTypes;
    orderPrintMap: OrderPrintMapItems;
}

export type OrderPrintPageContainerPropsKeys = 'match'
| 'orderPrintRequest'
| 'orderPrintMap';

export interface OrderPrintMapItem {
    activeTab: OrderTabs;
    request?: (id: number) => Promise<OrderItem | null>;
}

export type OrderPrintMapItems = Record<PrintTypes, OrderPrintMapItem>;
