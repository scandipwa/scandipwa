export const UPDATE_PRODUCT_DETAILS = 'UPDATE_PRODUCT_DETAILS';

/**
 * Update product list with new list (rewrite if already exists).
 * @param  {Array<Object>} items List of products returned from fetch
 * @param  {Number} totalItems Total number of products in this filter
 * @return {void}
 */
const updateProductDetails = (product, filters) => ({
    type: UPDATE_PRODUCT_DETAILS,
    product,
    filters
});

export { updateProductDetails };
