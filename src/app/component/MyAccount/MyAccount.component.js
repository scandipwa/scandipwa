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
import Form from 'Component/Form';
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
            createStep: 0
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

        this.changeState = this.changeState.bind(this);
    }

    changeState(state) {
        this.setState({ state });
    }

    changeCreateAccountStep(createStep) {
        this.setState({ createStep });
    }

    goBackToDefault() {
        const { state, isOpen } = this.state;

        if (state !== STATE_LOGGED_IN) {
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
              type="submit"
              block="MyAccount"
              elem="Button"
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
        return (
            <>
                <Form>
                    <h3>Get password reset link</h3>
                    <Field type="text" label="Email" id="forgot-email" />
                    <div block="MyAccount" elem="Buttons">
                        <button type="submit">Send reset link</button>
                    </div>
                </Form>
                <article block="MyAccount" elem="Additional">
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">Already have an account?</h4>
                        <a href="#sign-in" onClick={ () => this.changeState(STATE_SIGN_IN) }>Sign in here</a>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Don't have an account?</h4>
                        <a href="#create-account" onClick={ () => this.changeState(STATE_CREATE_ACCOUNT) }>Create an account</a>
                    </section>
                </article>
            </>
        );
    }

    renderCreateAccountFirstStep() {
        return (
            <>
                <h4>Specify customer details</h4>
                <Field type="text" label="Email" id="sign-up-email" />
                <Field type="text" label="First name" id="sign-up-first-name" />
                <Field type="text" label="Last name" id="sign-up-last-name" />
                <Field type="password" label="Password" id="sign-up-password" />
                <Field type="password" label="Confirm password" id="sign-up-confirm-password" />
            </>
        );
    }

    renderCreateAccountSecondStep() {
        return (
            <>
                <h4>Specify shipping address</h4>
                <Field type="text" label="First name" id="sign-up-address-first-name" />
                <Field type="text" label="Last name" id="sign-up-address-last-name" />
                <Field type="text" label="Telephone" id="sign-up-address-telephone" />
                <Field type="text" label="Country" id="sign-up-address-country" />
                <Field type="text" label="City" id="sign-up-address-city" />
                <Field type="text" label="Street" id="sign-up-address-stree" />
                <Field type="text" label="Postal code" id="sign-up-address-postcode" />
            </>
        );
    }

    renderCreateAccountStepAction() {
        const { createStep } = this.state;
        const showPrev = createStep > 0;
        const showNext = createStep < this.createSteps.length - 1;
        const showSubmit = createStep === this.createSteps.length - 1;

        return (
            <div block="MyAccount" elem="Buttons">
                { showPrev && <button type="submit" onClick={ () => this.changeCreateAccountStep(createStep - 1) }>Previous step</button> }
                { showNext && <button type="submit" onClick={ () => this.changeCreateAccountStep(createStep + 1) }>Next step</button> }
                { showSubmit && <button type="submit">Sign up</button> }
            </div>
        );
    }

    renderCreateAccount() {
        const { createStep } = this.state;
        const renderFunction = this.createSteps[createStep];

        return (
            <>
                <Form>
                    <h3>Create your account</h3>
                    { renderFunction() }
                    { this.renderCreateAccountStepAction() }
                </Form>
                <article block="MyAccount" elem="Additional">
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Already have an account?</h4>
                        <a href="#create-account" onClick={ () => this.changeState(STATE_SIGN_IN) }>Sign in here</a>
                    </section>
                </article>
            </>
        );
    }

    renderSignIn() {
        return (
            <>
                <Form>
                    <h3>Sign in to your account</h3>
                    <Field type="text" label="Login or Email" id="sign-in-email" />
                    <Field type="password" label="Password" id="sign-in-password" />
                    <div block="MyAccount" elem="Buttons">
                        <button>Sign in</button>
                    </div>
                </Form>
                <article block="MyAccount" elem="Additional">
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">Forgot password?</h4>
                        <a href="#password-reset" onClick={ () => this.changeState(STATE_FORGOT_PASSWORD) }>Get a password reset link</a>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Don't have an account?</h4>
                        <a href="#create-account" onClick={ () => this.changeState(STATE_CREATE_ACCOUNT) }>Create an account</a>
                    </section>
                </article>
            </>
        )
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
