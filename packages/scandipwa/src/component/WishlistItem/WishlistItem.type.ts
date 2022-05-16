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

import { AddProductToCartOptions } from 'Store/Cart/Cart.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { WishlistProduct } from 'Store/Wishlist/Wishlist.type';
import { GQLWishlistItemUpdateInput } from 'Type/Graphql.type';

export interface WishlistItemContainerMapStateProps {
    isMobile: boolean;
}

export interface WishlistItemContainerMapDispatchProps {
    showNotification: (type: NotificationType, message: string) => void;
    addProductToCart: (options: AddProductToCartOptions) => void;
    updateWishlistItem: (options: {
        wishlistItems: GQLWishlistItemUpdateInput[];
        wishlistId: string;
    }) => void;
    removeFromWishlist: (options: {
        item_id: string;
        noMessages: boolean;
    }) => void;
    changeHeaderState: (state: NavigationState) => void;
}

export interface WishlistItemContainerBaseProps {
    product: WishlistProduct;
    handleSelectIdChange: (id: string, isRemoveOnly: boolean) => void;
    isRemoving: boolean;
    isMobile: boolean;
    wishlistId: string;
    isEditingActive: boolean;
    setIsQtyUpdateInProgress: (status: boolean) => void;
}

export interface WishlistItemContainerProps extends WishlistItemContainerMapStateProps,
    WishlistItemContainerMapDispatchProps,
    WishlistItemContainerBaseProps {}

export interface WishlistItemContainerState {
    isLoading: boolean;
    currentQty: number;
}
