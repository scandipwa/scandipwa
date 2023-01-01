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

import { RouteComponentProps } from 'react-router';

import {
    MyAccountOverlayComponentProps,
    MyAccountOverlayContainerFunctions,
    MyAccountOverlayContainerMapDispatchProps,
    MyAccountOverlayContainerProps,
} from 'Component/MyAccountOverlay/MyAccountOverlay.type';
import { Device } from 'Type/Device.type';

export interface CreateAccountContainerMapDispatchProps extends MyAccountOverlayContainerMapDispatchProps {
    toggleBreadcrumbs: (isVisible: boolean) => void;
}

export interface CreateAccountContainerProps extends CreateAccountContainerMapDispatchProps,
    MyAccountOverlayContainerProps {}

export interface CreateAccountContainerState {}

export interface CreateAccountContainerFunctions extends MyAccountOverlayContainerFunctions {
    onLoginClick: () => void;
}

export interface CreateAccountComponentProps extends MyAccountOverlayComponentProps,
    RouteComponentProps,
    CreateAccountContainerFunctions {
    device: Device;
}
