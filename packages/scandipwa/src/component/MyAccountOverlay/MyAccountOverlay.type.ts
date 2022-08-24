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

import { MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Customer } from 'Query/MyAccount.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { ReactElement } from 'Type/Common.type';
import { Device } from 'Type/Device.type';

import { MyAccountPageState } from './MyAccountOverlay.config';

export interface MyAccountOverlayContainerMapStateProps {
    isSignedIn: boolean;
    customer: Partial<Customer>;
    isMobile: boolean;
    isPasswordForgotSend: boolean;
    isOverlayVisible: boolean;
    redirectToDashboard: boolean;
    isLoading: boolean;
    device: Device;
}

export interface MyAccountOverlayContainerMapDispatchProps {
    hideActiveOverlay: () => void;
    showOverlay: (overlayKey: string) => void;
    setHeaderState: (headerState: NavigationState) => void;
    goToPreviousHeaderState: () => void;
    updateCustomerLoadingStatus: (status: boolean) => void;
}

export interface MyAccountOverlayContainerFunctions {
    onFormError: () => void;
    handleForgotPassword: (e: MouseEvent) => void;
    handleSignIn: (e: MouseEvent) => void;
    handleCreateAccount: (e: MouseEvent) => void;
    onVisible: () => void;
    setSignInState: (state: MyAccountPageState) => void;
    setLoadingState: (isLoading: boolean) => void;
}

export type MyAccountOverlayContainerProps = MyAccountOverlayContainerMapStateProps
& MyAccountOverlayContainerMapDispatchProps
& {
    isCheckout: boolean;
    onSignIn: () => void;
};

export interface MyAccountOverlayContainerState {
    state: MyAccountPageState;
    isPasswordForgotSend: boolean;
    isLoading: boolean;
}

export interface MyAccountOverlayComponentProps extends RouteComponentProps {
    isOverlayVisible: boolean;
    state: MyAccountPageState;
    setSignInState: (state: MyAccountPageState) => void;
    isLoading: boolean;
    setLoadingState: (isLoading: boolean) => void;
    onVisible: () => void;
    onFormError: () => void;
    handleForgotPassword: (e: MouseEvent) => void;
    handleSignIn: (e: MouseEvent) => void;
    handleCreateAccount: (e: MouseEvent) => void;
    isCheckout: boolean;
    isMobile: boolean;
    onSignIn: () => void;
    device: Device;
}

export interface MyAccountOverlayRenderMap {
    render: () => ReactElement | void;
    title?: string;
}

export type MyAccountOverlayContainerPropsKeys = 'isCheckout'
| 'isLoading'
| 'isMobile'
| 'isOverlayVisible'
| 'onSignIn'
| 'state'
| 'device';
