/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { AnyAction } from 'redux';

export enum NoMatchActionType {
    UPDATE_NOMATCH_STORE = 'UPDATE_NOMATCH_STORE',
}

export interface UpdateNoMatchStoreAction extends AnyAction {
    type: NoMatchActionType.UPDATE_NOMATCH_STORE;
    state: Partial<NoMatchStore>;
}

export interface NoMatchStore {
    noMatch: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        NoMatchReducer: NoMatchStore;
    }
}
