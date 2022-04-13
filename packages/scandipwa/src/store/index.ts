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
import { AnyAction, Reducer } from 'redux';

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

export type StaticReducers = {
    // ProductListReducer: ReturnType<typeof ProductListReducer>;
    // ProductListInfoReducer: ReturnType<typeof ProductListInfoReducer>;
    CartReducer: ReturnType<typeof CartReducer>;
    WishlistReducer: ReturnType<typeof WishlistReducer>;
    NoMatchReducer: ReturnType<typeof NoMatchReducer>;
    MyAccountReducer: ReturnType<typeof MyAccountReducer>;
    NavigationReducer: ReturnType<typeof NavigationReducer>;
    OverlayReducer: ReturnType<typeof OverlayReducer>;
    OfflineReducer: ReturnType<typeof OfflineReducer>;
    PopupReducer: ReturnType<typeof PopupReducer>;
    UrlRewritesReducer: ReturnType<typeof UrlRewritesReducer>;
    ConfigReducer: ReturnType<typeof ConfigReducer>;
    MetaReducer: ReturnType<typeof MetaReducer>;
    CheckoutReducer: ReturnType<typeof CheckoutReducer>;
    ContactFormReducer: ReturnType<typeof ContactFormReducer>;
    ProductCompareReducer: ReturnType<typeof ProductCompareReducer>;
    StoreInPickUpReducer: ReturnType<typeof StoreInPickUpReducer>;
};

/** @namespace Store/Index/getStaticReducers */
export const getStaticReducers = (): StaticReducers => ({
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
} as unknown as StaticReducers);

export type StaticReducersType = ReturnType<typeof getStaticReducers>;

export default function injectStaticReducers<
    S,
    T extends ModifiedReduxStore<S>
>(store: T): T & StaticReducersType {
    // eslint-disable-next-line no-param-reassign
    // store.asyncReducers = {};

    // Inject all the static reducers into the store
    Object.entries(getStaticReducers()).forEach(
        ([name, reducer]) => {
            if (store.injectReducer) {
                store.injectReducer(name, reducer as Reducer<S, AnyAction>);
            }
        }
    );

    return store as T & StaticReducersType;
}
