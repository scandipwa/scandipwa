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

export interface MenuItem {
    url: string;
    icon: string;
    title: string;
    item_id: number;
    position: number;
    url_type: number;
    parent_id: number;
    is_active: boolean;
    item_class: string;
    category_id: number;
    cms_page_identifier: string;
}

export interface Menu {
    menu_id: string;
    is_active: boolean;
    css_class: string;
    items: MenuItem[];
}
