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

    dataMap = {
        // [ PaymentMethods.KLARNA ]: this.getKlarnaData.bind(this)
    };

    // componentDidMount(): void {
    //     if (window.formPortalCollector) {
    //         window.formPortalCollector.subscribe(BILLING_STEP, this.collectAdditionalData, 'CheckoutPaymentsContainer');
    //     }
    // }

    // componentWillUnmount(): void {
    //     if (window.formPortalCollector) {
    //         window.formPortalCollector.unsubscribe(CheckoutSteps.BILLING_STEP, 'CheckoutPaymentsContainer');
    //     }
    // }

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

    // getKlarnaData() {
    //     return { asyncData: KlarnaContainer.authorize() };
    // }

    // collectAdditionalData() {
    //     const { selectedPaymentCode } = this.state;

    //     if (!selectedPaymentCode) {
    //         return {};
    //     }

    //     const additionalDataGetter = this.dataMap[ selectedPaymentCode ];

    //     if (!additionalDataGetter) {
    //         return {};
    //     }

    //     return additionalDataGetter();
    // }

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
