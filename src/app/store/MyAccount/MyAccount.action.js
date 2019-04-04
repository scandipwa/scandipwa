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

const UPDATE_CUSTOMER_SIGN_IN_STATUS = 'UPDATE_CUSTOMER_SIGN_IN_STATUS';
const UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS';

const updateCustomerSignInStatus = status => ({
    type: UPDATE_CUSTOMER_SIGN_IN_STATUS,
    status
});

const updateCustomerDetails = customer => ({
    type: UPDATE_CUSTOMER_DETAILS,
    customer
});

export {
    UPDATE_CUSTOMER_SIGN_IN_STATUS,
    UPDATE_CUSTOMER_DETAILS,
    updateCustomerSignInStatus,
    updateCustomerDetails
};
