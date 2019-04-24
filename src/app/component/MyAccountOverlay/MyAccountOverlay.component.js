import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MyAccountOverlay.style';
import Overlay from 'Component/Overlay';
import Form from 'Component/Form';
import Field from 'Component/Field';
import { CUSTOMER_ACCOUNT } from '../Header/Header.component';

const STATE_SIGN_IN = 'signIn';
const STATE_FORGOT_PASSWORD = 'forgotPassword';
const STATE_FORGOT_PASSWORD_SUCCESS = 'forgotPasswordSuccess';
const STATE_CREATE_ACCOUNT = 'createAccount';
const STATE_LOGGED_IN = 'loggedIn';

class MyAccountOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: STATE_SIGN_IN
        };

        this.renderMap = {
            [STATE_SIGN_IN]: () => this.renderSignIn(),
            [STATE_FORGOT_PASSWORD]: () => this.renderForgotPassword(),
            [STATE_FORGOT_PASSWORD_SUCCESS]: () => this.renderForgotPasswordSuccess(),
            [STATE_CREATE_ACCOUNT]: () => this.renderCreateAccount(),
            [STATE_LOGGED_IN]: () => this.renderAccountActions()
        };

        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleForgotPasswordSuccess = this.handleForgotPasswordSuccess.bind(this);
        this.handleCreateAccount = this.handleCreateAccount.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        const { isOverlayVisible } = props;

        if (isOverlayVisible === false) {
            return {
                ...state,
                state: STATE_SIGN_IN
            };
        }

        return { ...state };
    }

    /* eslint-disable-next-line */
    componentDidUpdate() {
        const { isOverlayVisible, setHeaderState } = this.props;
        const { state } = this.state;

        if (isOverlayVisible) {
            switch (state) {
            case STATE_SIGN_IN:
                return setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Sign in' });
            case STATE_CREATE_ACCOUNT:
                return setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Create account' });
            case STATE_FORGOT_PASSWORD:
                return setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Get password link' });
            case STATE_FORGOT_PASSWORD_SUCCESS:
                return setHeaderState({ name: CUSTOMER_ACCOUNT, title: 'Get password link' });
            case STATE_LOGGED_IN:
                return setHeaderState({ name: CUSTOMER_ACCOUNT });
            default:
                break;
            }
        }
    }

    handleForgotPassword() {
        this.setState({ state: STATE_FORGOT_PASSWORD });
    }

    handleForgotPasswordSuccess() {
        this.setState({ state: STATE_FORGOT_PASSWORD_SUCCESS });
    }

    handleSignIn() {
        this.setState({ state: STATE_SIGN_IN });
    }

    handleCreateAccount() {
        this.setState({ state: STATE_CREATE_ACCOUNT });
    }

    renderMyAccount() {
        const { isOverlayVisible: isVisible } = this.props;
        const { state } = this.state;
        const renderFunction = this.renderMap[state];

        return (
            <div block="MyAccountOverlay" mods={ { isVisible } }>
                <div block="MyAccountOverlay" elem="Action" mods={ { state } }>
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
            <nav block="MyAccountOverlay" elem="Navigation">
                <ul>
                    <li><Link to={ linkTo }>My Account</Link></li>
                    <li>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ () => logout() }
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }

    renderForgotPassword() {
        const { state } = this.state;

        return (
            <>
                <Form
                  key="forgot-password"
                  onSubmit={ () => this.onForgotPasswordAttempt() }
                  onSubmitSuccess={ fields => this.onForgotPasswordSuccess(fields) }
                  onSubmitError={ () => this.onFormError() }
                >
                    <Field type="text" id="email" label="Email" validation={ ['notEmpty', 'email'] } />
                    <div block="MyAccountOverlay" elem="Buttons">
                        <button block="Button" type="submit" onClick={ this.handleForgotPasswordSuccess }>
                            Reset password
                        </button>
                    </div>
                </Form>
                <article block="MyAccountOverlay" elem="Additional" mods={ { state } }>
                    <section aria-labelledby="forgot-password-labe">
                        <h4 id="forgot-password-label">Already have an account?</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ this.handleSignIn }
                        >
                            Sign in here
                        </button>
                    </section>
                    <section aria-labelledby="create-account-label">
                        <h4 id="create-account-label">Don&apos;t have an account?</h4>
                        <button
                          block="Button"
                          mods={ { likeLink: true } }
                          onClick={ this.handleCreateAccount }
                        >
                            Create an account
                        </button>
                    </section>
                </article>
            </>
        );
    }

    renderForgotPasswordSuccess() {
        const { state } = this.state;

        return (
            <article
              aria-labelledby="forgot-password-success"
              block="MyAccountOverlay"
              elem="Additional"
              mods={ { state } }
            >
                <h4 id="forgot-password-success">
                    If there is an account associated with the provided address you will receive an email with a link to reset your password
                </h4>
                <button
                  block="Button"
                  onClick={ this.handleSignIn }
                >
                    Got it
                </button>
            </article>
        );
    }

    renderCreateAccount() {
        return (
            <>
                <Form
                  key="create-account"
                  onSubmit={ () => this.onCreateAccountAttempt() }
                  onSubmitSuccess={ fields => this.onCreateAccountSuccess(fields) }
                  onSubmitError={ (fields, invalidFields) => this.onCreateAccountAttempt(fields, invalidFields) }
                >
                    <fieldset block="MyAccountOverlay" elem="Legend">
                        <legend>Personal Information</legend>
                        <Field type="text" label="First Name" id="firstname" validation={ ['notEmpty'] } />
                        <Field type="text" label="Last Name" id="lastname" validation={ ['notEmpty'] } />
                        <Field
                          block="MyAccountOverlay"
                          elem="Checkbox"
                          type="checkbox"
                          label="Subscribe to ScandiPWA newsletter"
                          id="is_subscribed"
                        />
                    </fieldset>
                    <fieldset block="MyAccountOverlay" elem="Legend">
                        <legend block="MyAccountOverlay" elem="Legend" mods={ { type: 'signUp' } }>
                            Sign-Up Information
                        </legend>
                        <Field type="text" label="Email" id="email" validation={ ['notEmpty', 'email'] } />
                        <Field
                          type="password"
                          label="Password"
                          id="password"
                          validation={ ['notEmpty', 'password'] }
                        />
                        <Field
                          type="password"
                          label="Confirm password"
                          id="confirm_password"
                          validation={ ['notEmpty', 'password'] }
                        />
                    </fieldset>
                    <div block="MyAccountOverlay" elem="Buttons">
                        <button block="Button" type="submit">Sign up</button>
                    </div>
                </Form>
            </>
        );
    }

    renderSignIn() {
        const { state } = this.state;

        return (
            <>
                <Form
                  key="sign-in"
                  onSubmit={ () => this.onSignInAttempt() }
                  onSubmitSuccess={ fields => this.onSignInSuccess(fields) }
                  onSubmitError={ () => this.onFormError() }
                >
                    <Field
                      type="text"
                      label="Email or login"
                      id="email"
                      validation={ ['notEmpty', 'email'] }
                    />
                    <Field
                      type="password"
                      label="Password"
                      id="password"
                      validation={ ['notEmpty', 'password'] }
                    />
                    <div block="MyAccountOverlay" elem="Buttons">
                        <button block="Button">Sign in</button>
                    </div>
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ this.handleForgotPassword }
                    >
                        Forgot password?
                    </button>
                </Form>
                <article block="MyAccountOverlay" elem="Additional" mods={ { state } }>
                    <section aria-label="new to ScandiPWA?">
                        <h4 id="forgot-password-label">New to ScandiPWA?</h4>
                        <button
                          block="Button"
                          onClick={ this.handleCreateAccount }
                        >
                            Create new account
                        </button>
                    </section>
                </article>
            </>
        );
    }

    render() {
        return (
            <Overlay
              id="customer_account"
              mix={ { block: 'MyAccountOverlay' } }
            >
                { this.renderMyAccount() }
            </Overlay>
        );
    }
}

MyAccountOverlay.propTypes = {
    logout: PropTypes.func.isRequired,
    isOverlayVisible: PropTypes.bool.isRequired,
    setHeaderState: PropTypes.func.isRequired
};

export default MyAccountOverlay;
