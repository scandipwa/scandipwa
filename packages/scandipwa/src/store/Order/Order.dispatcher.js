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
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Store/Order/Dispatcher */
export class OrderDispatcher {
    requestOrders(dispatch) {
        const query = OrderQuery.getOrderListQuery();

        return fetchQuery(query).then(
            /** @namespace Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then */
            ({ customer: { orders: items } }) => {
                dispatch(getOrderList(items, false));
            },
            /** @namespace Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then/dispatch/catch */
            (error) => dispatch(showNotification('error', getErrorMessage(error)))
        );
    }

    async reorder(dispatch, incrementId) {
        const result = await this.handleReorderMutation(dispatch, incrementId);
        console.log(result);
        const cartDispatcher = (await CartDispatcher).default;
        cartDispatcher.updateInitialCartData(dispatch);
    }

    handleReorderMutation(dispatch, incrementId) {
        try {
            return fetchMutation(OrderQuery.getReorder(incrementId));
        } catch (error) {
            return dispatch(showNotification('error', getErrorMessage(error)));
        }
    }

    async subscribeToOrderStatus(dispatch, incrementId) {
        console.log(dispatch, incrementId);
    }

    async getOrderById(dispatch, orderId) {
        try {
            const {
                customer: {
                    orders: {
                        items
                    }
                }
            } = await fetchQuery(OrderQuery.getOrderListQuery({ orderId }));

            return items[0];
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));

            return null;
        }
    }
}

export default new OrderDispatcher();
