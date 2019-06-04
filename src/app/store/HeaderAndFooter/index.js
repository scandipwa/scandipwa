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

import HeaderAndFooterReducer from './HeaderAndFooter.reducer';
import HeaderAndFooterDispatcher, {
    HeaderAndFooterDispatcher as HeaderAndFooterDispatcherClass
} from './HeaderAndFooter.dispatcher';

import {
    UPDATE_MENU,
    TOGGLE_HEADER_AND_FOOTER,
    updateMenu,
    toggleHeaderAndFooter,
    getCountryList,
    GET_COUNTRY_LIST
} from './HeaderAndFooter.action';

export {
    HeaderAndFooterReducer,
    HeaderAndFooterDispatcher,
    HeaderAndFooterDispatcherClass,
    UPDATE_MENU,
    TOGGLE_HEADER_AND_FOOTER,
    updateMenu,
    toggleHeaderAndFooter,
    getCountryList,
    GET_COUNTRY_LIST
};
