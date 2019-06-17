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
import PropTypes from 'prop-types';
import { isSignedIn } from 'Util/Auth';
import Field from 'Component/Field';
import Form from 'Component/Form';
import { Link } from 'react-router-dom';
import Loader from 'Component/Loader';
import './MyAccount.style';

export const STATE_SIGN_IN = 'signIn';
export const STATE_FORGOT_PASSWORD = 'forgotPassword';
export const STATE_CREATE_ACCOUNT = 'createAccount';
export const STATE_LOGGED_IN = 'loggedIn';

/**
 * My account popup
 * @class MyAccount
 */
class MyAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: isSignedIn() ? STATE_LOGGED_IN : STATE_SIGN_IN,
            isHovered: false,
            isOpen: false,
            isLoading: false,
            // eslint-disable-next-line react/no-unused-state
            isPasswordForgotSend: props.isPasswordForgotSend,
            isSubscribed: false
        };

        this.renderMap = {
            [STATE_SIGN_IN]: () => this.renderSignIn(),
            [STATE_FORGOT_PASSWORD]: () => this.renderForgotPassword(),
            [STATE_CREATE_ACCOUNT]: () => this.renderCreateAccount(),
            [STATE_LOGGED_IN]: () => this.renderAccountActions()
        };

        this.changeState = this.changeState.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        const { isSignedIn, isPasswordForgotSend, showNotification } = props;
        const { isPasswordForgotSend: currentIsPasswordForgotSend, state: myAccountState } = state;
        const stateToBeUpdated = {};

        if (myAccountState !== STATE_LOGGED_IN && isSignedIn) {
            stateToBeUpdated.isLoading = false;
            showNotification('success', __('You are successfully logged in!'));
            stateToBeUpdated.state = STATE_LOGGED_IN;
        }

        if (myAccountState === STATE_LOGGED_IN && !isSignedIn) {
            stateToBeUpdated.state = STATE_SIGN_IN;
            showNotification('success', __('You are successfully logged out!'));
        }

        if (isPasswordForgotSend !== currentIsPasswordForgotSend) {
            stateToBeUpdated.isLoading = false;
            stateToBeUpdated.isPasswordForgotSend = isPasswordForgotSend;
            showNotification('success', __(`If there is an account associated with the
            provided address you will receive an email with a link to reset your password.`));
            stateToBeUpdated.state = STATE_SIGN_IN;
        }

        return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }

    onSignInSuccess(fields) {
        const { signIn } = this.props;
        signIn(fields);
    }

    onSignInAttempt() {
        this.setState({ isLoading: true });
    }

    onCreateAccountAttempt(fields, invalidFields) {
        const { showNotification } = this.props;
        if (invalidFields) {
            showNotification('error', __('Incorrect data! Please resolve all field validation errors.'));
        }
        this.setState({ isLoading: !invalidFields });
    }

    onCreateAccountSuccess(fields) {
        const { createAccount } = this.props;
        const {
            password,
            email,
            firstname,
            lastname,
            is_subscribed
        } = fields;
        const customerData = {
            customer: {
                firstname,
                lastname,
                email,
                is_subscribed
            },
            password
        };

        createAccount(customerData);
    }

    onForgotPasswordSuccess(fields) {
        const { forgotPassword } = this.props;
        forgotPassword(fields);
    }

    onForgotPasswordAttempt() {
        this.setState({ isLoading: true });
    }

    onFormError() {
        this.setState({ isLoading: false });
    }

    changeState(state) {
        this.setState({ state });
    }

    goBackToDefault() {
        const { state, isOpen } = this.state;

        if (state !== STATE_LOGGED_IN) {
            this.setState({ state: STATE_SIGN_IN });
        }

        this.setState({ isOpen: !isOpen });
    }

    renderButton() {
        const { isOpen, isHovered } = this.state;

        return (
            <button
              type="submit"
              block="MyAccount"
              elem="Button"
              mods={ { isOpen, isHovered } }
              onClick={ () => this.goBackToDefault() }
            >
                <i
                  block="MyAccount"
                  elem="Icon"
                />
                <span>{ __('My Account') }</span>
            </button>
        );
    }

    renderDropdown() {
        const { state, isLoading } = this.state;
        const renderFunction = this.renderMap[state];

        return (
            <div
              block="MyAccount"
              elem="Dropdown"
              mods={ { state } }
              onMouseEnter={ () => this.setState({ isHovered: true }) }
              onMouseLeave={ () => this.setState({ isHovered: false }) }
            >
                <Loader isLoading={ isLoading } />
                <div block="MyAccount" elem="Action" mods={ { state } }>
                    { renderFunction() }
                </div>
            </div>
        );
    }

    renderAccountActions() {
        const { logout } = this.props;

        const linkTo = {
            pathname: '/my-account',
            state: 'accountOverview'
        };

        return (
            <nav block="MyAccount" elem="Navigation">
                <ul>
                    <li><Link to={ linkTo }>{ __('My Account') }</Link></li>
                    <li>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => logout() }
                        >
                            { __('My Orders') }
                        </button>
                    </li>
                    <li>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => logout() }
                        >
                            { __('Logout') }
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    renderForgotPassword() {
        return (
            <>
                <Form
                  key="forgot-password"
                  onSubmit={ () => this.onForgotPasswordAttempt() }
                  onSubmitSuccess={ fields => this.onForgotPasswordSuccess(fields) }
                  onSubmitError={ () => this.onFormError() }
                >
                    <h3>{ __('Get password reset link') }</h3>
                    <Field type="text" label={ __('Email') } id="email" validation={ ['notEmpty', 'email'] } />
                    <div block="MyAccount" elem="Buttons">
                        <button type="submit">{ __('Send reset link') }</button>
                    </div>
                </Form>
                <article block="MyAccount" elem="Additional">
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">{ __('Already have an account?') }</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => this.changeState(STATE_SIGN_IN) }
                        >
                            { __('Sign in here') }
                        </button>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">{ __('Don`t have an account?') }</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => this.changeState(STATE_CREATE_ACCOUNT) }
                        >
                            { __('Create an account') }
                        </button>
                    </section>
                </article>
            </>
        );
    }

    renderCreateAccount() {
        const { isSubscribed } = this.state;

        return (
            <>
                <Form
                  key="create-account"
                  onSubmit={ () => this.onCreateAccountAttempt() }
                  onSubmitSuccess={ fields => this.onCreateAccountSuccess(fields) }
                  onSubmitError={ (fields, invalidFields) => this.onCreateAccountAttempt(fields, invalidFields) }
                >
                    <h3>{ __('Create your account') }</h3>
                    <fieldset block="MyAccount" elem="Legend">
                        <legend>{ __('Personal Information') }</legend>
                        <Field type="text" label={ __('First name') } id="firstname" validation={ ['notEmpty'] } />
                        <Field type="text" label={ __('Last name') } id="lastname" validation={ ['notEmpty'] } />
                        <Field
                          block="MyAccount"
                          elem="Checkbox"
                          type="checkbox"
                          label={ __('Subscribe to ScandiPWA newsletter') }
                          id="is_subscribed"
                          checked={ isSubscribed }
                          value={ isSubscribed }
                          onChange={ value => this.setState({ isSubscribed: value }) }
                        />
                    </fieldset>
                    <fieldset block="MyAccount" elem="Legend">
                        <legend>{ __('Sign-Up Information') }</legend>
                        <Field type="text" label={ __('Email') } id="email" validation={ ['notEmpty', 'email'] } />
                        <Field
                          type="password"
                          label={ __('Password') }
                          id="password"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label={ __('Confirm password') }
                          id="confirm_password"
                          validation={ ['notEmpty', 'password'] }
                        />
                    </fieldset>
                    <div block="MyAccount" elem="Buttons">
                        <button type="submit">{ __('Sign up') }</button>
                    </div>
                </Form>
                <article block="MyAccount" elem="Additional">
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">{ __('Already have an account?') }</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => this.changeState(STATE_SIGN_IN) }
                        >
                            { __('Sign in here') }
                        </button>
                    </section>
                </article>
            </>
        );
    }

    renderSignIn() {
        return (
            <>
                <Form
                  key="sign-in"
                  onSubmit={ () => this.onSignInAttempt() }
                  onSubmitSuccess={ fields => this.onSignInSuccess(fields) }
                  onSubmitError={ () => this.onFormError() }
                >
                    <h3>{ __('Sign in to your account') }</h3>
                    <Field
                      type="text"
                      label={ __('Login or Email') }
                      id="email"
                      validation={ ['notEmpty', 'email'] }
                    />
                    <Field
                      type="password"
                      label={ __('Password') }
                      id="password"
                      validation={ ['notEmpty', 'password'] }
                    />
                    <div block="MyAccount" elem="Buttons">
                        <button>{ __('Sign in') }</button>
                    </div>
                </Form>
                <article block="MyAccount" elem="Additional">
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">{ __('Forgot password?') }</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => this.changeState(STATE_FORGOT_PASSWORD) }
                        >
                            { __('Get a password reset link') }
                        </button>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">{ __('Don`t have an account?') }</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => this.changeState(STATE_CREATE_ACCOUNT) }
                        >
                            { __('Create an account') }
                        </button>
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

MyAccount.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    isPasswordForgotSend: PropTypes.bool.isRequired,
    showNotification: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

export default MyAccount;
