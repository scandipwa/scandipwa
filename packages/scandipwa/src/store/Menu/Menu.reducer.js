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
import MenuHelper from 'Util/Menu';

import { UPDATE_MENU_ITEMS } from './Menu.action';

/** @namespace Store/Menu/Reducer/updateMenuItems */
export const updateMenuItems = (action, state) => {
    const { menu } = action;
    const reducedMenu = MenuHelper.reduce(menu);
    return { ...state, menu: reducedMenu };
};

/** @namespace Store/Menu/Reducer/getInitialState */
export const getInitialState = () => ({
    menu: {}
});

/** @namespace Store/Menu/Reducer/MenuReducer */
export const MenuReducer = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case UPDATE_MENU_ITEMS:
        return updateMenuItems(action, state);
    default:
        return state;
    }
};

export default MenuReducer;
