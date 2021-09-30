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

import { Action, Reducer } from 'redux';

import {
    SET_BIG_OFFLINE_NOTICE,
    SHOW_OFFLINE_NOTICE
} from './Offline.action';

export interface OfflineStore {
    isOffline: boolean
    isBig: boolean
}

declare module 'Util/Store/type' {
    export interface RootState {
        OfflineReducer: OfflineStore
    }
}

export interface OfflineAction extends Partial<OfflineStore> {}

/** @namespace Store/Offline/Reducer/getInitialState */
export const getInitialState = (): OfflineStore => ({
    isOffline: true,
    isBig: false
});

/** @namespace Store/Offline/Reducer/OfflineReducer */
export const OfflineReducer: Reducer<
    OfflineStore,
    Action<typeof SET_BIG_OFFLINE_NOTICE | typeof SHOW_OFFLINE_NOTICE> & OfflineAction
> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case SHOW_OFFLINE_NOTICE:
        const { isOffline } = action;

        return {
            ...state,
            isOffline: isOffline as boolean
        };
    case SET_BIG_OFFLINE_NOTICE:
        const { isBig } = action;

        return {
            ...state,
            isBig: isBig as boolean
        };
    default:
        return state;
    }
};

export default OfflineReducer;
