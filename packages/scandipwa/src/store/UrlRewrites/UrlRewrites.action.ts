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
    SetIsUrlRewritesLoadingAction,
    UpdateUrlRewriteAction,
    UrlRewrite,
    UrlRewritesActionType,
} from './UrlRewrites.type';

/** @namespace Store/UrlRewrites/Action/updateUrlRewrite */
export const updateUrlRewrite = (
    urlRewrite: UrlRewrite,
    requestedUrl: string,
): UpdateUrlRewriteAction => ({
    type: UrlRewritesActionType.UPDATE_URL_REWRITE,
    urlRewrite,
    requestedUrl,
});

/** @namespace Store/UrlRewrites/Action/setIsUrlRewritesLoading */
export const setIsUrlRewritesLoading = (
    isLoading: boolean,
): SetIsUrlRewritesLoadingAction => ({
    type: UrlRewritesActionType.IS_LOADING_URL_REWRITE,
    isLoading,
});
