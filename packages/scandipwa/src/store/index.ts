/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */
import { Reducer } from 'redux';

import BreadcrumbsReducer from 'Store/Breadcrumbs/Breadcrumbs.reducer';
import CartReducer from 'Store/Cart/Cart.reducer';
import CategoryReducer from 'Store/Category/Category.reducer';
import CheckoutReducer from 'Store/Checkout/Checkout.reducer';
import CmsReducer from 'Store/Cms/Cms.reducer';
import ConfigReducer from 'Store/Config/Config.reducer';
import ContactFormReducer from 'Store/ContactForm/ContactForm.reducer';
import MetaReducer from 'Store/Meta/Meta.reducer';
import MyAccountReducer from 'Store/MyAccount/MyAccount.reducer';
import NavigationReducer from 'Store/Navigation/Navigation.reducer';
import NoMatchReducer from 'Store/NoMatch/NoMatch.reducer';
import OfflineReducer from 'Store/Offline/Offline.reducer';
import OverlayReducer from 'Store/Overlay/Overlay.reducer';
import PopupReducer from 'Store/Popup/Popup.reducer';
import ProductCompareReducer from 'Store/ProductCompare/ProductCompare.reducer';
import ProductListInfoReducer from 'Store/ProductListInfo/ProductListInfo.reducer';
import StoreInPickUpReducer from 'Store/StoreInPickUp/StoreInPickUp.reducer';
import UrlRewritesReducer from 'Store/UrlRewrites/UrlRewrites.reducer';
import WishlistReducer from 'Store/Wishlist/Wishlist.reducer';

export type StaticReducerKeys =
| 'ProductListReducer'
| 'ProductListInfoReducer'
| 'CartReducer'
| 'WishlistReducer'
| 'NoMatchReducer'
| 'MyAccountReducer'
| 'NavigationReducer'
| 'OverlayReducer'
| 'OfflineReducer'
| 'PopupReducer'
| 'UrlRewritesReducer'
| 'ConfigReducer'
| 'MetaReducer'
| 'CheckoutReducer'
| 'ContactFormReducer'
| 'ProductCompareReducer'
| 'StoreInPickUpReducer'
| 'BreadcrumbsReducer'
| 'ProductReducer'
| 'CategoryReducer'
| 'CmsReducer';

/** @namespace Store/Index/getStaticReducers */
export const getStaticReducers = (): Record<StaticReducerKeys, Reducer> => ({
    ProductListInfoReducer,
    CartReducer,
    WishlistReducer,
    NoMatchReducer,
    MyAccountReducer,
    NavigationReducer,
    OverlayReducer,
    OfflineReducer,
    PopupReducer,
    UrlRewritesReducer,
    ConfigReducer,
    MetaReducer,
    CheckoutReducer,
    ContactFormReducer,
    ProductCompareReducer,
    StoreInPickUpReducer,
    BreadcrumbsReducer,
    CategoryReducer,
    CmsReducer,
} as Record<StaticReducerKeys, Reducer>);
