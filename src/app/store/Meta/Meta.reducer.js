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

export const updateEveryTime = [
    'title',
    'description',
    'keywords',
    'canonical_url'
];

export const getProductMeta = (product) => {
    const {
        meta_title, meta_keyword, meta_description,
        canonical_url
    } = product;

    return {
        description: meta_description,
        keywords: meta_keyword,
        title: meta_title,
        canonical_url
    };
};

export const getCategoryMeta = (category) => {
    const {
        description, name, canonical_url,
        meta_title, meta_keyword, meta_description
    } = category;

    return {
        description: meta_description || description,
        title: meta_title || name,
        keywords: meta_keyword,
        canonical_url
    };
};

export const filterData = (data) => {
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
    canonical_url: ''
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
