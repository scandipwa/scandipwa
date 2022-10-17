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

import {
    MyAccountActionType,
    UpdateCustomerDetailsAction,
    UpdateCustomerPasswordForgotEmailAction,
    UpdateCustomerPasswordForgotStatusAction,
    UpdateCustomerPasswordResetStatusAction,
    UpdateCustomerSignInStatusAction,
    UpdateIsLoadingAction,
    UpdateIsLockedAction,
} from './MyAccount.type';

/** @namespace Store/MyAccount/Action/updateCustomerSignInStatus */
export const updateCustomerSignInStatus = (status: boolean): UpdateCustomerSignInStatusAction => ({
    type: MyAccountActionType.UPDATE_CUSTOMER_SIGN_IN_STATUS,
    status,
});

/** @namespace Store/MyAccount/Action/updateCustomerDetails */
export const updateCustomerDetails = (customer: Partial<Customer>): UpdateCustomerDetailsAction => ({
    type: MyAccountActionType.UPDATE_CUSTOMER_DETAILS,
    customer,
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordResetStatus */
export const updateCustomerPasswordResetStatus = (
    status: string,
    message: string,
): UpdateCustomerPasswordResetStatusAction => ({
    type: MyAccountActionType.UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    status,
    message,
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordForgotStatus */
export const updateCustomerPasswordForgotStatus = (): UpdateCustomerPasswordForgotStatusAction => ({
    type: MyAccountActionType.UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS,
});

/** @namespace Store/MyAccount/Action/updateIsLoading */
export const updateIsLoading = (isLoading: boolean): UpdateIsLoadingAction => ({
    type: MyAccountActionType.UPDATE_CUSTOMER_IS_LOADING,
    isLoading,
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordForgotEmail */
export const updateCustomerPasswordForgotEmail = (email: string): UpdateCustomerPasswordForgotEmailAction => ({
    type: MyAccountActionType.UPDATE_CUSTOMER_PASSWORD_FORGOT_EMAIL,
    email,
});

/** @namespace Store/MyAccount/Action/updateIsLocked */
export const updateIsLocked = (isLocked: boolean): UpdateIsLockedAction => ({
    type: MyAccountActionType.UPDATE_CUSTOMER_IS_LOCKED,
    isLocked,
});
