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

export const AUTH_TOKEN = 'auth_token';

export const ONE_HOUR = 3600;

/** @namespace Util/Auth/setAuthorizationToken */
export const setAuthorizationToken = (token) => BrowserDatabase.setItem(token, AUTH_TOKEN, ONE_HOUR);

/** @namespace Util/Auth/deleteAuthorizationToken */
export const deleteAuthorizationToken = () => BrowserDatabase.deleteItem(AUTH_TOKEN);

/** @namespace Util/Auth/getAuthorizationToken */
export const getAuthorizationToken = () => BrowserDatabase.getItem(AUTH_TOKEN);

/** @namespace Util/Auth/isSignedIn */
export const isSignedIn = () => !!getAuthorizationToken();
