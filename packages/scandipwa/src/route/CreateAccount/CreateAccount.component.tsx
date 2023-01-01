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

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import {
    MyAccountOverlayComponent,
} from 'Component/MyAccountOverlay/MyAccountOverlay.component';
import { ReactElement } from 'Type/Common.type';

import { CreateAccountComponentProps } from './CreateAccount.type';

import './CreateAccount.style';

/** @namespace Route/CreateAccount/Component */
export class CreateAccountComponent<
P extends Readonly<CreateAccountComponentProps> = Readonly<CreateAccountComponentProps>,
S extends CreateAccountComponentState = CreateAccountComponentState,
> extends MyAccountOverlayComponent<P, S> {
    renderSignInWrapper(): ReactElement {
        const { onLoginClick } = this.props;

        return (
            <div block="CreateAccount" elem="SignInWrapper">
                <h3>{ __('Registered Customers') }</h3>
                <p>{ __('If you have an account, sign in with your email address.') }</p>
                <button block="Button" onClick={ onLoginClick }>{ __('Sign In') }</button>
            </div>
        );
    }

    renderCreateAccountWrapper(): ReactElement {
        return (
            <div block="CreateAccount" elem="CreateAccountWrapper">
                <h3>{ __('New Customers') }</h3>
                <p>
                    { __('Creating an account has many benefits:') }
                    { __(' check out faster, keep more than one address, track orders and more.') }
                </p>
                { this.renderCreateAccount(true) }
            </div>
        );
    }

    renderForgotPasswordWrapper(): ReactElement {
        return (
            <div block="CreateAccount" elem="ForgetPasswordWrapper">
                <h3>{ __('Forgot Your Password?') }</h3>
                <p>
                    { __('Please enter your email address below to receive a password reset link.') }
                </p>
                { this.renderForgotPassword() }
            </div>
        );
    }

    renderContent(): ReactElement {
        const { device } = this.props;

        if (device.isMobile) {
            return this.renderCreateAccount();
        }

        return (
            <>
                { this.renderCreateAccountWrapper() }
                { this.renderSignInWrapper() }
            </>
        );
    }

    render(): ReactElement {
        const {
            isLoading,
        } = this.props;

        return (
            <ContentWrapper
              label="Create account page"
              mix={ {
                  block: 'CreateAccount',
              } }
            >
                <div block="CreateAccount" elem="InnerWrapper">
                    <Loader isLoading={ isLoading } />
                    { this.renderContent() }
                </div>
            </ContentWrapper>
        );
    }
}

export default CreateAccountComponent;
