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

import { updateCustomerSignInStatus } from 'Store/MyAccount/MyAccount.action';
import { deleteCartId } from 'Util/Cart';
import { removeUid } from 'Util/Compare';
import getStore, { getStoreState } from 'Util/Store';

import { getAuthorizationToken } from './Token';

/** @namespace Util/Auth/IsSignedIn/isSignedIn */

export const isSignedIn = (): boolean => {
    const hasAuthToken = !!getAuthorizationToken();
    const store = getStore();

    const {
        MyAccountReducer: {
            isSignedIn: isCustomerSignedIn = false,
        } = {},
    } = getStoreState();

    const { dispatch } = store;

    if (!hasAuthToken && isCustomerSignedIn) {
        // since logout is async and slow, remove cart id / compare uid
        // and set customer sign in status here on auth token expiration
        deleteCartId();
        dispatch(updateCustomerSignInStatus(false));
        removeUid();

        const MyAccountDispatcher = import('../../store/MyAccount/MyAccount.dispatcher');

        MyAccountDispatcher.then(
            ({ default: dispatcher }) => dispatcher.logout(true, true, dispatch),
        );
    }

    return hasAuthToken;
};

/** @namespace Util/Auth/IsSignedIn/isInitiallySignedIn */
export const isInitiallySignedIn = (): boolean => !!getAuthorizationToken();
