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
    ProductConfigurableAttribute
} from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.type';
import { AggregationOption } from 'Query/ProductList.type';
import { ProductListFilter } from 'Store/ProductListInfo/ProductListInfo.type';

export interface ProductConfigurableAttributeDropdownContainerProps {
    option: ProductListFilter;
    updateConfigurableVariant: (key: string, value: string | number | boolean, isEmpty: boolean) => void;
    getIsConfigurableAttributeAvailable: (o: ProductConfigurableAttribute) => boolean;
    parameters: Record<string, string>;
    isUnselected: boolean;
}

export interface ProductConfigurableAttributeDropdownComponentProps {
    selectValue: string;
    selectOptions;
    selectName: string;
    selectLabel: string;
    isUnselected: boolean;
}

export type ProductConfigurableAttributeDropdownComponentContainerProps =
    | 'selectValue'
    | 'selectOptions'
    | 'selectName'
    | 'selectLabel'
    | 'isUnselected';

export interface ProductConfigurableAttributeDropdownOption extends AggregationOption {
    id: string;
    isAvailable: boolean;
}
