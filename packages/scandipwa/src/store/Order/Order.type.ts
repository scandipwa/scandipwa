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

import { GQLCustomerOrders, GQLSearchResultPageInfo } from 'Type/Graphql.type';
import { Order } from 'Type/Order.type';

export enum OrderActionType {
    GET_ORDER_LIST = 'GET_ORDER_LIST',
    SET_ORDER_LOADING_STATUS = 'SET_ORDER_LOADING_STATUS'
}

export type OrderList = {
    items: Order[];
    pageInfo: GQLSearchResultPageInfo;
};

export interface GetOrderListAction extends AnyAction {
    type: OrderActionType.GET_ORDER_LIST;
    orderList: GQLCustomerOrders;
    status: boolean;
}

export interface SetLoadingStatusAction extends AnyAction {
    type: OrderActionType.SET_ORDER_LOADING_STATUS;
    status: boolean;
}

export type OrderAction = GetOrderListAction | SetLoadingStatusAction;

export type OrderStore = {
    orderList: OrderList;
    isLoading: boolean;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        OrderReducer: OrderStore;
    }
}
