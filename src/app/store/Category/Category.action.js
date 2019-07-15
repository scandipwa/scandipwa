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

export const UPDATE_CATEGORY_PRODUCT_LIST = 'UPDATE_CATEGORY_PRODUCT_LIST';
export const UPDATE_CATEGORY_LIST = 'UPDATE_CATEGORY_LIST';
export const UPDATE_CURRENT_CATEGORY = 'UPDATE_CURRENT_CATEGORY';
export const APPEND_CATEGORY_PRODUCT_LIST = 'APPEND_CATEGORY_PRODUCT_LIST';
export const UPDATE_LOAD_STATUS = 'UPDATE_LOAD_STATUS';

/**
 * Update product list with new list (rewrite if already exists).
 * @param {Array<Object>} items List of products returned from fetch
 * @param {Number} totalItems Total number of products in this filter
 * @return {void}
 */
const updateCategoryProductList = (items, totalItems, minPrice, maxPrice, sortFields, filters) => ({
    type: UPDATE_CATEGORY_PRODUCT_LIST,
    items,
    totalItems,
    minPrice,
    maxPrice,
    sortFields,
    filters
});

/**
 * Append product list.
 * @param {Array<Object>} items List of products returned from fetch
 * @return {void}
 */
const appendCategoryProductList = (items, minPrice, maxPrice) => ({
    type: APPEND_CATEGORY_PRODUCT_LIST,
    items,
    minPrice,
    maxPrice
});

/**
 * Update Category Details
 * @param {Object} category Main Category object
 * @param {Array<Object>} subCategories List subcategories
 * @return {void}
 */
const updateCategoryList = categoryList => ({
    type: UPDATE_CATEGORY_LIST,
    categoryList
});

/**
 * Update Current Category
 * @param {String} categoryUrlPath url path Main Category object
 * @return {void}
 */
const updateCurrentCategory = (categoryUrlPath, categoryIds, isSearchPage) => ({
    type: UPDATE_CURRENT_CATEGORY,
    categoryUrlPath,
    categoryIds,
    isSearchPage
});

/**
 * Change loading status
 * @param {Boolean} status Loading indication boolean
 * @return {void}
 */
const updateLoadStatus = status => ({
    type: UPDATE_LOAD_STATUS,
    isLoading: status
});

export {
    updateCategoryProductList, updateCategoryList, updateCurrentCategory, appendCategoryProductList, updateLoadStatus
};
