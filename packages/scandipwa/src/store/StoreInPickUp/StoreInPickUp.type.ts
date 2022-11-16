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
    UPDATE_PICK_UP_STORE = 'UPDATE_PICK_UP_STORE',
}

export interface UpdateStoreInPickUpStoreAction extends AnyAction {
    type: StoreInPickUpActionType.UPDATE_PICK_UP_STORE;
    state: Partial<StoreInPickUpStore>;
}

export interface StoreInPickUpStore {
    store: Store | null;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        StoreInPickUpReducer: StoreInPickUpStore;
    }
}
