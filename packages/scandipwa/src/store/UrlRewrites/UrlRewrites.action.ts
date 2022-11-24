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
    UpdateUrlRewriteStoreAction,
    UrlRewritesActionType,
    UrlRewritesStore,
} from './UrlRewrites.type';

/** @namespace Store/UrlRewrites/Action/updateUrlRewriteState */
export const updateUrlRewriteState = (
    state: Partial<UrlRewritesStore>,
): UpdateUrlRewriteStoreAction => ({
    type: UrlRewritesActionType.UPDATE_URL_REWRITE_STORE,
    state,
});
