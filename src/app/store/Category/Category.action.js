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

export const UPDATE_CATEGORY_LIST = 'UPDATE_CATEGORY_LIST';
export const UPDATE_CURRENT_CATEGORY = 'UPDATE_CURRENT_CATEGORY';

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

export {
    updateCategoryList, updateCurrentCategory
};
