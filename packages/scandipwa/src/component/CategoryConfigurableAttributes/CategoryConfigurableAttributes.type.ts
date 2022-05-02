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

import { CategoryTree } from 'Query/Category.type';

export interface CategoryConfigurableAttributesContainerMapStateProps {
    currencyCode: string;
    showProductCount: boolean;
    childrenCategories: CategoryTree[];
}

export interface CategoryConfigurableAttributesContainerBaseProps {
    // parameters: SelectedFiltersType.isRequired
    parameters;
}

export type CategoryConfigurableAttributesContainerProps =
CategoryConfigurableAttributesContainerMapStateProps
& CategoryConfigurableAttributesContainerBaseProps;
