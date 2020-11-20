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

/** @namespace Store/Order/Action/getOrderList */
export const getOrderList = (orderList, status) => ({
    type: GET_ORDER_LIST,
    orderList,
    status
});
