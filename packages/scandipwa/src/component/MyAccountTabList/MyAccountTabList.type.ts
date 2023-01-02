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

import { MyAccountTab } from 'Route/MyAccount/MyAccount.type';

export interface MyAccountTabListContainerMapStateProps {}

export interface MyAccountTabListContainerDispatchProps {
    logout: () => void;
}

export interface MyAccountTabListContainerFunctions {
    handleLogout: () => void;
    onTabClick: (key: string) => void;
    toggleExpandableContent: () => void;
}

export type MyAccountTabListContainerProps =
MyAccountTabListContainerMapStateProps
& MyAccountTabListContainerDispatchProps
& {
    onSignOut: () => void;
    logout: () => void;
    tabMap: Record<string, MyAccountTab>;
    activeTab: string;
    changeActiveTab: (activeTab: string) => void;
};

export interface MyAccountTabListContainerState {
    isContentExpanded: boolean;
}

export interface MyAccountTabListComponentProps {
    tabMap: Record<string, MyAccountTab>;
    activeTab: string;
    handleLogout: () => void;
    onTabClick: (key: string) => void;
    isContentExpanded: boolean;
    toggleExpandableContent: () => void;
}

export interface MyAccountTabListComponentState {}
