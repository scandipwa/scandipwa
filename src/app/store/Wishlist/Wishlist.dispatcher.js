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
    removeItemFromWishlist,
    updateAllProductsInWishlist,
    productToBeRemovedAfterAdd
} from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import { isSignedIn } from 'Util/Auth';
import { Wishlist } from 'Query';

/**
 * Product Wishlist Dispatcher
 * @class WishlistDispatcher
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
        return fetchQuery(Wishlist.getWishlistQuery()).then(
            (data) => {
                if (data && data.wishlist && data.wishlist.items_count) {
                    const { wishlist } = data;
                    const productsToAdd = wishlist.items.reduce((prev, wishlistItem) => {
                        const { product } = wishlistItem;
                        const item_id = wishlistItem.id;
                        const { id } = product;

                        return {
                            ...prev,
                            [id]: {
                                ...product,
                                item_id
                            }
                        };
                    }, {});

                    dispatch(updateAllProductsInWishlist(productsToAdd));
                }
            },
            // eslint-disable-next-line no-console
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    addItemToWishlist(dispatch, options) {
        const { product } = options;
        const { sku } = product;
        const productToAdd = { sku };

        return fetchMutation(Wishlist.getAddProductToWishlistMutation(
            productToAdd
        )).then(
            () => this._syncWishlistWithBE(dispatch).then(
                () => dispatch(showNotification('success', __('Product has been added to your Wish List!')))
            ),
            // eslint-disable-next-line no-console
            error => dispatch(showNotification('error', __('Error updating wish list!'))) && console.log(error)
        );
    }

    removeItemFromWishlist(dispatch, { product, noMessages }) {
        if (!product) return null;
        if (noMessages) {
            return fetchMutation(Wishlist.getRemoveProductFromWishlistMutation(product)).then(
                () => {
                    dispatch(removeItemFromWishlist(product));
                    dispatch(productToBeRemovedAfterAdd(''));
                }
            );
        }

        return fetchMutation(Wishlist.getRemoveProductFromWishlistMutation(product)).then(
            () => {
                dispatch(removeItemFromWishlist(product));
                dispatch(showNotification('success', __('Product has been removed from your Wish List!')));
            },
            (error) => {
                dispatch(showNotification('error', __('Error updating wish list!')));
                // eslint-disable-next-line no-console
                console.log(error);
            }
        );
    }

    updateProductToBeRemovedAfterAdd(dispatch, options) {
        const { product: { sku } } = options;
        if (sku) return dispatch(productToBeRemovedAfterAdd(sku));

        return dispatch(productToBeRemovedAfterAdd(''));
    }
}

export default new WishlistDispatcher();
