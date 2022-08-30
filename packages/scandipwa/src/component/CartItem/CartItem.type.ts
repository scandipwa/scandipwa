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

import { CartItem, CartTotals } from 'Query/Cart.type';
import { AddProductToCartOptions, IndexedCartItem, UpdateProductInCartOptions } from 'Store/Cart/Cart.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Url } from 'Type/Common.type';
import {
    GQLSelectedCustomizableOption,
    GQLSelectedCustomizableOptionValue,
    GQLSelectedDownloadableLinks
} from 'Type/Graphql.type';
import { IndexedProduct, IndexedVariant } from 'Util/Product/Product.type';

export interface CartItemContainerMapStateProps {
    isMobile: boolean;
    cartId: string;
}

export interface CartItemContainerMapDispatchProps {
    addProduct: (options: AddProductToCartOptions) => void;
    changeItemQty: (options: UpdateProductInCartOptions) => Promise<void>;
    removeProduct: (itemId: number) => Promise<Partial<CartTotals> | null>;
    updateCrossSellProducts: (items: CartItem[]) => void;
    showNotification: (type: NotificationType, title: string, error: unknown) => void;
}

export interface CartItemContainerBaseProps {
    item: Partial<IndexedCartItem>;
    currency_code: string;
    updateCrossSellsOnRemove: boolean;
    isCartOverlay: boolean;
    isEditing: boolean;
    onCartItemLoading: (isLoading: boolean) => void;
    showLoader: boolean;
}

export interface CartItemContainerFunctions {
    handleChangeQuantity: (quantity: number) => void;
    handleRemoveItem: (e: MouseEvent) => void;
    getCurrentProduct: () => IndexedVariant | IndexedProduct | undefined;
    getProductVariant: () => IndexedVariant;
}

export type CartItemContainerProps = CartItemContainerMapStateProps
& CartItemContainerMapDispatchProps
& CartItemContainerBaseProps;

export interface CartItemContainerState {
    isLoading: boolean;
}

export interface CartItemComponentProps {
    item: Partial<IndexedCartItem>;
    currency_code: string;
    isEditing: boolean;
    isCartOverlay: boolean;
    isMobile: boolean;
    isLoading: boolean;
    showLoader: boolean;
    linkTo: Url;
    thumbnail: string;
    minSaleQuantity: number;
    maxSaleQuantity: number;
    isProductInStock: boolean;
    optionsLabels: string[];
    isMobileLayout: boolean;
    handleChangeQuantity: (quantity: number) => void;
    handleRemoveItem: (e: MouseEvent) => void;
    getCurrentProduct: () => IndexedVariant | IndexedProduct | undefined;
    getProductVariant: () => IndexedVariant;
}

export type CartItemComponentContainerPropKeys =
    | 'item'
    | 'currency_code'
    | 'isEditing'
    | 'isCartOverlay'
    | 'isMobile'
    | 'isLoading'
    | 'showLoader'
    | 'linkTo'
    | 'thumbnail'
    | 'minSaleQuantity'
    | 'maxSaleQuantity'
    | 'isProductInStock'
    | 'optionsLabels'
    | 'isMobileLayout';

export type CartItemComponentProductOption = (GQLSelectedCustomizableOption | GQLSelectedDownloadableLinks) & {
    values?: GQLSelectedCustomizableOptionValue[];
    title?: string;
};
