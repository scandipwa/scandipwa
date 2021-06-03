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

import BrowserDatabase from 'Util/BrowserDatabase';

/**
 *
 * @type {string}
 */
export const COMPARE_UID = 'compare_uid';

/**
 *
 * @type {number}
 */
export const ONE_DAY = 86400;

/**
 *
 * @param {string} uid
 * @returns {void}
 * @namespace Util/Compare/setUid
 */
export const setUid = (uid) => {
    BrowserDatabase.setItem(uid, COMPARE_UID, ONE_DAY);
};

/**
 *
 * @returns {string|boolean} uid
 * @namespace Util/Compare/getUid
 */
export const getUid = () => {
    const uid = BrowserDatabase.getItem(COMPARE_UID);

    return (typeof uid === 'string') ? uid : false;
};

/**
 *
 * @namespace Util/Compare/removeUid
 */
export const removeUid = () => {
    BrowserDatabase.deleteItem(COMPARE_UID);
};
