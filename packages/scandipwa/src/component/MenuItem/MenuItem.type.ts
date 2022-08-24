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

import { Mods } from 'Type/Common.type';
import { Device } from 'Type/Device.type';
import { FormattedMenuItem } from 'Util/Menu/Menu.type';

export interface MenuItemMapStateProps {
    device: Device;
}

export interface MenuItemMapDispatchProps {
    updateBreadcrumbs: () => void;
}

export interface MenuItemContainerFunctions {
    handleCategoryHover: () => void;
    handleLinkLeave: () => void;
    onItemClick: () => void;
}

export type MenuItemContainerProps = MenuItemMapStateProps & MenuItemMapDispatchProps & {
    closeMenu: () => void;
    onCategoryHover: (item: FormattedMenuItem) => void;
    item: FormattedMenuItem;
    activeMenuItemsStack: string[];
    isExpandable: boolean;
    itemMods: Mods;
    isLink: boolean;
};

export interface MenuItemComponentProps {
    activeMenuItemsStack: string[];
    isExpandable: boolean;
    isLink: boolean;
    item: FormattedMenuItem;
    itemMods: Mods;
    handleCategoryHover: () => void;
    handleLinkLeave: () => void;
    onItemClick: () => void;
}
