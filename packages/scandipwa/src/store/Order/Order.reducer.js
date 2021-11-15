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

import { GET_ORDER_LIST } from './Order.action';

/** @namespace Store/Order/Reducer/getInitialState */
export const getInitialState = () => ({
    orderList: [],
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
        const { items = [] } = orderList;
        const formattedOrders = formatOrders(items);

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
