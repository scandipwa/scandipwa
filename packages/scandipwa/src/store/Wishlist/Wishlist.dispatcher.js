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

    addItemToWishlist(dispatch, options) {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        const { items = [], wishlistId = '' } = options;

        dispatch(updateIsLoading(true));

        return fetchMutation(WishlistQuery.addProductsToWishlist(wishlistId, items)).then(
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/addItemToWishlist/fetchMutation/then */
            () => {
                dispatch(showNotification('success', __('Product added to wish-list!')));
                this._syncWishlistWithBE(dispatch);
                dispatch(updateIsLoading(false));
            },
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/addItemToWishlist/fetchMutation/then/catch */
            () => {
                dispatch(showNotification('error', __('Error updating wish list!')));
                dispatch(updateIsLoading(false));
            }
        );
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

    moveWishlistToCart(dispatch, sharingCode) {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        return fetchMutation(WishlistQuery.getMoveWishlistToCart(sharingCode))
            .then(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/moveWishlistToCart/fetchMutation/then */
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

        return fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(item_id)).then(
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/removeItemFromWishlist/fetchMutation/then */
            () => {
                if (!noMessages) {
                    dispatch(showNotification('info', __('Product has been removed from your Wish List!')));
                }

                dispatch(removeItemFromWishlist(item_id));
            },
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/removeItemFromWishlist/fetchMutation/then/catch */
            () => {
                if (!noMessages) {
                    dispatch(showNotification('error', __('Error updating wish list!')));
                }
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
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/removeItemsFromWishlist/itemIdMap/map/fetchMutation/then */
                () => {
                    dispatch(removeItemFromWishlist(id));
                    dispatch(showNotification('info', __('Product has been removed from your Wish List!')));
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
