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

import OrderQuery from 'Query/Order.query';
import { OrderItem, ReorderOutput } from 'Query/Order.type';
import { CART_URL } from 'Route/CartPage/CartPage.config';
import { NotificationType } from 'Store/Notification/Notification.type';
import { updateOrderStore } from 'Store/Order/Order.action';
import { NetworkError } from 'Type/Common.type';
import { getAuthorizationToken } from 'Util/Auth';
import { decodeBase64 } from 'Util/Base64';
import history from 'Util/History';
import { formatOrders } from 'Util/Orders';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';
import { appendWithStoreCode } from 'Util/Url';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Store/Order/Dispatcher */
export class OrderDispatcher extends SimpleDispatcher {
    requestOrders(page = 1): Promise<void> {
        const query = OrderQuery.getOrderListQuery({ page });

        this.dispatch(updateOrderStore({ isLoading: true }));

        return fetchQuery(query).then(
            /** @namespace Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then */
            ({ customer: { orders: { page_info, items = [] } } }) => {
                const formattedOrders = formatOrders(items);

                this.dispatch(updateOrderStore({ orderList: { items: formattedOrders, pageInfo: page_info }, isLoading: false }));
            },
            /** @namespace Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then/catch */
            (error) => {
                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.ERROR,
                        getErrorMessage(error),
                    ),
                );
                this.dispatch(updateOrderStore({ isLoading: false }));
            },
        );
    }

    async reorder(incrementId: string): Promise<void> {
        const {
            reorderItems: {
                userInputErrors = [],
            } = {},
        } = (await this.handleReorderMutation(incrementId)) || {};

        const cartDispatcher = (await CartDispatcher).default;

        cartDispatcher.updateInitialCartData(!!getAuthorizationToken());

        history.push(appendWithStoreCode(CART_URL));

        if (userInputErrors.length) {
            userInputErrors.map((
                { message }: NetworkError,
            ) => NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    message,
                ),
            ));
        }
    }

    handleReorderMutation(
        incrementId: string,
    ): Promise<Record<'reorderItems', ReorderOutput>> | null {
        try {
            return fetchMutation(OrderQuery.getReorder(incrementId));
        } catch (error) {
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error as NetworkError | NetworkError[]),
                ),
            );

            return null;
        }
    }

    async getOrderById(orderId: number): Promise<OrderItem | null> {
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
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error as NetworkError | NetworkError[]),
                ),
            );

            return null;
        }
    }

    async getOrderInvoice(invoiceId: number): Promise<OrderItem | null> {
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
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error as NetworkError),
                ),
            );

            return null;
        }
    }

    async getOrderShipment(shipmentId: number): Promise<OrderItem | null> {
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
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error as NetworkError),
                ),
            );

            return null;
        }
    }

    async getOrderRefund(refundId: number): Promise<OrderItem | null> {
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
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    getErrorMessage(error as NetworkError),
                ),
            );

            return null;
        }
    }
}

export default new OrderDispatcher();
