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

import { LinkedProducts, LinkedProductType } from 'Store/LinkedProducts/LinkedProducts.type';

export interface ProductLinksContainerMapStateProps {
    linkedProducts: Partial<Record<LinkedProductType, Partial<LinkedProducts>>>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductLinksContainerMapDispatchProps {}

export interface ProductLinksContainerBaseProps {
    linkType: LinkedProductType;
    title: string;
    numberOfProductsToDisplay: number;
    areDetailsLoaded: boolean;
}

export type ProductLinksContainerProps = ProductLinksContainerMapStateProps
& ProductLinksContainerMapDispatchProps
& ProductLinksContainerBaseProps;

export interface ProductLinksContainerState {
    siblingsHaveBrands: boolean;
    siblingsHavePriceBadge: boolean;
    siblingsHaveTierPrice: boolean;
    siblingsHaveConfigurableOptions: boolean;
}

export interface ProductLinksComponentProps {
    areDetailsLoaded: boolean;
    linkType: LinkedProductType;
    linkedProducts: Partial<Record<LinkedProductType, Partial<LinkedProducts>>>;
    numberOfProductsToDisplay: number;
    title: string;
    productCardFunctions: ProductCartDisplayFunctions;
    productCardProps: ProductCardDisplayProps;
}

export interface ProductCartDisplayFunctions {
    setSiblingsHaveBrands: () => void;
    setSiblingsHavePriceBadge: () => void;
    setSiblingsHaveTierPrice: () => void;
    setSiblingsHaveConfigurableOptions: () => void;
}

export interface ProductCardDisplayProps {
    siblingsHaveBrands: boolean;
    siblingsHavePriceBadge: boolean;
    siblingsHaveTierPrice: boolean;
    siblingsHaveConfigurableOptions: boolean;
}
