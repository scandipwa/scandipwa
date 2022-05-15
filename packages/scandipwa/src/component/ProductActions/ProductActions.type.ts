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
    ProductContainerMapDispatchProps,
    ProductContainerMapStateProps,
    ProductContainerProps,
    ProductContainerState
} from 'Component/Product/Product.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface ProductActionsContainerMapStateProps extends ProductContainerMapStateProps {
    isPriceAlertEnabled: boolean;
    isInStockAlertEnabled: boolean;
    displayProductStockStatus: boolean;
    areReviewsEnabled: boolean;
}

export type ProductActionsContainerMapDispatchProps = ProductContainerMapDispatchProps;

export interface ProductActionsContainerBaseProps {
    areDetailsLoaded: boolean;
    getLink: (key: string, value: string) => string;
    areReviewsEnabled: boolean;
    displayProductStockStatus: boolean;
    isInStockAlertEnabled: boolean;
    setActiveProduct: (product: Partial<IndexedProduct>) => void;
}

export type ProductActionsContainerProps = ProductContainerProps
& ProductActionsContainerMapStateProps
& ProductActionsContainerMapDispatchProps
& ProductActionsContainerBaseProps;

export type ProductActionsContainerState = ProductContainerState;
