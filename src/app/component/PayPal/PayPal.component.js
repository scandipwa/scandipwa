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
import { isSignedIn } from 'Util/Auth';
import { CartDispatcher } from 'Store/Cart';
import { fetchMutation } from 'Util/Request';
import { PayPalQuery, CheckoutQuery } from 'Query';

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
        cartTotals: PropTypes.shape({}).isRequired,
        onError: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onApprove: PropTypes.func.isRequired,
        createOrder: PropTypes.func.isRequired
    };

    static defaultProps = {
        isDisabled: false
    };

    getPayPalScript = () => {
        //! TODO: get client id / sandbox enabled from server
        const { cartTotals: { base_currency_code: currency } } = this.props;

        const clientId = 'AXmZAtF_N3bY3PWr3P7ZRvcW1ths0KZZXX_mtylTcvcOyFzNiImGm5WQj5IggMy3YhjZ5a9QDE6Hy4ZD';

        const params = {
            currency,
            intent: 'authorize',
            'client-id': clientId
        };

        const paramsString = (Object.entries(params).map(([key, value]) => `${key}=${value}`)).join('&');

        return `<script id="${PAYPAL_SCRIPT}" src="https://www.paypal.com/sdk/js?${paramsString}"></script>`;
    };

    renderButtons() {
        const {
            paypal,
            onError,
            onCancel,
            onApprove,
            createOrder
        } = this.props;

        if (!paypal) return null;

        const PayPalButton = paypal && paypal.Buttons.driver('react', { React, ReactDOM });

        return (
            <PayPalButton
              env="sandbox"
              onError={ onError }
              onCancel={ onCancel }
              onApprove={ onApprove }
              createOrder={ createOrder }
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
