// TODO update this import when renamed

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
import { CLOSE_SIDE_MENU, OPEN_SIDE_MENU } from './SideMenu.action';

/** @namespace Scandiweb/NavigationExtension/Store/SideMenu/Reducer/getInitialState */
export const getInitialState = () => ({
    isSideMenuOpen: false
});

/** @namespace Scandiweb/NavigationExtension/Store/SideMenu/Reducer/SideMenuReducer */
export const SideMenuReducer = (state = getInitialState(), action) => {
    switch (action.type) {
    case OPEN_SIDE_MENU:
        return {
            ...state,
            isSideMenuOpen: true
        };
    case CLOSE_SIDE_MENU:
        return {
            ...state,
            isSideMenuOpen: false
        };

    default:
        return state;
    }
};

export default SideMenuReducer;
