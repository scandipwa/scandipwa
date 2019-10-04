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
    setOrderLoadingStatus
} from 'Store/Order';
import { showNotification } from 'Store/Notification';
import { OrderQuery } from 'Query';

export class OrderDispatcher extends QueryDispatcher {
    onSuccess({ getOrderList: list }, dispatch) {
        dispatch(setOrderLoadingStatus(false));
        dispatch(getOrderList(list));
    }

    onError(_, dispatch) {
        dispatch(showNotification('error', __('Error getting Order List!')));
    }

    prepareRequest(dispatch) {
        dispatch(setOrderLoadingStatus(true));
        return OrderQuery.getOrderListQuery();
    }
}

export default new OrderDispatcher();
