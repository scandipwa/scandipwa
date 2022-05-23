/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { match } from 'react-router';

import {
    Invoice, OrderItem, OrderItemProduct, OrderShipment
} from 'Query/Order.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';

import { OrderTabs } from './MyAccountOrder.config';

export interface MyAccountOrderContainerMapStateProps {
    display_tax_in_shipping_amount: string;
    is_allowed_reorder: boolean;
    rss_order_subscribe_allow: boolean;
    isMobile: boolean;
}

export interface MyAccountOrderContainerMapDispatchProps {
    showNotification: (type: NotificationType, message: string) => void;
    getOrderById: (orderId: number) => Promise<OrderItem | null>;
    reorder: (incrementId: string) => void;
    changeHeaderState: (state: NavigationState) => void;
    goToPreviousNavigationState: () => void;
}

export type MyAccountOrderContainerProps = MyAccountOrderContainerMapStateProps
& MyAccountOrderContainerMapDispatchProps
& {
    match: match<{
        orderId?: string;
    }>;
    changeTabName: (newTabName: string) => void;
    setTabSubheading: (subHeading: string) => void;
};

export type MyAccountOrderContainerState = {
    order: Partial<OrderItem>;
    isLoading: boolean;
    activeTab: OrderTabs;
};

export interface MyAccountOrderComponentProps {
    order: OrderItem | Record<string, never>;
    isLoading: boolean;
    handleReorder: () => void;
    is_allowed_reorder: boolean;
    rss_order_subscribe_allow: boolean;
    handleChangeActiveTab: (tab: OrderTabs) => void;
    activeTab: OrderTabs;
    isMobile: boolean;
    display_tax_in_shipping_amount: string;
    setTabSubheading: (subHeading: string) => void;
}

export type OrderRenderItems = {
    items: OrderItemProduct[]; number: string;
} | OrderShipment | Invoice;

export type OrderTab = {
    tabName: OrderTabs;
    title: string;
    shouldTabRender: () => boolean;
    render: () => ReactElement;
};
