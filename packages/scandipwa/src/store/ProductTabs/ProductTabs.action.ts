/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { ProductTabsActionType, ProductTabsUpdateActiveAction } from './ProductTabs.type';

/** @namespace Store/ProductTabs/Action/updateActiveTab */
export const updateActiveTab = (activeTab: string): ProductTabsUpdateActiveAction => ({
    type: ProductTabsActionType.UPDATE_ACTIVE_PRODUCT_TAB,
    activeTab,
});
