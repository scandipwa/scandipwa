/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { SearchBarActionType, SearchBarStore, UpdateSearchBarStoreAction } from './SearchBar.type';

/** @namespace Store/SearchBar/Action/updateSearchBarStore */
export const updateSearchBarStore = (state: Partial<SearchBarStore>): UpdateSearchBarStoreAction => ({
    type: SearchBarActionType.UPDATE_SEARCH_BAR_STORE,
    state,
});
