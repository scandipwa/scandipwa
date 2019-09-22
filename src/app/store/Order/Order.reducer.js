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
import {
    GET_ORDER_LIST,
    GET_ORDER,
    SET_ORDER_LOADING_STATUS
} from './Order.action';

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

        return {
            ...state,
            orderList: items
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
