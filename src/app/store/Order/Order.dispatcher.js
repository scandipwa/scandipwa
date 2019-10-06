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
import { QueryDispatcher } from 'Util/Request';
import {
    getOrderList,
    getOrder,
    emptyOrder,
    emptyOrderList,
    setOrderLoadingStatus
} from 'Store/Order';
import { showNotification } from 'Store/Notification';
import { OrderQuery } from 'Query';

export class OrderDispatcher extends QueryDispatcher {
    constructor() {
        super('Order');
    }

    onSuccess(options, dispatch) {
        const { getOrderById: order, getOrderList: list } = options;

        if (order) {
            dispatch(getOrder(order));
        } else {
            dispatch(setOrderLoadingStatus(false));
            dispatch(getOrderList(list));
        }
    }

    onError(_, dispatch) {
        dispatch(showNotification('error', __('Error getting Order List!')));
    }

    prepareRequest(options, dispatch) {
        const { orderId } = options;

        if (orderId) {
            dispatch(emptyOrder());
            return OrderQuery.getOrderByIdQuery(orderId);
        }

        return OrderQuery.getOrderListQuery();
    }

    emptyOrderList(dispatch) {
        dispatch(emptyOrderList());
    }
}

export default new OrderDispatcher();
