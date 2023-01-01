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
    OrderTotal,
} from 'Query/Order.type';

export interface MyAccountOrderTotalsContainerMapStateProps {
    isMobile: boolean;
}


export interface MyAccountOrderTotalsContainerMapDispatchProps {}

export interface MyAccountOrderTotalsContainerBaseProps {
    total: OrderTotal;
    activeTab: OrderTabs;
}

export type MyAccountOrderTotalsContainerProps = MyAccountOrderTotalsContainerMapStateProps
& MyAccountOrderTotalsContainerMapDispatchProps
& MyAccountOrderTotalsContainerBaseProps;

export interface MyAccountOrderTotalsContainerState {
    colSpanPriceCount: number;
    colSpanLabelCount: number;
}

export interface MyAccountOrderTotalsComponentProps {
    total: OrderTotal;
    activeTab: OrderTabs;
    colSpanPriceCount: number;
    colSpanLabelCount: number;
}

export type MyAccountOrderTotalsContainerPropsKeys =
    | 'total'
    | 'activeTab'
    | 'colSpanPriceCount'
    | 'colSpanLabelCount';
