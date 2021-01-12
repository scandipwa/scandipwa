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
export const UPDATE_STORED_PAYMENT_METHODS = 'UPDATE_STORED_PAYMENT_METHODS';
export const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING ';

/** @namespace Store/Vault/Action/updateStoredPaymentMethods */
export const updateStoredPaymentMethods = (storedPaymentMethods) => ({
    type: UPDATE_STORED_PAYMENT_METHODS,
    storedPaymentMethods
});

/** @namespace Store/Vault/Action/updateIsLoading */
export const updateVaultIsLoading = (isLoading) => ({
    type: UPDATE_IS_LOADING,
    isLoading
});
