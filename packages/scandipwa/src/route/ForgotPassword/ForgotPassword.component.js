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

import { Redirect } from 'react-router';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import {
    MyAccountOverlay
} from 'Component/MyAccountOverlay/MyAccountOverlay.component';
import { ACCOUNT_URL } from 'Route/MyAccount/MyAccount.config';
import { isSignedIn } from 'Util/Auth';

import './ForgotPassword.style';

/** @namespace Route/ForgotPassword/Component */
export class ForgotPasswordComponent extends MyAccountOverlay {
    renderSignInWrapper() {
        const { onLoginClick } = this.props;

        return (
            <div block="ForgotPassword" elem="SignInWrapper">
                <h3>{ __('Registered Customers') }</h3>
                <p>{ __('If you have an account, sign in with your email address.') }</p>
                <button
                  block="Button"
                  mix={ { block: 'ForgotPassword', elem: 'SignInButton' } }
                  onClick={ onLoginClick }
                >
                { __('Sign In') }
                </button>
            </div>
        );
    }

    renderCreateAccountWrapper() {
        const { onCreateAccountClick } = this.props;

        return (
            <div block="ForgotPassword" elem="CreateAccountWrapper">
                <h3>{ __('New Customers') }</h3>
                <p>
                    { __('Creating an account has many benefits:') }
                    { __(' check out faster, keep more than one address, track orders and more.') }
                </p>
                <button
                  block="Button"
                  mix={ { block: 'ForgotPassword', elem: 'CreateAccountButton' } }
                  onClick={ onCreateAccountClick }
                >
                { __('Create an Account') }
                </button>
            </div>
        );
    }

    renderForgotPasswordWrapper() {
        const { device } = this.props;

        if (device.isMobile) {
            return this.renderForgotPassword();
        }

        return (
            <div block="ForgotPassword" elem="ContainerWrapper">
                <h3>{ __('Forgot Your Password?') }</h3>
                <p>
                    { __('Please enter your email address below to receive a password reset link.') }
                </p>
                { this.renderForgotPassword() }
            </div>
        );
    }

    renderAdditionalContent() {
        const { device } = this.props;

        if (device.isMobile) {
            return null;
        }

        return (
            <div block="ForgotPassword" elem="AdditionalContent">
                { this.renderCreateAccountWrapper() }
                { this.renderSignInWrapper() }
            </div>
        );
    }

    render() {
        const {
            isLoading
        } = this.props;

        if (isSignedIn()) {
            return <Redirect to={ ACCOUNT_URL } />;
        }

        return (
            <ContentWrapper
              mix={ {
                  block: 'ForgotPassword'
              } }
              label="Forgot password page"
            >
                <div block="ForgotPassword" elem="InnerWrapper">
                    <Loader isLoading={ isLoading } />
                    { this.renderForgotPasswordWrapper() }
                    { this.renderAdditionalContent() }
                </div>
            </ContentWrapper>
        );
    }
}

export default ForgotPasswordComponent;
