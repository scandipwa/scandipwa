/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export type DownloadableLink = {
    sample_url?: string;
    sort_order?: number;
    title?: string;
    id?: number;
    uid?: string;
    price?: number;
};

export type DownloadableLinks = DownloadableLink | string;
