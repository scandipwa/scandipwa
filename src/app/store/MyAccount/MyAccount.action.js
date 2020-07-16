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

export const updateCustomerSignInStatus = (status) => ({
    type: UPDATE_CUSTOMER_SIGN_IN_STATUS,
    status
});

export const updateCustomerDetails = (customer) => ({
    type: UPDATE_CUSTOMER_DETAILS,
    customer
});

export const updateCustomerPasswordResetStatus = (status) => ({
    type: UPDATE_CUSTOMER_PASSWORD_RESET_STATUS,
    status
});

export const updateCustomerPasswordForgotStatus = () => ({
    type: UPDATE_CUSTOMER_PASSWORD_FORGOT_STATUS
});
