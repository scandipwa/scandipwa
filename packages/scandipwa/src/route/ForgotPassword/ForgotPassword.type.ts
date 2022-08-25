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
    MyAccountOverlayContainerFunctions,
    MyAccountOverlayContainerMapDispatchProps,
    MyAccountOverlayContainerMapStateProps,
    MyAccountOverlayContainerProps
} from 'Component/MyAccountOverlay/MyAccountOverlay.type';

export interface ForgotPasswordContainerMapDispatchProps extends MyAccountOverlayContainerMapDispatchProps {
    toggleBreadcrumbs: (isVisible: boolean) => void;
}

export type ForgotPasswordContainerProps = ForgotPasswordContainerMapDispatchProps
& MyAccountOverlayContainerMapStateProps
& MyAccountOverlayContainerProps;

export interface ForgotPasswordContainerFunctions extends MyAccountOverlayContainerFunctions {
    onLoginClick: () => void;
    onCreateAccountClick: () => void;
}

export interface ForgotPasswordComponentProps extends MyAccountOverlayComponentProps,
    ForgotPasswordContainerFunctions {}
