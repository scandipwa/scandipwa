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

import {
    UPDATE_META, UPDATE_META_FROM_COTEGORY, UPDATE_META_FROM_PRODUCT
} from './Meta.action';

const updateEveryTime = [
    'title',
    'description',
    'keywords',
    'imageSrc',
    'imageWidth',
    'imageHeight',
    'imageAlt',
    'canonical_url',
    'pathname'
];

export const PDP_IMAGE_HEIGHT = 650;
export const PDP_IMAGE_WIDTH = 533;

export const PLP_IMAGE_WIDTH = 248;
export const PLP_IMAGE_HEIGHT = 297;

const getProductMeta = (product) => {
    const {
        media_gallery_entries = {}, name, canonical_url,
        meta_title, meta_keyword, meta_description
    } = product;

    const {
        base: { url: imageSrc = '' } = {}
    } = media_gallery_entries[0] || {};

    return {
        description: meta_description,
        imageHeight: PDP_IMAGE_HEIGHT,
        imageWidth: PDP_IMAGE_WIDTH,
        keywords: meta_keyword,
        title: meta_title,
        imageAlt: name,
        canonical_url,
        imageSrc
    };
};

const getCategoryMeta = (category) => {
    const {
        description,
        name, canonical_url, imageSrc,
        meta_title, meta_keyword, meta_description
    } = category;

    return {
        description: meta_description || description,
        imageHeight: PLP_IMAGE_HEIGHT,
        imageWidth: PLP_IMAGE_WIDTH,
        title: meta_title || name,
        keywords: meta_keyword,
        imageAlt: name,
        canonical_url,
        imageSrc
    };
};

const filterData = (data) => {
    const updated = updateEveryTime.reduce((acc, key) => (
        key in data
            ? { ...acc, [key]: data[key] }
            : { ...acc, [key]: undefined }
    ), {});

    return { ...data, ...updated };
};

export const initialState = {
    title: '',
    title_prefix: '',
    title_suffix: '',
    description: '',
    keywords: '',
    imageSrc: '',
    imageWidth: 0,
    imageHeight: 0,
    imageAlt: '',
    canonical_url: '',
    pathname: ''
};

export const MetaReducer = (state = initialState, action) => {
    const { payload = {}, type } = action;

    switch (type) {
    case UPDATE_META:
        const filteredData = filterData(payload);

        return {
            ...state,
            ...filteredData
        };
    case UPDATE_META_FROM_PRODUCT:
        const productMeta = getProductMeta(payload);
        const filteredProductMeta = filterData(productMeta);

        return {
            ...state,
            ...filteredProductMeta
        };
    case UPDATE_META_FROM_COTEGORY:
        const categoryMeta = getCategoryMeta(payload);
        const filteredCategoryMeta = filterData(categoryMeta);

        return {
            ...state,
            ...filteredCategoryMeta
        };
    default:
        return state;
    }
};

export default MetaReducer;
