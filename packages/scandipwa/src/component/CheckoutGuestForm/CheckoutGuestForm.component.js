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

import FieldForm from 'Component/FieldForm';
import MyAccountConfirmEmail from 'Component/MyAccountConfirmEmail';
import MyAccountForgotPassword from 'Component/MyAccountForgotPassword';
import MyAccountForgotPasswordSuccess from 'Component/MyAccountForgotPasswordSuccess';
import {
    STATE_CONFIRM_EMAIL,
    STATE_FORGOT_PASSWORD,
    STATE_FORGOT_PASSWORD_SUCCESS,
    STATE_LOGGED_IN,
    STATE_SIGN_IN
} from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import MyAccountSignIn from 'Component/MyAccountSignIn';
import { noopFn } from 'Util/Common';

import checkoutGuestForm from './CheckoutGuestForm.form';

import './CheckoutGuestForm.style';

/** @namespace Component/CheckoutGuestForm/Component */
export class CheckoutGuestForm extends FieldForm {
    static propTypes = {
        formId: PropTypes.string.isRequired,
        handleEmailInput: PropTypes.func.isRequired,
        handleCreateUser: PropTypes.func.isRequired,
        isEmailAvailable: PropTypes.bool.isRequired,
        emailValue: PropTypes.string.isRequired,
        signInState: PropTypes.string.isRequired,
        setSignInState: PropTypes.func.isRequired
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    componentDidUpdate(prevProps) {
        const { isEmailAvailable, setSignInState, signInState } = this.props;
        const { isEmailAvailable: prevIsEmailAvailable } = prevProps;

        if (!isEmailAvailable && prevIsEmailAvailable && signInState !== STATE_SIGN_IN) {
            setSignInState(STATE_SIGN_IN);
        }
    }

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
        [STATE_LOGGED_IN]: {
            render: noopFn
        },
        [STATE_CONFIRM_EMAIL]: {
            render: () => this.renderConfirmEmail(),
            title: __('Confirm the email')
        },
        '': {
            title: __('Enter personal information')
        }
    };

    get fieldMap() {
        const {
            handleEmailInput,
            handlePasswordInput,
            isCreateUser,
            emailValue
        } = this.props;

        return checkoutGuestForm({
            isCreateUser,
            emailValue
        }, {
            handleEmailInput,
            handlePasswordInput
        });
    }

    renderHeading() {
        return (
            <h2 block="Checkout" elem="Heading">
                { __('Enter personal information') }
            </h2>
        );
    }

    renderSignIn() {
        const {
            signInState,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            setLoadingState,
            onSignIn,
            emailValue,
            handleEmailInput,
            setSignInState
        } = this.props;

        return (
            <MyAccountSignIn
              state={ signInState }
              onFormError={ onFormError }
              handleForgotPassword={ handleForgotPassword }
              handleCreateAccount={ handleCreateAccount }
              isCheckout
              handleEmailInput={ handleEmailInput }
              setSignInState={ setSignInState }
              emailValue={ emailValue }
              setLoadingState={ setLoadingState }
              onSignIn={ onSignIn }
            />
        );
    }

    renderConfirmEmail() {
        const { signInState, handleSignIn } = this.props;

        return (
            <MyAccountConfirmEmail
              state={ signInState }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderForgotPassword() {
        const {
            signInState,
            onFormError,
            handleSignIn,
            handleCreateAccount,
            setSignInState,
            setLoadingState
        } = this.props;

        return (
            <MyAccountForgotPassword
              state={ signInState }
              onFormError={ onFormError }
              handleSignIn={ handleSignIn }
              handleCreateAccount={ handleCreateAccount }
              setLoadingState={ setLoadingState }
              setSignInState={ setSignInState }
              isCheckout
            />
        );
    }

    renderForgotPasswordSuccess() {
        const { signInState, handleSignIn } = this.props;

        return (
            <MyAccountForgotPasswordSuccess
              state={ signInState }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderSignInForm() {
        const {
            signInState,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            isCheckout,
            setLoadingState,
            onSignIn
        } = this.props;

        return (
            <MyAccountSignIn
              state={ signInState }
              onFormError={ onFormError }
              handleForgotPassword={ handleForgotPassword }
              handleCreateAccount={ handleCreateAccount }
              isCheckout={ isCheckout }
              setLoadingState={ setLoadingState }
              onSignIn={ onSignIn }
            />
        );
    }

    renderFormBody() {
        return (
            <>
                { super.renderFormBody() }
                <span>{ __('You can create an account after checkout') }</span>
            </>
        );
    }

    renderForm() {
        const { signInState } = this.props;
        const { render } = this.renderMap[signInState] || {};

        return typeof render === 'function' ? render() : super.render();
    }

    render() {
        return (
            <div
              block="CheckoutGuestForm"
              mix={ { block: 'FieldForm' } }
            >
                { this.renderForm() }
            </div>
        );
    }
}

export default CheckoutGuestForm;
