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
    showPopup: (payload: any) => void;
    goToPreviousNavigationState: () => void;
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
    onSearchBarFocus: (e: MouseEvent) => void;
    onClearSearchButtonClick: (e: MouseEvent) => void;
    onMyAccountButtonClick: (e: MouseEvent) => void;
    onSearchBarChange: () => void;
    isWishlistLoading: boolean;
    onEditButtonClick: (e: MouseEvent) => void;
    onMinicartButtonClick: (e: MouseEvent) => void;
    onOkButtonClick: (e: MouseEvent) => void;
    onCancelButtonClick: (e: MouseEvent) => void;
    onSearchOutsideClick: (e: MouseEvent) => void;
    onMyAccountOutsideClick: (e: MouseEvent) => void;
    onMinicartOutsideClick: (e: MouseEvent) => void;
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
    shouldRenderCartOverlay: boolean;
}


export interface HeaderComponentProps