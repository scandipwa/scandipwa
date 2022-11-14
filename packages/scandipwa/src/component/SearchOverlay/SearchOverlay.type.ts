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

import { ProductListOptions } from 'Query/ProductList.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface SearchOverlayContainerMapStateProps {
    searchResults: IndexedProduct[];
    isLoading: boolean;
    isMobile: boolean;
    searchCriteria: string;
}

export interface SearchOverlayContainerMapDispatchProps {
    makeSearchRequest: (options: Partial<ProductListOptions>) => void;
    clearSearchResults: () => void;
}

export interface SearchOverlayContainerBaseProps {
    isHideOverlay: boolean;
}

export interface SearchOverlayContainerFunctions {
    makeSearchRequest: () => void;
}

export type SearchOverlayContainerProps = SearchOverlayContainerMapStateProps
& SearchOverlayContainerMapDispatchProps
& SearchOverlayContainerBaseProps;

export interface SearchOverlayComponentProps extends SearchOverlayContainerFunctions {
    clearSearchResults: () => void;
    isMobile: boolean;
    isLoading: boolean;
    searchCriteria: string;
    searchResults: IndexedProduct[];
}

export type SearchOverlayComponentContainerPropKeys =
    | 'clearSearchResults'
    | 'isMobile'
    | 'isLoading'
    | 'searchCriteria'
    | 'searchResults';
