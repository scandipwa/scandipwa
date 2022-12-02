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

import { ProductListFilter } from 'Store/ProductList/ProductList.type';

export interface ResetAttributesContainerMapStateProps {
    currency_code: string;
    customFiltersValues: Record<string, string[]>;
    availableFilters: Record<string, ProductListFilter>;
}

export interface ResetAttributesContainerMapDispatchProps {}

export interface ResetAttributesContainerBaseProps {
    toggleCustomFilter: (requestVar: string, value: string) => void;
}

export type ResetAttributesContainerProps = ResetAttributesContainerMapStateProps
& ResetAttributesContainerMapDispatchProps
& ResetAttributesContainerBaseProps;

export interface ResetAttributesComponentProps {
    toggleCustomFilter: (requestVar: string, value: string) => void;
    filtersData: Record<string, ResetItem[]>;
}

export interface FilterOption {
    value_string: string;
    label: string;
}

export interface ResetItem extends FilterOption {
    attribute_code: string;
    attribute_label: string;
    label: string;
}
