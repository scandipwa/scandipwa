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
import CartReducer from 'Store/Cart/Cart.reducer';
import CheckoutReducer from 'Store/Checkout/Checkout.reducer';
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
import ProductListReducer from 'Store/ProductList/ProductList.reducer';
import ProductListInfoReducer from 'Store/ProductListInfo/ProductListInfo.reducer';
import StoreInPickUpReducer from 'Store/StoreInPickUp/StoreInPickUp.reducer';
import UrlRewritesReducer from 'Store/UrlRewrites/UrlRewrites.reducer';
import WishlistReducer from 'Store/Wishlist/Wishlist.reducer';

/** @namespace Store/Index/getStaticReducers */
export const getStaticReducers = () => ({
    ProductListReducer,
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
    StoreInPickUpReducer
});

export default function injectStaticReducers(store) {
    // eslint-disable-next-line no-param-reassign
    store.asyncReducers = [];

    // Inject all the static reducers into the store
    Object.entries(getStaticReducers()).forEach(
        ([name, reducer]) => {
            // eslint-disable-next-line no-param-reassign
            store.asyncReducers[name] = reducer;
            store.injectReducer(name, reducer);
        }
    );

    return store;
}
