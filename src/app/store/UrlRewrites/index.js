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

import UrlRewritesReducer from './UrlRewrites.reducer';
import UrlRewritesDispatcher, { UrlRewritesDispatcher as UrlRewritesDispatcherClass } from './UrlRewrites.dispatcher';

import {
    UPDATE_URL_REWRITE,
    CLEAR_URL_REWRITE,
    updateUrlRewrite,
    clearUrlRewrite
} from './UrlRewrites.action';

export {
    UrlRewritesReducer,
    UrlRewritesDispatcher,
    UrlRewritesDispatcherClass,
    UPDATE_URL_REWRITE,
    CLEAR_URL_REWRITE,
    updateUrlRewrite,
    clearUrlRewrite
};
