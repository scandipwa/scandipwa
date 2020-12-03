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

export const TOGGLE_LOADER = 'TOGGLE_LOADER';
export const SET_COMPARE_LIST = 'SET_COMPARE_LIST';

/** @namespace Store/ProductCompare/Action/toggleLoader */
export const toggleLoader = (isLoading) => ({
    type: TOGGLE_LOADER,
    isLoading
});

/** @namespace Store/ProductCompare/Action/setCompareList */
export const setCompareList = (payload) => ({
    type: SET_COMPARE_LIST,
    ...payload
});
