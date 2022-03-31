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

import { Location } from 'Type/Router.type';

export type MenuItem = {
    item_id: string;
    is_active?: boolean;
    parent_id: number;
    position: number;
    title?: string;
    item_class?: string;
    icon?: string;
    url?: Location;
    cms_page_identifier?: string;
    category_id?: number;
}

export type MenuItems = MenuItem[];

export type Menu = {
    menu_id?: string;
    is_active?: boolean;
    css_class?: string;
    items?: MenuItems;
}
