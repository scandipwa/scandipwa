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

import { MenuItem } from 'Type/Menu.type';

export type MenuLocation = {
    pathname: string;
    search: string;
    state: {
        category?: number;
        page?: boolean;
    };
} | string;

export type FormattedMenuItem = Omit<MenuItem, 'cms_page_identifier' | 'url_type' | 'url'> & {
    url: MenuLocation;
    children: Record<string, FormattedMenuItem>;
};

export enum MenuItemType {
    TYPE_CUSTOM_URL,
    TYPE_CMS_PAGE,
    TYPE_CATEGORY
}

export enum QtyDefault {
    DEFAULT_MIN_PRODUCTS = 1,
    DEFAULT_MAX_PRODUCTS = 999
}
