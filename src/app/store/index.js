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
import { RelatedProductsReducer } from 'Store/RelatedProducts';
import { SearchBarReducer } from 'Store/SearchBar';
import { UrlRewritesReducer } from 'Store/UrlRewrites';
import { MyAccountReducer } from 'Store/MyAccount';
import { NavigationReducer } from 'Store/Navigation';
import { OverlayReducer } from 'Store/Overlay';
import { PopupReducer } from 'Store/Popup';
import { ConfigReducer } from 'Store/Config';
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
    RelatedProductsReducer,
    SearchBarReducer,
    MyAccountReducer,
    NavigationReducer,
    OverlayReducer,
    PopupReducer,
    UrlRewritesReducer,
    ConfigReducer,
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
