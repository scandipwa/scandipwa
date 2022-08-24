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

import { ChangeEvent, MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router';

import {
    NavigationAbstractComponentProps,
    NavigationAbstractContainerProps
} from 'Component/NavigationAbstract/NavigationAbstract.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { Device } from 'Type/Device.type';

export interface HeaderContainerMapStateProps {
    navigationState: NavigationState;
    cartTotals: CartTotals;
    totals: CartTotals;
    compareTotals: number;
    Loading: boolean;
    header_logo_src: string;
    isOffline: boolean;
    logo_alt: string;
    logo_height: number;
    logo_width: number;
    isLoading: boolean;
    device: Device;
    activeOverlay: string;
    isWishlistLoading: boolean;
}

export interface HeaderMapDispatchToProps {
    showOverlay: (overlayKey: string) => void;
    hideActiveOverlay: () => void;
    setNavigationState: (stateName: NavigationState) => void;
    showPopup: <T>(payload: T) => void;
    goToPreviousNavigationState: () => void;
}

export interface HeaderContainerFunctions {
    onEditButtonClick: (e: MouseEvent) => void;
    onMinicartButtonClick: () => void;
    onOkButtonClick: (e: MouseEvent) => void;
    onCancelButtonClick: () => void;
    onSearchOutsideClick: () => void;
    onMyAccountOutsideClick: () => void;
    onMinicartOutsideClick: () => void;
    onBackButtonClick: (e: MouseEvent) => void;
    onCloseButtonClick: (e: MouseEvent) => void;
    onSearchBarFocus: () => void;
    onClearSearchButtonClick: () => void;
    onMyAccountButtonClick: () => void;
    onSearchBarChange: (e: ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
    shareWishlist: () => void;
    onSignIn: () => void;
    hideActiveOverlay: () => void;

}

export interface HeaderContainerProps extends
    HeaderContainerMapStateProps,
    HeaderMapDispatchToProps,
    NavigationAbstractContainerProps,
    RouteComponentProps {}

export interface HeaderContainerState {
    prevPathname: string;
    searchCriteria: string;
    isClearEnabled: boolean;
    showMyAccountLogin: boolean;
    shouldRenderCartOverlay?: boolean;
}

export interface HeaderComponentProps extends NavigationAbstractComponentProps {
    cartTotals: CartTotals;
    compareTotals: number;
    Loading: boolean;
    onBackButtonClick: (e: MouseEvent) => void;
    onCloseButtonClick: (e: MouseEvent) => void;
    onSearchBarFocus: () => void;
    onClearSearchButtonClick: () => void;
    onMyAccountButtonClick: () => void;
    onSearchBarChange: (e: ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
    isWishlistLoading: boolean;
    onEditButtonClick: (e: MouseEvent) => void;
    onMinicartButtonClick: () => void;
    onOkButtonClick: (e: MouseEvent) => void;
    onCancelButtonClick: () => void;
    onSearchOutsideClick: () => void;
    onMyAccountOutsideClick: () => void;
    onMinicartOutsideClick: () => void;
    isClearEnabled: boolean;
    searchCriteria: string;
    shareWishlist: () => void;
    header_logo_src: string;
    logo_alt: string;
    logo_height: number;
    logo_width: number;
    isLoading: boolean;
    showMyAccountLogin: boolean;
    isCheckout: boolean;
    onSignIn: () => void;
    hideActiveOverlay: () => void;
    device: Device;
    firstname?: string;
    shouldRenderCartOverlay?: boolean;
    activeOverlay: string;
}

export type HeaderContainerPropsKeys =
     'activeOverlay'
     | 'navigationState'
     | 'cartTotals'
     | 'compareTotals'
     | 'Loading'
     | 'header_logo_src'
     | 'logo_alt'
     | 'logo_height'
     | 'logo_width'
     | 'isLoading'
     | 'isClearEnabled'
     | 'searchCriteria'
     | 'isCheckout'
     | 'showMyAccountLogin'
     | 'device'
     | 'isWishlistLoading'
     | 'shouldRenderCartOverlay'
     | 'firstname';
