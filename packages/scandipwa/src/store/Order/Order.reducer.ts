/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Reducer } from 'redux';

import { OrderStore } from './Order.type';

/** @namespace Store/Order/Reducer/getInitialState */
export const getInitialState = (): OrderStore => ({
    orderList: {},
    isLoading: true,
});

/** @namespace Store/Order/Reducer/OrderReducer */
export const OrderReducer: Reducer<OrderStore> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState } = action;

    return {
        ...state,
        ...newState,
    };
};

export default OrderReducer;
