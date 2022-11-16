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

import { AnyAction } from 'redux';

import { OrderItem, SearchResultPageInfo } from 'Query/Order.type';

export enum OrderActionType {
    UPDATE_ORDER_STORE = 'UPDATE_ORDER_STORE',
}

export interface OrderList {
    items: OrderItem[];
    pageInfo: SearchResultPageInfo;
}

export interface UpdateOrderStoreAction extends AnyAction {
    type: OrderActionType.UPDATE_ORDER_STORE;
    state: Partial<OrderStore>;
}

export interface OrderStore {
    orderList: Partial<OrderList>;
    isLoading?: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        OrderReducer: OrderStore;
    }
}
