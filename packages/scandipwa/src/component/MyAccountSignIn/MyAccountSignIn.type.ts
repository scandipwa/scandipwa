/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { ChangeEvent, MouseEvent } from 'react';

import { MyAccountPageState } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import { SignInOptions } from 'Query/MyAccount.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { NotificationType } from 'Store/Notification/Notification.type';

export interface MyAccountSignInContainerMapStateProps {
    isEmailAvailable: boolean;
    isLocked: boolean;
    totals: CartTotals;
}

export interface MyAccountSignInContainerMapDispatchProps {
    signIn: (options: SignInOptions) => Promise<boolean>;
    showNotification: (type: NotificationType, message: string) => void;
}

export interface MyAccountSignInContainerBaseProps {
    state: MyAccountPageState;
    onFormError: () => void;
    handleForgotPassword: (e: MouseEvent) => void;
    handleCreateAccount: (e: MouseEvent) => void;
    setLoadingState: (isLoading: boolean) => void;
    handleEmailInput: (emailInput: ChangeEvent<HTMLInputElement>) => void;
    onSignIn: () => void;
    isCheckout?: boolean;
    isLoading: boolean;
    emailValue: string;
    setSignInState: (state: MyAccountPageState) => void;
}

export type MyAccountSignInContainerProps = MyAccountSignInContainerMapStateProps
& MyAccountSignInContainerMapDispatchProps
& MyAccountSignInContainerBaseProps;

export type MyAccountSignInContainerState = {
    isSignIn: boolean;
};
