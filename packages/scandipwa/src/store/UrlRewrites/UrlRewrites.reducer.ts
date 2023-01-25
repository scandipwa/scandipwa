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

import { UrlRewritesAction, UrlRewritesActionType, UrlRewritesStore } from './UrlRewrites.type';

/** @namespace Store/UrlRewrites/Reducer/getInitialState */
export const getInitialState = (): UrlRewritesStore => ({
    urlRewrite: {},
    isLoading: false,
    requestedUrl: location.pathname,
});

/** @namespace Store/UrlRewrites/Reducer/UrlRewritesReducer */
export const UrlRewritesReducer: Reducer<
UrlRewritesStore,
UrlRewritesAction
> = (
    state = getInitialState(),
    action,
) => {
    switch (action.type) {
    case UrlRewritesActionType.UPDATE_URL_REWRITE:
        const {
            urlRewrite,
            requestedUrl,
        } = action;

        return {
            ...state,
            isLoading: false,
            urlRewrite,
            requestedUrl,
        };

    case UrlRewritesActionType.IS_LOADING_URL_REWRITE:
        const { isLoading } = action;

        return {
            ...state,
            isLoading,
        };
    default:
        return state;
    }
};

export default UrlRewritesReducer;
