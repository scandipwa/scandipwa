/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { OrderRenderItems } from 'Component/MyAccountOrder/MyAccountOrder.type';
import { CreditMemo, OrderItemProduct, OrderTotal } from 'Query/Order.type';

export interface MyAccountOrderItemsTableContainerMapStateProps {
    isMobile: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MyAccountOrderItemsTableContainerMapDispatchProps {}

export type MyAccountOrderItemsTableContainerProps = MyAccountOrderItemsTableContainerMapStateProps
& MyAccountOrderItemsTableContainerMapDispatchProps
& {
    activeTab: OrderTabs;
    items: OrderRenderItems | CreditMemo;
    total: OrderTotal;
    allOrderItems: OrderItemProduct[];
    isPrintPage: boolean;
    id: string;
};

export interface MyAccountOrderItemsTableComponentProps {
    activeTab: OrderTabs;
    isMobile: boolean;
    items: OrderRenderItems | CreditMemo;
    total: OrderTotal;
    allOrderItems: OrderItemProduct[];
    id: string;
    isPrintPage: boolean;
}

export type MyAccountOrderItemsTableComponentPropsKeys = 'isMobile'
| 'items'
| 'activeTab'
| 'total'
| 'allOrderItems'
| 'id'
| 'isPrintPage';
