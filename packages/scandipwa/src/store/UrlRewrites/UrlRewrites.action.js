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

export const UPDATE_URL_REWRITE = 'UPDATE_URL_REWRITE';
export const IS_LOADING_URL_REWRITE = 'IS_LOADING_URL_REWRITE';

/** @namespace Store/UrlRewrites/Action/updateUrlRewrite */
export const updateUrlRewrite = (urlRewrite, requestedUrl) => ({
    type: UPDATE_URL_REWRITE,
    urlRewrite,
    requestedUrl
});

/** @namespace Store/UrlRewrites/Action/clearUrlRewrite */
export const setIsUrlRewritesLoading = (isLoading) => ({
    type: IS_LOADING_URL_REWRITE,
    isLoading
});
