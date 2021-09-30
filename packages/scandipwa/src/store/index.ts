/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
import { Action, Reducer } from 'redux';

import { CartReducer } from 'Store/Cart/Cart.reducer';
import { CheckoutReducer } from 'Store/Checkout/Checkout.reducer';
import { ConfigReducer } from 'Store/Config/Config.reducer';
import { ContactFormReducer } from 'Store/ContactForm/ContactForm.reducer';
import { MetaReducer } from 'Store/Meta/Meta.reducer';
import { MyAccountReducer } from 'Store/MyAccount/MyAccount.reducer';
import { NavigationReducer } from 'Store/Navigation/Navigation.reducer';
import { NoMatchReducer } from 'Store/NoMatch/NoMatch.reducer';
import { OfflineReducer } from 'Store/Offline/Offline.reducer';
import { OverlayReducer } from 'Store/Overlay/Overlay.reducer';
import { PopupReducer } from 'Store/Popup/Popup.reducer';
import { ProductCompareReducer } from 'Store/ProductCompare/ProductCompare.reducer';
import { ProductListReducer } from 'Store/ProductList/ProductList.reducer';
import { UrlRewritesReducer } from 'Store/UrlRewrites/UrlRewrites.reducer';
import { WishlistReducer } from 'Store/Wishlist/Wishlist.reducer';
import type { ModifiedReduxStore } from 'Util/Store';

/** @namespace Store/Index/getStaticReducers */
export const getStaticReducers = () => ({
    ProductListReducer,
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
    ProductCompareReducer
});

export type StaticReducersType = ReturnType<typeof getStaticReducers>

export default function injectStaticReducers<
    S,
    A,
    T extends ModifiedReduxStore<S, A>
>(store: T): T & StaticReducersType {
    // eslint-disable-next-line no-param-reassign
    // store.asyncReducers = {};

    // Inject all the static reducers into the store
    Object.entries(getStaticReducers()).forEach(
        ([name, reducer]) => {
            if (store.injectReducer) {
                store.injectReducer(name, reducer as Reducer<S, Action<A>>);
            }
        }
    );

    return store as T & StaticReducersType;
}
