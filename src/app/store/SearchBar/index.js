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

import SearchBarReducer from './SearchBar.reducer';
import SearchBarDispatcher, { SearchBarDispatcher as SearchBarDispatcherClass } from './SearchBar.dispatcher';

import {
    UPDATE_SEARCH_BAR,
    UPDATE_SEARCH_LOAD_STATUS,
    updateSearchBar,
    updateLoadStatus
} from './SearchBar.action';

export {
    SearchBarReducer,
    SearchBarDispatcher,
    SearchBarDispatcherClass,
    UPDATE_SEARCH_BAR,
    UPDATE_SEARCH_LOAD_STATUS,
    updateSearchBar,
    updateLoadStatus
};
