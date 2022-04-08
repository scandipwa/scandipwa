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
import { AnyAction } from 'redux';

import { PickUpInStore } from 'Type/IsStorePickUp.type';

export enum StoreInPickUpActionType {
    SET_PICK_UP_STORE = 'SET_PICK_UP_STORE',
    CLEAR_PICK_UP_STORE = 'CLEAR_PICK_UP_STORE'
}

export interface SetPickUpStore extends AnyAction {
    type: StoreInPickUpActionType.SET_PICK_UP_STORE;
    store: PickUpInStore;
}

export interface ClearPickUpStore extends AnyAction {
    type: StoreInPickUpActionType.CLEAR_PICK_UP_STORE;
}

export type StoreInPickUpAction = SetPickUpStore | ClearPickUpStore;

export type StoreInPickUpStore = {
    store: PickUpInStore | null;
};

declare module 'Util/Store/type' {
    export interface RootState {
        StoreInPickUpReducer: StoreInPickUpStore;
    }
}
