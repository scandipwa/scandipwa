/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
    ORDER_INVOICES,
    ORDER_ITEMS,
    ORDER_REFUNDS,
    ORDER_SHIPMENTS
} from 'Component/MyAccountOrder/MyAccountOrder.config';
import {
    PRINT_ALL_INVOICES,
    PRINT_ALL_REFUNDS,
    PRINT_ALL_SHIPMENT,
    PRINT_INVOICE,
    PRINT_ORDER,
    PRINT_REFUND,
    PRINT_SHIPMENT
} from 'Component/MyAccountOrderPrint/MyAccountOrderPrint.config';
import { ACCOUNT_LOGIN_URL } from 'Route/MyAccount/MyAccount.config';
import { MatchType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import OrderPrintPage from './OrderPrintPage.component';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Route/OrderPrintPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    getOrderInvoice: (invoiceId) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.getOrderInvoice(dispatch, invoiceId)
    ),
    getOrderShipment: (shipmentId) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.getOrderShipment(dispatch, shipmentId)
    ),
    getOrderRefund: (refundId) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.getOrderRefund(dispatch, refundId)
    )
});

/** @namespace Route/OrderPrintPage/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Route/OrderPrintPage/Container */
export class OrderPrintPageContainer extends PureComponent {
    static propTypes = {
        match: MatchType.isRequired,
        orderPrintRequest: PropTypes.string.isRequired,
        getOrderInvoice: PropTypes.func.isRequired,
        getOrderShipment: PropTypes.func.isRequired,
        getOrderRefund: PropTypes.func.isRequired
    };

    orderPrintMap = {
        [PRINT_ORDER]: {
            activeTab: ORDER_ITEMS
        },
        [PRINT_ALL_INVOICES]: {
            activeTab: ORDER_INVOICES
        },
        [PRINT_ALL_SHIPMENT]: {
            activeTab: ORDER_SHIPMENTS
        },
        [PRINT_ALL_REFUNDS]: {
            activeTab: ORDER_REFUNDS
        },
        [PRINT_INVOICE]: {
            request: (invoiceId) => this.requestOrderByInvoice(invoiceId),
            activeTab: ORDER_INVOICES
        },
        [PRINT_SHIPMENT]: {
            request: (shipmentId) => this.requestOrderByShipment(shipmentId),
            activeTab: ORDER_SHIPMENTS
        },
        [PRINT_REFUND]: {
            request: (refundId) => this.requestOrderByRefund(refundId),
            activeTab: ORDER_REFUNDS
        }
    };

    __construct(props) {
        super.__construct(props);

        if (!isSignedIn()) {
            history.push({ pathname: appendWithStoreCode(ACCOUNT_LOGIN_URL) });
        }
    }

    async requestOrderByInvoice(invoiceId) {
        const { getOrderInvoice } = this.props;

        return getOrderInvoice(invoiceId);
    }

    async requestOrderByShipment(shipmentId) {
        const { getOrderShipment } = this.props;

        return getOrderShipment(shipmentId);
    }

    async requestOrderByRefund(refundId) {
        const { getOrderRefund } = this.props;

        return getOrderRefund(refundId);
    }

    containerProps() {
        const {
            match,
            orderPrintRequest
        } = this.props;

        return {
            match,
            orderPrintRequest,
            orderPrintMap: this.orderPrintMap
        };
    }

    render() {
        return (
                <OrderPrintPage
                  { ...this.containerProps() }
                />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderPrintPageContainer));
