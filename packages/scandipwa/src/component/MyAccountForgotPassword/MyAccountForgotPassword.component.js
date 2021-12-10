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
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import { SignInStateType } from 'Type/Account.type';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

/** @namespace Component/MyAccountForgotPassword/Component */
export class MyAccountForgotPassword extends PureComponent {
    static propTypes = {
        state: SignInStateType.isRequired,
        onForgotPasswordSuccess: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        isCheckout: PropTypes.bool.isRequired
    };

    renderForgotPasswordForm() {
        const { onForgotPasswordSuccess, onFormError } = this.props;

        return (
            <Form
              key="forgot-password"
              onSubmit={ onForgotPasswordSuccess }
              onError={ onFormError }
            >
                <Field
                  type={ FIELD_TYPE.email }
                  label={ __('Email') }
                  attr={ {
                      id: 'email',
                      name: 'email',
                      class: 'ForgotPassword-Input_type_email',
                      placeholder: __('Your email address'),
                      autocomplete: 'email'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: VALIDATION_INPUT_TYPE.email
                  } }
                  addRequiredTag
                />
                <div block="MyAccountOverlay" elem="Buttons">
                    <button
                      block="Button"
                      type="submit"
                      mix={ { block: 'MyAccountOverlay', elem: 'ResetPassword' } }
                    >
                        { __('Send reset link') }
                    </button>
                </div>
            </Form>
        );
    }

    renderCreateAccountLabel() {
        const { isCheckout, handleCreateAccount } = this.props;

        if (isCheckout) {
            return null;
        }

        return (
            <section aria-labelledby="create-account-label">
                <h4 id="create-account-label">{ __("Don't have an account?") }</h4>
                <button
                  block="Button"
                  mods={ { likeLink: true } }
                  onClick={ handleCreateAccount }
                >
                    { __('Create an account') }
                </button>
            </section>
        );
    }

    renderAdditionalField() {
        const { state, handleSignIn } = this.props;

        return (
            <article block="MyAccountOverlay" elem="Additional" mods={ { state } }>
                <section aria-labelledby="forgot-password-labe">
                    <h4 id="forgot-password-label">{ __('Already have an account?') }</h4>
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      mix={ { block: 'MyAccountOverlay', elem: 'SignInButton' } }
                      onClick={ handleSignIn }
                    >
                        { __('Sign in') }
                    </button>
                </section>
                { this.renderCreateAccountLabel() }
            </article>
        );
    }

    render() {
        return (
            <>
                { this.renderForgotPasswordForm() }
                { this.renderAdditionalField() }
            </>
        );
    }
}

export default MyAccountForgotPassword;
