export const UPDATE_RELATED_PRODUCTS = 'UPDATE_RELATED_PRODUCTS';

/**
 * Update related products list (rewrite if already exists).
 * @param  {Array<String>} relatedProducts List of products returned from fetch
 * @return {void}
 */
const updateRelatedProducts = relatedProducts => ({
    type: UPDATE_RELATED_PRODUCTS,
    relatedProducts
});

export { updateRelatedProducts };
