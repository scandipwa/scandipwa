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

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';

export interface MyAccountOrderTabContainerFunctions {
    handleClickOnTab: () => void;
}

export interface MyAccountOrderTabContainerProps {
    onTabClick: (tab: OrderTabs) => void;
    title: string;
    tabName: OrderTabs;
    isActive: boolean;
}

export interface MyAccountOrderTabComponentProps {
    title: string;
    handleClickOnTab: () => void;
    isActive: boolean;
}

export type MyAccountOrderTabContainerPropsKeys = 'title'
| 'isActive';
