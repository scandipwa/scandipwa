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

export const UPDATE_PRODUCT_LIST_INFO = 'UPDATE_PRODUCT_LIST_INFO';
export const UPDATE_INFO_LOAD_STATUS = 'UPDATE_INFO_LOAD_STATUS';

const updateProductListInfo = (totalItems, minPrice, maxPrice, sortFields, filters) => ({
    type: UPDATE_PRODUCT_LIST_INFO,
    totalItems,
    minPrice,
    maxPrice,
    sortFields,
    filters
});

/**
 * Update loading status
 * @param {Boolean} status Loading indication boolean
 * @return {void}
 */
const updateInfoLoadStatus = status => ({
    type: UPDATE_INFO_LOAD_STATUS,
    isLoading: status
});


export {
    updateProductListInfo,
    updateInfoLoadStatus
};
