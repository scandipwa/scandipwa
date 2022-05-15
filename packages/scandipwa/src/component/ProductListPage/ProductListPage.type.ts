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

import { ProductItem } from 'Query/ProductList.type';
import { Mix } from 'Type/Common.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface ProductListPageComponentProps {
    isInfiniteLoaderEnabled: boolean;
    isLoading: boolean;
    isVisible: boolean;
    updatePages: (next?: boolean) => void;
    numberOfPlaceholders: number;
    selectedFilters: Record<string, string[]>;
    wrapperRef: (elm: HTMLElement | null) => void;
    pageNumber: number;
    items: IndexedProduct[];
    mix: Mix;
}

export interface ProductListPageComponentState {
    siblingsHaveBrands: boolean;
    siblingsHavePriceBadge: boolean;
    siblingsHaveTierPrice: boolean;
    siblingsHaveConfigurableOptions: boolean;
}
