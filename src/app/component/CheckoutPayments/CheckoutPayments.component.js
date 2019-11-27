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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CheckoutPayment from 'Component/CheckoutPayment';
import Braintree from 'Component/Braintree';
import { paymentMethodsType } from 'Type/Checkout';
import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedStripeCheckoutForm from 'Component/InjectedStripeCheckoutForm';
import PayPal from 'Component/PayPal';

import './CheckoutPayments.style';

export const BRAINTREE = 'braintree';
export const CHECK_MONEY = 'checkmo';
export const PAYPAL_EXPRESS = 'paypal_express';
export const PAYPAL_EXPRESS_CREDIT = 'paypal_express_bml';
export const STRIPE = 'stripe_payments';

class CheckoutPayments extends PureComponent {
    static propTypes = {
        setLoading: PropTypes.func.isRequired,
        setDetailsStep: PropTypes.func.isRequired,
        selectPaymentMethod: PropTypes.func.isRequired,
        initBraintree: PropTypes.func.isRequired,
        stripeKey: PropTypes.string.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        setOrderButtonVisibility: PropTypes.func.isRequired,
        selectedPaymentCode: PropTypes.oneOf([
            CHECK_MONEY,
            BRAINTREE,
            PAYPAL_EXPRESS,
            PAYPAL_EXPRESS_CREDIT,
            CHECK_MONEY,
            STRIPE
        ]).isRequired,
        setStripeRef: PropTypes.func.isRequired,
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
        }).isRequired,
        email: PropTypes.string
    };

    static defaultProps = {
        email: null
    };

    paymentRenderMap = {
        [BRAINTREE]: this.renderBrainTreePayment.bind(this),
        [STRIPE]: this.renderStripePayment.bind(this)
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

    renderBrainTreePayment() {
        const { initBraintree } = this.props;
        return <Braintree init={ initBraintree } />;
    }

    renderStripePayment() {
        const {
            setStripeRef,
            billingAddress,
            email,
            stripeKey
        } = this.props;

        return (
            <div>
                <StripeProvider apiKey={ stripeKey }>
                    <Elements>
                        <InjectedStripeCheckoutForm
                          onRef={ setStripeRef }
                          billingAddress={ billingAddress }
                          email={ email }
                        />
                    </Elements>
                </StripeProvider>
            </div>
        );
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
        if (!render) return null;
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
        const { selectedPaymentCode, setLoading, setDetailsStep } = this.props;

        return (
            <PayPal
              setLoading={ setLoading }
              setDetailsStep={ setDetailsStep }
              selectedPaymentCode={ selectedPaymentCode }
            />
        );
    }

    render() {
        return (
            <div block="CheckoutPayments">
                { this.renderHeading() }
                <ul block="CheckoutPayments" elem="Methods">
                    { this.renderPayments() }
                </ul>
                { this.renderSelectedPayment() }
                { this.renderPayPal() }
            </div>
        );
    }
}

export default CheckoutPayments;
