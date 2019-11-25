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
import Loader from 'Component/Loader';

export const KLARNA_SCRIPT_ID = 'klarna_script';

export default class KlarnaComponent extends PureComponent {
    state = {
        isLoading: true
    };

    static propTypes = {};

    async initiateKlarna() {
        const { klarnaToken: client_token } = await fetchMutation(KlarnaQuery.getCreateKlarnaTokenMutation({}));

        Klarna.Payments.init({ client_token });
        Klarna.Payments.load({
            container: '#klarna-payments-container',
            payment_method_category: 'pay_later'
        }, console.debug);

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
                <div id="klarna-payments-container" />
            </div>
        );
    }
}
