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

import { MouseEvent } from 'react';

import { Device } from 'Type/Device.type';
import { FormattedMenuItem } from 'Util/Menu/Menu.type';

export interface MenuContainerMapStateProps {
    device: Device;
    compareTotals: number;
}

export type MenuContainerMapDispatchProps = Record<string, unknown>;

export type MenuContainerProps = MenuContainerMapStateProps & MenuContainerMapDispatchProps;

export interface MenuContainerState {
    activeMenuItemsStack: string[];
    menu: Record<string, FormattedMenuItem>;
}

export interface MenuComponentProps {
    menu: Record<string, FormattedMenuItem>;
    compareTotals: number;
    activeMenuItemsStack: string[];
    handleSubcategoryClick: (e: MouseEvent, item: FormattedMenuItem) => void;
    closeMenu: () => void;
    onCategoryHover: (activeSubcategory: FormattedMenuItem) => void;
    device: Device;
}
