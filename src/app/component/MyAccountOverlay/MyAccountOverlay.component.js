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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Form from 'Component/Form';
import isMobile from 'Util/Mobile';
import Field from 'Component/Field';
import Loader from 'Component/Loader';
import Overlay from 'Component/Overlay';

import './MyAccountOverlay.style';

export const STATE_SIGN_IN = 'signIn';
export const STATE_FORGOT_PASSWORD = 'forgotPassword';
export const STATE_FORGOT_PASSWORD_SUCCESS = 'forgotPasswordSuccess';
export const STATE_CREATE_ACCOUNT = 'createAccount';
export const STATE_LOGGED_IN = 'loggedIn';

export const CUSTOMER_ACCOUNT_OVERLAY_KEY = 'customer_account';

class MyAccountOverlay extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        isOverlayVisible: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        state: PropTypes.oneOf([
            STATE_SIGN_IN,
            STATE_FORGOT_PASSWORD,
            STATE_FORGOT_PASSWORD_SUCCESS,
            STATE_CREATE_ACCOUNT,
            STATE_LOGGED_IN
        ]).isRequired,
        onVisible: PropTypes.func.isRequired,
        onSignInSuccess: PropTypes.func.isRequired,
        onSignInAttempt: PropTypes.func.isRequired,
        onCreateAccountAttempt: PropTypes.func.isRequired,
        onCreateAccountSuccess: PropTypes.func.isRequired,
        onForgotPasswordSuccess: PropTypes.func.isRequired,
        onForgotPasswordAttempt: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleForgotPassword: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired
    };

    renderMap = {
        [STATE_SIGN_IN]: {
            render: () => this.renderSignIn(),
            title: __('Sign in to your account')
        },
        [STATE_FORGOT_PASSWORD]: {
            render: () => this.renderForgotPassword(),
            title: __('Get password link')
        },
        [STATE_FORGOT_PASSWORD_SUCCESS]: {
            render: () => this.renderForgotPasswordSuccess()
        },
        [STATE_CREATE_ACCOUNT]: {
            render: () => this.renderCreateAccount(),
            title: __('Create new account')
        },
        [STATE_LOGGED_IN]: {
            render: () => {}
        }
    };

    renderMyAccount() {
        const { state } = this.props;
        const { render, title } = this.renderMap[state];

        return (
            <div block="MyAccountOverlay" elem="Action" mods={ { state } }>
                <p block="MyAccountOverlay" elem="Heading">{ title }</p>
                { render() }
            </div>
        );
    }

    renderForgotPassword() {
        const {
            state,
            onForgotPasswordAttempt,
            onForgotPasswordSuccess,
            onFormError,
            handleSignIn,
            handleCreateAccount
        } = this.props;

        return (
            <>
                <Form
                  key="forgot-password"
                  onSubmit={ onForgotPasswordAttempt }
                  onSubmitSuccess={ onForgotPasswordSuccess }
                  onSubmitError={ onFormError }
                >
                    <Field type="text" id="email" name="email" label="Email" validation={ ['notEmpty', 'email'] } />
                    <div block="MyAccountOverlay" elem="Buttons">
                        <button block="Button" type="submit">
                            { __('Send reset link') }
                        </button>
                    </div>
                </Form>
                <article block="MyAccountOverlay" elem="Additional" mods={ { state } }>
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">{ __('Already have an account?') }</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ handleSignIn }
                        >
                            { __('Sign in here') }
                        </button>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">{ __('Don`t have an account?') }</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ handleCreateAccount }
                        >
                            { __('Create an account') }
                        </button>
                    </section>
                </article>
            </>
        );
    }

    renderForgotPasswordSuccess() {
        const { state, handleSignIn } = this.props;

        return (
            <article
              aria-labelledby="forgot-password-success"
              block="MyAccountOverlay"
              elem="Additional"
              mods={ { state } }
            >
                <h4 id="forgot-password-success">
                    { // eslint-disable-next-line max-len
                    __('If there is an account associated with the provided address you will receive an email with a link to reset your password') }
                </h4>
                <button
                  block="Button"
                  onClick={ handleSignIn }
                >
                    { __('Got it') }
                </button>
            </article>
        );
    }

    renderCreateAccount() {
        const {
            state,
            onCreateAccountAttempt,
            onCreateAccountSuccess,
            handleSignIn
        } = this.props;

        return (
            <>
                <Form
                  key="create-account"
                  onSubmit={ onCreateAccountAttempt }
                  onSubmitSuccess={ onCreateAccountSuccess }
                  onSubmitError={ onCreateAccountAttempt }
                >
                    <fieldset block="MyAccountOverlay" elem="Legend">
                        <legend>{ __('Personal Information') }</legend>
                        <Field
                          type="text"
                          label={ __('First Name') }
                          id="firstname"
                          name="firstname"
                          validation={ ['notEmpty'] }
                        />
                        <Field
                          type="text"
                          label={ __('Last Name') }
                          id="lastname"
                          name="lastname"
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
                    <fieldset block="MyAccountOverlay" elem="Legend">
                        <legend>{ __('Sign-Up Information') }</legend>
                        <Field type="text" label="Email" id="email" name="email" validation={ ['notEmpty', 'email'] } />
                        <Field
                          type="password"
                          label={ __('Password') }
                          id="password"
                          name="password"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label={ __('Confirm password') }
                          id="confirm_password"
                          name="confirm_password"
                          validation={ ['notEmpty', 'password', 'password_match'] }
                        />
                    </fieldset>
                    <div block="MyAccountOverlay" elem="Buttons">
                        <button block="Button" type="submit">{ __('Sign up') }</button>
                    </div>
                </Form>
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
            </>
        );
    }

    renderSignIn() {
        const {
            state,
            onSignInAttempt,
            onSignInSuccess,
            onFormError,
            handleForgotPassword,
            handleCreateAccount
        } = this.props;

        return (
            <>
                <Form
                  key="sign-in"
                  onSubmit={ onSignInAttempt }
                  onSubmitSuccess={ onSignInSuccess }
                  onSubmitError={ onFormError }
                >
                    <Field
                      type="text"
                      label={ __('Login or Email') }
                      id="email"
                      name="email"
                      validation={ ['notEmpty', 'email'] }
                    />
                    <Field
                      type="password"
                      label={ __('Password') }
                      id="password"
                      name="password"
                      validation={ ['notEmpty', 'password'] }
                    />
                    <div block="MyAccountOverlay" elem="Buttons">
                        <button block="Button">{ __('Sign in') }</button>
                    </div>
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ handleForgotPassword }
                    >
                        { __('Forgot password?') }
                    </button>
                </Form>
                <article block="MyAccountOverlay" elem="Additional" mods={ { state } }>
                    <section>
                        <h4 id="forgot-password-label">{ __('Don`t have an account?') }</h4>
                        <button
                          block="Button"
                          mods={ { isHollow: true } }
                          onClick={ handleCreateAccount }
                        >
                            { __('Create an account') }
                        </button>
                    </section>
                </article>
            </>
        );
    }

    render() {
        const { isLoading, onVisible } = this.props;

        return (
            <Overlay
              id={ CUSTOMER_ACCOUNT_OVERLAY_KEY }
              mix={ { block: 'MyAccountOverlay' } }
              onVisible={ onVisible }
              isStatic={ !!isMobile.any() }
            >
                <Loader isLoading={ isLoading } />
                { this.renderMyAccount() }
            </Overlay>
        );
    }
}

export default withRouter(MyAccountOverlay);
