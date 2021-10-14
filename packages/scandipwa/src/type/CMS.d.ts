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

export interface PageType {
    title: string
    content: string,
    meta_title: string,
    meta_description: string,
    meta_keywords: string
}

export interface BlockType {
    title: string
    content: string
}

export interface BlockListType {
    items?: BlockType
    title?: string

    [key: string]: unknown
}
