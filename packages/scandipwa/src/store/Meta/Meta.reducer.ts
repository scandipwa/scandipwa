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

import { Reducer } from 'redux';

import {
    MetaActionType,
    MetaStore,
    PageMeta,
    UpdateMetaAction,
} from './Meta.type';

export const updateEveryTime: Array<keyof PageMeta> = [
    'title',
    'description',
    'keywords',
    'canonical_url',
    'robots',
    'status_code',
];

/** @namespace Store/Meta/Reducer/filterData */
export const filterData = (data: Partial<PageMeta>): Partial<PageMeta> => {
    const updated = updateEveryTime.reduce((acc: Partial<PageMeta>, key) => {
        acc[key] = data[key];

        return acc;
    }, {});

    return { ...data, ...updated };
};

/** @namespace Store/Meta/Reducer/getInitialState */
export const getInitialState = (): MetaStore => ({
    title: '',
    title_prefix: '',
    title_suffix: '',
    description: '',
    keywords: '',
    canonical_url: '',
    robots: '',
    status_code: '',
});

/** @namespace Store/Meta/Reducer/MetaReducer */
export const MetaReducer: Reducer<MetaStore, UpdateMetaAction> = (
    state = getInitialState(),
    action,
) => {
    const { payload = {}, type } = action;

    switch (type) {
    case MetaActionType.UPDATE_META:
        const filteredData = filterData(payload);

        return {
            ...state,
            ...filteredData,
        };

    default:
        return state;
    }
};

export default MetaReducer;
