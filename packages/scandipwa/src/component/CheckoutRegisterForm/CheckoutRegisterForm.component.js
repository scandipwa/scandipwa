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

import PropTypes from 'prop-types';

import {
    CHECKOUT_REGISTRATION_STATE_FORM_HIDDEN,
    CHECKOUT_REGISTRATION_STATE_FORM_VISIBLE,
    CHECKOUT_REGISTRATION_STATE_SUCCESS,
    CHECKOUT_REGISTRATION_STATE_SUCCESS_EMAIL
} from 'Component/CheckoutRegisterForm/CheckoutRegistrationForm.config';

import MyAccountCreateAccount from '../MyAccountCreateAccount/MyAccountCreateAccount.component';

import './CheckoutRegistrationForm.style';

/** @namespace Component/CheckoutRegisterForm/Component/CheckoutRegisterFormComponent */
export class CheckoutRegisterFormComponent extends MyAccountCreateAccount {
    static propTypes = {
        ...MyAccountCreateAccount.propTypes,
        setFormVisible: PropTypes.func.isRequired,
        getRegistrationState: PropTypes.func.isRequired
    };

    renderMap = {
        [CHECKOUT_REGISTRATION_STATE_FORM_HIDDEN]: this.renderMessage.bind(this),
        [CHECKOUT_REGISTRATION_STATE_FORM_VISIBLE]: this.renderCreateAccountForm.bind(this),
        [CHECKOUT_REGISTRATION_STATE_SUCCESS]: this.renderSuccess.bind(this),
        [CHECKOUT_REGISTRATION_STATE_SUCCESS_EMAIL]: this.renderSuccessEmail.bind(this)
    };

    renderSuccessEmail() {
        return (<p>{ __('Registration was successful! Check your email address to active account.') }</p>);
    }

    renderSuccess() {
        return (<p>{ __('Registration was successful!') }</p>);
    }

    renderMessage() {
        const {
            setFormVisible
        } = this.props;

        return (
            <>
                <p>{ __('You can track your order status by creating an account.') }</p>
                <button
                  block="Button"
                  onClick={ setFormVisible }
                >
                    { __('Create account') }
                </button>
            </>
        );
    }

    render() {
        const {
            getRegistrationState
        } = this.props;

        const renderer = this.renderMap[getRegistrationState()];
        if (!renderer) {
            return null;
        }

        return (
            <div block="CheckoutRegistration">
                { renderer() }
            </div>
        );
    }
}

export default CheckoutRegisterFormComponent;
