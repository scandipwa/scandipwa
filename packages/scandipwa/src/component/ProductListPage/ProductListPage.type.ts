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

import { Mix } from 'Type/Common.type';

export interface ProductListPageComponentProps {
    isInfiniteLoaderEnabled: boolean;
    isLoading: boolean;
    isVisible: boolean;
    updatePages: () => void;
    numberOfPlaceholders: number;
    selectedFilters;
    wrapperRef: () => void;
    pageNumber: number;
    items;
    mix: Mix;
}

export interface ProductListPageComponentState {
    siblingsHaveBrands: boolean;
    siblingsHavePriceBadge: boolean;
    siblingsHaveTierPrice: boolean;
    siblingsHaveConfigurableOptions: boolean;
}
