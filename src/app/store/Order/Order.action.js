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

export const GET_ORDER_LIST = 'GET_ORDER_LIST';
export const EMPTY_ORDER_LIST = 'EMPTY_ORDER_LIST';
export const SET_ORDER_LOADING_STATUS = 'GET_ORDER_LOADING_STATUS';

export const getOrderList = orderList => ({
    type: GET_ORDER_LIST,
    orderList
});

export const emptyOrderList = () => ({
    type: EMPTY_ORDER_LIST
});

export const setOrderLoadingStatus = status => ({
    type: SET_ORDER_LOADING_STATUS,
    status
});
