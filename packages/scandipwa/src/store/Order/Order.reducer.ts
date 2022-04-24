/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { Reducer } from 'redux';

import { formatOrders } from 'Util/Orders';

import {
    OrderAction,
    OrderActionType,
    OrderStore
} from './Order.type';

/** @namespace Store/Order/Reducer/getInitialState */
export const getInitialState = (): OrderStore => ({
    orderList: {},
    isLoading: true
});

/** @namespace Store/Order/Reducer/OrderReducer */
export const OrderReducer: Reducer<OrderStore, OrderAction> = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case OrderActionType.GET_ORDER_LIST: {
        const {
            orderList,
            status
        } = action;
        const { items = [], page_info } = orderList;
        const formattedOrders = formatOrders(items);

        return {
            ...state,
            isLoading: status,
            orderList: { items: formattedOrders, pageInfo: page_info }
        };
    }

    case OrderActionType.SET_ORDER_LOADING_STATUS: {
        const {
            status
        } = action;

        return {
            ...state,
            isLoading: status
        };
    }

    default:
        return state;
    }
};

export default OrderReducer;
