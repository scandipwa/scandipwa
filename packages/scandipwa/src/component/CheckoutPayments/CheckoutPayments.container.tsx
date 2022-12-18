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

import { PaymentMethod } from 'Query/Checkout.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import CheckoutPayments from './CheckoutPayments.component';
import {
    CheckoutPaymentsComponentProps,
    CheckoutPaymentsContainerFunctions,
    CheckoutPaymentsContainerMapDispatchProps,
    CheckoutPaymentsContainerMapStateProps,
    CheckoutPaymentsContainerProps,
    CheckoutPaymentsContainerPropsKeys,
    CheckoutPaymentsContainerState,
} from './CheckoutPayments.type';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

/** @namespace Component/CheckoutPayments/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CheckoutPaymentsContainerMapDispatchProps => ({
    showError: (message) => NotificationDispatcher.then(
        ({ default: dispatcher }) => dispatcher.showNotification(NotificationType.ERROR, message),
    ),
});

/** @namespace Component/CheckoutPayments/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutPaymentsContainerMapStateProps => ({
    totals: state.CartReducer.cartTotals,
    email: state.CheckoutReducer.email,
    paymentMethods: state.CheckoutReducer.paymentMethods,
});

/** @namespace Component/CheckoutPayments/Container */
export class CheckoutPaymentsContainer extends PureComponent<
CheckoutPaymentsContainerProps,
CheckoutPaymentsContainerState
> {
    containerFunctions: CheckoutPaymentsContainerFunctions = {
        selectPaymentMethod: this.selectPaymentMethod.bind(this),
    };

    state = {
        selectedPaymentCode: '',
    };

    dataMap = {};

    containerProps(): Pick<CheckoutPaymentsComponentProps, CheckoutPaymentsContainerPropsKeys> {
        const {
            paymentMethods,
            setOrderButtonEnableStatus,
            showError,
        } = this.props;

        const { selectedPaymentCode } = this.state;

        return {
            paymentMethods,
            selectedPaymentCode,
            setOrderButtonEnableStatus,
            showError,
        };
    }

    selectPaymentMethod({ code }: PaymentMethod): void {
        const {
            onPaymentMethodSelect,
            setOrderButtonEnableStatus,
        } = this.props;

        this.setState({
            selectedPaymentCode: code,
        });

        onPaymentMethodSelect(code);
        setOrderButtonEnableStatus(true);
    }

    render(): ReactElement {
        return (
            <CheckoutPayments
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPaymentsContainer);
