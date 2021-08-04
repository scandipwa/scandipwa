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
import { withRouter } from 'react-router-dom';

import Loader from 'Component/Loader';
import MyAccountConfirmEmail from 'Component/MyAccountConfirmEmail';
import MyAccountCreateAccount from 'Component/MyAccountCreateAccount';
import MyAccountForgotPassword from 'Component/MyAccountForgotPassword';
import MyAccountForgotPasswordSuccess from 'Component/MyAccountForgotPasswordSuccess';
import MyAccountSignIn from 'Component/MyAccountSignIn';
import Overlay from 'Component/Overlay';
import { signInStateType } from 'Type/Account';
import { DeviceType } from 'Type/Device';

import {
    CUSTOMER_ACCOUNT_OVERLAY_KEY,
    STATE_CONFIRM_EMAIL,
    STATE_CREATE_ACCOUNT,
    STATE_FORGOT_PASSWORD,
    STATE_FORGOT_PASSWORD_SUCCESS,
    STATE_LOGGED_IN,
    STATE_SIGN_IN
} from './MyAccountOverlay.config';

import './MyAccountOverlay.style';

/** @namespace Component/MyAccountOverlay/Component */
export class MyAccountOverlay extends PureComponent {
    static propTypes = {
        // eslint-disable-next-line react/no-unused-prop-types
        isOverlayVisible: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        state: signInStateType.isRequired,
        setSignInState: PropTypes.func.isRequired,
        setLoadingState: PropTypes.func.isRequired,
        onVisible: PropTypes.func.isRequired,
        onFormError: PropTypes.func.isRequired,
        handleForgotPassword: PropTypes.func.isRequired,
        handleSignIn: PropTypes.func.isRequired,
        handleCreateAccount: PropTypes.func.isRequired,
        isCheckout: PropTypes.bool,
        device: DeviceType.isRequired,
        onSignIn: PropTypes.func.isRequired
    };

    static defaultProps = {
        isCheckout: false
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
        },
        [STATE_CONFIRM_EMAIL]: {
            render: () => this.renderConfirmEmail(),
            title: __('Confirm the email')
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

    renderConfirmEmail() {
        const { state, handleSignIn } = this.props;

        return (
            <MyAccountConfirmEmail
              state={ state }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderForgotPassword() {
        const {
            state,
            onFormError,
            handleSignIn,
            handleCreateAccount,
            setSignInState,
            setLoadingState,
            isCheckout
        } = this.props;

        return (
            <MyAccountForgotPassword
              state={ state }
              onFormError={ onFormError }
              handleSignIn={ handleSignIn }
              handleCreateAccount={ handleCreateAccount }
              setLoadingState={ setLoadingState }
              setSignInState={ setSignInState }
              isCheckout={ isCheckout }
            />
        );
    }

    renderForgotPasswordSuccess() {
        const { state, handleSignIn } = this.props;

        return (
            <MyAccountForgotPasswordSuccess
              state={ state }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderCreateAccount(isLandingPage = false) {
        const {
            state,
            handleSignIn,
            setSignInState,
            setLoadingState,
            onSignIn
        } = this.props;

        return (
            <MyAccountCreateAccount
              state={ state }
              handleSignIn={ handleSignIn }
              setLoadingState={ setLoadingState }
              setSignInState={ setSignInState }
              onSignIn={ onSignIn }
              isLandingPage={ isLandingPage }
            />
        );
    }

    renderSignIn() {
        const {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            isCheckout,
            setLoadingState,
            onSignIn
        } = this.props;

        return (
            <MyAccountSignIn
              state={ state }
              onFormError={ onFormError }
              handleForgotPassword={ handleForgotPassword }
              handleCreateAccount={ handleCreateAccount }
              isCheckout={ isCheckout }
              setLoadingState={ setLoadingState }
              onSignIn={ onSignIn }
            />
        );
    }

    render() {
        const {
            isLoading,
            onVisible,
            isCheckout,
            device
        } = this.props;

        return (
            <Overlay
              id={ CUSTOMER_ACCOUNT_OVERLAY_KEY }
              mix={ { block: 'MyAccountOverlay' } }
              onVisible={ onVisible }
              isStatic={ !isCheckout && device.isMobile }
            >
                <Loader isLoading={ isLoading } />
                { this.renderMyAccount() }
            </Overlay>
        );
    }
}

export default withRouter(
    MyAccountOverlay
);
