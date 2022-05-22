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

import { Location } from 'history';

import { OrderItem } from 'Query/Order.type';
import { OrderList } from 'Store/Order/Order.type';
import { Device } from 'Type/Device.type';

export interface MyAccountMyOrdersContainerMapStateProps {
    orderList: Partial<OrderList>;
    isLoading: boolean;
    device: Device;
}

export interface MyAccountMyOrdersContainerMapDispatchProps {
    getOrderList: (page: number) => void;
}

export interface MyAccountMyOrdersContainerBaseProps {
    location: Location;
}

export type MyAccountMyOrdersContainerProps = MyAccountMyOrdersContainerMapStateProps
& MyAccountMyOrdersContainerMapDispatchProps
& MyAccountMyOrdersContainerBaseProps;

export type MyAccountMyOrdersContainerState = {
    colSpanPriceCount: number;
    colSpanLabelCount: number;
};

export interface MyAccountMyOrdersComponentProps {
    orderList: Partial<OrderList>;
    isLoading: boolean;
    device: Device;
}

export type MyAccountMyOrdersContainerPropsKeys =
     | 'orderList'
     | 'isLoading'
     | 'device';

export type OrderRow = {
    base_order_info: {
        id: number;
    };
} | OrderItem;
