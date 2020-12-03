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
import { fetchMutation, fetchQuery } from 'Util/Request';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/**
 * Product Wishlist Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Wishlist/Dispatcher
 */
export class WishlistDispatcher {
    updateInitialWishlistData(dispatch) {
        if (isSignedIn()) {
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
                if (data && data.wishlist && data.wishlist.items_count) {
                    const { wishlist } = data;
                    const productsToAdd = wishlist.items.reduce((prev, wishlistItem) => {
                        const {
                            id,
                            sku,
                            product,
                            description,
                            qty: quantity
                        } = wishlistItem;

                        return {
                            ...prev,
                            [id]: {
                                ...product,
                                quantity,
                                wishlist: {
                                    id,
                                    sku,
                                    quantity,
                                    description
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
            (error) => {
                // eslint-disable-next-line no-console
                console.log(error);
                dispatch(updateIsLoading(false));
            }
        );
    }

    addItemToWishlist(dispatch, wishlistItem) {
        dispatch(updateIsLoading(true));
        dispatch(showNotification('success', __('Product added to wish-list!')));

        return fetchMutation(WishlistQuery.getSaveWishlistItemMutation(wishlistItem)).then(
            /** @namespace Store/Wishlist/Dispatcher/addItemToWishlistFetchMutationThen */
            () => this._syncWishlistWithBE(dispatch),
            /** @namespace Store/Wishlist/Dispatcher/addItemToWishlistFetchMutationError */
            (error) => {
                dispatch(showNotification('error', __('Error updating wish list!')));
                // eslint-disable-next-line no-console
                console.log(error);
            }
        );
    }

    updateWishlistItem(dispatch, options) {
        return fetchMutation(WishlistQuery.getSaveWishlistItemMutation(options)).then(
            /** @namespace Store/Wishlist/Dispatcher/updateWishlistItemFetchMutationThen */
            () => dispatch(updateItemOptions(options))
        );
    }

    clearWishlist(dispatch) {
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
        return fetchMutation(WishlistQuery.getMoveWishlistToCart(sharingCode))
            .then(
                /** @namespace Store/Wishlist/Dispatcher/moveWishlistToCartFetchMutationThen */
                () => {
                    dispatch(clearWishlist());
                    CartDispatcher.then(
                        ({ default: dispatcher }) => dispatcher._syncCartWithBE(dispatch)
                    );
                }
            );
    }

    removeItemFromWishlist(dispatch, { item_id, noMessages }) {
        if (!item_id) {
            return null;
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
            (error) => {
                dispatch(showNotification('error', __('Error updating wish list!')));
                // eslint-disable-next-line no-console
                console.log(error);
            }
        );
    }

    // TODO: Need to make it in one request
    removeItemsFromWishlist(dispatch, itemIdMap) {
        if (!itemIdMap.length) {
            return null;
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
                    const [message] = error;

                    dispatch(showNotification('error', message || __('Error updating wishlist!')));
                    // eslint-disable-next-line no-console
                    console.log(error);
                }
            )
        ));
    }
}

export default new WishlistDispatcher();
