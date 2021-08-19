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

import { lazy } from 'react';

import { MENU, NAVIGATION_TABS } from 'Component/Router/Router.config';

export const HamburgerMenu = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "navigation-extension" */
    '../component/HamburgerMenu'
));

export const BEFORE_ITEMS_TYPE = (originalMember) => originalMember.filter((route) => route.name !== NAVIGATION_TABS);

export const SWITCH_ITEMS_TYPE = (originalMember) => originalMember.filter((route) => route.name !== MENU);

export const config = {
    'Component/Router/Component': {
        'member-property': {
            BEFORE_ITEMS_TYPE,
            SWITCH_ITEMS_TYPE
        }
    }
};

export default config;
