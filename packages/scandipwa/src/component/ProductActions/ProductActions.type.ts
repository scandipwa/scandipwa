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

import {
    ProductComponentContainerFunctions,
    ProductComponentContainerPropKeys,
    ProductComponentProps,
    ProductContainerBaseProps,
    ProductContainerMapDispatchProps,
    ProductContainerMapStateProps,
    ProductContainerProps,
    ProductContainerState
} from 'Component/Product/Product.type';
import { ReactElement } from 'Type/Common.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface ProductActionsContainerMapStateProps extends ProductContainerMapStateProps {
    isPriceAlertEnabled: boolean;
    isInStockAlertEnabled: boolean;
    displayProductStockStatus: boolean;
    areReviewsEnabled: boolean;
}

export type ProductActionsContainerMapDispatchProps = ProductContainerMapDispatchProps;

export interface ProductActionsContainerBaseProps extends ProductContainerBaseProps {
    areDetailsLoaded: boolean;
    getLink: (key?: string, value?: string) => string;
    areReviewsEnabled: boolean;
    displayProductStockStatus: boolean;
    isInStockAlertEnabled: boolean;
    setActiveProduct: (product: Partial<IndexedProduct>) => void;
    // !FIXME: This prop is always undefined. We must fix it later.
    configurableVariantIndex: never;
}

export type ProductActionsContainerProps = ProductContainerProps
& ProductActionsContainerMapStateProps
& ProductActionsContainerMapDispatchProps
& ProductActionsContainerBaseProps;

export type ProductActionsContainerState = ProductContainerState;

export interface ProductActionsComponentContainerFunctions extends ProductComponentContainerFunctions {
    showOnlyIfLoaded: (expression: boolean, content: ReactElement, placeholder?: ReactElement) => ReactElement;
}

export interface ProductActionsComponentProps extends ProductComponentProps {
    showOnlyIfLoaded: (expression: boolean, content: ReactElement, placeholder: ReactElement) => ReactElement;
    areDetailsLoaded: boolean;
    getLink: (key?: string, value?: string) => string;
    offerCount: number;
    offerType: string;
    stockMeta: string;
    metaLink: string;
    isPriceAlertEnabled: boolean;
    isInStockAlertEnabled: boolean;
    isWishlistEnabled: boolean;
    displayProductStockStatus: boolean;
    areReviewsEnabled: boolean;
    isPricePreview: boolean;
}

export type ProductActionsComponentContainerPropKeys = ProductComponentContainerPropKeys
| 'areDetailsLoaded'
| 'areReviewsEnabled'
| 'displayProductStockStatus'
| 'getLink'
| 'isInStockAlertEnabled'
| 'isPriceAlertEnabled'
| 'isPricePreview'
| 'offerCount'
| 'offerType'
| 'stockMeta'
| 'metaLink';
