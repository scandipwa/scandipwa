/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Dispatch } from 'redux';

import OrderQuery from 'Query/Order.query';
import { OrderItem, ReorderOutput } from 'Query/Order.type';
import { CART_URL } from 'Route/CartPage/CartPage.config';
import CartDispatcher from 'Store/Cart/Cart.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { getOrderList, setLoadingStatus } from 'Store/Order/Order.action';
import { NetworkError } from 'Type/Common.type';
import { getAuthorizationToken } from 'Util/Auth/Token';
import { decodeBase64 } from 'Util/Base64';
import history from 'Util/History';
import { getErrorMessage } from 'Util/Request/Error';
import { fetchMutation } from 'Util/Request/Mutation';
import { fetchQuery } from 'Util/Request/Query';
import { appendWithStoreCode } from 'Util/Url';

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
            },
        );
    }

    async reorder(dispatch: Dispatch, incrementId: string): Promise<void> {
        const {
            reorderItems: {
                userInputErrors = [],
            } = {},
        } = await this.handleReorderMutation(dispatch, incrementId) || {};

        CartDispatcher.updateInitialCartData(dispatch, !!getAuthorizationToken());

        history.push(appendWithStoreCode(CART_URL));

        if (userInputErrors.length) {
            userInputErrors.map((
                { message }: NetworkError,
            ) => dispatch(showNotification(NotificationType.ERROR, message)));
        }
    }

    handleReorderMutation(
        dispatch: Dispatch,
        incrementId: string,
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
                        items,
                    },
                },
            } = await fetchQuery(OrderQuery.getOrderListQuery({ orderId }));

            return items[0];
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError | NetworkError[])));

            return null;
        }
    }

    async getOrderInvoice(dispatch: Dispatch, invoiceId: number): Promise<OrderItem | null> {
        try {
            const {
                orderByInvoice,
            } = await fetchQuery(OrderQuery.getOrderByInvoice(invoiceId));

            const invoice = orderByInvoice.invoices.find(({ id }) => Number(decodeBase64(id)) === invoiceId);

            if (!invoice) {
                return null;
            }

            orderByInvoice.invoices = [invoice];

            return orderByInvoice;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return null;
        }
    }

    async getOrderShipment(dispatch: Dispatch, shipmentId: number): Promise<OrderItem | null> {
        try {
            const {
                orderByShipment,
            } = await fetchQuery(OrderQuery.getOrderByShipment(shipmentId));

            const shipment = orderByShipment.shipments.find(({ id }) => Number(decodeBase64(id)) === shipmentId);

            if (!shipment) {
                return null;
            }

            orderByShipment.shipments = [shipment];

            return orderByShipment;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return null;
        }
    }

    async getOrderRefund(dispatch: Dispatch, refundId: number): Promise<OrderItem | null> {
        try {
            const {
                orderByRefund,
            } = await fetchQuery(OrderQuery.getOrderByRefund(refundId));

            const refund = orderByRefund.credit_memos.find(({ id }) => Number(decodeBase64(id)) === refundId);

            if (!refund) {
                return null;
            }

            orderByRefund.credit_memos = [refund];

            return orderByRefund;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return null;
        }
    }
}

export default new OrderDispatcher();
