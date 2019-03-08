export const UPDATE_CATEGORY_PRODUCT_LIST = 'UPDATE_CATEGORY_PRODUCT_LIST';
export const UPDATE_CATEGORY_DETAILS = 'UPDATE_CATEGORY_DETAILS';
export const APPEND_CATEGORY_PRODUCT_LIST = 'APPEND_CATEGORY_PRODUCT_LIST';
export const UPDATE_LOAD_STATUS = 'UPDATE_LOAD_STATUS';

/**
 * Update product list with new list (rewrite if already exists).
 * @param {Array<Object>} items List of products returned from fetch
 * @param {Number} totalItems Total number of products in this filter
 * @return {void}
 */
const updateCategoryProductList = (items, totalItems, sortFields, filters) => ({
    type: UPDATE_CATEGORY_PRODUCT_LIST,
    items,
    totalItems,
    sortFields,
    filters
});

/**
 * Append product list.
 * @param {Array<Object>} items List of products returned from fetch
 * @return {void}
 */
const appendCategoryProductList = items => ({
    type: APPEND_CATEGORY_PRODUCT_LIST,
    items
});

/**
 * Update Category Details
 * @param {Object} category Main Category object
 * @param {Array<Object>} subCategories List subcategories
 * @return {void}
 */
const updateCategoryDetails = category => ({
    type: UPDATE_CATEGORY_DETAILS,
    category
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
    updateCategoryProductList, updateCategoryDetails, appendCategoryProductList, updateLoadStatus
};
