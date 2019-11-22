/* eslint-disable no-undef */
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
import { KlarnaQuery } from 'Query';
import Html from 'Component/Html';
import { fetchMutation } from 'Util/Request';
import { COMPLETE_ORDER_BTN_ID } from 'Component/CheckoutBilling/CheckoutBilling.component';

export const KLARNA_SCRIPT_ID = 'klarna_script';

export default class KlarnaComponent extends PureComponent {
    static propTypes = {};

    async initiateKlarna() {
        const { klarnaToken: client_token } = await fetchMutation(KlarnaQuery.getCreateKlarnaTokenMutation({}));

        Klarna.Payments.init({ client_token });
        Klarna.Payments.load({
            container: '#klarna-payments-container',
            payment_method_category: 'pay_later'
        }, console.debug);

        const completeButton = document.getElementById(COMPLETE_ORDER_BTN_ID);

        /**
         * TODO: authorize payment and send auth_token
         * to sever via setPaymentMethodOnCart and placeOrder afterwards
         */
        completeButton.onclick = function completeOnClick(e) {
            e.preventDefault();
        };
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
        return (
            <>
                { this.renderScript() }
                <div id="klarna-payments-container" />
            </>
        );
    }
}
