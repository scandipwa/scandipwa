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

import { fetchMutation, fetchQuery } from 'Util/Request';
import {
    clearWishlist,
    updateIsLoading,
    updateItemOptions,
    removeItemFromWishlist,
    updateAllProductsInWishlist
} from 'Store/Wishlist';
import { CartDispatcher } from 'Store/Cart';
import { showNotification } from 'Store/Notification';
import { isSignedIn } from 'Util/Auth';
import { WishlistQuery } from 'Query';

/**
 * Product Wishlist Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Wishlist/Dispatcher
 */
export class WishlistDispatcher extends ExtensibleClass {
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
            /** @namespace Store/Wishlist/Dispatcher/fetchQueryThen */
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
            /** @namespace Store/Wishlist/Dispatcher/fetchMutationThen */
            () => this._syncWishlistWithBE(dispatch),
            /** @namespace Store/Wishlist/Dispatcher/fetchMutationThen */
            (error) => {
                dispatch(showNotification('error', __('Error updating wish list!')));
                // eslint-disable-next-line no-console
                console.log(error);
            }
        );
    }

    updateWishlistItem(dispatch, options) {
        return fetchMutation(WishlistQuery.getSaveWishlistItemMutation(options)).then(
            /** @namespace Store/Wishlist/Dispatcher/fetchMutationThen */
            () => dispatch(updateItemOptions(options))
        );
    }

    clearWishlist(dispatch) {
        return fetchMutation(WishlistQuery.getClearWishlist())
            .then(
                /** @namespace Store/Wishlist/Dispatcher/fetchMutationThen */
                () => dispatch(clearWishlist())
            )
            .catch(
                /** @namespace Store/Wishlist/Dispatcher/fetchMutationThenCatch */
                () => dispatch(showNotification('error', __('Error clearing wish list!')))
            );
    }

    moveWishlistToCart(dispatch, sharingCode) {
        return fetchMutation(WishlistQuery.getMoveWishlistToCart(sharingCode))
            .then(() => {
                dispatch(clearWishlist());
                CartDispatcher._syncCartWithBE(dispatch);
            });
    }

    removeItemFromWishlist(dispatch, { item_id, noMessages }) {
        if (!item_id) {
            return null;
        }
        dispatch(updateIsLoading(true));

        if (noMessages) {
            return fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(item_id)).then(
                /** @namespace Store/Wishlist/Dispatcher/fetchMutationThen */
                () => dispatch(removeItemFromWishlist(item_id))
            );
        }

        dispatch(showNotification('info', __('Product has been removed from your Wish List!')));

        return fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(item_id)).then(
            /** @namespace Store/Wishlist/Dispatcher/fetchMutationThen */
            () => dispatch(removeItemFromWishlist(item_id)),
            /** @namespace Store/Wishlist/Dispatcher/fetchMutationThen */
            (error) => {
                dispatch(showNotification('error', __('Error updating wish list!')));
                // eslint-disable-next-line no-console
                console.log(error);
            }
        );
    }
}

export default new (WishlistDispatcher)();
