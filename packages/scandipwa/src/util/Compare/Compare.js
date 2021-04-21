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

/**
 *
 * @type {string}
 */
export const COMPARE_UID = 'compare_uid';

/**
 *
 * @param {String} uid
 * @returns {void}
 * @namespace Util/Compare/setUid
 */
export const setUid = (uid) => {
    window.sessionStorage.setItem(COMPARE_UID, uid);
};

/**
 *
 * @returns {String/Boolean} uid
 * @namespace Util/Compare/getUid
 */
export const getUid = () => {
    const uid = window.sessionStorage.getItem(COMPARE_UID);

    return (typeof uid === 'string') ? uid : false;
};

/**
 *
 * @namespace Util/Compare/removeUid
 */
export const removeUid = () => {
    window.sessionStorage.removeItem(COMPARE_UID);
};
