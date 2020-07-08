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
    combineReducers,
    createStore
} from 'redux';

import { BreadcrumbsReducer } from 'Store/Breadcrumbs';
import { CartReducer } from 'Store/Cart';
import { CategoryReducer } from 'Store/Category';
import { ConfigReducer } from 'Store/Config';
import { LinkedProductsReducer } from 'Store/LinkedProducts';
import { MetaReducer } from 'Store/Meta';
import { MyAccountReducer } from 'Store/MyAccount';
import { NavigationReducer } from 'Store/Navigation';
import { NoMatchReducer } from 'Store/NoMatch';
import { NotificationReducer } from 'Store/Notification';
import { OfflineReducer } from 'Store/Offline';
import { OrderReducer } from 'Store/Order';
import { OverlayReducer } from 'Store/Overlay';
import { PopupReducer } from 'Store/Popup';
import { ProductReducer } from 'Store/Product';
import { ProductListReducer } from 'Store/ProductList';
import { ProductListInfoReducer } from 'Store/ProductListInfo';
import { SearchBarReducer } from 'Store/SearchBar';
import { UrlRewritesReducer } from 'Store/UrlRewrites';
import { WishlistReducer } from 'Store/Wishlist';

export const staticReducers = {
    CategoryReducer,
    NotificationReducer,
    BreadcrumbsReducer,
    ProductReducer,
    ProductListReducer,
    ProductListInfoReducer,
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
    createReducer(),
    ( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
    ) && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true
    })
);

export function createReducer(asyncReducers) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers
    })
};

// Configure the store
export default function configureStore() {
    // Add a dictionary to keep track of the registered async reducers
    store.asyncReducers = {};

    // Create an inject reducer function
    // This function adds the async reducer, and creates a new combined reducer
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer
        store.replaceReducer(createReducer(store.asyncReducers))
    };

    // Return the modified store
    return store;
};

export function getStore() {
    return store;
};
