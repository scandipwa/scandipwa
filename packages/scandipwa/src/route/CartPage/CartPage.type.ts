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

import { History } from 'history';
import { MouseEvent } from 'react';

import { CartDisplayConfig } from 'Query/Cart.type';
import { Breadcrumb } from 'Store/Breadcrumbs/Breadcrumbs.type';
import { CartTotals, IndexedCartItem } from 'Store/Cart/Cart.type';
import { PageMeta } from 'Store/Meta/Meta.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Device } from 'Type/Device.type';

export interface CartPageContainerMapStateProps {
    totals: CartTotals;
    headerState: NavigationState;
    guest_checkout: boolean;
    device: Device;
    cartDisplayConfig: CartDisplayConfig;
    cartSubtotal: number;
    cartSubtotalSubPrice: number | null;
    cartTotalSubPrice: number | null;
    cartShippingPrice: number;
    cartShippingSubPrice: number | null;
}

export interface CartPageContainerMapDispatchProps {
    changeHeaderState: (state: NavigationState) => void;
    updateBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
    showOverlay: (overlayKey: string) => void;
    showNotification: (type: NotificationType, message: string) => void;
    updateMeta: (meta: Partial<PageMeta>) => void;
    updateCrossSellProducts: (items: IndexedCartItem[]) => void;
}

export interface CartPageContainerFunctions {
    onCheckoutButtonClick: (e: MouseEvent) => void;
    onCartItemLoading: (isCartItemLoading: boolean) => void;
}

export interface CartPageContainerBaseProps {
    history: History;
}

export type CartPageContainerProps = CartPageContainerMapStateProps
& CartPageContainerMapDispatchProps
& CartPageContainerBaseProps;

export interface CartPageContainerState {
    isCartItemLoading: boolean;
}

export interface CartPageComponentProps {
    hasOutOfStockProductsInCart: boolean;
    totals: CartTotals;
    isCartItemLoading: boolean;
    device: Device;
    onCheckoutButtonClick: (e: MouseEvent) => void;
    onCartItemLoading: (isCartItemLoading: boolean) => void;
}

export type CartPageComponentContainerPropKeys =
    | 'hasOutOfStockProductsInCart'
    | 'totals'
    | 'isCartItemLoading'
    | 'device';
