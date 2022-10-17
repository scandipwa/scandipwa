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

import { ProductType } from 'Component/Product/Product.config';
import { ItemOption } from 'Query/Wishlist.type';
import { AddProductToCartOptions } from 'Store/Cart/Cart.type';
import { NavigationState } from 'Store/Navigation/Navigation.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import { GQLWishlistItemUpdateInput } from 'Type/Graphql.type';
import { IndexedWishlistProduct } from 'Util/Product/Product.type';

export interface WishlistItemContainerMapStateProps {
    isMobile: boolean;
}

export interface WishlistItemContainerMapDispatchProps {
    showNotification: (type: NotificationType, message: string) => void;
    addProductToCart: (options: AddProductToCartOptions) => void;
    updateWishlistItem: (options: { wishlistItems: GQLWishlistItemUpdateInput[]; wishlistId: string }) => void;
    removeFromWishlist: (options: { item_id: string; noMessages: boolean }) => void;
    changeHeaderState: (state: NavigationState) => void;
}

export interface WishlistItemContainerFunctions {
    addToCart: () => Promise<void>;
    removeItem: () => Promise<void>;
    redirectToProductPage: () => void;
    setQuantity: (quantity: number) => void;
}

export interface WishlistItemContainerBaseProps {
    product: IndexedWishlistProduct;
    handleSelectIdChange: (id: string, isRemoveOnly?: boolean) => void;
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

export interface WishlistItemComponentProps extends WishlistItemContainerFunctions {
    inStock: boolean;
    changeQuantity: (quantity: number) => void;
    changeDescription: (value: string) => void;
    minSaleQuantity: number;
    maxSaleQuantity: number;
    attributes: string[];
    isLoading: boolean;
    handleSelectIdChange: (id: string, isRemoveOnly?: boolean) => void;
    isEditingActive: boolean;
    isMobile: boolean;
    isRemoving: boolean;
    product: IndexedWishlistProduct;
}

export type WishlistItemComponentContainerPropKeys =
    | 'inStock'
    | 'changeQuantity'
    | 'changeDescription'
    | 'minSaleQuantity'
    | 'maxSaleQuantity'
    | 'attributes'
    | 'isLoading'
    | 'handleSelectIdChange'
    | 'isEditingActive'
    | 'isMobile'
    | 'isRemoving'
    | 'product';

export interface WishlistItemComponentOptionMap {
    [ProductType.GROUPED]: (option: ItemOption) => ReactElement;
    [ProductType.BUNDLE]: (option: ItemOption) => ReactElement;
}
