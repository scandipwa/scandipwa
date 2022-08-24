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

import { MouseEvent } from 'react';

import { CartDisplayConfig } from 'Query/Cart.type';
import { CartTotals } from 'Store/Cart/Cart.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';

export interface MinimumOrderAmount {
    minimum_order_amount_reached: boolean;
    minimum_order_description: string;
}

export interface CartOverlayContainerMapStateProps {
    totals: CartTotals;
    isMobile: boolean;
    guest_checkout: boolean;
    currencyCode?: string;
    activeOverlay: string;
    cartTotalSubPrice: number | null;
    cartShippingPrice: number;
    cartShippingSubPrice: number | null;
    cartDisplaySettings: CartDisplayConfig;
    minimumOrderAmount: Partial<MinimumOrderAmount>;
}

export interface CartOverlayContainerMapDispatchProps {
    setNavigationState: (stateName: NavigationState) => void;
    changeHeaderState: (state: NavigationState) => void;
    showOverlay: (overlayKey: string) => void;
    showNotification: (type: NotificationType, message: string) => void;
    hideActiveOverlay: () => void;
}

export interface CartOverlayContainerFunctions {
    changeHeaderState: () => void;
    handleCheckoutClick: (e: MouseEvent) => void;
    onCartItemLoading: (isCartItemLoading: boolean) => void;
    scrollToTop: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CartOverlayContainerBaseProps {}

export type CartOverlayContainerProps = CartOverlayContainerMapStateProps
& CartOverlayContainerMapDispatchProps
& CartOverlayContainerBaseProps;

export interface CartOverlayContainerState {
    isEditing: boolean;
    isCartItemLoading: boolean;
}

export interface CartOverlayComponentProps {
    totals: CartTotals;
    showOverlay: (overlayKey: string) => void;
    currencyCode?: string;
    activeOverlay: string;
    cartTotalSubPrice: number | null;
    cartDisplaySettings: CartDisplayConfig;
    isEditing: boolean;
    isMobile: boolean;
    cartShippingPrice: number;
    cartShippingSubPrice: number | null;
    isCartItemLoading: boolean;
    hasOutOfStockProductsInCart: boolean;
    changeHeaderState: () => void;
    handleCheckoutClick: (e: MouseEvent) => void;
    onCartItemLoading: (isCartItemLoading: boolean) => void;
    scrollToTop: () => void;
    minimumOrderAmountReached: boolean;
}

export type CartOverlayComponentContainerPropKeys =
    | 'totals'
    | 'showOverlay'
    | 'currencyCode'
    | 'activeOverlay'
    | 'cartTotalSubPrice'
    | 'cartDisplaySettings'
    | 'isEditing'
    | 'isMobile'
    | 'cartShippingPrice'
    | 'cartShippingSubPrice'
    | 'isCartItemLoading'
    | 'hasOutOfStockProductsInCart';
