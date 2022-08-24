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
    PageMeta,
    UpdateMetaAction
} from './Meta.type';

/** @namespace Store/Meta/Action/updateMeta */
export const updateMeta = (metadata: Partial<PageMeta>): UpdateMetaAction => ({
    type: MetaActionType.UPDATE_META,
    payload: metadata
});
