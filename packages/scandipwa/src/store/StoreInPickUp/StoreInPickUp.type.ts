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

import { Store } from 'Query/StoreInPickUp.type';

export enum StoreInPickUpActionType {
    SET_PICK_UP_STORE = 'SET_PICK_UP_STORE',
    CLEAR_PICK_UP_STORE = 'CLEAR_PICK_UP_STORE',
}

export interface SetPickUpStoreAction extends AnyAction {
    type: StoreInPickUpActionType.SET_PICK_UP_STORE;
    store: Store | null;
}

export interface ClearPickUpStoreAction extends AnyAction {
    type: StoreInPickUpActionType.CLEAR_PICK_UP_STORE;
}

export type StoreInPickUpAction = SetPickUpStoreAction | ClearPickUpStoreAction;

export interface StoreInPickUpStore {
    store: Store | null;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        StoreInPickUpReducer: StoreInPickUpStore;
    }
}
