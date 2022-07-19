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

import {
    IS_LOADING_URL_REWRITE,
    UPDATE_URL_REWRITE
} from './UrlRewrites.action';

/** @namespace Store/UrlRewrites/Reducer/getInitialState */
export const getInitialState = () => ({
    urlRewrite: {},
    isLoading: false
});

/** @namespace Store/UrlRewrites/Reducer/UrlRewritesReducer */
export const UrlRewritesReducer = (
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
