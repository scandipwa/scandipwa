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

import { WishlistProduct } from 'Store/Wishlist/Wishlist.type';

export interface MyAccountMyWishlistContainerMapStateProps {
    wishlistItems: Record<string, WishlistProduct>;
    isWishlistLoading: boolean;
    isMobile: boolean;
}

export interface MyAccountMyWishlistContainerMapDispatchProps {
    clearWishlist: () => void;
    moveWishlistToCart: () => void;
    showPopup: <T>(payload: T) => void;
    showNotification: (message: string) => void;
    showError: (message: string) => void;
    removeSelectedFromWishlist: (options: string[]) => void;
}

export interface MyAccountMyWishlistContainerBaseProps {
    creatorsName: string;
    isEditingActive: boolean;
}

export interface MyAccountMyWishlistContainerProps extends MyAccountMyWishlistContainerMapStateProps,
    MyAccountMyWishlistContainerMapDispatchProps,
    MyAccountMyWishlistContainerBaseProps {}

export interface MyAccountMyWishlistContainerState {
    isLoading: boolean;
    loadingItemsMap: Record<string, boolean>;
    isQtyUpdateInProgress: boolean;
}

export interface MyAccountMyWishlistComponentProps {
    isLoading: boolean;
    isWishlistLoading: boolean;
    removeAll: () => Promise<void>;
    addAllToCart: () => Promise<void>;
    shareWishlist: () => void;
    isWishlistEmpty: boolean;
    wishlistItems: Record<string, WishlistProduct>;
    isActionsDisabled: boolean;
    isEditingActive: boolean;
    isMobile: boolean;
    removeSelectedFromWishlist: (options: string[]) => void;
    loadingItemsMap: Record<string, boolean>;
    setIsQtyUpdateInProgress: (status: boolean) => void;
    isQtyUpdateInProgress: boolean;
    creatorsName: string;
}

export interface MyAccountMyWishlistComponentState {
    selectedIdMap: string[],
    actionLineHeight: number
}

export type MyAccountMyWishlistContainerPropsKeys = 'isWishlistLoading'
| 'isWishlistEmpty'
| 'isLoading'
| 'isActionsDisabled'
| 'loadingItemsMap'
| 'creatorsName'
| 'wishlistItems'
| 'isEditingActive'
| 'isMobile'
| 'isQtyUpdateInProgress'