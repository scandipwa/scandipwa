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

const AUTH_TOKEN = 'auth_token';

const ONE_HOUR = 3600;

const setAuthorizationToken = (token) => BrowserDatabase.setItem(token, AUTH_TOKEN, ONE_HOUR);

const deleteAuthorizationToken = () => BrowserDatabase.deleteItem(AUTH_TOKEN);

const getAuthorizationToken = () => BrowserDatabase.getItem(AUTH_TOKEN);

const isSignedIn = () => !!getAuthorizationToken();

export {
    setAuthorizationToken,
    getAuthorizationToken,
    deleteAuthorizationToken,
    isSignedIn
};
