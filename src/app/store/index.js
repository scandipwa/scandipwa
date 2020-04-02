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

import {
    createStore, combineReducers
} from 'redux';

import { CmsBlocksAndSliderReducer } from 'Store/CmsBlocksAndSlider';
import { CategoryReducer } from 'Store/Category';
import { NotificationReducer } from 'Store/Notification';
import { BreadcrumbsReducer } from 'Store/Breadcrumbs';
import { ProductReducer } from 'Store/Product';
import { ProductListReducer } from 'Store/ProductList';
import { ProductListInfoReducer } from 'Store/ProductListInfo';
import { HeaderAndFooterReducer } from 'Store/HeaderAndFooter';
import { CartReducer } from 'Store/Cart';
import { OrderReducer } from 'Store/Order';
import { WishlistReducer } from 'Store/Wishlist';
import { NoMatchReducer } from 'Store/NoMatch';
import { SearchBarReducer } from 'Store/SearchBar';
import { UrlRewritesReducer } from 'Store/UrlRewrites';
import { MyAccountReducer } from 'Store/MyAccount';
import { NavigationReducer } from 'Store/Navigation';
import { OverlayReducer } from 'Store/Overlay';
import { OfflineReducer } from 'Store/Offline';
import { PopupReducer } from 'Store/Popup';
import { ConfigReducer } from 'Store/Config';
import { MetaReducer } from 'Store/Meta';
import { LinkedProductsReducer } from 'Store/LinkedProducts';

export const reducers = {
    CmsBlocksAndSliderReducer,
    CategoryReducer,
    NotificationReducer,
    BreadcrumbsReducer,
    ProductReducer,
    ProductListReducer,
    ProductListInfoReducer,
    HeaderAndFooterReducer,
    CartReducer,
    OrderReducer,
    WishlistReducer,
    NoMatchReducer,
    SearchBarReducer,
    MyAccountReducer,
    NavigationReducer,
    OverlayReducer,
    OfflineReducer,
    PopupReducer,
    UrlRewritesReducer,
    ConfigReducer,
    MetaReducer,
    LinkedProductsReducer
};

const store = createStore(
    combineReducers(reducers),
    ( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
    ) && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true
    })
);

export default store;
