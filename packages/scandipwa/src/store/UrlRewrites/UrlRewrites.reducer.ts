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

import { UrlRewritesActionType, UrlRewritesStore } from './UrlRewrites.type';

/** @namespace Store/UrlRewrites/Reducer/getInitialState */
export const getInitialState = (): UrlRewritesStore => ({
    urlRewrite: {},
    isLoading: false,
    requestedUrl: '',
});

/** @namespace Store/UrlRewrites/Reducer/UrlRewritesReducer */
export const UrlRewritesReducer: Reducer<UrlRewritesStore> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (UrlRewritesActionType.UPDATE_URL_REWRITE_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default UrlRewritesReducer;
