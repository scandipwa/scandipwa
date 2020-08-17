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

import BreadcrumbsReducer from 'Store/Breadcrumbs/Breadcrumbs.reducer';
import CartReducer from 'Store/Cart/Cart.reducer';
import CategoryReducer from 'Store/Category/Category.reducer';
import ConfigReducer from 'Store/Config/Config.reducer';
import LinkedProductsReducer from 'Store/LinkedProducts/LinkedProducts.reducer';
import MetaReducer from 'Store/Meta/Meta.reducer';
import MyAccountReducer from 'Store/MyAccount/MyAccount.reducer';
import NavigationReducer from 'Store/Navigation/Navigation.reducer';
import NoMatchReducer from 'Store/NoMatch/NoMatch.reducer';
import NotificationReducer from 'Store/Notification/Notification.reducer';
import OfflineReducer from 'Store/Offline/Offline.reducer';
import OrderReducer from 'Store/Order/Order.reducer';
import OverlayReducer from 'Store/Overlay/Overlay.reducer';
import PopupReducer from 'Store/Popup/Popup.reducer';
import ProductReducer from 'Store/Product/Product.reducer';
import ProductListReducer from 'Store/ProductList/ProductList.reducer';
import ProductListInfoReducer from 'Store/ProductListInfo/ProductListInfo.reducer';
import SearchBarReducer from 'Store/SearchBar/SearchBar.reducer';
import UrlRewritesReducer from 'Store/UrlRewrites/UrlRewrites.reducer';
import WishlistReducer from 'Store/Wishlist/Wishlist.reducer';

/** @namespace Store/Index/getReducers */
export const getStaticReducers = () => ({
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
});

export function createReducer(asyncReducers) {
    return combineReducers({
        ...getStaticReducers(),
        ...asyncReducers
    });
}

export const store = createStore(
    createReducer(),
    ( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
    ) && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true
    })
);

// Configure the store
export default function configureStore() {
    // Add a dictionary to keep track of the registered async reducers
    store.asyncReducers = {};

    // Create an inject reducer function
    // This function adds the async reducer, and creates a new combined reducer
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    };

    // Return the modified store
    return store;
}

export function getStore() {
    return store;
}
