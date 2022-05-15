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

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { SignInStateType } from 'Type/Account.type';
import { ReactElement } from 'Type/Common.type';
import { ValidationInputType } from 'Util/Validator/Config';

import './MyAccountSignIn.style.scss';

/** @namespace Component/MyAccountSignIn/Component */
export class MyAccountSignIn extends PureComponent {
    static propTypes = {
        onSignInSuccess: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleForgotPassword: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        isCheckout: PropTypes.bool.isRequired,
        state: SignInStateType.isRequired,
        emailValue: PropTypes.string.isRequired,
        handleEmailInput: PropTypes.func.isRequired,
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        isLoading: false
    };

    renderSignInForm(): ReactElement {
        const {
            onSignInSuccess,
            onFormError,
            handleForgotPassword,
            emailValue,
            isCheckout,
            handleEmailInput,
            isLoading
        } = this.props;

        return (
            <Form
              key="sign-in"
              onSubmit={ onSignInSuccess }
              onError={ onFormError }
            >
                <Field
                  label={ __('Email') }
                  type={ FieldType.EMAIL }
                  attr={ {
                      id: 'email',
                      name: 'email',
                      placeholder: __('Your email address'),
                      defaultValue: emailValue,
                      autoComplete: isCheckout ? 'off' : 'email'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: ValidationInputType.EMAIL
                  } }
                  events={ { onChange: handleEmailInput } }
                  addRequiredTag
                />
                <Field
                  label={ __('Password') }
                  type={ FieldType.PASSWORD }
                  attr={ {
                      id: 'password',
                      name: 'password',
                      placeholder: __('Enter your password'),
                      autoComplete: 'current-password'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: ValidationInputType.PASSWORD
                  } }
                  addRequiredTag
                />
                <button
                  type="button"
                  block="Button"
                  mods={ { likeLink: true } }
                  mix={ { block: 'MyAccountOverlay', elem: 'ForgotPassword' } }
                  onClick={ handleForgotPassword }
                >
                    { __('Forgot password?') }
                </button>
                <div block="MyAccountOverlay" elem="SignInButton">
                    <button block="Button">{ __('Sign in') }</button>
                </div>
                <Loader isLoading={ isLoading } />
            </Form>
        );
    }

    renderAdditionalField(): ReactElement {
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
                    <h4 id="forgot-password-label">{ __("Don't have an account?") }</h4>
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ handleCreateAccount }
                    >
                        { __('Create an account') }
                    </button>
                </section>
            </article>
        );
    }

    render(): ReactElement {
        return (
            <>
                { this.renderSignInForm() }
                { this.renderAdditionalField() }
            </>
        );
    }
}

export default MyAccountSignIn;
