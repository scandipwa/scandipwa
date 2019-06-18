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
import { CmsPageReducer } from 'Store/CmsPage';
import { CategoryReducer } from 'Store/Category';
import { NotificationReducer } from 'Store/Notification';
import { BreadcrumbsReducer } from 'Store/Breadcrumbs';
import { ProductReducer } from 'Store/Product';
import { HeaderAndFooterReducer } from 'Store/HeaderAndFooter';
import { CartReducer } from 'Store/Cart';
import { WishlistReducer } from 'Store/Wishlist';
import { NoMatchReducer } from 'Store/NoMatch';
import { RelatedProductsReducer } from 'Store/RelatedProducts';
import { SearchBarReducer } from 'Store/SearchBar';
import { UrlRewritesReducer } from 'Store/UrlRewrites';
import { MyAccountReducer } from 'Store/MyAccount';
import { StoreConfigReducer } from 'Store/StoreConfig';

export const reducers = {
    CmsBlocksAndSliderReducer,
    CmsPageReducer,
    CategoryReducer,
    NotificationReducer,
    BreadcrumbsReducer,
    ProductReducer,
    HeaderAndFooterReducer,
    CartReducer,
    WishlistReducer,
    NoMatchReducer,
    RelatedProductsReducer,
    SearchBarReducer,
    MyAccountReducer,
    StoreConfigReducer,
    UrlRewritesReducer
};

const combinedReducers = combineReducers(reducers);

const store = createStore(
    combinedReducers,
    ( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
    ) && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
