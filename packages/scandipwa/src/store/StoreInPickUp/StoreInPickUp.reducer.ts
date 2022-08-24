/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */
import { Reducer } from 'redux';

import {
    StoreInPickUpAction,
    StoreInPickUpActionType,
    StoreInPickUpStore
} from './StoreInPickUp.type';

/** @namespace Store/StoreInPickUp/Reducer/getInitialState */
export const getInitialState = (): StoreInPickUpStore => ({
    store: null
});

/** @namespace Store/StoreInPickUp/Reducer/StoreInPickUpReducer */
export const StoreInPickUpReducer: Reducer<
StoreInPickUpStore,
StoreInPickUpAction
> = (
    state = getInitialState(),
    action
) => {
    const { type } = action;

    switch (type) {
    case StoreInPickUpActionType.SET_PICK_UP_STORE:
        const { store } = action;

        return {
            ...state,
            store
        };

    case StoreInPickUpActionType.CLEAR_PICK_UP_STORE:
        return {
            ...state,
            store: null
        };

    default:
        return state;
    }
};

export default StoreInPickUpReducer;
