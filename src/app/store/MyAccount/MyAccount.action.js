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

export const UPDATE_SIGN_UP_LOAD_STATUS = 'UPDATE_SIGN_UP_LOAD_STATUS';
export const UPDATE_SIGN_UP_INFO = 'UPDATE_SIGN_UP_INFO';

const updateLoadStatus = status => ({
    type: UPDATE_SIGN_UP_LOAD_STATUS,
    isLoading: status
});

const updateSignUpInfo = data => ({
    type: UPDATE_SIGN_UP_INFO,
    data
});

export { updateLoadStatus, updateSignUpInfo };
