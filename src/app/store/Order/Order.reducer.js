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

import { getIndexedProducts } from 'Util/Product';
import { formatCurrency } from 'Util/Price';
import {
    GET_ORDER_LIST,
    GET_ORDER,
    SET_ORDER_LOADING_STATUS
} from './Order.action';

const getFormattedDate = (rawDate = '') => {
    const date = new Date(rawDate.replace(/\s/, 'T'));
    const RADIX = 10;

    const addLeadingZero = value => (value < RADIX ? `0${value}` : value);

    const day = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth() + 1);

    return `${day}.${month}.${date.getFullYear()}`;
};

const formatOrders = orders => orders.reduce((acc, order) => {
    const { created_at, grand_total } = order;
    const priceString = `${grand_total}${formatCurrency()}`;
    const formattedDate = getFormattedDate(created_at);

    return [
        ...acc,
        {
            ...order,
            grand_total: priceString,
            created_at: formattedDate
        }
    ];
}, []);

export const initialState = {
    orderList: [],
    order: {},
    isOrderLoading: false
};

const OrderReducer = (state = initialState, action) => {
    const {
        type,
        orderList,
        order,
        status
    } = action;

    switch (type) {
    case GET_ORDER_LIST:
        const { items = [] } = orderList;
        const formattedOrders = formatOrders(items);

        return {
            ...state,
            orderList: formattedOrders
        };

    case GET_ORDER:
        const { order_products = [] } = order;
        const indexedProducts = getIndexedProducts(order_products);

        return {
            ...state,
            order: {
                ...order,
                order_products: indexedProducts
            }
        };

    case SET_ORDER_LOADING_STATUS:
        return {
            ...state,
            isOrderLoading: status
        };

    default:
        return state;
    }
};

export default OrderReducer;
