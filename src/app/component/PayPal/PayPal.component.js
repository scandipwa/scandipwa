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

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Html from 'Component/Html';
import { fetchMutation } from 'Util/Request';
import { PayPalQuery } from 'Query';
import { isSignedIn } from 'Util/Auth';
import { CartDispatcher } from 'Store/Cart';

import './PayPal.style';


export const PAYPAL_SCRIPT = 'PAYPAL_SCRIPT';

/**
 * *Note*
 * This component currently can be rendered only once
 * Please try to have no more than 1 component per page and use isDisabled to hide it.
*/
export default class PayPal extends PureComponent {
    static propTypes = {
        isDisabled: PropTypes.bool,
        paypal: PropTypes.any.isRequired,
        cartTotals: PropTypes.shape({}).isRequired
    };

    static defaultProps = {
        isDisabled: false
    };

    onApprove = (data, actions) => {
        console.log('APPROVED', data);

        return actions.order.capture().then(details => console.log('DETAILS', details));
    };

    onCancel = (data) => {
        // CANCEL IT ON SERVER
        console.log('CANCELED', data);
    };

    onError = (err) => {
        console.log('ERROR', err);
    };

    createOrder = async (_, actions) => {
        const { cartTotals: { base_currency_code: currency_code } } = this.props;

        const data = await fetchMutation(PayPalQuery.getCreatePaypalExpressTokenMutation({
            code: 'paypal_express',
            guest_cart_id: isSignedIn() ? '' : CartDispatcher._getGuestQuoteId(),
            express_button: true,
            urls: {
                cancel_url: 'www.paypal.com/checkoutnow/error',
                return_url: 'www.paypal.com/checkoutnow/error'
            }
        }));

        const { paypalExpress: { token } } = data;

        return token;
    };

    getPayPalScript = () => {
        //! TODO: get client id / sandbox enabled from server
        const { cartTotals: { base_currency_code: currency } } = this.props;

        const clientId = 'sb';

        const params = {
            currency,
            debug: 'true',
            intent: 'authorize',
            'client-id': clientId
        };

        const paramsString = (Object.entries(params).map(([key, value]) => `${key}=${value}`)).join('&');

        return `<script id="${PAYPAL_SCRIPT}" src="https://www.paypal.com/sdk/js?${paramsString}"></script>`;
    };

    renderButtons() {
        const { paypal } = this.props;

        if (!paypal) return null;

        const PayPalButton = paypal && paypal.Buttons.driver('react', { React, ReactDOM });

        return (
            <PayPalButton
              env="sandbox"
              enableStandardCardFields
              onError={ this.onError }
              onCancel={ this.onCancel }
              onApprove={ this.onApprove }
              createOrder={ this.createOrder }
              style={ { layout: 'horizontal', label: 'pay' } }
            />
        );
    }

    render() {
        const { isDisabled } = this.props;

        const paypalScript = this.getPayPalScript();

        return (
            <div block="PayPal" mods={ { isDisabled } }>
                <Html content={ paypalScript } />
                { this.renderButtons() }
            </div>
        );
    }
}
