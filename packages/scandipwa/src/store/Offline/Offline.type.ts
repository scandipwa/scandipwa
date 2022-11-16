/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */
import { AnyAction } from 'redux';

export enum OfflineActionType {
    UPDATE_OFFLINE_STORE = 'UPDATE_OFFLINE_STORE',
}

export interface UpdateOfflineStoreAction extends AnyAction {
    type: OfflineActionType.UPDATE_OFFLINE_STORE;
    state: Partial<OfflineStore>;
}

export interface OfflineStore {
    isOffline: boolean;
    isBig: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        OfflineReducer: OfflineStore;
    }
}
