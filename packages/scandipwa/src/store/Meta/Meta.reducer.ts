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
} from './Meta.type';

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
export const MetaReducer: Reducer<MetaStore> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (MetaActionType.UPDATE_META_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default MetaReducer;
