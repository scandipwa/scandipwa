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

// const variables = { customer: { firstname: 'andy', lastname: 'kek', email: 'bmw1234@mail.ru' }, password: 'Reactkek123' };

const STATE_SIGN_IN = 'signIn';
const STATE_FORGOT_PASSWORD = 'forgotPassword';
const STATE_CREATE_ACCOUNT = 'createAccount';
const STATE_VALIDATE_SIGN_UP = 'validateSignUp';
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
            },
            isLoggedIn: false,
            errors: {}
        };

        this.renderMap = {
            [STATE_SIGN_IN]: () => this.renderSignIn(),
            [STATE_FORGOT_PASSWORD]: () => this.renderForgotPassword(),
            [STATE_CREATE_ACCOUNT]: () => this.renderCreateAccount(),
            [STATE_VALIDATE_SIGN_UP]: () => this.renderValidateSignUp(),
            [STATE_LOGGED_IN]: () => this.renderAccountActions()
        };

        this.createSteps = [
            () => this.renderCreateAccountFirstStep(),
            () => this.renderCreateAccountSecondStep()
        ];

        this.button = React.createRef();
        this.error = React.createRef();

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
        const stateField = inputData.id.replace(/-/g, '');
        const stateValue = inputData.value;

        if (stateValue !== null && stateValue !== customerData[stateField]) {
            if (this.error.current && this.error.current.style.display === 'block') {
                this.error.current.style.display = 'none';
            }

            this.setState({
                customerData: {
                    ...customerData,
                    [stateField]: stateValue
                }
            });
        }

        this.validateField(stateField, stateValue);
    }

    /**
     * Field validation on field change
     * @param {String} fieldName
     * @param {String} value
     */
    validateField(fieldName, value) {
        const { customerData, errors } = this.state;

        if (value) {
            if (fieldName.includes('name')) {
                errors[fieldName] = value.length >= 2 && value.match(/^[a-zA-Z]*$/);
                return;
            }

            switch (fieldName) {
            case 'email':
                errors.email = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                break;
            case 'password':
                errors.password = value.length >= 8 && value.match(/^[a-zA-Z0-9]/);
                break;
            case 'confirmpassword':
                errors.confirmpassword = value === customerData.password && value.match(/^[a-zA-Z0-9]/);
                break;
            case 'addresstelephone':
                errors.addresstelephone = value.match(/^\+(?:[0-9] ?){6,14}[0-9]$/);
                break;
            default:
                errors[fieldName] = value.length > 0 && value.match(/^[a-zA-Z0-9 ]/);
                break;
            }
        }
    }

    handleSignUp() {
        const {
            customerData: {
                email,
                firstname,
                lastname,
                password
            }
        } = this.state;
        const { signUp } = this.props;
        const formattedData = { customer: { email, firstname, lastname }, password };

        signUp(formattedData);
    }

    /**
     * Change Account state, reset password states
     * @param {String} state
     */
    changeState(state) {
        const { customerData, errors } = this.state;

        this.setState({
            state,
            fieldsToValidate: [],
            customerData: {
                ...customerData,
                confirmpassword: '',
                password: ''
            },
            errors: {
                ...errors,
                password: false,
                confirmpassword: false
            }
        });

        this.button.current.focus();
    }

    /**
     * Switch between account creation steps, pass first and last name to shipping if first time
     * @param {Number} createStep
     */
    changeCreateAccountStep(createStep) {
        const { customerData, errors } = this.state;

        if (createStep === 0) {
            this.setState({
                errors: {
                    ...errors,
                    confirmpassword: false
                }
            });
        } else {
            this.setState({
                errors: {
                    ...errors,
                    addressfirstname: true,
                    addresslastname: true
                }
            });
        }

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

        if (state !== STATE_LOGGED_IN && state !== STATE_VALIDATE_SIGN_UP) {
            this.setState({ state: STATE_SIGN_IN, fieldsToValidate: [] });
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
                      id="email"
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
                  id="email"
                  key="email"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.email }
                  placeholder="JohnTitor@scandiweb.com"
                />
                <Field
                  type="text"
                  label="First name"
                  id="first-name"
                  key="firstname"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.firstname }
                />
                <Field
                  type="text"
                  label="Last name"
                  id="last-name"
                  key="lastname"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.lastname }
                />
                <Field
                  type="password"
                  label="Password"
                  id="password"
                  key="password"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.password }
                  placeholder="Must be at least 8 characters long.)"
                />
                <Field
                  type="password"
                  label="Confirm password"
                  id="confirm-password"
                  key="confirmpassword"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.confirmpassword }
                />
                <div block="MyAccount" elem="Error" ref={ this.error }>Passwords do not match!</div>
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
                  id="addressfirst-name"
                  key="address-firstname"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addressfirstname }
                />
                <Field
                  type="text"
                  label="Last name"
                  id="address-last-name"
                  key="addresslastname"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addresslastname }
                />
                <Field
                  type="text"
                  label="Telephone"
                  id="address-telephone"
                  key="telephone"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addresstelephone }
                />
                <Field
                  type="text"
                  label="Country"
                  id="address-country"
                  key="country"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addresscountry }
                />
                <Field
                  type="text"
                  label="City"
                  id="address-city"
                  key="city"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addresscity }
                />
                <Field
                  type="text"
                  label="Street"
                  id="address-street"
                  key="street"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.addressstreet }
                />
                <Field
                  type="text"
                  label="Postal code"
                  id="address-postcode"
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
        const { createStep, errors } = this.state;
        const { isLoading } = this.props;
        const showPrev = createStep > 0;
        const showNext = createStep < this.createSteps.length - 1;
        const showSubmit = createStep === this.createSteps.length - 1;
        const isValid = createStep === 0
            ? errors.email && errors.firstname && errors.lastname && errors.password && errors.confirmpassword
            : errors.addressfirstname && errors.addresslastname && errors.addresstelephone
                && errors.addresscountry && errors.addresscity && errors.addressstreet && errors.addresspostcode;

        return (
            <div block="MyAccount" elem="Buttons">
                { showPrev && (
                    <button
                      disabled={ isLoading }
                      onClick={ () => this.changeCreateAccountStep(createStep - 1) }
                    >
                        Previous step
                    </button>
                )}
                { showNext && (
                    <button
                      disabled={ !isValid }
                      onClick={ () => this.changeCreateAccountStep(createStep + 1) }
                    >
                        Next step
                    </button>
                )}
                { showSubmit && (
                    <button
                      disabled={ !isValid }
                      onClick={ () => {
                          this.handleSignUp();
                          window.scrollTo(0, 0);
                          this.changeState(STATE_VALIDATE_SIGN_UP);
                      } }
                    >
                        Sign up
                    </button>
                )}
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

    renderValidateSignUp() {
        const { data: { status }, isLoading } = this.props;
        const { isLoggedIn } = this.state;

        if (status === 'account_registered' && !isLoggedIn) {
            this.setState({ isLoggedIn: true });
            this.changeState(STATE_LOGGED_IN);
        } else if (!isLoading) {
            return (
                <div>
                    <p>Something went wrong :(</p>
                    <a
                      href="#create-account"
                      onClick={ () => {
                          this.changeCreateAccountStep(0);
                          this.changeState(STATE_CREATE_ACCOUNT);
                      } }
                    >
                        Retry here
                    </a>
                </div>
            );
        }

        return (
            isLoading && <p>Loading...</p>
        );
    }

    renderSignIn() {
        const { fieldsToValidate, customerData } = this.state;

        return (
            <>
                <form>
                    <h3>Sign in to your account</h3>
                    <Field
                      type="text"
                      label="Login or Email"
                      id="email"
                      key="email"
                      handleToUpdate={ this.handleToUpdate }
                      originalValue={ customerData.email }
                    />
                    <Field
                      type="password"
                      label="Password"
                      id="password"
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
