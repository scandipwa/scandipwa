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

import { MobileSearchBarReducer } from '../store/MobileSearchBar/MobileSearchBar.reducer';
import { SideMenuReducer } from '../store/SideMenu/SideMenu.reducer';

const getStaticReducers = (args, callback) => ({
    ...callback(...args),
    SideMenuReducer,
    MobileSearchBarReducer
});

export const config = {
    'Store/Index/getReducers': {
        function: getStaticReducers
    }
};

export default config;
