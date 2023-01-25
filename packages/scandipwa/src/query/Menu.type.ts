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

import { CategoryDisplayMode } from 'Route/CategoryPage/CategoryPage.config';

export interface MenuItem {
    url: string;
    title: string;
    item_id: string;
    position: number;
    parent_id: number;
    category_id: number;
    display_mode: CategoryDisplayMode;
}
