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

import { Mix } from 'Type/Common.type';

export interface ProductCompareButtonContainerMapStateProps {
    comparedProducts: number[];
}

export interface ProductCompareButtonContainerMapDispatchProps {
    addProductToCompare: (productId: string) => void;
    removeComparedProduct: (productId: string) => void;
}

export interface ProductCompareButtonContainerBaseProps {
    mix: Mix;
    productId: number | null;
}

export interface ProductCompareButtonContainerFunctions {
    handleClick: (e: MouseEvent) => Promise<void>;
}

export type ProductCompareButtonContainerProps = ProductCompareButtonContainerMapStateProps
& ProductCompareButtonContainerMapDispatchProps
& ProductCompareButtonContainerBaseProps;

export interface ProductCompareButtonContainerState {
    isLoading: boolean;
}

export interface ProductCompareButtonComponentProps {
    mix: Mix;
    isLoading: boolean;
    isActive: boolean;
    handleClick: (e: MouseEvent) => Promise<void>;
}

export type ProductCompareButtonComponentContainerPropKeys =
    | 'mix'
    | 'isLoading'
    | 'isActive';
