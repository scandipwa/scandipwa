/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import {
    MyAccountOverlayComponentProps,
    MyAccountOverlayComponentState,
    MyAccountOverlayContainerFunctions,
    MyAccountOverlayContainerMapDispatchProps,
    MyAccountOverlayContainerMapStateProps,
    MyAccountOverlayContainerProps,
    MyAccountOverlayContainerState,
} from 'Component/MyAccountOverlay/MyAccountOverlay.type';

export interface ForgotPasswordContainerMapDispatchProps extends MyAccountOverlayContainerMapDispatchProps {
    toggleBreadcrumbs: (isVisible: boolean) => void;
}

export interface ForgotPasswordContainerProps extends ForgotPasswordContainerMapDispatchProps,
    MyAccountOverlayContainerMapStateProps,
    MyAccountOverlayContainerProps {}

export interface ForgotPasswordContainerState extends MyAccountOverlayContainerState {}

export interface ForgotPasswordComponentState extends MyAccountOverlayComponentState {}

export interface ForgotPasswordContainerFunctions extends MyAccountOverlayContainerFunctions {
    onLoginClick: () => void;
    onCreateAccountClick: () => void;
}

export interface ForgotPasswordComponentProps extends MyAccountOverlayComponentProps,
    ForgotPasswordContainerFunctions {}
