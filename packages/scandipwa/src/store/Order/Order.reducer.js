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

import BrowserDatabase from 'Util/BrowserDatabase';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';

import { GET_ORDER_LIST } from './Order.action';

export const ORDERS = 'orders';

/** @namespace Store/Order/Reducer/getFormattedDate */
export const getFormattedDate = (rawDate = '') => {
    const date = new Date(rawDate.replace(/\s/, 'T'));
    const RADIX = 10;

    const addLeadingZero = (value) => (value < RADIX ? `0${value}` : value);

    const day = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth() + 1);

    return `${date.getFullYear()}-${month}-${day}`;
};

/** @namespace Store/Order/Reducer/formatOrders */
export const formatOrders = (orders) => orders.reduce((acc, order) => {
    const { base_order_info } = order;
    const { created_at } = base_order_info;
    const formattedDate = getFormattedDate(created_at);

    return [
        ...acc,
        {
            ...order,
            base_order_info: {
                ...order.base_order_info,
                created_at: formattedDate
            }
        }
    ];
}, []);

export const orderList = BrowserDatabase.getItem(ORDERS) || [];

/** @namespace Store/Order/Reducer/getInitialState */
export const getInitialState = () => ({
    orderList,
    isLoading: !orderList.length
});

/** @namespace Store/Order/Reducer */
export const OrderReducer = (
    state = getInitialState(),
    action
) => {
    const {
        type,
        orderList,
        status
    } = action;

    switch (type) {
    case GET_ORDER_LIST:
        const { items = [] } = orderList;
        const formattedOrders = formatOrders(items);

        BrowserDatabase.setItem(formattedOrders, ORDERS, ONE_MONTH_IN_SECONDS);

        return {
            ...state,
            isLoading: status,
            orderList: formattedOrders
        };

    default:
        return state;
    }
};

export default OrderReducer;
