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

import { AnimationEvent } from 'react';

import { StockStatus } from 'Component/Product/Stock.config';
import { ProductListFilter } from 'Store/ProductListInfo/ProductListInfo.type';
import { Mix, ReactElement } from 'Type/Common.type';
import { IndexedConfigurableOption, IndexedVariant } from 'Util/Product/Product.type';

export interface ProductConfigurableAttributesContainerProps {
    renderPlaceholder: (block: string) => ReactElement;
    getLink: (filterKey: string, value: string) => string;
    parameters: Record<string, string>;
    updateConfigurableVariant?: (requestVar: string, value: string) => void;
    isExpandable: boolean;
    showProductAttributeAsLink: boolean;
    variants: IndexedVariant[];
    mix: Mix;
    isReady: boolean;
    numberOfPlaceholders: number[];
    configurable_options: Record<string, IndexedConfigurableOption>;
    addToCartTriggeredWithError: boolean;
    updateAddToCartTriggeredWithError: () => void;
    inStock: boolean;
}

export interface ProductConfigurableAttributesComponentProps {
    renderPlaceholder: (block: string) => ReactElement;
    configurable_options: Record<string, IndexedConfigurableOption>;
    isExpandable: boolean;
    isReady: boolean;
    mix: Mix;
    numberOfPlaceholders: number[];
    parameters: Record<string, string>;
    showProductAttributeAsLink: boolean;
    updateConfigurableVariant?: (requestVar: string, value: string) => void;
    inStock: boolean;
    addToCartTriggeredWithError: boolean;
    updateAddToCartTriggeredWithError: () => void;
    handleOptionClick: (o: ProductConfigurableAttribute) => void;
    getSubHeading: (o: ProductListFilter) => string;
    isSelected: (o: ProductConfigurableAttribute) => boolean;
    getLink: (o: ProductConfigurableAttribute) => string;
    getIsConfigurableAttributeAvailable: (o: ProductConfigurableAttribute) => boolean;
    handleShakeAnimationEnd: (e: AnimationEvent<HTMLElement>) => void;
}

export type ProductConfigurableAttributesComponentContainerPropsKeys =
    | 'renderPlaceholder'
    | 'configurable_options'
    | 'isExpandable'
    | 'isReady'
    | 'mix'
    | 'numberOfPlaceholders'
    | 'parameters'
    | 'showProductAttributeAsLink'
    | 'updateConfigurableVariant'
    | 'inStock'
    | 'addToCartTriggeredWithError'
    | 'updateAddToCartTriggeredWithError';

export interface ProductConfigurableAttribute extends ProductListFilter {
    attribute_value: string;
}

export interface ProductConfigurableVariant {
    stock_status: StockStatus;
    attributes: Record<string, ProductConfigurableAttribute>;
}
