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
import history from 'Util/History';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

import './MyAccountCreateAccount.style.scss';

/** @namespace Component/MyAccountCreateAccount/Component */
export class MyAccountCreateAccount extends PureComponent {
    static propTypes = {
        state: SignInStateType.isRequired,
        onError: PropTypes.func.isRequired,
        onSuccess: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        showTaxVatNumber: PropTypes.bool.isRequired,
        vatNumberRequired: PropTypes.bool.isRequired,
        newsletterActive: PropTypes.bool.isRequired
    };

    renderVatNumberField() {
        const { showTaxVatNumber, vatNumberRequired } = this.props;

        if (!showTaxVatNumber) {
            return null;
        }

        return (
            <Field
              type={ FIELD_TYPE.text }
              label={ __('Tax/VAT Number') }
              attr={ {
                  id: 'taxvat',
                  name: 'taxvat',
                  placeholder: __('Your Tax/VAT Number')
              } }
              validateOn={ ['onChange'] }
              validationRule={ {
                  isRequired: vatNumberRequired
              } }
              addRequiredTag={ vatNumberRequired }
            />
        );
    }

    renderSubscribeToNewsletter() {
        return (
            <Field
              type={ FIELD_TYPE.checkbox }
              label={ __('Subscribe to newsletter') }
              attr={ {
                  id: 'is_subscribed',
                  name: 'is_subscribed',
                  placeholder: __('Your Tax/VAT Number')
              } }
              mix={ { block: 'MyAccountOverlay', elem: 'Checkbox' } }
            />
        );
    }

    renderCreateAccountPersonalInfoFields() {
        const { newsletterActive } = this.props;
        const { location: { state: { firstName = '', lastName = '' } = {} } } = history;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend>{ __('Personal Information') }</legend>
                <Field
                  type={ FIELD_TYPE.text }
                  label={ __('First Name') }
                  attr={ {
                      id: 'firstname',
                      name: 'firstname',
                      defaultValue: firstName,
                      placeholder: __('Your first name'),
                      autocomplete: 'given-name'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      inputType: VALIDATION_INPUT_TYPE.alphaSpace,
                      isRequired: true
                  } }
                  addRequiredTag
                />
                <Field
                  type={ FIELD_TYPE.text }
                  label={ __('Last Name') }
                  attr={ {
                      id: 'lastname',
                      name: 'lastname',
                      defaultValue: lastName,
                      placeholder: __('Your last name'),
                      autocomplete: 'family-name'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      inputType: VALIDATION_INPUT_TYPE.alphaSpace,
                      isRequired: true
                  } }
                  addRequiredTag
                />
                { this.renderVatNumberField() }
                { newsletterActive ? this.renderSubscribeToNewsletter() : null }
            </fieldset>
        );
    }

    renderCreateAccountSignUpInfoFields() {
        const { location: { state: { email = '' } = {} } } = history;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend>{ __('Sign-Up Information') }</legend>
                <Field
                  type={ FIELD_TYPE.email }
                  label={ __('Email') }
                  attr={ {
                      id: 'email',
                      name: 'email',
                      defaultValue: email,
                      placeholder: __('Your email name'),
                      autocomplete: 'email'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: VALIDATION_INPUT_TYPE.email
                  } }
                  addRequiredTag
                />
                <div block="MyAccountOverlay" elem="PasswordBlock">
                    <Field
                      type={ FIELD_TYPE.password }
                      label={ __('Password') }
                      attr={ {
                          id: 'password',
                          name: 'password',
                          placeholder: __('Enter your password'),
                          autocomplete: 'new-password'
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                          inputType: VALIDATION_INPUT_TYPE.password,
                          match: (value) => {
                              const email = document.getElementById('email');
                              return value && email.value !== value;
                          },
                          customErrorMessages: {
                              onMatchFail: __('Passwords can\'t be the same as email!')
                          },
                          range: {
                              min: 8
                          }
                      } }
                      addRequiredTag
                    />
                    <Field
                      type={ FIELD_TYPE.password }
                      label={ __('Confirm password') }
                      attr={ {
                          id: 'confirm_password',
                          name: 'confirm_password',
                          placeholder: __('Retype your password'),
                          autocomplete: 'new-password'
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                          inputType: VALIDATION_INPUT_TYPE.password,
                          match: (value) => {
                              const password = document.getElementById('password');
                              return value && password.value === value;
                          },
                          customErrorMessages: {
                              onMatchFail: __('Passwords do not match!')
                          }
                      } }
                      addRequiredTag
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
        const { onError, onSuccess } = this.props;

        return (
            <Form
              key="create-account"
              onSubmit={ onSuccess }
              onError={ onError }
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
