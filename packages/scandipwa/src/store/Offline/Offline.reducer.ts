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

import { OfflineActionType, OfflineStore } from './Offline.type';

/** @namespace Store/Offline/Reducer/getInitialState */
export const getInitialState = (): OfflineStore => ({
    isOffline: true,
    isBig: false,
});

/** @namespace Store/Offline/Reducer/OfflineReducer */
export const OfflineReducer: Reducer<
OfflineStore
> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (OfflineActionType.UPDATE_OFFLINE_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default OfflineReducer;
