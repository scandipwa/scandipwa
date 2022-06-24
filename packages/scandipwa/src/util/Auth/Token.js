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

import { updateCustomerSignInStatus } from 'Store/MyAccount/MyAccount.action';
import BrowserDatabase from 'Util/BrowserDatabase';
import { deleteGuestQuoteId } from 'Util/Cart';
import { removeUid } from 'Util/Compare';
import { debounce } from 'Util/Request';
import getStore from 'Util/Store';

export const AUTH_TOKENS = 'auth_token';

export const ONE_HOUR_IN_SECONDS = 3600;
export const ONE_HOUR = 1;
export const TOKEN_REFRESH_DELAY = 2000;

/** @namespace Util/Auth/Token/setAuthorizationToken */
export const setAuthorizationToken = (token) => {
    if (token) {
        const { website_code } = window;

        const state = getStore().getState();
        const {
            access_token_lifetime = ONE_HOUR
        } = state.ConfigReducer;

        const tokens = BrowserDatabase.getItem(AUTH_TOKENS) || {};
        tokens[website_code] = token;
        BrowserDatabase.setItem(tokens, AUTH_TOKENS, access_token_lifetime * ONE_HOUR_IN_SECONDS);
    }
};

/** @namespace Util/Auth/Token/deleteAuthorizationToken */
export const deleteAuthorizationToken = () => {
    const { website_code } = window;

    const tokens = BrowserDatabase.getItem(AUTH_TOKENS);
    tokens[website_code] = undefined;
    BrowserDatabase.setItem(tokens, AUTH_TOKENS);
};

/** @namespace Util/Auth/Token/getAuthorizationToken */
export const getAuthorizationToken = () => {
    const { website_code } = window;
    const tokens = BrowserDatabase.getItem(AUTH_TOKENS) || {};

    const token = tokens[website_code];

    if (token) {
        return token;
    }

    return null;
};

/** @namespace Util/Auth/Token/refreshAuthorizationToken */
export const refreshAuthorizationToken = debounce(
    () => setAuthorizationToken(getAuthorizationToken()),
    TOKEN_REFRESH_DELAY
);

/** @namespace Util/Auth/Token/isInitiallySignedIn */
export const isInitiallySignedIn = () => !!getAuthorizationToken();

/** @namespace Util/Auth/Token/isSignedIn */
export const isSignedIn = () => {
    const _isSignedIn = !!getAuthorizationToken();
    const store = getStore();
    const {
        MyAccountReducer: {
            isSignedIn: isCustomerSignedIn
        } = {}
    } = store.getState();
    const { dispatch } = store;

    if (!_isSignedIn && isCustomerSignedIn) {
        // since logout is async and slow, remove cart id / compare uid
        // and set customer sign in status here on auth token expiration
        deleteGuestQuoteId();
        dispatch(updateCustomerSignInStatus(false));
        removeUid();

        const MyAccountDispatcher = import('../../store/MyAccount/MyAccount.dispatcher');
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.logout(true, true, dispatch)
        );
    }

    return _isSignedIn;
};
