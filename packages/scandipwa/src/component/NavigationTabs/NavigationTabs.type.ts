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

import {
    NavigationAbstractComponentProps,
    NavigationAbstractContainerProps,
    NavigationAbstractContainerState
} from 'Component/NavigationAbstract/NavigationAbstract.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { Device } from 'Type/Device.type';

export interface NavigationTabsContainerMapStateProps {
    navigationState: NavigationState;
    headerState: NavigationState;
    device: Device;
    cartTotals: CartTotals;
    noMatch: boolean;
}

export interface NavigationTabsContainerMapDispatchProps {
    showOverlay: (overlayKey: string) => void;
    hideActiveOverlay: () => void;
    setNavigationState: (stateName: NavigationState) => void;
    goToPreviousHeaderState: () => void;
    goToPreviousNavigationState: () => void;
}

export interface NavigationTabsContainerFunctions {
    onMenuButtonClick: () => void;
    onMyAccountButtonClick: () => void;
    onMinicartButtonClick: () => void;
    onHomeButtonClick: () => void;
}

export interface NavigationTabsContainerProps extends
    NavigationTabsContainerMapStateProps,
    NavigationTabsContainerMapDispatchProps,
    NavigationAbstractContainerProps {}

export interface NavigationTabsComponentProps extends NavigationAbstractComponentProps {
    device: Device;
    cartTotals: CartTotals;
    onMenuButtonClick: () => void;
    onMyAccountButtonClick: () => void;
    onMinicartButtonClick: () => void;
    onHomeButtonClick: () => void;
}

export type NavigationTabsContainerState = NavigationAbstractContainerState;

export type NavigationTabsContainerPropsKeys = 'device' | 'navigationState' | 'cartTotals';
