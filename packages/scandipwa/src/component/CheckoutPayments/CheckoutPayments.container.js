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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { KlarnaContainer } from 'Component/Klarna/Klarna.container';
import { BILLING_STEP } from 'Route/Checkout/Checkout.config';
import { showNotification } from 'Store/Notification/Notification.action';
import { Addresstype } from 'Type/Account.type';
import { PaymentMethodsType } from 'Type/Checkout.type';
import { TotalsType } from 'Type/MiniCart.type';

import CheckoutPayments from './CheckoutPayments.component';
import { KLARNA } from './CheckoutPayments.config';

/** @namespace Component/CheckoutPayments/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showError: (message) => dispatch(showNotification('error', message))
});

/** @namespace Component/CheckoutPayments/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    totals: state.CartReducer.cartTotals,
    email: state.CheckoutReducer.email
});

/** @namespace Component/CheckoutPayments/Container */
export class CheckoutPaymentsContainer extends PureComponent {
    static propTypes = {
        onPaymentMethodSelect: PropTypes.func.isRequired,
        setOrderButtonEnableStatus: PropTypes.func.isRequired,
        paymentMethods: PaymentMethodsType.isRequired,
        totals: TotalsType.isRequired,
        email: PropTypes.string.isRequired,
        billingAddress: Addresstype.isRequired,
        showError: PropTypes.func.isRequired
    };

    containerFunctions = {
        selectPaymentMethod: this.selectPaymentMethod.bind(this)
    };

    state = {
        selectedPaymentCode: null
    };

    dataMap = {
        [KLARNA]: this.getKlarnaData.bind(this)
    };

    __construct(props) {
        super.__construct(props);
    }

    componentDidMount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.subscribe(BILLING_STEP, this.collectAdditionalData, 'CheckoutPaymentsContainer');
        }
    }

    componentWillUnmount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.unsubscribe(BILLING_STEP, 'CheckoutPaymentsContainer');
        }
    }

    containerProps() {
        const {
            billingAddress,
            paymentMethods,
            setOrderButtonEnableStatus,
            showError
        } = this.props;

        const { selectedPaymentCode } = this.state;

        return {
            billingAddress,
            paymentMethods,
            selectedPaymentCode,
            setOrderButtonEnableStatus,
            showError
        };
    }

    getKlarnaData() {
        return { asyncData: KlarnaContainer.authorize() };
    }

    collectAdditionalData() {
        const { selectedPaymentCode } = this.state;
        const additionalDataGetter = this.dataMap[selectedPaymentCode];

        if (!additionalDataGetter) {
            return {};
        }

        return additionalDataGetter();
    }

    selectPaymentMethod({ code }) {
        const {
            onPaymentMethodSelect,
            setOrderButtonEnableStatus
        } = this.props;

        this.setState({
            selectedPaymentCode: code
        });

        onPaymentMethodSelect(code);
        setOrderButtonEnableStatus(true);
    }

    render() {
        return (
            <CheckoutPayments
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPaymentsContainer);
