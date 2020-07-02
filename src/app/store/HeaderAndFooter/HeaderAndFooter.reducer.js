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

import MenuReducer from 'Util/Menu';
import {
    UPDATE_MENU,
    TOGGLE_HEADER_AND_FOOTER
} from './HeaderAndFooter.action';

/** @namespace Store/HeaderAndFooter/Reducer/getInitialState */
export const getInitialState = () => ({
    menu: {},
    isHeaderAndFooterVisible: true
});

/** @namespace Store/HeaderAndFooter/Reducer */
export const HeaderAndFooterReducer = (
    state = getInitialState(),
    action
) => {
    const { type, isHeaderAndFooterVisible, menu } = action;

    switch (type) {
    case UPDATE_MENU:
        return { ...state, menu: MenuReducer.reduce(menu) };
    case TOGGLE_HEADER_AND_FOOTER:
        return { ...state, isHeaderAndFooterVisible };
    default:
        return state;
    }
};

export default HeaderAndFooterReducer;
