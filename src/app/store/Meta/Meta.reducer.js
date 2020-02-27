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

import { UPDATE_META } from './Meta.action';

export const updateEveryTime = [
    'title',
    'description',
    'keywords',
    'imageSrc',
    'pathname',
    'imageAlt',
    'imageWidth',
    'imageHeight',
    'canonical_url'
];

export const filterData = (data) => {
    const updated = updateEveryTime.reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
    }, {});

    return { ...data, ...updated };
};

export const initialState = {
    title: '',
    pathname: '',
    imageSrc: '',
    imageAlt: '',
    keywords: '',
    imageWidth: 0,
    imageHeight: 0,
    description: '',
    title_prefix: '',
    title_suffix: '',
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

    default:
        return state;
    }
};

export default MetaReducer;
