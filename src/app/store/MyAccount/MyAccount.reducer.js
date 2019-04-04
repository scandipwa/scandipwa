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
    isSignedIn as isInitiallySignedIn
} from 'Util/Auth';

import {
    UPDATE_CUSTOMER_SIGN_IN_STATUS,
    UPDATE_CUSTOMER_DETAILS
} from './MyAccount.dispatcher';

const initialState = {
    isSignedIn: isInitiallySignedIn(),
    customer: {}
};

const MyAccountReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_CUSTOMER_SIGN_IN_STATUS:
        const { status } = action;

        return {
            isSignedIn: status,
            ...state
        };

    case UPDATE_CUSTOMER_DETAILS:
        const { customer } = action;

        return {
            customer,
            ...state
        };

    default:
        return state;
    }
};

export default MyAccountReducer;
