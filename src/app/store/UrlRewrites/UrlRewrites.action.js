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
export const CLEAR_URL_REWRITE = 'CLEAR_URL_REWRITE';

export const updateUrlRewrite = urlRewrite => ({
    type: UPDATE_URL_REWRITE,
    urlRewrite
});

export const clearUrlRewrite = () => ({
    type: CLEAR_URL_REWRITE
});
