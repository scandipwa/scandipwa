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

import { ComparableProduct } from 'Query/ProductCompare.type';
import { AddProductToCartOptions } from 'Store/Cart/Cart.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Url } from 'Type/Common.type';
import { Device } from 'Type/Device.type';
import { StockCheckProduct } from 'Util/Product/Product.type';

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
    isInStock: (product: Partial<StockCheckProduct>, parentProduct?: Partial<StockCheckProduct> | undefined) => boolean;
}

export interface ProductCompareItemContainerFunctions {
    removeComparedProduct: () => Promise<void>;
    getGroupedProductQuantity: () => Record<number, number>;
    getProductOptionsData: () => { requiredOptions: Array<number | null> };
    overriddenAddToCartBtnHandler: () => void;
    addItemToCart: () => Promise<void>;
}

export type ProductCompareItemContainerProps = ProductCompareItemContainerMapStateProps
& ProductCompareItemContainerMapDispatchProps
& ProductCompareItemContainerBaseProps;

export interface ProductCompareItemContainerState {
    isLoading: boolean;
}

export interface ProductCompareItemComponentProps extends ProductCompareItemContainerFunctions {
    product: ComparableProduct;
    isLoading: boolean;
    imgUrl: string;
    overrideAddToCartBtnBehavior: boolean;
    linkTo: Url;
    isInStock: (product: Partial<StockCheckProduct>, parentProduct?: Partial<StockCheckProduct>) => boolean;
    isWishlistEnabled: boolean;
}

export type ProductCompareItemComponentContainerPropKeys =
    | 'product'
    | 'isLoading'
    | 'imgUrl'
    | 'overrideAddToCartBtnBehavior'
    | 'linkTo'
    | 'isInStock'
    | 'isWishlistEnabled';
