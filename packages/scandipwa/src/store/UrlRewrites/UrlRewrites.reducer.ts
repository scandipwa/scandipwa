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

import { Action, Reducer } from 'redux';

import { UrlRewrite } from 'Type/UrlRewrite';

import {
    IS_LOADING_URL_REWRITE,
    UPDATE_URL_REWRITE
} from './UrlRewrites.action';

export interface UrlRewritesStore {
    urlRewrite: Partial<UrlRewrite>
    isLoading: boolean
    requestedUrl?: string
}

declare module 'Util/Store/type' {
    export interface RootState {
        UrlRewritesReducer: UrlRewritesStore
    }
}

export interface UrlRewritesAction {
    urlRewrite: UrlRewrite
    requestedUrl: string
    isLoading: boolean
}

/** @namespace Store/UrlRewrites/Reducer/getInitialState */
export const getInitialState = (): UrlRewritesStore => ({
    urlRewrite: {},
    isLoading: false
});

/** @namespace Store/UrlRewrites/Reducer/UrlRewritesReducer */
export const UrlRewritesReducer: Reducer<
    UrlRewritesStore,
    Action<typeof UPDATE_URL_REWRITE | typeof IS_LOADING_URL_REWRITE> & UrlRewritesAction
> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case UPDATE_URL_REWRITE:
        const {
            urlRewrite,
            requestedUrl
        } = action;

        return {
            ...state,
            isLoading: false,
            urlRewrite,
            requestedUrl
        };

    case IS_LOADING_URL_REWRITE:
        const { isLoading } = action;

        return {
            ...state,
            isLoading
        };
    default:
        return state;
    }
};

export default UrlRewritesReducer;
