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
import { PureComponent } from 'react';

import Field from 'Component/Field';
import Form from 'Component/Form';
import { signInStateType } from 'Type/Account';

/** @namespace Component/MyAccountSignIn/Component */
export class MyAccountSignIn extends PureComponent {
    static propTypes = {
        onSignInSuccess: PropTypes.func.isRequired,
        onSignInAttempt: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleForgotPassword: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        isCheckout: PropTypes.bool.isRequired,
        state: signInStateType.isRequired,
        emailValue: PropTypes.string.isRequired,
        handleEmailInput: PropTypes.func
    };

    static defaultProps = {
        handleEmailInput: () => {}
    };

    renderSignInForm() {
        const {
            onSignInAttempt,
            onSignInSuccess,
            onFormError,
            handleForgotPassword,
            emailValue,
            handleEmailInput,
            isCheckout
        } = this.props;

        return (
            <Form
              key="sign-in"
              onSubmit={ onSignInAttempt }
              onSubmitSuccess={ onSignInSuccess }
              onSubmitError={ onFormError }
            >
                <Field
                  type="text"
                  label={ __('Email') }
                  id="email"
                  name="email"
                  value={ emailValue }
                  autocomplete={ isCheckout ? 'off' : 'email' }
                  validation={ ['notEmpty', 'email'] }
                  onChange={ handleEmailInput }
                />
                <Field
                  type="password"
                  label={ __('Password') }
                  id="password"
                  name="password"
                  autocomplete="current-password"
                  validation={ ['notEmpty', 'password'] }
                />
                <div block="MyAccountOverlay" elem="Buttons">
                    <button block="Button">{ __('Sign in') }</button>
                </div>
                <button
                  block="Button"
                  mods={ { likeLink: true } }
                  onClick={ handleForgotPassword }
                >
                    { __('Forgot password?') }
                </button>
            </Form>
        );
    }

    renderAdditionalField() {
        const {
            isCheckout,
            handleCreateAccount,
            state
        } = this.props;

        if (isCheckout) {
            return null;
        }

        return (
            <article block="MyAccountOverlay" elem="Additional" mods={ { state } }>
                <section>
                    <h4 id="forgot-password-label">{ __('Don`t have an account?') }</h4>
                    <button
                      block="Button"
                      mods={ { isHollow: true } }
                      onClick={ handleCreateAccount }
                    >
                        { __('Create an account') }
                    </button>
                </section>
            </article>
        );
    }

    render() {
        return (
            <>
                { this.renderSignInForm() }
                { this.renderAdditionalField() }
            </>
        );
    }
}

export default MyAccountSignIn;
