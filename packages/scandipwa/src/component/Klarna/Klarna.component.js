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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader';
import KlarnaQuery from 'Query/Klarna.query';
import { isSignedIn } from 'Util/Auth';
import { getGuestQuoteId } from 'Util/Cart';
import { fetchMutation } from 'Util/Request';

import {
    KLARNA_PAYMENTS_CONTAINER_ID,
    KLARNA_PAYMENTS_DEVICE_RECOGNITION_ID,
    KLARNA_SCRIPT_ID
} from './Klarna.config';

import './Klarna.style';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Component/Klarna/Component */
export class Klarna extends PureComponent {
    static propTypes = {
        showError: PropTypes.func.isRequired,
        setOrderButtonEnableStatus: PropTypes.func.isRequired
    };

    state = {
        isLoading: true,
        canShowPaymentSelector: true,
        paymentIsShown: false
    };

    componentWillUnmount() {
        const { paymentIsShown } = this.state;

        if (paymentIsShown) {
            const klarnaDOM = document.getElementById(KLARNA_PAYMENTS_DEVICE_RECOGNITION_ID);

            if (klarnaDOM) {
                klarnaDOM.remove();
            }
        }
    }

    async initiateKlarna() {
        const { showError, setOrderButtonEnableStatus } = this.props;
        const guest_cart_id = getGuestQuoteId();

        try {
            setOrderButtonEnableStatus(false);

            const { klarnaToken: client_token } = await fetchMutation(
                KlarnaQuery.getCreateKlarnaTokenMutation(
                    !isSignedIn() ? { guest_cart_id } : {}
                )
            );

            window.Klarna.Payments.init({ client_token });
            window.Klarna.Payments.load({
                container: `#${KLARNA_PAYMENTS_CONTAINER_ID}`,
                payment_method_category: localStorage.getItem('kl_pm')
            });

            setOrderButtonEnableStatus(true);
        } catch (err) {
            console.groupCollapsed('Suppressed error log:');
            console.error(err);
            console.groupEnd();

            showError(__('Error initializing Klarna payment method.'));
        }

        this.setState({ isLoading: false });
    }

    renderScript() {
        window.klarnaAsyncCallback = this.initiateKlarna.bind(this);
        const script = document.getElementById(KLARNA_SCRIPT_ID);

        if (script) {
            script.parentNode.removeChild(script);
        }

        const klarnaScript = document.createElement('script');
        klarnaScript.setAttribute('id', KLARNA_SCRIPT_ID);
        klarnaScript.setAttribute('src', 'https://x.klarnacdn.net/kp/lib/v1/api.js');
        klarnaScript.async = true;
        document.head.appendChild(klarnaScript);

        this.setState({ paymentIsShown: true });
    }

    loadPaymentMethod(method) {
        this.setState({
            isLoading: true,
            canShowPaymentSelector: false
        });
        localStorage.setItem('kl_pm', method);
        this.renderScript();
    }

    loadPaymentMethodPayLater = () => {
        this.loadPaymentMethod('pay_later');
    };

    loadPaymentMethodPayNow = () => {
        this.loadPaymentMethod('pay_now');
    };

    loadPaymentMethodPayOverTime = () => {
        this.loadPaymentMethod('pay_over_time');
    };

    renderPaymentSelector() {
        const { canShowPaymentSelector } = this.state;

        if (!canShowPaymentSelector) {
            return null;
        }

        const { setOrderButtonEnableStatus } = this.props;

        this.setState({ isLoading: false });
        setOrderButtonEnableStatus(false);

        return (
            <div block="Klarna-PaymentSelector">
                <button
                  onClick={ this.loadPaymentMethodPayLater }
                  block="Button"
                >
                    { __('Pay later') }
                </button>

                <button
                  onClick={ this.loadPaymentMethodPayNow }
                  block="Button"
                >
                    { __('Pay now') }
                </button>

                <button
                  onClick={ this.loadPaymentMethodPayOverTime }
                  block="Button"
                >
                    { __('Pay over time') }
                </button>
            </div>
        );
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div block="Klarna">
                <Loader isLoading={ isLoading } />
                { this.renderPaymentSelector() }
                <div id={ KLARNA_PAYMENTS_CONTAINER_ID } />
            </div>
        );
    }
}

export default Klarna;
