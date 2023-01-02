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

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Form from 'Component/Form';
import { ReactElement } from 'Type/Common.type';
import history from 'Util/History';
import { validatePassword } from 'Util/Validator';
import { ValidationInputType } from 'Util/Validator/Config';

import { MyAccountCreateAccountComponentProps, MyAccountCreateAccountComponentState } from './MyAccountCreateAccount.type';

import './MyAccountCreateAccount.style.scss';

/** @namespace Component/MyAccountCreateAccount/Component */
export class MyAccountCreateAccountComponent<
P extends Readonly<MyAccountCreateAccountComponentProps> = Readonly<MyAccountCreateAccountComponentProps>,
S extends MyAccountCreateAccountComponentState = MyAccountCreateAccountComponentState,
> extends PureComponent<P, S> {
    renderVatNumberField(): ReactElement {
        const { showTaxVatNumber, vatNumberRequired } = this.props;

        if (!showTaxVatNumber) {
            return null;
        }

        return (
            <Field
              type={ FieldType.TEXT }
              label={ __('Tax/VAT Number') }
              attr={ {
                  id: 'taxvat',
                  name: 'taxvat',
                  placeholder: __('Your Tax/VAT Number'),
              } }
              validateOn={ ['onChange'] }
              validationRule={ {
                  isRequired: vatNumberRequired,
              } }
              addRequiredTag={ vatNumberRequired }
            />
        );
    }

    renderSubscribeToNewsletter(): ReactElement {
        return (
            <Field
              type={ FieldType.CHECKBOX }
              label={ __('Subscribe to newsletter') }
              attr={ {
                  id: 'is_subscribed',
                  name: 'is_subscribed',
                  placeholder: __('Your Tax/VAT Number'),
              } }
              mix={ { block: 'MyAccountOverlay', elem: 'Checkbox' } }
            />
        );
    }

    renderCreateAccountPersonalInfoFields(): ReactElement {
        const { newsletterActive } = this.props;
        const { location: { state: { firstName = '', lastName = '' } = {} } } = history;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend block="MyAccountOverlay" elem="PersonalInfoLegend">{ __('Personal Information') }</legend>
                <Field
                  type={ FieldType.TEXT }
                  label={ __('First Name') }
                  attr={ {
                      id: 'firstname',
                      name: 'firstname',
                      defaultValue: firstName,
                      placeholder: __('Your first name'),
                      autoComplete: 'given-name',
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      inputType: ValidationInputType.ALPHASPACE,
                      isRequired: true,
                  } }
                  addRequiredTag
                />
                <Field
                  type={ FieldType.TEXT }
                  label={ __('Last Name') }
                  attr={ {
                      id: 'lastname',
                      name: 'lastname',
                      defaultValue: lastName,
                      placeholder: __('Your last name'),
                      autoComplete: 'family-name',
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      inputType: ValidationInputType.ALPHASPACE,
                      isRequired: true,
                  } }
                  addRequiredTag
                />
                { this.renderVatNumberField() }
                { newsletterActive ? this.renderSubscribeToNewsletter() : null }
            </fieldset>
        );
    }

    renderCreateAccountSignUpInfoFields(): ReactElement {
        const { location: { state: { email = '' } = {} } } = history;
        const { range, minimunPasswordCharacter } = this.props;

        return (
            <fieldset block="MyAccountOverlay" elem="Legend">
                <legend block="MyAccountOverlay" elem="SignUpLegend">{ __('Sign-Up Information') }</legend>
                <Field
                  type={ FieldType.EMAIL }
                  label={ __('Email') }
                  attr={ {
                      id: 'email',
                      name: 'email',
                      defaultValue: email,
                      placeholder: __('Your email name'),
                      autoComplete: 'email',
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: ValidationInputType.EMAIL,
                  } }
                  addRequiredTag
                />
                <div block="MyAccountOverlay" elem="PasswordBlock">
                    <Field
                      type={ FieldType.PASSWORD }
                      label={ __('Password') }
                      attr={ {
                          id: 'password',
                          name: 'password',
                          placeholder: __('Enter your password'),
                          autoComplete: 'new-password',
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                          inputType: ValidationInputType.PASSWORD,
                          match: (value: string) => {
                              const email = document.getElementById('email') as HTMLInputElement;

                              if (value && email.value === value) {
                                  return __('Passwords can\'t be the same as email!');
                              }

                              return validatePassword(value, range, minimunPasswordCharacter);
                          },
                      } }
                      addRequiredTag
                    />
                    <Field
                      type={ FieldType.PASSWORD }
                      label={ __('Confirm password') }
                      attr={ {
                          id: 'confirm_password',
                          name: 'confirm_password',
                          placeholder: __('Retype your password'),
                          autoComplete: 'new-password',
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                          inputType: ValidationInputType.PASSWORD,
                          match: (value: string) => {
                              const password = document.getElementById('password') as HTMLInputElement;

                              return value && password.value === value;
                          },
                          customErrorMessages: {
                              onMatchFail: __('Passwords do not match!'),
                          },
                      } }
                      addRequiredTag
                    />
                </div>
            </fieldset>
        );
    }

    renderSubmitButton(): ReactElement {
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

    renderCreateAccountForm(): ReactElement {
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

    renderAdditionalField(): ReactElement {
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

    render(): ReactElement {
        return (
            <>
                { this.renderCreateAccountForm() }
                { this.renderAdditionalField() }
            </>
        );
    }
}

export default MyAccountCreateAccountComponent;
