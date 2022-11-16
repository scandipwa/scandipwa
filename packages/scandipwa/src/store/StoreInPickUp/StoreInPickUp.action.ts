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

import {
    StoreInPickUpActionType,
    StoreInPickUpStore,
    UpdateStoreInPickUpStoreAction,
} from './StoreInPickUp.type';

/** @namespace Store/StoreInPickUp/Action/updateStoreInPickUpStore */
export const updateStoreInPickUpStore = (state: Partial<StoreInPickUpStore>): UpdateStoreInPickUpStoreAction => ({
    type: StoreInPickUpActionType.UPDATE_PICK_UP_STORE,
    state,
});
