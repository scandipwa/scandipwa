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

import { MetaTitle } from 'Type/Common.type';

export type Page = {
    title?: string;
    content?: string;
    meta_title?: MetaTitle;
    meta_description?: string;
    meta_keywords?: string;
}

export type Block = {
    title?: string;
    content?: string;
}

export type BlockList = {
    items?: Record<string, Block>
}
