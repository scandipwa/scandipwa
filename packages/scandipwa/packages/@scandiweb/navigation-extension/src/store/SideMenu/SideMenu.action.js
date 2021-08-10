/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
export const OPEN_SIDE_MENU = 'OPEN_SIDE_MENU';
export const CLOSE_SIDE_MENU = 'CLOSE_SIDE_MENU';

/** @namespace Scandiweb/NavigationExtension/Store/SideMenu/Action/openSideMenu */
export const openSideMenu = () => ({
    type: OPEN_SIDE_MENU
});

/** @namespace Scandiweb/NavigationExtension/Store/SideMenu/Action/closeSideMenu */
export const closeSideMenu = () => ({
    type: CLOSE_SIDE_MENU
});
