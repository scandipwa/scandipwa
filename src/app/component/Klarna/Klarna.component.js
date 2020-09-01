/* eslint-disable no-undef, no-console */
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

import './Klarna.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Html from 'Component/Html';
import Loader from 'Component/Loader';
import KlarnaQuery from 'Query/Klarna.query';
import { isSignedIn } from 'Util/Auth';
import { fetchMutation } from 'Util/Request';

import { KLARNA_PAYMENTS_CONTAINER_ID, KLARNA_SCRIPT_ID } from './Klarna.config';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

export class Klarna extends PureComponent {
    static propTypes = {
        showError: PropTypes.func.isRequired,
        setOrderButtonEnableStatus: PropTypes.func.isRequired
    };

    state = {
        isLoading: true
    };

    async initiateKlarna() {
        const { showError, setOrderButtonEnableStatus } = this.props;
        const guest_cart_id = CartDispatcher.then(({ default: dispatcher }) => dispatcher._getGuestQuoteId)();

        try {
            setOrderButtonEnableStatus(false);

            const { klarnaToken: client_token } = await fetchMutation(
                KlarnaQuery.getCreateKlarnaTokenMutation(
                    !isSignedIn() ? { guest_cart_id } : {}
                )
            );

            Klarna.Payments.init({ client_token });
            Klarna.Payments.load({
                container: `#${KLARNA_PAYMENTS_CONTAINER_ID}`,
                payment_method_category: 'pay_later'
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

        return (
            <Html
              content={ `<script
                      async
                      id=${ KLARNA_SCRIPT_ID }
                      src='https://x.klarnacdn.net/kp/lib/v1/api.js'
                ></script>` }
            />
        );
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div block="Klarna">
                { this.renderScript() }
                <Loader isLoading={ isLoading } />
                <div id={ KLARNA_PAYMENTS_CONTAINER_ID } />
            </div>
        );
    }
}

export default Klarna;
