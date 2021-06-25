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

import WishlistQuery from 'Query/Wishlist.query';
import { showNotification } from 'Store/Notification/Notification.action';
import {
    clearWishlist,
    removeItemFromWishlist,
    updateAllProductsInWishlist,
    updateIsLoading,
    updateItemOptions
} from 'Store/Wishlist/Wishlist.action';
import { isSignedIn } from 'Util/Auth';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';
import getStore from 'Util/Store';
import { getPriceRange } from 'Util/Wishlist';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/**
 * Get wishlist setting.
 * @namespace /Store/Wishlist/Dispatcher/isWishlistEnabled
 */
export const isWishlistEnabled = () => {
    const state = getStore().getState();
    const {
        wishlist_general_active = false
    } = state.ConfigReducer;

    return wishlist_general_active;
};

/**
 * Product Wishlist Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Wishlist/Dispatcher
 */
export class WishlistDispatcher {
    updateInitialWishlistData(dispatch) {
        if (isSignedIn() && isWishlistEnabled()) {
            this._syncWishlistWithBE(dispatch);
        } else {
            dispatch(updateAllProductsInWishlist({}));
        }
    }

    _syncWishlistWithBE(dispatch) {
        // Need to get current wishlist from BE, update wishlist
        return fetchQuery(WishlistQuery.getWishlistQuery()).then(
            /** @namespace Store/Wishlist/Dispatcher/_syncWishlistWithBEFetchQueryThen */
            (data) => {
                if (data && data.wishlist) {
                    const { wishlist } = data;
                    const productsToAdd = wishlist.items.reduce((prev, wishlistItem) => {
                        const {
                            id,
                            sku,
                            product,
                            description,
                            price,
                            price_without_tax,
                            buy_request,
                            options,
                            qty: quantity
                        } = wishlistItem;

                        const priceRange = getPriceRange(product, price, price_without_tax);

                        return {
                            ...prev,
                            [id]: {
                                ...product,
                                ...priceRange,
                                quantity,
                                wishlist: {
                                    id,
                                    sku,
                                    quantity,
                                    description,
                                    buy_request,
                                    options
                                }
                            }
                        };
                    }, {});

                    dispatch(updateAllProductsInWishlist(productsToAdd));
                } else {
                    dispatch(updateIsLoading(false));
                }
            },
            /** @namespace Store/Wishlist/Dispatcher/_syncWishlistWithBEFetchQueryError */
            () => {
                dispatch(updateIsLoading(false));
            }
        );
    }

    addItemToWishlist(dispatch, wishlistItem) {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        dispatch(updateIsLoading(true));
        dispatch(showNotification('success', __('Product added to wish-list!')));

        return fetchMutation(WishlistQuery.getSaveWishlistItemMutation(wishlistItem)).then(
            /** @namespace Store/Wishlist/Dispatcher/addItemToWishlistFetchMutationThen */
            () => this._syncWishlistWithBE(dispatch),
            /** @namespace Store/Wishlist/Dispatcher/addItemToWishlistFetchMutationError */
            () => {
                dispatch(showNotification('error', __('Error updating wish list!')));
            }
        );
    }

    updateWishlistItem(dispatch, options) {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        return fetchMutation(WishlistQuery.getSaveWishlistItemMutation(options)).then(
            /** @namespace Store/Wishlist/Dispatcher/updateWishlistItemFetchMutationThen */
            () => dispatch(updateItemOptions(options))
        );
    }

    clearWishlist(dispatch) {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        return fetchMutation(WishlistQuery.getClearWishlist())
            .then(
                /** @namespace Store/Wishlist/Dispatcher/clearWishlistFetchMutationThen */
                () => dispatch(clearWishlist())
            )
            .catch(
                /** @namespace Store/Wishlist/Dispatcher/clearWishlistFetchMutationThenCatch */
                () => dispatch(showNotification('error', __('Error clearing wish list!')))
            );
    }

    moveWishlistToCart(dispatch, sharingCode) {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        return fetchMutation(WishlistQuery.getMoveWishlistToCart(sharingCode))
            .then(
                /** @namespace Store/Wishlist/Dispatcher/moveWishlistToCartFetchMutationThen */
                () => {
                    this._syncWishlistWithBE(dispatch);
                    CartDispatcher.then(
                        ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch)
                    );
                }
            );
    }

    removeItemFromWishlist(dispatch, { item_id, noMessages }) {
        if (!item_id || !isSignedIn()) {
            return Promise.reject();
        }
        dispatch(updateIsLoading(true));

        if (noMessages) {
            return fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(item_id)).then(
                /** @namespace Store/Wishlist/Dispatcher/removeItemFromWishlistNoMessagesFetchMutationThen */
                () => dispatch(removeItemFromWishlist(item_id))
            );
        }

        dispatch(showNotification('info', __('Product has been removed from your Wish List!')));

        return fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(item_id)).then(
            /** @namespace Store/Wishlist/Dispatcher/removeItemFromWishlistFetchMutationThen */
            () => dispatch(removeItemFromWishlist(item_id)),
            /** @namespace Store/Wishlist/Dispatcher/removeItemFromWishlistFetchMutationError */
            () => {
                dispatch(showNotification('error', __('Error updating wish list!')));
            }
        );
    }

    // TODO: Need to make it in one request
    removeItemsFromWishlist(dispatch, itemIdMap) {
        if (!itemIdMap.length || !isSignedIn()) {
            return Promise.reject();
        }

        return itemIdMap.map((id) => (
            fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(id)).then(
                /** @namespace Store/Wishlist/Dispatcher/removeItemsFromWishlistNoMessagesFetchMutationThen */
                () => {
                    dispatch(removeItemFromWishlist(id));
                    dispatch(showNotification('info', __('Product has been removed from your Wish List!')));
                },
                /** @namespace Store/Wishlist/Dispatcher/removeItemsFromWishlistFetchMutationError */
                (error) => {
                    dispatch(showNotification('error', getErrorMessage(error, __('Error updating wishlist!'))));
                }
            )
        ));
    }

    resetWishlist(dispatch) {
        dispatch(clearWishlist());
    }
}

export default new WishlistDispatcher();
