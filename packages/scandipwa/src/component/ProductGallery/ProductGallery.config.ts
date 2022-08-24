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

export enum ImageType {
    SMALL = 'small_image',
    THUMBNAIL = 'thumbnail',
    IMAGE = 'image'
}

export enum MediaType {
    IMAGE = 'image',
    VIDEO = 'external-video',
    PLACEHOLDER = 'placeholder'
}

export const MAX_ZOOM_SCALE = 8;

export const THUMBNAIL_KEY = ImageType.SMALL;
export const AMOUNT_OF_PLACEHOLDERS = 0;

export const PRODUCT_GALLERY_POPUP_ID = 'ProductGalleryPopup';
