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
import BreadcrumbsReducer from 'Store/Breadcrumbs/Breadcrumbs.reducer';
import CartReducer from 'Store/Cart/Cart.reducer';
import CategoryReducer from 'Store/Category/Category.reducer';
import CheckoutReducer from 'Store/Checkout/Checkout.reducer';
import ConfigReducer from 'Store/Config/Config.reducer';
import ContactFormReducer from 'Store/ContactForm/ContactForm.reducer';
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
import ProductCompareReducer from 'Store/ProductCompare/ProductCompare.reducer';
import ProductListReducer from 'Store/ProductList/ProductList.reducer';
import ProductListInfoReducer from 'Store/ProductListInfo/ProductListInfo.reducer';
import RecentlyViewedProductsReducer from 'Store/RecentlyViewedProducts/RecentlyViewedProducts.reducer';
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
    LinkedProductsReducer,
    CheckoutReducer,
    ContactFormReducer,
    RecentlyViewedProductsReducer,
    ProductCompareReducer
});

export default function injectStaticReducers(store) {
    // Inject all the static reducers into the store
    Object.entries(getStaticReducers()).forEach(
        ([name, reducer]) => store.injectReducer(name, reducer)
    );

    return store;
}
