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

import { StoreInPickUpActionType, StoreInPickUpStore } from './StoreInPickUp.type';

/** @namespace Store/StoreInPickUp/Reducer/getInitialState */
export const getInitialState = (): StoreInPickUpStore => ({
    store: null,
});

/** @namespace Store/StoreInPickUp/Reducer/StoreInPickUpReducer */
export const StoreInPickUpReducer: Reducer<
StoreInPickUpStore
> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (StoreInPickUpActionType.UPDATE_PICK_UP_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default StoreInPickUpReducer;
