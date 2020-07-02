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
    UPDATE_URL_REWRITE,
    CLEAR_URL_REWRITE
} from './UrlRewrites.action';

/** @namespace Store/UrlRewrites/Reducer/getInitialState */
export const getInitialState = () => ({
    urlRewrite: {}
});

/** @namespace Store/UrlRewrites/Reducer */
export const UrlRewritesReducer = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case UPDATE_URL_REWRITE:
        const { urlRewrite } = action;

        return {
            ...state,
            urlRewrite
        };
    case CLEAR_URL_REWRITE:
        return {
            ...state,
            urlRewrite: {}
        };
    default:
        return state;
    }
};

export default UrlRewritesReducer;
