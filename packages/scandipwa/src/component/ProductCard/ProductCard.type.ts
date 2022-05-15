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

import {
    ProductContainerBaseProps,
    ProductContainerMapDispatchProps,
    ProductContainerMapStateProps
} from 'Component/Product/Product.type';
import { CategoryPageLayout } from 'Route/CategoryPage/CategoryPage.config';
import { NotificationType } from 'Store/Notification/Notification.type';
import { Mix } from 'Type/Common.type';

export interface ProductCardContainerMapStateProps extends ProductContainerMapStateProps {
    baseLinkUrl: string;
    productUsesCategories: boolean;
    categoryUrlSuffix: string;
}

export interface ProductCardContainerMapDispatchProps extends ProductContainerMapDispatchProps {
    showNotification: (type: NotificationType, message: string) => void;
}

export interface ProductCartContainerBaseProps extends ProductContainerBaseProps {
    selectedFilters: Record<string, string[]>;
    productUsesCategories: boolean;
    categoryUrlSuffix: string;
    baseLinkUrl: string;

    hideCompareButton: boolean;
    hideWishlistButton: boolean;
    isLoading: boolean;

    renderContent;
    showNotification: (type: NotificationType, message: string) => void;

    mix: Mix;
    layout: CategoryPageLayout;
}

export type ProductCardContainerProps = ProductCardContainerMapStateProps
& ProductCardContainerMapDispatchProps
& ProductCartContainerBaseProps;
