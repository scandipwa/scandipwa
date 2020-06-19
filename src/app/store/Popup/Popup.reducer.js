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

import { SHOW_POPUP } from './Popup.action';

export const getInitialState = () => ({
    popupPayload: {}
});

export const PopupReducer = (
    state = middleware(getInitialState, 'Store/Popup/Reducer/getInitialState')(),
    action
) => {
    const { payload, type } = action;

    switch (type) {
    case SHOW_POPUP:
        return { ...state, popupPayload: payload };
    default:
        return state;
    }
};

export default middleware(PopupReducer, 'Store/Popup/Reducer');
