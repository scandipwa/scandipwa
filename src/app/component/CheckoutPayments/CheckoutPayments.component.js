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

import './CheckoutPayments.style';
import { paymentMethodsType } from 'Type/Checkout';
import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedStripeCheckoutForm from 'Component/InjectedStripeCheckoutForm';

export const BRAINTREE = 'braintree';
export const CHECK_MONEY = 'checkmo';
export const STRIPE = 'stripe_payments';

class CheckoutPayments extends PureComponent {
    static propTypes = {
        selectPaymentMethod: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        initBraintree: PropTypes.func.isRequired,
        selectedPaymentCode: PropTypes.oneOf([
            BRAINTREE,
            CHECK_MONEY,
            STRIPE
        ]).isRequired
    };

    paymentRenderMap = {
        [BRAINTREE]: this.renderBrainTreePayment.bind(this),
        [STRIPE]: this.renderStripePayment.bind(this)
    };

    /**
     * Render braintree
     * @returns {*}
     */
    renderBrainTreePayment() {
        const { initBraintree } = this.props;

        return (
            <Braintree init={ initBraintree } />
        );
    }

    /**
     * Render stripe
     * Change API KEYS to your own KEYS
     * @returns {*}
     */
    renderStripePayment() {
        const { setStripeRef, billingAddress, email } = this.props;

        return (
            <div>
                <StripeProvider apiKey="pk_test_5EMxhkHI30WSlLuscegpXbOI00qBxzii9Z">
                    <Elements>
                        <InjectedStripeCheckoutForm
                          onRef={ ref => setStripeRef(ref) }
                          billingAddress={ billingAddress }
                          email={ email }
                        />
                    </Elements>
                </StripeProvider>
            </div>
        );
    }

    /**
     * Render payment
     * @param method
     * @returns {*}
     */
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

    render() {
        return (
            <div block="CheckoutPayments">
                { this.renderHeading() }
                <ul block="CheckoutPayments" elem="Methods">
                    { this.renderPayments() }
                </ul>
                { this.renderSelectedPayment() }
            </div>
        );
    }
}

CheckoutPayments.propTypes = {
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

CheckoutPayments.defaultProps = {
    email: null
};

export default CheckoutPayments;
