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

import { OrderRow } from 'Component/MyAccountMyOrders/MyAccountMyOrders.type';
import { Device } from 'Type/Device.type';

export interface MyAccountOrderTableRowContainerMapStateProps {
    device: Device;
}

export interface MyAccountOrderTableRowContainerMapDispatchProps {}

export interface MyAccountOrderTableRowContainerFunctions {
    onViewClick: () => void;
}

export interface MyAccountOrderTableRowContainerBaseProps {
    order: OrderRow;
}

export type MyAccountOrderTableRowContainerProps = MyAccountOrderTableRowContainerMapStateProps
& MyAccountOrderTableRowContainerMapDispatchProps
& MyAccountOrderTableRowContainerBaseProps;

export interface MyAccountOrderTableRowContainerState {
    colSpanPriceCount: number;
    colSpanLabelCount: number;
}

export interface MyAccountOrderTableRowComponentProps {
    order: OrderRow;
    onViewClick: () => void;
}

export type MyAccountOrderTableRowContainerPropsKeys =
     | 'order';

export interface MyAccountOrderTableRowComponentState {}
