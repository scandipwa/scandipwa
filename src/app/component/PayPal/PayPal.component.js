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

import './PayPal.style';

export const PAYPAL_SCRIPT = 'PAYPAL_SCRIPT';

/**
 * *Note*
 * This component currently can be rendered only once
 * Please try to not have more than 2 components per page and use isDisabled to hide it.
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
        console.log('APPROVED');

        return actions.order.capture().then(details => console.log('DETAILS', details));
    };

    onCancel = (data) => {
        console.log('CANCELED', data);
    };

    onError = (err) => {
        console.log('ERROR', err);
    };

    createOrder = (data, actions) => {
        const { cartTotals: { base_currency_code: currency_code } } = this.props;

        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '0.02',
                    currency_code
                }
            }]
        });
    };

    getPayPalScript = () => {
        //! TODO: get client id / sandbox enabled from server
        const { cartTotals: { base_currency_code } } = this.props;

        const clientId = 'sb';

        return `<script id="${PAYPAL_SCRIPT}" src="https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${base_currency_code}"></script>`;
    };

    renderButtons() {
        const { paypal } = this.props;

        if (!paypal) return null;

        const PayPalButton = paypal && paypal.Buttons.driver('react', { React, ReactDOM });

        return (
            <PayPalButton
              env="sandbox"
              onError={ this.onError }
              style={ { layout: 'horizontal', label: 'pay' } }
              onCancel={ this.onCancel }
              onApprove={ this.onApprove }
              createOrder={ this.createOrder }
              enableStandardCardFields
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
