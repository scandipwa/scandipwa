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
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { PAYPAL_EXPRESS } from 'Component/CheckoutPayments/CheckoutPayments.config';
import CheckoutQuery from 'Query/Checkout.query';
import PayPalQuery from 'Query/PayPal.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { isSignedIn } from 'Util/Auth';
import { fetchMutation } from 'Util/Request';

import PayPal from './PayPal.component';
import { PAYPAL_SCRIPT } from './PayPal.config';

const CartDispatcher = import(/* webpackMode: "lazy", webpackChunkName: "dispatchers" */'Store/Cart/Cart.dispatcher');

export const mapStateToProps = (state) => ({
    cartTotals: state.CartReducer.cartTotals,
    clientId: state.ConfigReducer.paypal_client_id,
    isSandboxEnabled: state.ConfigReducer.paypal_sandbox_flag
});

export const mapDispatchToProps = (dispatch) => ({
    showNotification: (type, message, e) => dispatch(showNotification(type, message, e))
});

export class PayPalContainer extends PureComponent {
    static propTypes = {
        clientId: PropTypes.string,
        isSandboxEnabled: PropTypes.bool,
        setLoading: PropTypes.func.isRequired,
        setDetailsStep: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        selectedPaymentCode: PropTypes.string.isRequired
    };

    static defaultProps = {
        clientId: 'sb',
        isSandboxEnabled: false
    };

    componentDidMount() {
        const script = document.getElementById(PAYPAL_SCRIPT);

        if (script) {
            script.onload = () => this.forceUpdate();
        }
    }

    componentWillUnmount() {
        // resetting all pay-pal related properties
        Object.keys(window).forEach((key) => {
            if (/paypal|zoid|post_robot/.test(key)) {
                // eslint-disable-next-line fp/no-delete
                delete window[key];
            }
        });
    }

    containerProps = () => ({
        paypal: this.getPayPal(),
        environment: this.getEnvironment(),
        isDisabled: this.getIsDisabled()
    });

    getIsDisabled = () => {
        const { selectedPaymentCode } = this.props;
        return selectedPaymentCode !== PAYPAL_EXPRESS;
    };

    containerFunctions = () => ({
        onError: this.onError,
        onCancel: this.onCancel,
        onApprove: this.onApprove,
        createOrder: this.createOrder
    });

    onApprove = async (data) => {
        const { showNotification, setDetailsStep } = this.props;
        const { orderID, payerID } = data;
        const guest_cart_id = this._getGuestQuoteId();

        try {
            await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
                guest_cart_id,
                payment_method: {
                    code: 'paypal_express',
                    paypal_express: {
                        token: orderID,
                        payer_id: payerID
                    }
                }
            }));

            const orderData = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(guest_cart_id));
            const { placeOrder: { order: { order_id } } } = orderData;

            setDetailsStep(order_id);
        } catch (e) {
            showNotification('error', 'Something went wrong');
        }
    };

    onCancel = (data) => {
        const { showNotification, setLoading } = this.props;
        setLoading(false);
        showNotification('info', 'Your payment has been canceled', data);
    };

    onError = (err) => {
        const { showNotification, setLoading } = this.props;
        setLoading(false);
        showNotification('error', 'Some error appeared with PayPal', err);
    };

    getPayPal = () => {
        const { paypal } = window;
        return paypal || false;
    };

    getEnvironment = () => {
        const { isSandboxEnabled } = this.props;
        return isSandboxEnabled ? 'sandbox' : 'production';
    };

    createOrder = async () => {
        const { setLoading, selectedPaymentCode } = this.props;
        const guest_cart_id = this._getGuestQuoteId();

        setLoading(true);

        const {
            paypalExpress: { token }
        } = await fetchMutation(PayPalQuery.getCreatePaypalExpressTokenMutation({
            guest_cart_id,
            express_button: false,
            code: selectedPaymentCode,
            // use_paypal_credit: this.getIsCredit(),
            urls: {
                cancel_url: 'www.paypal.com/checkoutnow/error',
                return_url: 'www.paypal.com/checkoutnow/error'
            }
        }));

        return token;
    };

    _getGuestQuoteId = () => (
        isSignedIn()
            ? ''
            : CartDispatcher.then(({ default: dispatcher }) => dispatcher._getGuestQuoteId())
    );

    render() {
        return (
            <PayPal
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPalContainer);
