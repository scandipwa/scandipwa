/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */
import getStore from 'Util/Store';
import { RootState } from 'Util/Store/Store.type';

export const WYSIWYG_MEDIA = 'wysiwyg/';
export const CATEGORY_MEDIA = 'catalog/category/';
export const PRODUCT_MEDIA = 'catalog/product';
export const LOGO_MEDIA = 'logo/';

export default (src: string, subPath = '', isMediaPath = true): string => {
    // If isMediaPath is passed return local media path

    const { ConfigReducer: { secure_base_media_url, base_url } } = getStore().getState() as RootState;
    const baseUrl = isMediaPath
        ? secure_base_media_url || '/media/'
        : base_url;

    return `${ baseUrl }${ subPath }${ src }`;
};
