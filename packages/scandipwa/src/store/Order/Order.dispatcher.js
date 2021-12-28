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
import { getOrderList, setLoadingStatus } from 'Store/Order/Order.action';
import history from 'Util/History';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Store/Order/Dispatcher */
export class OrderDispatcher {
    requestOrders(dispatch, page = 1) {
        const query = OrderQuery.getOrderListQuery({ page });
        dispatch(setLoadingStatus(true));

        return fetchQuery(query).then(
            /** @namespace Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then */
            ({ customer: { orders } }) => {
                dispatch(getOrderList(orders, false));
            },
            /** @namespace Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then/catch */
            (error) => {
                dispatch(showNotification('error', getErrorMessage(error)));
                dispatch(setLoadingStatus(false));
            }
        );
    }

    async reorder(dispatch, incrementId) {
        const {
            reorderItems: {
                userInputErrors = []
            } = {}
        } = await this.handleReorderMutation(dispatch, incrementId);

        const cartDispatcher = (await CartDispatcher).default;
        cartDispatcher.updateInitialCartData(dispatch);

        history.push(appendWithStoreCode('/cart'));

        if (userInputErrors.length) {
            userInputErrors.map(({ message }) => dispatch(showNotification('error', message)));
        }
    }

    handleReorderMutation(dispatch, incrementId) {
        try {
            return fetchMutation(OrderQuery.getReorder(incrementId));
        } catch (error) {
            return dispatch(showNotification('error', getErrorMessage(error)));
        }
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
