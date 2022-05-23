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

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { OrderTab } from 'Component/MyAccountOrder/MyAccountOrder.type';

export interface MyAccountOrderTabsComponentProps {
    tabs: OrderTab[];
    handleChangeActiveTab: (tab: OrderTabs) => void;
    activeTab: OrderTabs;
}
