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

import { formatOrders } from 'Util/Orders';

import { GET_ORDER_LIST, SET_ORDER_LOADING_STATUS } from './Order.action';

/** @namespace Store/Order/Reducer/getInitialState */
export const getInitialState = () => ({
    orderList: {},
    isLoading: true
});

/** @namespace Store/Order/Reducer/OrderReducer */
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
        const { items = [], page_info } = orderList;
        const formattedOrders = formatOrders(items);

        return {
            ...state,
            isLoading: status,
            orderList: { items: formattedOrders, pageInfo: page_info }
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
