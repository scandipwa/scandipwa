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

import { CLEAR_PICK_UP_STORE, SET_PICK_UP_STORE } from './StoreInPickUp.action';

/** @namespace Store/StoreInPickUp/Reducer/getInitialState */
export const getInitialState = () => ({
    store: null
});

/** @namespace Store/StoreInPickUp/Reducer/StoreInPickUpReducer */
export const StoreInPickUpReducer = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case SET_PICK_UP_STORE:
        const { store } = action;

        return {
            ...state,
            store
        };

    case CLEAR_PICK_UP_STORE:
        return {
            ...state,
            store: null
        };

    default:
        return state;
    }
};

export default StoreInPickUpReducer;
