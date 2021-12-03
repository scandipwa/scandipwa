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
    updateIsLoading
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
 * @namespace Store/Wishlist/Dispatcher/isWishlistEnabled */
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
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/_syncWishlistWithBE/fetchQuery/then */
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
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/_syncWishlistWithBE/fetchQuery/then/catch */
            () => {
                dispatch(updateIsLoading(false));
            }
        );
    }

    async addItemToWishlist(dispatch, options) {
        if (!isSignedIn()) {
            return;
        }

        try {
            const { items = [], wishlistId = '' } = options;
            dispatch(updateIsLoading(true));
            await fetchMutation(WishlistQuery.addProductsToWishlist(wishlistId, items));
            dispatch(showNotification('success', __('Product added to wish-list!')));
            await this._syncWishlistWithBE(dispatch);
        } catch {
            dispatch(showNotification('error', __('Error updating wish list!')));
        } finally {
            dispatch(updateIsLoading(false));
        }
    }

    updateWishlistItem(dispatch, options) {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        const { wishlistItems = [], wishlistId = '' } = options;

        return fetchMutation(WishlistQuery.updateProductsInWishlist(wishlistId, wishlistItems)).then(
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/updateWishlistItem/fetchMutation/then */
            () => {
                this._syncWishlistWithBE(dispatch);
            }
        );
    }

    clearWishlist(dispatch) {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        return fetchMutation(WishlistQuery.getClearWishlist())
            .then(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/clearWishlist/then/catch/fetchMutation/then/dispatch */
                () => dispatch(clearWishlist())
            )
            .catch(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/clearWishlist/then/catch/dispatch */
                () => dispatch(showNotification('error', __('Error clearing wish list!')))
            );
    }

    async moveWishlistToCart(dispatch, sharingCode) {
        if (!isSignedIn()) {
            await Promise.reject();
        }

        try {
            await fetchMutation(WishlistQuery.getMoveWishlistToCart(sharingCode));
        } finally {
            await this._syncWishlistWithBE(dispatch);
            CartDispatcher.then(
                ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch)
            );
            dispatch(showNotification('success', __('Available items moved to cart')));
        }
    }

    async removeItemFromWishlist(dispatch, { item_id, noMessages }) {
        if (!item_id || !isSignedIn()) {
            return Promise.reject();
        }

        dispatch(updateIsLoading(true));

        try {
            await fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(item_id));
        } catch (e) {
            if (!noMessages) {
                dispatch(showNotification('error', __('Error updating wish list!')));
            }

            return Promise.reject();
        }

        dispatch(removeItemFromWishlist(item_id));

        if (!noMessages) {
            dispatch(showNotification('success', __('Product has been removed from your Wish List!')));
        }

        return Promise.resolve();
    }

    // TODO: Need to make it in one request
    removeItemsFromWishlist(dispatch, itemIdMap) {
        if (!itemIdMap.length || !isSignedIn()) {
            return Promise.reject();
        }

        return itemIdMap.map((id) => (
            fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(id)).then(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/removeItemsFromWishlist/itemIdMap/map/fetchMutation/then */
                () => {
                    dispatch(removeItemFromWishlist(id));
                    dispatch(showNotification('success', __('Product has been removed from your Wish List!')));
                },
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/removeItemsFromWishlist/itemIdMap/map/fetchMutation/then/catch */
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
