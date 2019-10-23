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

import { paymentMethodsType } from 'Type/Checkout';
import CheckoutPayment from 'Component/CheckoutPayment';
import PayPal from 'Component/PayPal';

import './CheckoutPayments.style';

export const CHECK_MONEY = 'checkmo';
export const PAYPAL_EXPRESS = 'paypal_express';

class CheckoutPayments extends PureComponent {
    static propTypes = {
        setLoading: PropTypes.func.isRequired,
        setDetailsStep: PropTypes.func.isRequired,
        selectPaymentMethod: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        setOrderButtonVisibility: PropTypes.func.isRequired,
        selectedPaymentCode: PropTypes.oneOf([
            CHECK_MONEY,
            PAYPAL_EXPRESS
        ]).isRequired
    };

    paymentRenderMap = {
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
              isDisabled={ selectedPaymentCode !== PAYPAL_EXPRESS }
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
