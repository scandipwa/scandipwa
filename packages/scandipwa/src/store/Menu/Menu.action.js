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

export const UPDATE_MENU_ITEMS = 'UPDATE_MENU_ITEMS';

/**
 * Set navigation menu items
 * @param  {Object} menu Object with all menu items
 * @return {void}
 * @namespace Store/Menu/Action/updateMenuItems */
export const updateMenuItems = (menu) => ({
    type: UPDATE_MENU_ITEMS,
    menu
});
