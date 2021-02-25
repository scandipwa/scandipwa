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
import getStore from 'Util/Store';

export const AUTH_TOKEN = 'auth_token';

export const ONE_HOUR = 3600;

/** @namespace Util/Auth/setAuthorizationToken */
export const setAuthorizationToken = (token) => {
    const state = getStore().getState();
    const {
        cookie_lifetime = ONE_HOUR
    } = state.ConfigReducer;

    BrowserDatabase.setItem(token, AUTH_TOKEN, cookie_lifetime);
};

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
    const state = getStore().getState();

    if (!_isSignedIn && state.MyAccountReducer.isSignedIn) {
        const MyAccountDispatcher = import('../../store/MyAccount/MyAccount.dispatcher');
        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.logout(true, getStore().dispatch)
        );
    } else if (_isSignedIn && state.MyAccountReducer.isSignedIn) {
        refreshAuthorizationToken();
    }

    return _isSignedIn;
};
