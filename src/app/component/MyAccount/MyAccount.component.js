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

import React, { Component } from 'react';
import Field from 'Component/Field';
import './MyAccount.style';

const STATE_SIGN_IN = 'signIn';
const STATE_FORGOT_PASSWORD = 'forgotPassword';
const STATE_CREATE_ACCOUNT = 'createAccount';
const STATE_LOGGED_IN = 'loggedIn';

/**
 * My account popup
 * @class MyAccount
 */
class MyAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: STATE_SIGN_IN,
            createStep: 0,
            fieldsToValidate: [],
            customerData: {
                email: '',
                firstname: '',
                lastname: '',
                password: '',
                addressfirstname: '',
                addresslastname: '',
                addresstelephone: '',
                addresscountry: '',
                addresscity: '',
                addressstreet: '',
                addresspostcode: ''
            }
        };

        this.renderMap = {
            [STATE_SIGN_IN]: () => this.renderSignIn(),
            [STATE_FORGOT_PASSWORD]: () => this.renderForgotPassword(),
            [STATE_CREATE_ACCOUNT]: () => this.renderCreateAccount(),
            [STATE_LOGGED_IN]: () => this.renderAccountActions()
        };

        this.createSteps = [
            () => this.renderCreateAccountFirstStep(),
            () => this.renderCreateAccountSecondStep()
        ];

        this.button = React.createRef();

        this.changeState = this.changeState.bind(this);
        this.handleToUpdate = this.handleToUpdate.bind(this);
    }

    /**
     * Customer data saving in state
     * @param {Object} inputData
     */
    handleToUpdate(inputData) {
        const { customerData } = this.state;
        // For the moment state updated only for login/acc creation
        const stateField = inputData.id.replace('sign-up-', '').replace('sign-in-', '').replace(/-/g, '');

        if (inputData.value !== null && inputData.value !== customerData[stateField]) {
            this.setState({
                customerData: {
                    ...customerData,
                    [stateField]: inputData.value
                }
            });
        }

        this.updateValidation(inputData, stateField);
    }

    /**
     * Field validation for next step/login/send reset link
     * @param {Object} inputData
     * @param {String} stateField
     */
    updateValidation(inputData, stateField) {
        const { fieldsToValidate, customerData } = this.state;

        if (!customerData[stateField] && fieldsToValidate.indexOf(inputData.id) === -1) {
            this.setState({ fieldsToValidate: [...fieldsToValidate, inputData.id] });
        }

        if (inputData.value && fieldsToValidate.indexOf(inputData.id) !== -1) {
            const array = [...fieldsToValidate];
            array.splice(array.indexOf(inputData.id), 1);
            this.setState({ fieldsToValidate: array });
        }
    }

    /**
     * Update state when changing between account functionality, delete password from state
     * Reset field validation
     * @param {String} state
     */
    changeState(state) {
        const { customerData } = this.state;

        this.setState({
            state,
            fieldsToValidate: [],
            customerData: {
                ...customerData,
                confirmpassword: '',
                password: ''
            }
        });

        this.button.current.focus();
    }

    /**
     * Switch between account creation steps, pass first and last name to shipping if first time
     * @param {Number} createStep
     */
    changeCreateAccountStep(createStep) {
        const { customerData } = this.state;

        this.setState({
            createStep,
            fieldsToValidate: [],
            customerData: {
                ...customerData,
                confirmpassword: '',
                addressfirstname: customerData.addressfirstname || customerData.firstname,
                addresslastname: customerData.addresslastname || customerData.lastname
            }
        });
        this.button.current.focus();
    }

    /**
     * Go back to login page when clicking on account button
     */
    goBackToDefault() {
        const { state, isOpen } = this.state;

        if (state !== STATE_LOGGED_IN) {
            this.setState({
                state: STATE_SIGN_IN,
                fieldsToValidate: []
            });
        }

        this.setState({ isOpen: !isOpen });
    }

    /**
     * Render Button
     */
    renderButton() {
        const { state, isOpen } = this.state;
        const actionText = state === STATE_LOGGED_IN
            ? 'Hello, User'
            : 'My Account';

        return (
            <button
              block="MyAccount"
              elem="Button"
              ref={ this.button }
              mods={ { isOpen } }
              onClick={ () => this.goBackToDefault() }
            >
                <i
                  block="MyAccount"
                  elem="Icon"
                />
                <span>{ actionText }</span>
            </button>
        );
    }

    /**
     * Render Dropdown
     */
    renderDropdown() {
        const { state } = this.state;
        const renderFunction = this.renderMap[state];

        return (
            <div block="MyAccount" elem="Dropdown" mods={ { state } }>
                <div block="MyAccount" elem="Action" mods={ { state } }>
                    { renderFunction() }
                </div>
            </div>
        );
    }

    /**
     * Render Account Actions
     */
    renderAccountActions() {
        return (
            <nav block="MyAccount" elem="Navigation">
                <ul>
                    <li><a>My Account</a></li>
                    <li><a>My Orders</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </nav>
        );
    }

    /**
     * Render Forgot Password page
     */
    renderForgotPassword() {
        const { fieldsToValidate, customerData } = this.state;

        return (
            <>
                <form>
                    <h3>Get password reset link</h3>
                    <Field
                      type="text"
                      label="Email"
                      id="forgot-email"
                      key="email"
                      handleToUpdate={ this.handleToUpdate }
                      originalValue={ customerData.email }
                    />
                    <div block="MyAccount" elem="Buttons">
                        <button disabled={ fieldsToValidate.length !== 0 }>Send reset link</button>
                    </div>
                </form>
                <article block="MyAccount" elem="Additional">
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">Already have an account?</h4>
                        <a href="#sign-in" onClick={ () => this.changeState(STATE_SIGN_IN) }>Sign in here</a>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Don`t have an account?</h4>
                        <a
                          href="#create-account"
                          onClick={ () => this.changeState(STATE_CREATE_ACCOUNT) }
                        >
                        Create an account
                        </a>
                    </section>
                </article>
            </>
        );
    }

    /**
     * Render First step in Account Creation
     */
    renderCreateAccountFirstStep() {
        const { customerData } = this.state;

        return (
            <>
                <h4>Specify customer details</h4>
                <Field
                  type="text"
                  label="Email"
                  id="sign-up-email"
                  key="email"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.email }
                />
                <Field
                  type="text"
                  label="First name"
                  id="sign-up-first-name"
                  key="firstname"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.firstname }
                />
                <Field
                  type="text"
                  label="Last name"
                  id="sign-up-last-name"
                  key="lastname"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.lastname }
                />
                <Field
                  type="password"
                  label="Password"
                  id="sign-up-password"
                  key="password"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.password }
                />
                <Field
                  type="password"
                  label="Confirm password"
                  id="sign-up-confirm-password"
                  key="confirmpassword"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.confirmpassword }
                />
            </>
        );
    }

    /**
     * Render Second step in Account Creation
     */
    renderCreateAccountSecondStep() {
        const { customerData } = this.state;

        return (
            <>
                <h4>Specify shipping address</h4>
                <Field
                  type="text"
                  label="First name"
                  id="sign-up-address-first-name"
                  key="addressfirstname"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addressfirstname }
                />
                <Field
                  type="text"
                  label="Last name"
                  id="sign-up-address-last-name"
                  key="addresslastname"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addresslastname }
                />
                <Field
                  type="text"
                  label="Telephone"
                  id="sign-up-address-telephone"
                  key="telephone"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addresstelephone }
                />
                <Field
                  type="text"
                  label="Country"
                  id="sign-up-address-country"
                  key="country"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addresscountry }
                />
                <Field
                  type="text"
                  label="City"
                  id="sign-up-address-city"
                  key="city"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addresscity }
                />
                <Field
                  type="text"
                  label="Street"
                  id="sign-up-address-street"
                  key="street"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addressstreet }
                />
                <Field
                  type="text"
                  label="Postal code"
                  id="sign-up-address-postcode"
                  key="postcode"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addresspostcode }
                />
            </>
        );
    }

    /**
     * Render Previous/Next/Sign Up buttons
     * Can proceed only when all fields are valid and passwords match
     */
    renderCreateAccountStepAction() {
        const { createStep, fieldsToValidate, customerData } = this.state;
        const showPrev = createStep > 0;
        const showNext = createStep < this.createSteps.length - 1;
        const showSubmit = createStep === this.createSteps.length - 1;
        const isPasswordCorrect = (customerData.password === customerData.confirmpassword);

        return (
            <div block="MyAccount" elem="Buttons">
                { showPrev
                    && <button onClick={ () => this.changeCreateAccountStep(createStep - 1) }>Previous step</button> }
                { showNext && (
                    <button
                      disabled={ !(fieldsToValidate.length === 0 && isPasswordCorrect) }
                      onClick={ () => this.changeCreateAccountStep(createStep + 1) }
                    >
                    Next step
                    </button>
                )}

                { showSubmit && <button disabled={ fieldsToValidate.length !== 0 }>Sign up</button> }
            </div>
        );
    }

    /**
     * Render Account Creation
     */
    renderCreateAccount() {
        const { createStep } = this.state;
        const renderFunction = this.createSteps[createStep];

        return (
            <>
                <form>
                    <h3>Create your account</h3>
                    { renderFunction() }
                    { this.renderCreateAccountStepAction() }
                </form>
                <article block="MyAccount" elem="Additional">
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Already have an account?</h4>
                        <a href="#create-account" onClick={ () => this.changeState(STATE_SIGN_IN) }>Sign in here</a>
                    </section>
                </article>
            </>
        );
    }

    /**
     * Render Login
     */
    renderSignIn() {
        const { fieldsToValidate, customerData } = this.state;

        return (
            <>
                <form>
                    <h3>Sign in to your account</h3>
                    <Field
                      type="text"
                      label="Login or Email"
                      id="sign-in-email"
                      key="email"
                      handleToUpdate={ this.handleToUpdate }
                      originalValue={ customerData.email }
                    />
                    <Field
                      type="password"
                      label="Password"
                      id="sign-in-password"
                      key="password"
                      handleToUpdate={ this.handleToUpdate }
                      originalValue={ customerData.password }
                    />
                    <div block="MyAccount" elem="Buttons">
                        <button disabled={ fieldsToValidate.length !== 0 }>Sign in</button>
                    </div>
                </form>
                <article block="MyAccount" elem="Additional">
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">Forgot password?</h4>
                        <a
                          href="#password-reset"
                          onClick={ () => this.changeState(STATE_FORGOT_PASSWORD) }
                        >
                        Get a password reset link
                        </a>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Don`t have an account?</h4>
                        <a
                          href="#create-account"
                          onClick={ () => this.changeState(STATE_CREATE_ACCOUNT) }
                        >
                        Create an account
                        </a>
                    </section>
                </article>
            </>
        );
    }

    render() {
        return (
            <div block="MyAccount">
                { this.renderButton() }
                { this.renderDropdown() }
            </div>
        );
    }
}

export default MyAccount;
