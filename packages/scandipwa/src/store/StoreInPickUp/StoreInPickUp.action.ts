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

import { PickUpInStore } from 'Type/IsStorePickUp.type';

import { ClearPickUpStore, SetPickUpStore, StoreInPickUpActionType } from './StoreInPickUp.type';

/** @namespace Store/StoreInPickUp/Action/setPickUpStore */
export const setPickUpStore = (
    store:PickUpInStore
): SetPickUpStore => ({
    type: StoreInPickUpActionType.SET_PICK_UP_STORE,
    store
});

/** @namespace Store/StoreInPickUp/Action/clearPickUpStore */
export const clearPickUpStore = (): ClearPickUpStore => ({
    type: StoreInPickUpActionType.CLEAR_PICK_UP_STORE
});
