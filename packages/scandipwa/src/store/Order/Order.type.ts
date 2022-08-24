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

import { AnyAction } from 'redux';

import { CustomerOrders, OrderItem, SearchResultPageInfo } from 'Query/Order.type';

export enum OrderActionType {
    GET_ORDER_LIST = 'GET_ORDER_LIST',
    SET_ORDER_LOADING_STATUS = 'SET_ORDER_LOADING_STATUS'
}

export interface OrderList {
    items: OrderItem[];
    pageInfo: SearchResultPageInfo;
}

export interface GetOrderListAction extends AnyAction {
    type: OrderActionType.GET_ORDER_LIST;
    orderList: CustomerOrders;
    status?: boolean;
}

export interface SetLoadingStatusAction extends AnyAction {
    type: OrderActionType.SET_ORDER_LOADING_STATUS;
    status?: boolean;
}

export type OrderAction = GetOrderListAction | SetLoadingStatusAction;

export interface OrderStore {
    orderList: Partial<OrderList>;
    isLoading?: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        OrderReducer: OrderStore;
    }
}
