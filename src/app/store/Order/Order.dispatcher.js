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

/* eslint-disable max-len */
/* eslint-disable no-console */
import { fetchQuery } from 'Util/Request';
import {
    getOrderList,
    getOrder,
    setOrderLoadingStatus
} from 'Store/Order';
import { showNotification } from 'Store/Notification';
import { OrderQuery } from 'Query';

export class OrderDispatcher {
    getOrderList(dispatch) {
        dispatch(getOrder({}));
        dispatch(getOrderList({}));

        return fetchQuery(OrderQuery.getOrderListQuery()).then(
            ({ getOrderList: list }) => {
                dispatch(getOrderList(list));
            },
            error => dispatch(showNotification('error', __('Error getting Order List!'))) && console.log(error)
        );
    }

    getOrderById(dispatch, orderId) {
        dispatch(getOrder({}));
        dispatch(setOrderLoadingStatus(true));

        return fetchQuery(OrderQuery.getOrderByIdQuery(orderId)).then(
            ({ getOrderById: order }) => {
                dispatch(setOrderLoadingStatus(false));
                dispatch(getOrder(order));
            },
            (error) => {
                dispatch(setOrderLoadingStatus(false));
                dispatch(showNotification('error', __('Error getting Order by ID!')));
                console.log(error);
            }
        );
    }
}

export default new OrderDispatcher();
