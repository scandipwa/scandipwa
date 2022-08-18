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

import { Dispatch } from 'redux';

import OrderQuery from 'Query/Order.query';
import { OrderItem, ReorderOutput } from 'Query/Order.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { getOrderList, setLoadingStatus } from 'Store/Order/Order.action';
import { NetworkError } from 'Type/Common.type';
import { getAuthorizationToken } from 'Util/Auth';
import history from 'Util/History';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Store/Order/Dispatcher */
export class OrderDispatcher {
    requestOrders(dispatch: Dispatch, page = 1): Promise<void> {
        const query = OrderQuery.getOrderListQuery({ page });
        dispatch(setLoadingStatus(true));

        return fetchQuery(query).then(
            /** @namespace Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then */
            ({ customer: { orders } }) => {
                dispatch(getOrderList(orders, false));
            },
            /** @namespace Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then/catch */
            (error) => {
                dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
                dispatch(setLoadingStatus(false));
            }
        );
    }

    async reorder(dispatch: Dispatch, incrementId: string): Promise<void> {
        const {
            reorderItems: {
                userInputErrors = []
            } = {}
        } = await this.handleReorderMutation(dispatch, incrementId) || {};

        const cartDispatcher = (await CartDispatcher).default;
        cartDispatcher.updateInitialCartData(dispatch, !!getAuthorizationToken());

        history.push(appendWithStoreCode('/cart'));

        if (userInputErrors.length) {
            userInputErrors.map((
                { message }: NetworkError
            ) => dispatch(showNotification(NotificationType.ERROR, message)));
        }
    }

    handleReorderMutation(
        dispatch: Dispatch,
        incrementId: string
    ): Promise<Record<'reorderItems', ReorderOutput>> | null {
        try {
            return fetchMutation(OrderQuery.getReorder(incrementId));
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError | NetworkError[])));
            return null;
        }
    }

    async getOrderById(dispatch: Dispatch, orderId: number): Promise<OrderItem | null> {
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
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError | NetworkError[])));

            return null;
        }
    }
}

export default new OrderDispatcher();
