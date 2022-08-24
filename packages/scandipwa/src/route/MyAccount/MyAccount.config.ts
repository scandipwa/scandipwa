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

export enum AccountPageUrl {
    CONFIRMATION_URL = '/customer/account/confirmation',
    INFORMATION_EDIT_URL = '/customer/account/edit',
    FORGOT_PASSWORD_URL = '/customer/account/forgotpassword',
    REGISTRATION_URL = '/customer/account/create',
    LOGIN_URL = '/customer/account/login',
    ACCOUNT_URL = '/customer/account',
    ORDER_URL = '/sales/order/view/order_id',
    ORDER_PRINT_URL = '/sales/order/print/order_id',
    ORDER_HISTORY = '/sales/order/history'
}

// eslint-disable-next-line max-len
export const LOCKED_ACCOUNT_ERROR_MESSAGE = __('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
