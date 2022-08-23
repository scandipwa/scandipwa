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

import jwtDecode from 'jwt-decode';

import { updateCustomerSignInStatus } from 'Store/MyAccount/MyAccount.action';
import BrowserDatabase from 'Util/BrowserDatabase';
import { deleteCartId } from 'Util/Cart';
import { removeUid } from 'Util/Compare';
import { debounce } from 'Util/Request';
import getStore from 'Util/Store';

export const AUTH_TOKEN = 'auth_token';

export const ONE_HOUR_IN_SECONDS = 3600;
export const ONE_HOUR = 1;
export const TOKEN_REFRESH_DELAY = 2000;
export const MILLISECONDS_IN_SECOND = 1000;

/** @namespace Util/Auth/Token/setAuthorizationToken */
export const setAuthorizationToken = (token) => {
    if (!token) {
        return;
    }

    const state = getStore().getState();
    const {
        access_token_lifetime = ONE_HOUR
    } = state.ConfigReducer;

    const { exp } = jwtDecode(token) || {};

    const tokenWithExp = { token, exp: exp * MILLISECONDS_IN_SECOND };

    BrowserDatabase.setItem(tokenWithExp, AUTH_TOKEN, access_token_lifetime * ONE_HOUR_IN_SECONDS, true);
};

/** @namespace Util/Auth/Token/deleteAuthorizationToken */
export const deleteAuthorizationToken = () => BrowserDatabase.deleteItem(AUTH_TOKEN, true);

/** @namespace Util/Auth/Token/getAuthorizationToken */
export const getAuthorizationToken = () => {
    const tokenWithExp = BrowserDatabase.getItem(AUTH_TOKEN, true) || {};

    const { token, exp } = tokenWithExp;

    // Magento now has two parameters to affect the auth token lifetime
    // 1. access_token_lifetime affects the session liftime, that can be prolonged every time you make an action to the backend
    // 2. JWT exp field affects JWT liftime and cannot be prolonged
    // Thus if you set access_token_lifetime 2h and JWT expires after the 1h, then you will get the "The current customer isn't authorized." error.
    if (token && Date.now() < exp) {
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
        deleteCartId();
        dispatch(updateCustomerSignInStatus(false));
        removeUid();

        const MyAccountDispatcher = import('../../store/MyAccount/MyAccount.dispatcher');

        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.logout(true, true, dispatch)
        );
    }

    return _isSignedIn;
};
