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

import { PureComponent } from 'react';

import Link from 'Component/Link';
import { ORDER_ID } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { AccountPageUrl } from 'Route/MyAccount/MyAccount.config';
import { ReactElement } from 'Type/Common.type';
import { isSignedIn } from 'Util/Auth';
import { appendWithStoreCode } from 'Util/Url';

import { CheckoutSuccessComponentProps, CheckoutSuccessComponentState } from './CheckoutSuccess.type';

import './CheckoutSuccess.style';

/** @namespace Component/CheckoutSuccess/Component */
export class CheckoutSuccessComponent<
P extends Readonly<CheckoutSuccessComponentProps> = Readonly<CheckoutSuccessComponentProps>,
S extends CheckoutSuccessComponentState = CheckoutSuccessComponentState,
> extends PureComponent<P, S> {
    renderButtons(): ReactElement {
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

    renderCreateAccountButton(): ReactElement {
        const {
            isEmailAvailable,
            email,
            firstName,
            lastName,
            orderID,
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
                      pathname: appendWithStoreCode(`${ AccountPageUrl.REGISTRATION_URL }`),
                      state: {
                          firstName,
                          lastName,
                          email,
                          orderID,
                      },
                  } }
                  block="Button"
                >
                    { __('Create account') }
                </Link>
            </div>
        );
    }

    render(): ReactElement {
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

export default CheckoutSuccessComponent;
