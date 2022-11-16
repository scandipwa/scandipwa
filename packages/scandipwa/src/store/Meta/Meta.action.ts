/* eslint-disable import/prefer-default-export */
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
    MetaActionType,
    MetaStore,
    UpdateMetaStoreAction,
} from './Meta.type';

/** @namespace Store/Meta/Action/updateMetaStore */
export const updateMetaStore = (state: Partial<MetaStore>): UpdateMetaStoreAction => ({
    type: MetaActionType.UPDATE_META_STORE,
    state,
});
