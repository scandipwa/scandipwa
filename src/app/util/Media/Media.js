import Store from 'Store';

export const WYSIWYG_MEDIA = 'wysiwyg/';
export const CATEGORY_MEDIA = 'catalog/category/';
export const PRODUCT_MEDIA = 'catalog/product';
export const LOGO_MEDIA = 'logo/';

export default (src, subPath = '') => {
    const { ConfigReducer: { secure_base_media_url } } = Store.getState();
    return `${ secure_base_media_url || '/media/' }${ subPath }${ src }`;
};
