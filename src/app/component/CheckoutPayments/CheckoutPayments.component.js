/* eslint-disable no-console */
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

import './CheckoutPayments.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Braintree from 'Component/Braintree';
import CheckoutPayment from 'Component/CheckoutPayment';
import Klarna from 'Component/Klarna';
import NotSupportedPayment from 'Component/NotSupportedPayment';
import PayPal from 'Component/PayPal';
import Stripe from 'Component/Stripe';
import { paymentMethodsType } from 'Type/Checkout';

import {
    BRAINTREE,
    CHECK_MONEY,
    KLARNA,
    PAYPAL_EXPRESS,
    PAYPAL_EXPRESS_CREDIT,
    STRIPE
} from './CheckoutPayments.config';

export class CheckoutPayments extends PureComponent {
    static propTypes = {
        showError: PropTypes.func.isRequired,
        setLoading: PropTypes.func.isRequired,
        setDetailsStep: PropTypes.func.isRequired,
        selectPaymentMethod: PropTypes.func.isRequired,
        initBraintree: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        setOrderButtonVisibility: PropTypes.func.isRequired,
        setStripeRef: PropTypes.func.isRequired,
        setOrderButtonEnableStatus: PropTypes.func.isRequired,
        selectedPaymentCode: PropTypes.oneOf([
            KLARNA,
            BRAINTREE,
            CHECK_MONEY,
            PAYPAL_EXPRESS,
            PAYPAL_EXPRESS_CREDIT,
            CHECK_MONEY,
            STRIPE
        ]).isRequired,
        billingAddress: PropTypes.shape({
            city: PropTypes.string,
            company: PropTypes.string,
            country_id: PropTypes.string,
            email: PropTypes.string,
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            postcode: PropTypes.string,
            region_id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            region: PropTypes.oneOfType([
                PropTypes.object,
                PropTypes.string
            ]),
            street: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.array
            ]),
            telephone: PropTypes.string
        }).isRequired
    };

    paymentRenderMap = {
        [BRAINTREE]: this.renderBrainTreePayment.bind(this),
        [STRIPE]: this.renderStripePayment.bind(this),
        [KLARNA]: this.renderKlarnaPayment.bind(this),
        [PAYPAL_EXPRESS_CREDIT]: this.renderNotSupported.bind(this)
    };

    state = {
        hasError: false
    };

    componentDidUpdate(prevProps) {
        const { selectedPaymentCode, setOrderButtonVisibility } = this.props;
        const { selectedPaymentCode: prevSelectedPaymentCode } = prevProps;

        if (selectedPaymentCode !== prevSelectedPaymentCode) {
            if (selectedPaymentCode === PAYPAL_EXPRESS) {
                setOrderButtonVisibility(false);
            }

            if (prevSelectedPaymentCode === PAYPAL_EXPRESS) {
                setOrderButtonVisibility(true);
            }
        }
    }

    componentDidCatch(error, info) {
        const { showError, setOrderButtonEnableStatus } = this.props;

        console.groupCollapsed('Suppressed error log:');
        console.error(error.toString(), info.toString());
        console.groupEnd();

        this.setState(
            { hasError: true },
            () => {
                setOrderButtonEnableStatus(false);
                showError(`${error} Please try again later`);
            }
        );
    }

    renderBrainTreePayment() {
        const { initBraintree } = this.props;
        return <Braintree init={ initBraintree } />;
    }

    renderStripePayment() {
        const {
            billingAddress,
            setStripeRef
        } = this.props;

        return (
            <Stripe
              billingAddress={ billingAddress }
              setStripeRef={ setStripeRef }
            />
        );
    }

    renderKlarnaPayment() {
        const { setOrderButtonEnableStatus } = this.props;
        return <Klarna setOrderButtonEnableStatus={ setOrderButtonEnableStatus } />;
    }

    renderNotSupported() {
        const { setOrderButtonEnableStatus } = this.props;
        return <NotSupportedPayment disableButton={ setOrderButtonEnableStatus } />;
    }

    renderPayment = (method) => {
        const {
            selectPaymentMethod,
            selectedPaymentCode
        } = this.props;

        const { code } = method;
        const isSelected = selectedPaymentCode === code;

        return (
            <CheckoutPayment
              key={ code }
              isSelected={ isSelected }
              method={ method }
              onClick={ selectPaymentMethod }
            />
        );
    };

    renderPayments() {
        const { paymentMethods } = this.props;
        return paymentMethods.map(this.renderPayment);
    }

    renderSelectedPayment() {
        const { selectedPaymentCode } = this.props;
        const render = this.paymentRenderMap[selectedPaymentCode];
        if (!render) {
            return null;
        }

        return render();
    }

    renderHeading() {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Select payment method') }
            </h2>
        );
    }

    renderPayPal() {
        const {
            selectedPaymentCode,
            setLoading,
            setDetailsStep
        } = this.props;

        return (
            <PayPal
              setLoading={ setLoading }
              setDetailsStep={ setDetailsStep }
              selectedPaymentCode={ selectedPaymentCode }
            />
        );
    }

    renderContent() {
        const { hasError } = this.state;

        if (hasError) {
            return (
                <p>{ __('The error occurred during initializing payment methods. Please try again later!') }</p>
            );
        }

        return (
            <>
                { this.renderHeading() }
                <ul block="CheckoutPayments" elem="Methods">
                    { this.renderPayments() }
                </ul>
                { this.renderSelectedPayment() }
                { this.renderPayPal() }
            </>
        );
    }

    render() {
        return (
            <div block="CheckoutPayments">
                { this.renderContent() }
            </div>
        );
    }
}

export default CheckoutPayments;
