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

export const UPDATE_META = 'UPDATE_META';

/** @namespace Store/Meta/Action/updateMeta */
export const updateMeta = (metadata) => ({
    type: UPDATE_META,
    payload: metadata
});
