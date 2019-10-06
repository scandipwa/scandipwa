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
    EMPTY_ORDER_LIST,
    GET_ORDER,
    EMPTY_ORDER,
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
    const { base_order_info } = order;
    const { created_at, grand_total } = base_order_info;
    const priceString = `${grand_total}${formatCurrency()}`;
    const formattedDate = getFormattedDate(created_at);

    return [
        ...acc,
        {
            ...order,
            base_order_info: {
                ...order.base_order_info,
                grand_total: priceString,
                created_at: formattedDate
            }
        }
    ];
}, []);

const convertPrice = items => items.reduce((acc, item) => {
    const { original_price, row_total } = item;
    return [
        ...acc,
        {
            ...item,
            original_price: `${original_price}${formatCurrency()}`,
            row_total: `${row_total}${formatCurrency()}`
        }
    ];
}, []);

export const initialState = {
    orderList: [],
    order: {},
    isLoading: true
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
        const indexedProductsWithPrice = convertPrice(indexedProducts);

        return {
            ...state,
            order: {
                ...order,
                order_products: indexedProductsWithPrice
            }
        };

    case EMPTY_ORDER:
        return {
            ...state,
            order: {}
        };

    case EMPTY_ORDER_LIST:
        return {
            ...state,
            orderList: []
        };

    case SET_ORDER_LOADING_STATUS:
        return {
            ...state,
            isLoading: status
        };

    default:
        return state;
    }
};

export default OrderReducer;
