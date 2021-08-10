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

import { closeSideMenu, openSideMenu } from './SideMenu.action';

/** @namespace Scandiweb/NavigationExtension/Store/SideMenu/Dispatcher/SideMenuDispatcher */
export class SideMenuDispatcher {
    openSideMenu(dispatch) {
        return dispatch(openSideMenu());
    }

    closeSideMenu(dispatch) {
        dispatch(closeSideMenu());
    }
}

export default new SideMenuDispatcher();
