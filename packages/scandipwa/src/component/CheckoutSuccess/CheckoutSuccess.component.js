/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Link from 'Component/Link';
import { ORDER_ID } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { ACCOUNT_REGISTRATION_URL } from 'Route/MyAccount/MyAccount.config';
import { isSignedIn } from 'Util/Auth';
import { appendWithStoreCode } from 'Util/Url';

import './CheckoutSuccess.style';

/** @namespace Component/CheckoutSuccess/Component */
export class CheckoutSuccess extends PureComponent {
    static propTypes = {
        orderID: PropTypes.string.isRequired,
        isEmailAvailable: PropTypes.bool.isRequired,
        email: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    };

    renderButtons() {
        return (
            <div block="CheckoutSuccess" elem="ButtonWrapper">
                <Link
                  block="Button"
                  mix={ { block: 'CheckoutSuccess', elem: 'ContinueButton' } }
                  to="/"
                >
                    { __('Continue shopping') }
                </Link>
            </div>
        );
    }

    renderCreateAccountButton() {
        const {
            isEmailAvailable,
            email,
            firstName,
            lastName,
            orderID
        } = this.props;

        if (!isEmailAvailable || isSignedIn()) {
            return null;
        }

        sessionStorage.setItem(ORDER_ID, orderID);

        return (
            <div block="CheckoutRegistrationLink">
                <p>
                    { __('You can track your order status by creating an account.') }
                </p>
                <p>
                    { `${__('Email address')}: ${email}` }
                </p>
                <Link
                  to={ {
                      pathname: appendWithStoreCode(`${ ACCOUNT_REGISTRATION_URL }`),
                      state: {
                          firstName,
                          lastName,
                          email,
                          orderID
                      }
                  } }
                  block="Button"
                >
                    { __('Create account') }
                </Link>
            </div>
        );
    }

    render() {
        const { orderID } = this.props;

        return (
            <div block="CheckoutSuccess">
                <h3>{ __('Your order # is: %s', orderID) }</h3>
                <p>{ __('We`ll email you an order confirmation with details and tracking info.') }</p>
                { this.renderButtons() }
                { this.renderCreateAccountButton() }
            </div>
        );
    }
}

export default CheckoutSuccess;
