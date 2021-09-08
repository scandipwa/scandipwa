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
import history from 'Util/History';

import './MyAccountCreateAccount.style.scss';

/** @namespace Component/MyAccountCreateAccount/Component */
export class MyAccountCreateAccount extends PureComponent {
    static propTypes = {
        state: signInStateType.isRequired,
        onCreateAccountAttempt: PropTypes.func.isRequired,
        onCreateAccountSuccess: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        showTaxVatNumber: PropTypes.bool.isRequired,
        vatNumberValidation: PropTypes.array.isRequired,
        newsletterActive: PropTypes.bool.isRequired,
        isSubscriptionSelected: PropTypes.bool.isRequired,
        onSubscriptionChange: PropTypes.func.isRequired,
        isSubmitted: PropTypes.bool.isRequired
    };

    renderVatNumberField() {
        const { showTaxVatNumber, vatNumberValidation, isSubmitted } = this.props;

        if (!showTaxVatNumber) {
            return null;
        }

        return (
            <Field
              type="text"
              label={ __('Tax/VAT Number') }
              placeholder={ __('Your Tax/VAT Number') }
              id="taxvat"
              name="taxvat"
              validation={ vatNumberValidation }
              validateSeparately
              isSubmitted={ isSubmitted }
            />
        );
    }

    renderSubscribeToNewsletter() {
        const { onSubscriptionChange, isSubscriptionSelected, isSubmitted } = this.props;

        return (
            <Field
              type="checkbox"
              value="is_subscribed"
              label={ __('Subscribe to newsletter') }
              id="is_subscribed"
              mix={ { block: 'MyAccountOverlay', elem: 'Checkbox' } }
              name="is_subscribed"
              onChange={ onSubscriptionChange }
              checked={ isSubscriptionSelected }
              validateSeparately
              isSubmitted={ isSubmitted }
            />
        );
    }

    renderCreateAccountPersonalInfoFields() {
        const { newsletterActive, isSubmitted } = this.props;
        const { location: { state: { firstName = '', lastName = '' } = {} } } = history;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend>{ __('Personal Information') }</legend>
                <Field
                  type="text"
                  label={ __('First Name') }
                  id="firstname"
                  name="firstname"
                  placeholder={ __('Your first name') }
                  value={ firstName }
                  autocomplete="given-name"
                  validation={ ['notEmpty'] }
                  validateSeparately
                  isSubmitted={ isSubmitted }
                />
                <Field
                  type="text"
                  label={ __('Last Name') }
                  id="lastname"
                  name="lastname"
                  placeholder={ __('Your last name') }
                  value={ lastName }
                  autocomplete="family-name"
                  validation={ ['notEmpty'] }
                  validateSeparately
                  isSubmitted={ isSubmitted }
                />
                { this.renderVatNumberField() }
                { newsletterActive ? this.renderSubscribeToNewsletter() : null }
            </fieldset>
        );
    }

    renderCreateAccountSignUpInfoFields() {
        const { isSubmitted } = this.props;
        const { location: { state: { email = '' } = {} } } = history;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend>{ __('Sign-Up Information') }</legend>
                <Field
                  type="email"
                  label={ __('Email') }
                  id="email"
                  name="email"
                  placeholder={ __('Your email address') }
                  value={ email }
                  autocomplete="email"
                  validation={ ['notEmpty', 'email'] }
                  validateSeparately
                  isSubmitted={ isSubmitted }
                />
                <div block="MyAccountOverlay" elem="PasswordBlock">
                <Field
                  type="password"
                  label={ __('Password') }
                  id="password"
                  name="password"
                  placeholder={ __('Enter your password') }
                  autocomplete="new-password"
                  validation={ ['notEmpty', 'password'] }
                  validateSeparately
                  isSubmitted={ isSubmitted }
                />
                <Field
                  type="password"
                  label={ __('Confirm password') }
                  id="confirm_password"
                  name="confirm_password"
                  placeholder={ __('Retype your password') }
                  autocomplete="new-password"
                  validation={ ['notEmpty', 'password', 'password_match'] }
                  validateSeparately
                  isSubmitted={ isSubmitted }
                />
                </div>
            </fieldset>
        );
    }

    renderSubmitButton() {
        return (
            <div block="MyAccountOverlay" elem="Buttons">
                <button
                  block="Button"
                  type="submit"
                  mix={ { block: 'MyAccountOverlay', elem: 'SignUpButton' } }
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
                      mix={ { block: 'MyAccountOverlay', elem: 'SignInLink' } }
                      onClick={ handleSignIn }
                    >
                        { __('Sign in') }
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
