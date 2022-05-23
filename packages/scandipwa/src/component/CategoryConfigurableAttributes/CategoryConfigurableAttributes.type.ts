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
    ProductConfigurableAttribute,
    ProductConfigurableAttributesComponentContainerFunctions,
    ProductConfigurableAttributesComponentContainerPropsKeys,
    ProductConfigurableAttributesComponentProps,
    ProductConfigurableAttributesContainerProps
} from 'Component/ProductConfigurableAttributes/ProductConfigurableAttributes.type';
import { CategoryTree } from 'Query/Category.type';
import { Merge } from 'Type/Common.type';

export interface CategoryConfigurableAttributesContainerMapStateProps {
    currencyCode: string;
    showProductCount: boolean;
    childrenCategories: CategoryTree[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoryConfigurableAttributesContainerMapDispatchProps {}

export interface CategoryConfigurableAttributesContainerBaseProps
    extends ProductConfigurableAttributesContainerProps {
    parameters: Record<string, string>;
    isSearchPage: boolean;
}

export type CategoryConfigurableAttributesContainerProps =
CategoryConfigurableAttributesContainerMapStateProps
& CategoryConfigurableAttributesContainerBaseProps;

export interface CategoryConfigurableAttributesComponentContainerFunctions
    extends ProductConfigurableAttributesComponentContainerFunctions {
    getSubCategories: (option: Partial<ProductConfigurableAttribute>) => Partial<ProductConfigurableAttribute>;
}

export interface CategoryConfigurableAttributesComponentBaseProps extends ProductConfigurableAttributesComponentProps {
    currencyCode: string;
    showProductCount: boolean;
    childrenCategories: CategoryTree[];
}

export type CategoryConfigurableAttributesComponentProps = Merge<
CategoryConfigurableAttributesComponentBaseProps,
CategoryConfigurableAttributesComponentContainerFunctions
>;

export type CategoryConfigurableAttributesComponentContainerPropKeys =
| ProductConfigurableAttributesComponentContainerPropsKeys
| 'currencyCode'
| 'showProductCount'
| 'childrenCategories';
