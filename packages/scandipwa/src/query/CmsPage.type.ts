/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa
 */

export interface CmsPageFields {
    title: string;
    content: string;
    page_width: string;
    content_heading: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
}

export interface CmsPageQueryOptions {
    id: number;
    url_key: string;
    identifier: string;
}
