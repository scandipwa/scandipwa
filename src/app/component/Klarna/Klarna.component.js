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

export default class KlarnaComponent extends PureComponent {
    static propTypes = {};

    static isFirstLoad = true;

    async initiateKlarna() {
        const { klarnaToken: client_token } = await fetchMutation(KlarnaQuery.getCreateKlarnaTokenMutation({}));

        Klarna.Payments.init({ client_token });
        Klarna.Payments.load({
            container: '#klarna-payments-container',
            payment_method_category: 'pay_later'
        }, (res) => {
            console.debug(res);
        });
    }

    renderScript() {
        if (!KlarnaComponent.isFirstLoad) return null;

        KlarnaComponent.isFirstLoad = false;
        window.klarnaAsyncCallback = this.initiateKlarna;

        return (
            <Html
              content="<script src='https://x.klarnacdn.net/kp/lib/v1/api.js' async></script>"
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
