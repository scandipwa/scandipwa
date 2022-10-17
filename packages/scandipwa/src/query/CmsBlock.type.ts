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

export interface CmsBlock {
    title: string;
    content: string;
    identifier: string;
    disabled: boolean;
}

export interface CmsBlocks {
    items: CmsBlock[];
}

export interface CmsBlockQueryOutput {
    cmsBlocks: CmsBlocks;
}
