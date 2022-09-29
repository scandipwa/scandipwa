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

import { CustomerOrders } from 'Query/Order.type';

import {
    GetOrderListAction,
    OrderActionType,
    SetLoadingStatusAction,
} from './Order.type';

/** @namespace Store/Order/Action/getOrderList */
export const getOrderList = (orderList: CustomerOrders, status: boolean): GetOrderListAction => ({
    type: OrderActionType.GET_ORDER_LIST,
    orderList,
    status,
});

/** @namespace Store/Order/Action/setLoadingStatus */
export const setLoadingStatus = (status: boolean): SetLoadingStatusAction => ({
    type: OrderActionType.SET_ORDER_LOADING_STATUS,
    status,
});
