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

import { ComparableProduct } from 'Query/ProductCompare.type';
import { AddProductToCartOptions } from 'Store/Cart/Cart.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Device } from 'Type/Device.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface ProductCompareItemContainerMapStateProps {
    device: Device;
    isWishlistEnabled: boolean;
}

export interface ProductCompareItemContainerMapDispatchProps {
    removeComparedProduct: (productId: string) => void;
    addProductToCart: (options: AddProductToCartOptions) => void;
    showNotification: (type: NotificationType, message: string) => void;
}

export interface ProductCompareItemContainerBaseProps {
    product: ComparableProduct;
    isInStock: (product: Partial<IndexedProduct>, parentProduct?: IndexedProduct | undefined) => boolean;
}

export type ProductCompareItemContainerProps = ProductCompareItemContainerMapStateProps
& ProductCompareItemContainerMapDispatchProps
& ProductCompareItemContainerBaseProps;

export interface ProductCompareItemContainerState {
    isLoading: boolean;
}
