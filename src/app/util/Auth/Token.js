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

import { store } from '../../store';

export const AUTH_TOKEN = 'auth_token';

export const ONE_HOUR = 3600;

/** @namespace Util/Auth/setAuthorizationToken */
export const setAuthorizationToken = (token) => BrowserDatabase.setItem(token, AUTH_TOKEN, ONE_HOUR);

/** @namespace Util/Auth/deleteAuthorizationToken */
export const deleteAuthorizationToken = () => BrowserDatabase.deleteItem(AUTH_TOKEN);

/** @namespace Util/Auth/getAuthorizationToken */
export const getAuthorizationToken = () => BrowserDatabase.getItem(AUTH_TOKEN);

/** @namespace Util/Auth/refreshAuthorizationToken */
export const refreshAuthorizationToken = () => setAuthorizationToken(getAuthorizationToken());

/** @namespace Util/Auth/isInitiallySignedIn */
export const isInitiallySignedIn = () => !!getAuthorizationToken();

/** @namespace Util/Auth/isSignedIn */
export const isSignedIn = () => {
    const _isSignedIn = !!getAuthorizationToken();
    const state = store.getState();

    if (!_isSignedIn && state.MyAccountReducer.isSignedIn) {
        const MyAccountDispatcher = import('../../store/MyAccount/MyAccount.dispatcher');
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.logout(true, store.dispatch)
        );
    } else if (_isSignedIn && state.MyAccountReducer.isSignedIn) {
        refreshAuthorizationToken();
    }

    return _isSignedIn;
};
