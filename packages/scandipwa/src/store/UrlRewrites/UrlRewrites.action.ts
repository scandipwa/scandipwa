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

import { UrlRewrite } from 'Type/Router.type';

import { SetIsUrlRewritesLoading, UpdateUrlRewrite, UrlRewritesActionType } from './UrlRewrites.type';

/** @namespace Store/UrlRewrites/Action/updateUrlRewrite */
export const updateUrlRewrite = (
    urlRewrite: Record<string, UrlRewrite>,
    requestedUrl: string
): UpdateUrlRewrite => ({
    type: UrlRewritesActionType.UPDATE_URL_REWRITE,
    urlRewrite,
    requestedUrl
});

/** @namespace Store/UrlRewrites/Action/setIsUrlRewritesLoading */
export const setIsUrlRewritesLoading = (
    isLoading: boolean
): SetIsUrlRewritesLoading => ({
    type: UrlRewritesActionType.IS_LOADING_URL_REWRITE,
    isLoading
});
