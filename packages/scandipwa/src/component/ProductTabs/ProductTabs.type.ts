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

import { ProductPageTab } from 'Route/ProductPage/ProductPage.type';

export interface ProductTabsComponentProps {
    tabs: ProductTabShape[];
    activeTab: string;
    handleTabSelect: (newActiveTab: string) => void;
}

export interface ProductTabShape extends ProductPageTab {
    id: string;
}

export interface ProductTabsContainerBaseProps {
    tabs: ProductTabShape[];
}

export type ProductTabsContainerProps = ProductTabsContainerBaseProps
& ProductTabsContainerMapStateProps
& ProductTabsContainerMapDispatchProps;

export interface ProductTabsContainerMapStateProps {
    activeTab: string;
}

export interface ProductTabsContainerMapDispatchProps {
    setActiveTab: (newActiveTab: string) => void;
}

export interface ProductTabsContainerFunctions {
    handleTabSelect: (newActiveTab: string) => void;
}

export type ProductTabsContainerPropsKeys =
    'activeTab'
    | 'tabs';
