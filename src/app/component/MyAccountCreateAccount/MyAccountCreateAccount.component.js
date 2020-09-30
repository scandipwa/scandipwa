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

/** @namespace Component/MyAccountCreateAccount/Component */
export class MyAccountCreateAccount extends PureComponent {
    static propTypes = {
        state: signInStateType.isRequired,
        onCreateAccountAttempt: PropTypes.func.isRequired,
        onCreateAccountSuccess: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired
    };

    renderCreateAccountPersonalInfoFields() {
        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend>{ __('Personal Information') }</legend>
                <Field
                  type="text"
                  label={ __('First Name') }
                  id="firstname"
                  name="firstname"
                  autocomplete="given-name"
                  validation={ ['notEmpty'] }
                />
                <Field
                  type="text"
                  label={ __('Last Name') }
                  id="lastname"
                  name="lastname"
                  autocomplete="family-name"
                  validation={ ['notEmpty'] }
                />
                <Field
                  type="checkbox"
                  value="is_subscribed"
                  label={ __('Subscribe to newsletter') }
                  id="is_subscribed"
                  mix={ { block: 'MyAccountOverlay', elem: 'Checkbox' } }
                  name="is_subscribed"
                />
            </fieldset>
        );
    }

    renderCreateAccountSignUpInfoFields() {
        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend>{ __('Sign-Up Information') }</legend>
                <Field
                  type="text"
                  label={ __('Email') }
                  id="email"
                  name="email"
                  autocomplete="email"
                  validation={ ['notEmpty', 'email'] }
                />
                <Field
                  type="password"
                  label={ __('Password') }
                  id="password"
                  name="password"
                  autocomplete="new-password"
                  validation={ ['notEmpty', 'password'] }
                />
                <Field
                  type="password"
                  label={ __('Confirm password') }
                  id="confirm_password"
                  name="confirm_password"
                  autocomplete="new-password"
                  validation={ ['notEmpty', 'password', 'password_match'] }
                />
            </fieldset>
        );
    }

    renderSubmitButton() {
        return (
            <div block="MyAccountOverlay" elem="Buttons">
                <button
                  block="Button"
                  type="submit"
                >
                    { __('Sign up') }
                </button>
            </div>
        );
    }

    renderCreateAccountForm() {
        const { onCreateAccountAttempt, onCreateAccountSuccess } = this.props;
        return (
            <Form
              key="create-account"
              onSubmit={ onCreateAccountAttempt }
              onSubmitSuccess={ onCreateAccountSuccess }
              onSubmitError={ onCreateAccountAttempt }
            >
                { this.renderCreateAccountPersonalInfoFields() }
                { this.renderCreateAccountSignUpInfoFields() }
                { this.renderSubmitButton() }
            </Form>
        );
    }

    renderAdditionalField() {
        const { state, handleSignIn } = this.props;

        return (
            <article block="MyAccountOverlay" elem="Additional" mods={ { state } }>
                <section>
                    <h4>{ __('Already have an account?') }</h4>
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ handleSignIn }
                    >
                        { __('Sign in here') }
                    </button>
                </section>
            </article>
        );
    }

    render() {
        return (
            <>
                { this.renderCreateAccountForm() }
                { this.renderAdditionalField() }
            </>
        );
    }
}

export default MyAccountCreateAccount;
