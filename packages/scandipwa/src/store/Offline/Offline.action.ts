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
    OfflineActionType,
    OfflineStore,
    UpdateOfflineStoreAction,
} from './Offline.type';

/** @namespace Store/Offline/Action/updateOfflineStore */
export const updateOfflineStore = (state: Partial<OfflineStore>): UpdateOfflineStoreAction => ({
    type: OfflineActionType.UPDATE_OFFLINE_STORE,
    state,
});
