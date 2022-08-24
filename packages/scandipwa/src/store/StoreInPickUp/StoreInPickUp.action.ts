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

import { Store } from 'Query/StoreInPickUp.type';

import {
    ClearPickUpStoreAction,
    SetPickUpStoreAction,
    StoreInPickUpActionType
} from './StoreInPickUp.type';

/** @namespace Store/StoreInPickUp/Action/setPickUpStore */
export const setPickUpStore = (
    store: Store
): SetPickUpStoreAction => ({
    type: StoreInPickUpActionType.SET_PICK_UP_STORE,
    store
});

/** @namespace Store/StoreInPickUp/Action/clearPickUpStore */
export const clearPickUpStore = (): ClearPickUpStoreAction => ({
    type: StoreInPickUpActionType.CLEAR_PICK_UP_STORE
});
