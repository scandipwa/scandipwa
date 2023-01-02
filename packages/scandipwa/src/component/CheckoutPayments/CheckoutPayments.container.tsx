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

import { PaymentMethod } from 'Query/Checkout.type';
import { showNotification } from 'Store/Notification/Notification.action';
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

/** @namespace Component/CheckoutPayments/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): CheckoutPaymentsContainerMapDispatchProps => ({
    showError: (message) => dispatch(showNotification(NotificationType.ERROR, message)),
});

/** @namespace Component/CheckoutPayments/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CheckoutPaymentsContainerMapStateProps => ({
    totals: state.CartReducer.cartTotals,
    email: state.CheckoutReducer.email,
});

/** @namespace Component/CheckoutPayments/Container */
export class CheckoutPaymentsContainer<
P extends Readonly<CheckoutPaymentsContainerProps> = Readonly<CheckoutPaymentsContainerProps>,
S extends CheckoutPaymentsContainerState = CheckoutPaymentsContainerState,
> extends PureComponent<P, S> {
    containerFunctions: CheckoutPaymentsContainerFunctions = {
        selectPaymentMethod: this.selectPaymentMethod.bind(this),
    };

    state = {
        selectedPaymentCode: '',
    } as S;

    dataMap = {
    };

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
