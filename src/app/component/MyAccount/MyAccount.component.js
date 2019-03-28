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
            isLoggedIn: false
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

        this.changeState = this.changeState.bind(this);
        this.handleToUpdate = this.handleToUpdate.bind(this);
    }

    handleToUpdate(inputData) {
        const { fieldsToValidate, customerData, state } = this.state;
        const result = inputData.id.replace('sign-up-', '').replace(/-/g, '');

        if (state === 'createAccount' && inputData.value !== customerData[result]) {
            this.setState({
                customerData: {
                    ...customerData,
                    [result]: inputData.value
                }
            });
        }

        if (inputData.valid === false && fieldsToValidate.indexOf(inputData.id) === -1) {
            this.setState({ fieldsToValidate: [...fieldsToValidate, inputData.id] });
        }

        if (inputData.valid === true && fieldsToValidate.indexOf(inputData.id) !== -1) {
            const array = [...fieldsToValidate];
            array.splice(array.indexOf(inputData.id), 1);
            this.setState({ fieldsToValidate: array });
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

    changeState(state) {
        this.setState({
            state,
            fieldsToValidate: []
        });

        this.button.current.focus();
    }

    changeCreateAccountStep(createStep) {
        this.setState({
            createStep,
            fieldsToValidate: []
        });
        this.button.current.focus();
    }

    goBackToDefault() {
        const { state, isOpen } = this.state;

        if (state !== STATE_LOGGED_IN && state !== STATE_VALIDATE_SIGN_UP) {
            this.setState({ state: STATE_SIGN_IN });
        }

        this.setState({ isOpen: !isOpen });
    }

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

    renderForgotPassword() {
        const { fieldsToValidate } = this.state;

        return (
            <>
                <form>
                    <h3>Get password reset link</h3>
                    <Field type="text" label="Email" id="forgot-email" handleToUpdate={ this.handleToUpdate } />
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

    renderCreateAccountFirstStep() {
        const { customerData } = this.state;
        // TODO update all fields with keys and original values

        return (
            <>
                <h4>Specify customer details</h4>
                <Field
                  type="text"
                  label="Email"
                  id="sign-up-email"
                  handleToUpdate={ this.handleToUpdate }
                />
                <Field
                  type="text"
                  label="First name"
                  id="sign-up-first-name"
                  key="first-name"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ customerData.firstname }
                />
                <Field
                  type="text"
                  label="Last name"
                  id="sign-up-last-name"
                  handleToUpdate={ this.handleToUpdate }
                />
                <Field
                  type="password"
                  label="Password"
                  id="sign-up-password"
                  handleToUpdate={ this.handleToUpdate }
                />
                <Field
                  type="password"
                  label="Confirm password"
                  id="sign-up-confirm-password"
                  handleToUpdate={ this.handleToUpdate }
                />
            </>
        );
    }

    renderCreateAccountSecondStep() {
        const { customerData } = this.state;

        const result = (customerData.addressfirstname.length !== 0
            && customerData.addressfirstname !== customerData.firstname)
            ? customerData.addressfirstname
            : customerData.firstname;

        // TODO update all fields with keys and original values

        return (
            <>
                <h4>Specify shipping address</h4>
                <Field
                  key="first-name"
                  type="text"
                  label="First name"
                  id="sign-up-address-first-name"
                  handleToUpdate={ this.handleToUpdate }
                  originalValue={ result }
                />
                <Field
                  type="text"
                  label="Last name"
                  id="sign-up-address-last-name"
                  handleToUpdate={ this.handleToUpdate }
                />
                <Field
                  type="text"
                  label="Telephone"
                  id="sign-up-address-telephone"
                  handleToUpdate={ this.handleToUpdate }
                />
                <Field
                  type="text"
                  label="Country"
                  id="sign-up-address-country"
                  handleToUpdate={ this.handleToUpdate }
                />
                <Field
                  type="text"
                  label="City"
                  id="sign-up-address-city"
                  handleToUpdate={ this.handleToUpdate }
                />
                <Field
                  type="text"
                  label="Street"
                  id="sign-up-address-street"
                  handleToUpdate={ this.handleToUpdate }
                />
                <Field
                  type="text"
                  label="Postal code"
                  id="sign-up-address-postcode"
                  handleToUpdate={ this.handleToUpdate }
                />
            </>
        );
    }

    renderCreateAccountStepAction() {
        const { createStep, fieldsToValidate } = this.state;
        const { isLoading } = this.props;
        const showPrev = createStep > 0;
        const showNext = createStep < this.createSteps.length - 1;
        const showSubmit = createStep === this.createSteps.length - 1;

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
                      disabled={ fieldsToValidate.length !== 0 }
                      onClick={ () => this.changeCreateAccountStep(createStep + 1) }
                    >
                        Next step
                    </button>
                )}
                { showSubmit && (
                    <button
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
        const { fieldsToValidate } = this.state;

        return (
            <>
                <form>
                    <h3>Sign in to your account</h3>
                    <Field
                      type="text"
                      label="Login or Email"
                      id="sign-in-email"
                      handleToUpdate={ this.handleToUpdate }
                    />
                    <Field
                      type="password"
                      label="Password"
                      id="sign-in-password"
                      handleToUpdate={ this.handleToUpdate }
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
