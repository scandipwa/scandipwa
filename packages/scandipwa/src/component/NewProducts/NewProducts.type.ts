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

import { ProductCardDisplayProps, ProductCartDisplayFunctions } from 'Component/ProductLinks/ProductLinks.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface NewProductsContainerMapStateProps {
    timezone: string;
}

export interface NewProductsContainerMapDispatchProps {
    showNotification: (type: NotificationType, title: string, error: unknown) => void;
}

export interface NewProductsContainerBaseProps {
    category: string;
    cacheLifetime: number;
    productsCount: number;
    productsPerPage: number;
}

export type NewProductsContainerProps = NewProductsContainerMapStateProps
& NewProductsContainerMapDispatchProps
& NewProductsContainerBaseProps;

export interface NewProductsContainerState {
    products?: IndexedProduct[];
    siblingsHaveBrands: boolean;
    siblingsHavePriceBadge: boolean;
    siblingsHaveTierPrice: boolean;
    siblingsHaveConfigurableOptions: boolean;
}

export interface NewProductsComponentProps {
    productsPerPage: number;
    products: IndexedProduct[];
    productCardFunctions: ProductCartDisplayFunctions;
    productCardProps: ProductCardDisplayProps;
}

export interface NewProductsComponentState {}
