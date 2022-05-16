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

import { NotificationType } from 'Store/Notification/Notification.type';
import { WishlistProduct } from 'Store/Wishlist/Wishlist.type';
import { Mix } from 'Type/Common.type';
import { GQLWishlistItemInput } from 'Type/Graphql.type';
import { ProductTransformData } from 'Util/Product/Product.type';

export interface ProductWishlistButtonContainerMapStateProps {
    productsInWishlist: Record<string, WishlistProduct>;
    isAddingWishlistItem: boolean;
    wishlistId: string;
}

export interface ProductWishlistButtonContainerMapDispatchProps {
    addProductToWishlist: (wishlistItem: { items: GQLWishlistItemInput[]; wishlistId: string }) => void;
    removeProductFromWishlist: (options: { item_id: string; noMessages?: boolean }) => void;
    showNotification: (type: NotificationType, message: string) => void;
}

export interface ProductWishlistButtonContainerBaseProps {
    magentoProduct: ProductTransformData[];
    mix: Mix;
}

export type ProductWishlistButtonContainerProps = ProductWishlistButtonContainerMapStateProps
& ProductWishlistButtonContainerMapDispatchProps
& ProductWishlistButtonContainerBaseProps;

export interface ProductWishlistButtonContainerState {
    isWishlistButtonLoading: boolean;
    isWishListToggle: boolean;
}

export interface ProductWishlistButtonComponentProps {
    mix: Mix;
    magentoProduct: ProductTransformData[];
    isDisabled: boolean;
    isInWishlist: boolean;
    isSignedIn: boolean;
    // !FIXME: isLoading is never set
    isLoading: boolean;
    addToWishlist: () => Promise<void>;
    removeFromWishlist: () => Promise<void>;
}

export type ProductWishlistButtonComponentContainerPropKeys =
    | 'mix'
    | 'magentoProduct'
    | 'isDisabled'
    | 'isInWishlist'
    | 'isSignedIn';
