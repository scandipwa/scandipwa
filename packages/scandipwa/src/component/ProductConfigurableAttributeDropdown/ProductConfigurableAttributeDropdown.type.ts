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

import {
    ProductConfigurableAttribute,
} from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.type';
import { AggregationOption } from 'Query/ProductList.type';
import { Merge } from 'Type/Common.type';
import { IndexedAttributeWithValueOption } from 'Util/Product/Product.type';

export interface ProductConfigurableAttributeDropdownContainerFunctions {
    onChange: (value: string) => void;
}

export interface ProductConfigurableAttributeDropdownContainerProps {
    option: Partial<ProductConfigurableAttribute>;
    updateConfigurableVariant?: (key: string, value: string | number | boolean, isEmpty?: boolean) => void;
    getIsConfigurableAttributeAvailable: (o: Partial<ProductConfigurableAttribute>) => boolean;
    parameters: Record<string, string | string[]>;
    isUnselected: boolean;
    handleShakeAnimationEnd: (e: AnimationEvent<HTMLElement>) => void;
}

export interface ProductConfigurableAttributeDropdownComponentProps
    extends ProductConfigurableAttributeDropdownContainerFunctions {
    selectValue: string;
    selectOptions: Partial<ProductConfigurableAttributeDropdownOption>[];
    selectName: string;
    selectLabel: string;
    isUnselected: boolean;
    handleShakeAnimationEnd: (e: AnimationEvent<HTMLElement>) => void;
}

export type ProductConfigurableAttributeDropdownComponentContainerProps =
    | 'selectValue'
    | 'selectOptions'
    | 'selectName'
    | 'selectLabel'
    | 'isUnselected'
    | 'handleShakeAnimationEnd';

export type ProductConfigurableAttributeDropdownOption = Merge<AggregationOption, IndexedAttributeWithValueOption> & {
    id: string;
    isAvailable: boolean;
};
