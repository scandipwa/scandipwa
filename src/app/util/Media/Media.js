import Store from 'Store';

export const WYSIWYG_MEDIA = 'wysiwyg/';
export const CATEGORY_MEDIA = 'catalog/category';
export const PRODUCT_MEDIA = 'catalog/product';

export default (src) => {
    const { ConfigReducer: { secure_base_media_url } } = Store.getState();
    return `${ secure_base_media_url || '/media/' }${ src }`;
};
