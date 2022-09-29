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

import { PureComponent } from 'react';

import Loader from 'Component/Loader';
import MyAccountConfirmEmail from 'Component/MyAccountConfirmEmail';
import MyAccountCreateAccount from 'Component/MyAccountCreateAccount';
import MyAccountForgotPassword from 'Component/MyAccountForgotPassword';
import MyAccountForgotPasswordSuccess from 'Component/MyAccountForgotPasswordSuccess';
import MyAccountSignIn from 'Component/MyAccountSignIn';
import Overlay from 'Component/Overlay';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import {
    CUSTOMER_ACCOUNT_OVERLAY_KEY,
    MyAccountPageState,
} from './MyAccountOverlay.config';
import { MyAccountOverlayComponentProps, MyAccountOverlayRenderMap } from './MyAccountOverlay.type';

import './MyAccountOverlay.style';

/** @namespace Component/MyAccountOverlay/Component */
export class MyAccountOverlay<
Props extends MyAccountOverlayComponentProps = MyAccountOverlayComponentProps,
> extends PureComponent<Props> {
    static defaultProps: Partial<MyAccountOverlayComponentProps> = {
        isCheckout: false,
        onSignIn: noopFn,
    };

    renderMap: Record<MyAccountPageState, MyAccountOverlayRenderMap> = {
        [MyAccountPageState.STATE_SIGN_IN]: {
            render: () => this.renderSignIn(),
            title: __('Sign in to your account'),
        },
        [MyAccountPageState.STATE_FORGOT_PASSWORD]: {
            render: () => this.renderForgotPassword(),
            title: __('Get password link'),
        },
        [MyAccountPageState.STATE_FORGOT_PASSWORD_SUCCESS]: {
            render: () => this.renderForgotPasswordSuccess(),
        },
        [MyAccountPageState.STATE_CREATE_ACCOUNT]: {
            render: () => this.renderCreateAccount(),
            title: __('Create new account'),
        },
        [MyAccountPageState.STATE_LOGGED_IN]: {
            render: noopFn,
        },
        [MyAccountPageState.STATE_CONFIRM_EMAIL]: {
            render: () => this.renderConfirmEmail(),
            title: __('Confirm the email'),
        },
    };

    renderMyAccount(): ReactElement {
        const { state } = this.props;
        const { render, title } = this.renderMap[state];

        return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <div block="MyAccountOverlay" elem="Action" mods={ { state } }>
                <p block="MyAccountOverlay" elem="Heading">{ title }</p>
                { render() }
            </div>
        );
    }

    renderConfirmEmail(): ReactElement {
        const { state, handleSignIn } = this.props;

        return (
            <MyAccountConfirmEmail
              state={ state }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderForgotPassword(): ReactElement {
        const {
            state,
            onFormError,
            handleSignIn,
            handleCreateAccount,
            setSignInState,
            setLoadingState,
            isCheckout,
            isOverlayVisible,
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
              isOverlayVisible={ isOverlayVisible }
            />
        );
    }

    renderForgotPasswordSuccess(): ReactElement {
        const { state, handleSignIn } = this.props;

        return (
            <MyAccountForgotPasswordSuccess
              state={ state }
              handleSignIn={ handleSignIn }
            />
        );
    }

    renderCreateAccount(isLandingPage = false): ReactElement {
        const {
            state,
            handleSignIn,
            setSignInState,
            setLoadingState,
            onSignIn,
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

    renderSignIn(): ReactElement {
        const {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            isCheckout,
            setLoadingState,
            onSignIn,
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

    render(): ReactElement {
        const {
            onVisible,
            isCheckout,
            isMobile,
            isLoading,
        } = this.props;

        return (
            <Overlay
              id={ CUSTOMER_ACCOUNT_OVERLAY_KEY }
              mix={ { block: 'MyAccountOverlay' } }
              onVisible={ onVisible }
              isStatic={ !isCheckout && isMobile }
            >
                <Loader isLoading={ isLoading } />
                { this.renderMyAccount() }
            </Overlay>
        );
    }
}

export default MyAccountOverlay;
