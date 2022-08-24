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

import { ProductListFilter } from 'Store/ProductListInfo/ProductListInfo.type';

export interface ResetAttributesContainerMapStateProps {
    currency_code: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResetAttributesContainerMapDispatchProps {}

export interface ResetAttributesContainerBaseProps {
    availableFilters: Record<string, ProductListFilter>;
    customFiltersValues: Record<string, string[]>;
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
