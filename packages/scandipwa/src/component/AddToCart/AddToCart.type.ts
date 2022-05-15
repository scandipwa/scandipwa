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

import { ProductQuantity } from 'Component/Product/Product.type';
import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { AddProductToCartOptions } from 'Store/Cart/Cart.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Mix } from 'Type/Common.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface AddToCartContainerMapStateProps {
    cartId: string;
}

export interface AddToCartContainerMapDispatchProps {
    showNotification: (type: NotificationType, message: string) => void;
    fallbackAddToCart: (options: AddProductToCartOptions) => Promise<void>;
}

export interface AddToCartContainerBaseProps {
    product: IndexedProduct;
    quantity: ProductQuantity;
    addToCart: (options?: AddProductToCartOptions) => Promise<void>;
    isDisabled: boolean;

    isIconEnabled: boolean;
    mix: Mix;
    layout: CategoryPageLayout;
}

export type AddToCartContainerProps = AddToCartContainerMapStateProps
& AddToCartContainerMapDispatchProps
& AddToCartContainerBaseProps;

export interface AddToCartComponentProps {
    isDisabled: boolean;
    isIconEnabled: boolean;
    mix: Mix;
    layout: CategoryPageLayout;
    isAdding:boolean;
    addProductToCart: (e: MouseEvent) => Promise<void>;
}

export type AddToCartComponentContainerPropKeys =
| 'isDisabled'
| 'isIconEnabled'
| 'mix'
| 'layout'
| 'isAdding';
