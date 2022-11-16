/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Customer } from 'Query/MyAccount.type';

export enum MyAccountActionType {
    UPDATE_MY_ACCOUNT_STORE = 'UPDATE_MY_ACCOUNT_STORE',
}

export interface UpdateMyAccountStoreAction {
    type: MyAccountActionType.UPDATE_MY_ACCOUNT_STORE;
    state: Partial<MyAccountStore>;
}

export interface MyAccountStore {
    isSignedIn: boolean;
    passwordResetStatus: string;
    passwordResetMessage: string;
    isPasswordForgotSend: boolean;
    isLoading: boolean;
    isLocked: boolean;
    customer: Partial<Customer>;
    message: string;
    email: string;
    status: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        MyAccountReducer: MyAccountStore;
    }
}
