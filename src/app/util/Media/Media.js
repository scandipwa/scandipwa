import { getStore } from 'Store';

export const WYSIWYG_MEDIA = 'wysiwyg/';
export const CATEGORY_MEDIA = 'catalog/category/';
export const PRODUCT_MEDIA = 'catalog/product';
export const LOGO_MEDIA = 'logo/';

export default (src, subPath = '') => {
    const { ConfigReducer: { secure_base_media_url } } = getStore().getState();
    return `${ secure_base_media_url || '/media/' }${ subPath }${ src }`;
};
