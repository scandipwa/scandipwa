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

export const UPDATE_CUSTOMER_SIGN_IN_STATUS = 'UPDATE_CUSTOMER_SIGN_IN_STATUS';
export const UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS';
export const UPDATE_CUSTOMER_PASSWORD_RESET_STATUS = 'UPDATE_CUSTOMER_PASSWORD_RESET_STATUS';
export const UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS = 'UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS';
export const UPDATE_CUSTOMER_IS_LOADING = 'UPDATE_CUSTOMER_IS_LOADING';
export const UPDATE_CUSTOMER_IS_AUTH_TOKEN_EXPIRED = 'UPDATE_CUSTOMER_IS_AUTH_TOKEN_EXPIRED';

/** @namespace Store/MyAccount/Action/updateCustomerSignInStatus */
export const updateCustomerSignInStatus = (status) => ({
    type: UPDATE_CUSTOMER_SIGN_IN_STATUS,
    status
});

/** @namespace Store/MyAccount/Action/updateCustomerIsAuthTokenExpired */
export const updateCustomerIsAuthTokenExpired = (status) => ({
    type: UPDATE_CUSTOMER_IS_AUTH_TOKEN_EXPIRED,
    status
});

/** @namespace Store/MyAccount/Action/updateCustomerDetails */
export const updateCustomerDetails = (customer) => ({
    type: UPDATE_CUSTOMER_DETAILS,
    customer
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordResetStatus */
export const updateCustomerPasswordResetStatus = (status) => ({
    type: UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    status
});

/** @namespace Store/MyAccount/Action/updateCustomerPasswordForgotStatus */
export const updateCustomerPasswordForgotStatus = () => ({
    type: UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS
});

/** @namespace Store/MyAccount/Action/updateCustomerIsLoading */
export const updateIsLoading = (isLoading) => ({
    type: UPDATE_CUSTOMER_IS_LOADING,
    isLoading
});
