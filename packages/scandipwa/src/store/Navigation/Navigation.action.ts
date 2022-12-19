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

import { NavigationActionType, NavigationStore } from './Navigation.type';

/** @namespace Store/Navigation/Action/updateNavigationStore */
export const updateNavigationStore = (state: Partial<NavigationStore>) => ({
    type: NavigationActionType.UPDATE_NAVIGATION_STORE,
    state,
});
