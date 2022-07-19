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
    isSignedIn, ONE_HOUR, ONE_HOUR_IN_SECONDS, TOKEN_REFRESH_DELAY
} from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { debounce } from 'Util/Request';
import getStore from 'Util/Store';

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
    const { website_code } = window;
    const tokens = BrowserDatabase.getItem(COMPARE_UID) || {};

    const state = getStore().getState();
    const {
        access_token_lifetime = ONE_HOUR
    } = state.ConfigReducer;

    const uidExpirationTimeInStorage = isSignedIn() ? access_token_lifetime * ONE_HOUR_IN_SECONDS : ONE_DAY;

    tokens[website_code] = uid;

    BrowserDatabase.setItem(tokens, COMPARE_UID, uidExpirationTimeInStorage);
};

/**
 *
 * @returns {string|boolean} uid
 * @namespace Util/Compare/getUid
 */
export const getUid = () => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(COMPARE_UID) || {};
    const uid = tokens[website_code];

    return (typeof uid === 'string') ? uid : false;
};

/**
 *
 * @namespace Util/Compare/removeUid
 */
export const removeUid = () => {
    const { website_code } = window;
    const uids = BrowserDatabase.getItem(COMPARE_UID) || {};

    uids[website_code] = undefined;

    BrowserDatabase.setItem(uids, COMPARE_UID);
};

/** @namespace Util/Compare/refreshUid */
export const refreshUid = debounce(
    () => setUid(getUid()),
    TOKEN_REFRESH_DELAY
);
