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

export const HamburgerMenu = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "navigation-extension" */
    '../component/HamburgerMenu'
));

export const BEFORE_ITEMS_TYPE = (originalMember) => {
    console.debug(originalMember[0].component);
    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
    return [
        ...originalMember,
        {
            component: <HamburgerMenu />,
            position: 45
        }
    ];
};

export const config = {
    'Component/Router/Component': {
        'member-property': {
            BEFORE_ITEMS_TYPE
        }
    }
};

export default config;
