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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    OrderTabs,
} from 'Component/MyAccountOrder/MyAccountOrder.config';
import {
    PrintTypes,
} from 'Component/MyAccountOrderPrint/MyAccountOrderPrint.config';
import { OrderItem } from 'Query/Order.type';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import OrderDispatcher from 'Store/Order/Order.dispatcher';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import OrderPrintPage from './OrderPrintPage.component';
import {
    OrderPrintMapItems,
    OrderPrintPageComponentProps,
    OrderPrintPageContainerMapDispatchProps,
    OrderPrintPageContainerMapStateProps,
    OrderPrintPageContainerProps,
    OrderPrintPageContainerPropsKeys,
} from './OrderPrintPage.type';

/** @namespace Route/OrderPrintPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): OrderPrintPageContainerMapDispatchProps => ({
    getOrderInvoice: (invoiceId) => OrderDispatcher.getOrderInvoice(dispatch, invoiceId),
    getOrderShipment: (shipmentId) => OrderDispatcher.getOrderShipment(dispatch, shipmentId),
    getOrderRefund: (refundId) => OrderDispatcher.getOrderRefund(dispatch, refundId),
});

/** @namespace Route/OrderPrintPage/Container/mapStateToProps */
export const mapStateToProps = (): OrderPrintPageContainerMapStateProps => ({});

/** @namespace Route/OrderPrintPage/Container */
export class OrderPrintPageContainer extends PureComponent<OrderPrintPageContainerProps> {
    orderPrintMap: OrderPrintMapItems = {
        [PrintTypes.PRINT_ORDER]: {
            activeTab: OrderTabs.ORDER_ITEMS,
        },
        [PrintTypes.PRINT_ALL_INVOICES]: {
            activeTab: OrderTabs.ORDER_INVOICES,
        },
        [PrintTypes.PRINT_ALL_SHIPMENT]: {
            activeTab: OrderTabs.ORDER_SHIPMENTS,
        },
        [PrintTypes.PRINT_ALL_REFUNDS]: {
            activeTab: OrderTabs.ORDER_REFUNDS,
        },
        [PrintTypes.PRINT_INVOICE]: {
            request: (invoiceId) => this.requestOrderByInvoice(invoiceId),
            activeTab: OrderTabs.ORDER_INVOICES,
        },
        [PrintTypes.PRINT_SHIPMENT]: {
            request: (shipmentId) => this.requestOrderByShipment(shipmentId),
            activeTab: OrderTabs.ORDER_SHIPMENTS,
        },
        [PrintTypes.PRINT_REFUND]: {
            request: (refundId) => this.requestOrderByRefund(refundId),
            activeTab: OrderTabs.ORDER_REFUNDS,
        },
    };

    __construct(props: OrderPrintPageContainerProps): void {
        super.__construct?.(props);

        if (!isSignedIn()) {
            history.push({ pathname: appendWithStoreCode(AccountPageUrl.LOGIN_URL) });
        }
    }

    async requestOrderByInvoice(invoiceId: number): Promise<OrderItem | null> {
        const { getOrderInvoice } = this.props;

        return getOrderInvoice(invoiceId);
    }

    async requestOrderByShipment(shipmentId: number): Promise<OrderItem | null> {
        const { getOrderShipment } = this.props;

        return getOrderShipment(shipmentId);
    }

    async requestOrderByRefund(refundId: number): Promise<OrderItem | null> {
        const { getOrderRefund } = this.props;

        return getOrderRefund(refundId);
    }

    containerProps(): Pick<OrderPrintPageComponentProps, OrderPrintPageContainerPropsKeys> {
        const {
            match,
            orderPrintRequest,
        } = this.props;

        return {
            match,
            orderPrintRequest,
            orderPrintMap: this.orderPrintMap,
        };
    }

    render(): ReactElement {
        return (
            <OrderPrintPage
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPrintPageContainer);
