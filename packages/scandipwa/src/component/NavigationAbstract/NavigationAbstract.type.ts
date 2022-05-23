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

import { NavigationState } from 'Store/Navigation/Navigation.type';
import { Device } from 'Type/Device.type';

export interface NavigationAbstractContainerMapStateProps {
    device: Device;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NavigationAbstractContainerMapDispatchProps {}

export type NavigationAbstractContainerProps = NavigationAbstractContainerMapStateProps
& NavigationAbstractContainerMapDispatchProps
& {
    setNavigationState: (stateName: NavigationState) => void;
    hideActiveOverlay: () => void;
    navigationState: NavigationState;
};

export interface NavigationAbstractContainerState {
    prevPathname: string;
}

export interface NavigationAbstractComponentProps{
    navigationState: NavigationState;
}
