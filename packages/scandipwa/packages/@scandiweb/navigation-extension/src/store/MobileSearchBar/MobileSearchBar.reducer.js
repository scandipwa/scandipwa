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

import { ACTIVATE_SEARCH_BAR, DEACTIVATE_SEARCH_BAR } from './MobileSearchBar.action';

/** @namespace Scandiweb/NavigationExtension/Store/MobileSearchBar/Reducer/getInitialState */
export const getInitialState = () => ({
    isSideMenuOpen: false
});

/** @namespace Scandiweb/NavigationExtension/Store/MobileSearchBar/Reducer/MobileSearchBarReducer */
export const MobileSearchBarReducer = (state = getInitialState(), action) => {
    switch (action.type) {
    case ACTIVATE_SEARCH_BAR:
        return {
            ...state,
            isActive: true
        };

    case DEACTIVATE_SEARCH_BAR:
        return {
            ...state,
            isActive: false
        };

    default:
        return state;
    }
};

export default MobileSearchBarReducer;
