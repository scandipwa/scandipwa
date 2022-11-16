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
import { SearchBarStore } from 'Store/SearchBar/SearchBar.type';
import { IndexedProduct } from 'Util/Product/Product.type';

export interface SearchOverlayContainerMapStateProps {
    searchResults: IndexedProduct[];
    isLoading: boolean;
    isMobile: boolean;
    searchCriteria: string;
}

export interface SearchOverlayContainerMapDispatchProps {
    makeSearchRequest: (options: Partial<ProductListOptions>) => void;
    updateSearchBarStore: (state: Partial<SearchBarStore>) => void;
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
    updateSearchBarStore: (state: Partial<SearchBarStore>) => void;
    isMobile: boolean;
    isLoading: boolean;
    searchCriteria: string;
    searchResults: IndexedProduct[];
}

export type SearchOverlayComponentContainerPropKeys =
    | 'updateSearchBarStore'
    | 'isMobile'
    | 'isLoading'
    | 'searchCriteria'
    | 'searchResults';
