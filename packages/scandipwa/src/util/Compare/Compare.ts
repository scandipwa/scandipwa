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

import {
    isSignedIn, ONE_HOUR, ONE_HOUR_IN_SECONDS, TOKEN_REFRESH_DELAY
} from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { debounce } from 'Util/Request';
import getStore from 'Util/Store';
import { RootState } from 'Util/Store/type';

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
export const setUid = (uid: string | null): void => {
    const state = getStore().getState() as RootState;
    const {
        access_token_lifetime = ONE_HOUR
    } = state.ConfigReducer;

    const uidExpirationTimeInStorage = isSignedIn()
        ? parseInt(String(access_token_lifetime), 10) * ONE_HOUR_IN_SECONDS
        : ONE_DAY;

    BrowserDatabase.setItem(uid, COMPARE_UID, uidExpirationTimeInStorage);
};

/**
 *
 * @returns {string|boolean} uid
 * @namespace Util/Compare/getUid
 */
export const getUid = (): string | null => {
    const uid = BrowserDatabase.getItem(COMPARE_UID);

    return (typeof uid === 'string') ? uid : null;
};

/**
 *
 * @namespace Util/Compare/removeUid
 */
export const removeUid = (): void => {
    BrowserDatabase.deleteItem(COMPARE_UID);
};

/** @namespace Util/Compare/refreshUid */
export const refreshUid = debounce(
    () => setUid(getUid()),
    TOKEN_REFRESH_DELAY
);
