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

import OrderQuery from 'Query/Order.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { getOrderList } from 'Store/Order/Order.action';
import { fetchQuery, getErrorMessage } from 'Util/Request';

/** @namespace Store/Order/Dispatcher */
export class OrderDispatcher {
    requestOrders(dispatch) {
        const query = OrderQuery.getOrderListQuery();

        return fetchQuery(query).then(
            /** @namespace Store/Order/Dispatcher/requestOrdersFetchQueryThen */
            ({ getOrderList: orders }) => {
                dispatch(getOrderList(orders, false));
            },
            /** @namespace Store/Order/Dispatcher/requestOrdersFetchQueryError */
            (error) => dispatch(showNotification('error', getErrorMessage(error)))
        );
    }

    async getOrderById(dispatch, id) {
        try {
            const { getOrderById: result } = await fetchQuery(OrderQuery.getOrderByIdQuery(id));

            return result;
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));

            return null;
        }
    }
}

export default new OrderDispatcher();
