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

import './PayPal.style';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import Html from 'Component/Html';
import Loader from 'Component/Loader';

import { PAYPAL_SCRIPT } from './PayPal.config';

/**
 * *Note*
 * This component currently can be rendered only once
 * Please try to have no more than 1 component per page and use isDisabled to hide it.
*/
export class PayPal extends PureComponent {
    static propTypes = {
        isDisabled: PropTypes.bool,
        paypal: PropTypes.any.isRequired,
        clientId: PropTypes.string.isRequired,
        cartTotals: PropTypes.shape({
            quote_currency_code: PropTypes.string
        }).isRequired,
        onError: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onApprove: PropTypes.func.isRequired,
        createOrder: PropTypes.func.isRequired,
        environment: PropTypes.oneOf([
            'production',
            'sandbox'
        ]).isRequired
    };

    static defaultProps = {
        isDisabled: false
    };

    getPayPalScript = () => {
        const {
            clientId,
            cartTotals: { quote_currency_code: currency }
        } = this.props;

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
            createOrder,
            environment
        } = this.props;

        if (!paypal) {
            return <Loader isLoading />;
        }

        const PayPalButton = paypal && paypal.Buttons.driver('react', { React, ReactDOM });

        return (
            <PayPalButton
              env={ environment }
              onError={ onError }
              onCancel={ onCancel }
              onApprove={ onApprove }
              createOrder={ createOrder }
              style={ {
                  layout: 'horizontal',
                  label: 'pay'
              } }
            />
        );
    }

    render() {
        const { isDisabled } = this.props;

        return (
            <div block="PayPal" mods={ { isDisabled } }>
                <Html content={ this.getPayPalScript() } />
                { this.renderButtons() }
            </div>
        );
    }
}

export default PayPal;
