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

import { withRouter } from 'react-router-dom';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import {
    MyAccountOverlayComponent,
} from 'Component/MyAccountOverlay/MyAccountOverlay.component';
import { ReactElement } from 'Type/Common.type';

import { LoginAccountComponentProps } from './LoginAccount.type';

import './LoginAccount.style';

/** @namespace Route/LoginAccount/Component */
export class LoginAccountComponent extends MyAccountOverlayComponent<LoginAccountComponentProps> {
    renderSignInWrapper(): ReactElement {
        const { isMobile } = this.props;

        if (isMobile) {
            return this.renderSignIn();
        }

        return (
            <div block="LoginAccount" elem="SignInWrapper">
                <h3>{ __('Registered Customers') }</h3>
                <p>{ __('If you have an account, sign in with your email address.') }</p>
                { this.renderSignIn() }
            </div>
        );
    }

    renderCreateAccountWrapper(): ReactElement {
        const { isMobile, onCreateAccountClick } = this.props;

        if (isMobile) {
            return (
                <div block="LoginAccount" elem="CreateAccount">
                    <h4>{ __("Don't have an account?") }</h4>
                    <button
                      block="Button"
                      mods={ { likeLink: true } }
                      onClick={ onCreateAccountClick }
                    >
                        { __('Create an Account') }
                    </button>
                </div>
            );
        }

        return (
            <div block="LoginAccount" elem="CreateAccount">
                <h3>{ __('New Customers') }</h3>
                <p>
                    { __('Creating an account has many benefits:') }
                    { __(' check out faster, keep more than one address, track orders and more.') }
                </p>
                <button
                  block="Button"
                  mix={ { block: 'LoginAccount', elem: 'CreateAccountButton' } }
                  onClick={ onCreateAccountClick }
                >
                    { __('Create an Account') }
                </button>
            </div>
        );
    }

    renderContent(): ReactElement {
        return (
            <>
                { this.renderSignInWrapper() }
                { this.renderCreateAccountWrapper() }
            </>
        );
    }

    render(): ReactElement {
        const {
            isLoading,
        } = this.props;

        return (
            <ContentWrapper
              mix={ {
                  block: 'LoginAccount',
              } }
              label="Login page"
            >
                <div block="LoginAccount" elem="InnerWrapper">
                    <Loader isLoading={ isLoading } />
                    { this.renderContent() }
                </div>
            </ContentWrapper>
        );
    }
}
export default withRouter(
    LoginAccountComponent,
);
