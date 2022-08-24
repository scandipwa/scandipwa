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
import { RootState } from 'Util/Store/Store.type';

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
<<<<<<< HEAD:packages/scandipwa/src/util/Compare/Compare.ts
export const setUid = (uid: string | null): void => {
    const state = getStore().getState() as RootState;
=======
export const setUid = (uid) => {
    const { website_code } = window;
    const tokens = BrowserDatabase.getItem(COMPARE_UID) || {};

    const state = getStore().getState();
>>>>>>> scandipwa/master:packages/scandipwa/src/util/Compare/Compare.js
    const {
        access_token_lifetime = ONE_HOUR
    } = state.ConfigReducer;

    const uidExpirationTimeInStorage = isSignedIn()
        ? parseInt(String(access_token_lifetime), 10) * ONE_HOUR_IN_SECONDS
        : ONE_DAY;

    tokens[website_code] = uid;

    BrowserDatabase.setItem(tokens, COMPARE_UID, uidExpirationTimeInStorage);
};

/**
 *
 * @returns {string|boolean} uid
 * @namespace Util/Compare/getUid
 */
<<<<<<< HEAD:packages/scandipwa/src/util/Compare/Compare.ts
export const getUid = (): string | null => {
    const uid = BrowserDatabase.getItem(COMPARE_UID);
=======
export const getUid = () => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(COMPARE_UID) || {};
    const uid = tokens[website_code];
>>>>>>> scandipwa/master:packages/scandipwa/src/util/Compare/Compare.js

    return (typeof uid === 'string') ? uid : null;
};

/**
 *
 * @namespace Util/Compare/removeUid
 */
<<<<<<< HEAD:packages/scandipwa/src/util/Compare/Compare.ts
export const removeUid = (): void => {
    BrowserDatabase.deleteItem(COMPARE_UID);
=======
export const removeUid = () => {
    const { website_code } = window;
    const uids = BrowserDatabase.getItem(COMPARE_UID) || {};

    uids[website_code] = undefined;

    BrowserDatabase.setItem(uids, COMPARE_UID);
>>>>>>> scandipwa/master:packages/scandipwa/src/util/Compare/Compare.js
};

/** @namespace Util/Compare/refreshUid */
export const refreshUid = debounce(
    () => setUid(getUid()),
    TOKEN_REFRESH_DELAY
);
