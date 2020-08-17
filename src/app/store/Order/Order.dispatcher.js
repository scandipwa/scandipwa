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
import { fetchQuery } from 'Util/Request';

export class OrderDispatcher {
    requestOrders(dispatch) {
        const query = OrderQuery.getOrderListQuery();

        return fetchQuery(query).then(
            ({ getOrderList: orders }) => {
                dispatch(getOrderList(orders, false));
            },
            (error) => dispatch(showNotification('error', error[0].message))
        );
    }
}

export default new OrderDispatcher();
