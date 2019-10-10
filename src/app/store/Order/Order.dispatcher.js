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

/* eslint-disable no-console */
import {
    getOrderList,
    getOrder,
    setOrderLoadingStatus
} from 'Store/Order';
import { executePost, fetchQuery } from 'Util/Request';
import { showNotification } from 'Store/Notification';
import { prepareQuery } from 'Util/Query';
import { OrderQuery } from 'Query';
import BrowserDatabase from 'Util/BrowserDatabase';

export const ORDERS = 'orders';

const ONE_DAY_IN_SECONDS = 86400;

export class OrderDispatcher {
    requestOrders(dispatch) {
        const query = OrderQuery.getOrderListQuery();

        const orders = BrowserDatabase.getItem(ORDERS) || {};
        if (orders.getOrderList) {
            dispatch(getOrderList(orders.getOrderList));
            dispatch(setOrderLoadingStatus(false));
        }

        return executePost(prepareQuery([query])).then(
            ({ getOrderList: orders }) => {
                dispatch(getOrderList(orders));
                dispatch(setOrderLoadingStatus(false));
                BrowserDatabase.setItem(orders, ORDERS, ONE_DAY_IN_SECONDS);
            },
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    getOrderById(dispatch, orderId) {
        dispatch(getOrder({}));

        return fetchQuery(OrderQuery.getOrderByIdQuery(orderId)).then(
            ({ getOrderById: order }) => {
                dispatch(getOrder(order));
            },
            (error) => {
                dispatch(showNotification('error', __('Error getting Order by ID!')));
                console.log(error);
            }
        );
    }
}

export default new OrderDispatcher();
