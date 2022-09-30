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
import {
    InvoiceItem,
    OrderItemProduct,
    OrderProductSelectedOption,
    RefundItem,
    SalesCommentItem,
    ShipmentItemInterface,
} from 'Query/Order.type';

export interface MyAccountOrderItemsTableRowContainerMapStateProps {
    isMobile: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MyAccountOrderItemsTableRowContainerMapDispatchProps {}

export type MyAccountOrderItemsTableRowContainerProps = MyAccountOrderItemsTableRowContainerMapStateProps
& MyAccountOrderItemsTableRowContainerMapDispatchProps
& {
    product: OrderItemProduct | ShipmentItemInterface | InvoiceItem | RefundItem;
    activeTab: OrderTabs;
    selectedOptions: OrderProductSelectedOption[];
    enteredOptions: OrderProductSelectedOption[];
    comments: SalesCommentItem[];
};

export interface MyAccountOrderItemsTableRowComponentProps {
    product: OrderItemProduct | ShipmentItemInterface | InvoiceItem | RefundItem;
    activeTab: OrderTabs;
    selectedOptions: OrderProductSelectedOption[];
    enteredOptions: OrderProductSelectedOption[];
    comments: SalesCommentItem[];
    isMobile: boolean;
    colSpanCount: number;
}

export type MyAccountOrderItemsTableRowContainerPropsKeys =
    | 'product'
    | 'activeTab'
    | 'selectedOptions'
    | 'enteredOptions'
    | 'comments'
    | 'isMobile'
    | 'colSpanCount';
