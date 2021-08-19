/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
import { CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_BAR, UPDATE_SEARCH_LOAD_STATUS } from 'Store/SearchBar/SearchBar.action';
import { getInitialState } from 'Store/SearchBar/SearchBar.reducer';
import { getIndexedProducts } from 'Util/Product';

export const ACTIVATE_SEARCH_BAR = 'ACTIVATE_SEARCH_BAR';
export const DEACTIVATE_SEARCH_BAR = 'DEACTIVATE_SEARCH_BAR';

/** @namespace Scandiweb/NavigationExtension/Store/MobileSearchBar/Action/activateSearchBar */
export const activateSearchBar = () => ({
    type: ACTIVATE_SEARCH_BAR
});

/** @namespace Scandiweb/NavigationExtension/Store/MobileSearchBar/Action/deactivateSearchBar */
export const deactivateSearchBar = () => ({
    type: DEACTIVATE_SEARCH_BAR
});
