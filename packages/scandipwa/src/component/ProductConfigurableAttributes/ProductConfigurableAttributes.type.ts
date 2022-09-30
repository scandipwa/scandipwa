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

import { AnimationEvent } from 'react';

import { ConfigurableProductSelectedVariantValue } from 'Component/Product/Product.type';
import { StockStatus } from 'Component/Product/Stock.config';
import { ProductListFilter } from 'Store/ProductListInfo/ProductListInfo.type';
import { Merge, Mix } from 'Type/Common.type';
import { IndexedConfigurableOption, IndexedVariant } from 'Util/Product/Product.type';

export interface ProductConfigurableAttributesContainerProps {
    getLink: (filterKey: string, value: string) => string;
    parameters: Record<string, string | string[]>;
    updateConfigurableVariant?: (requestVar: string, value: ConfigurableProductSelectedVariantValue) => void;
    isExpandable: boolean;
    showProductAttributeAsLink: boolean;
    variants: IndexedVariant[];
    mix: Mix;
    isReady: boolean;
    numberOfPlaceholders: number[];
    configurable_options: Record<string, Partial<ProductConfigurableAttribute>>;
    addToCartTriggeredWithError: boolean;
    updateAddToCartTriggeredWithError: () => void;
    inStock: boolean;
    isContentExpanded: boolean;
}

export interface ProductConfigurableAttributesComponentContainerFunctions {
    handleOptionClick: (o: Partial<ProductConfigurableAttribute>) => void;
    getSubHeading: (o: Partial<ProductConfigurableAttribute>) => string;
    isSelected: (o: Partial<ProductConfigurableAttribute>) => boolean;
    getLink: (o: Partial<ProductConfigurableAttribute>) => string;
    getIsConfigurableAttributeAvailable: (o: Partial<ProductConfigurableAttribute>) => boolean;
    handleShakeAnimationEnd: (e: AnimationEvent<HTMLElement>) => void;
}

export interface ProductConfigurableAttributesComponentProps
    extends ProductConfigurableAttributesComponentContainerFunctions {
    configurable_options: Record<string, Partial<ProductConfigurableAttribute>>;
    isExpandable: boolean;
    isReady: boolean;
    mix: Mix;
    numberOfPlaceholders: number[];
    parameters: Record<string, string | string[]>;
    showProductAttributeAsLink: boolean;
    updateConfigurableVariant?: (requestVar: string, value: ConfigurableProductSelectedVariantValue) => void;
    inStock: boolean;
    isContentExpanded: boolean;
    addToCartTriggeredWithError: boolean;
    updateAddToCartTriggeredWithError: () => void;
}

export type ProductConfigurableAttributesComponentContainerPropsKeys =
    | 'configurable_options'
    | 'isExpandable'
    | 'isReady'
    | 'mix'
    | 'numberOfPlaceholders'
    | 'parameters'
    | 'showProductAttributeAsLink'
    | 'updateConfigurableVariant'
    | 'inStock'
    | 'isContentExpanded'
    | 'addToCartTriggeredWithError'
    | 'updateAddToCartTriggeredWithError';

export type ProductConfigurableAttribute = Merge<
ProductListFilter,
IndexedConfigurableOption
>;

export interface ProductConfigurableVariant {
    stock_status: StockStatus;
    attributes: Record<string, ProductConfigurableAttribute>;
}
