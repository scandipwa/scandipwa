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

export const UPDATE_MENU = 'UPDATE_MENU';
export const TOGGLE_HEADER_AND_FOOTER = 'TOGGLE_HEADER_AND_FOOTER';

export const updateMenu = menu => ({
    type: UPDATE_MENU,
    menu
});

export const toggleHeaderAndFooter = isHeaderAndFooterVisible => ({
    type: TOGGLE_HEADER_AND_FOOTER,
    isHeaderAndFooterVisible
});
