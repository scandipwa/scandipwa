/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { MyAccountTab } from 'Route/MyAccount/MyAccount.type';
import { Children, ObjectEntries } from 'Type/Common.type';

export interface MyAccountTabListItemComponentProps {
    children?: Children[] | Children;
    tabEntry: ObjectEntries<Record<string, MyAccountTab>>;
    isActive?: boolean;
    changeActiveTab: (key: string) => void;
}

export interface MyAccountTabListContainerState {
    isContentExpanded: boolean;
}

export interface MyAccountTabListComponentProps {
    tabMap: Record<string, MyAccountTab>;
    activeTab: OrderTabs;
    handleLogout: () => void;
    onTabClick: (key: string) => void;
    isContentExpanded: boolean;
    toggleExpandableContent: () => void;
}

export interface MyAccountTabListItemComponentState {}
