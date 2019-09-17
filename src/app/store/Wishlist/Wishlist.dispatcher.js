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
    productToBeRemovedAfterAdd,
    updateIsLoading
} from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import { isSignedIn } from 'Util/Auth';
import { WishlistQuery } from 'Query';

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
        return fetchQuery(WishlistQuery.getWishlistQuery()).then(
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
                } else {
                    dispatch(updateIsLoading(false));
                }
            },
            // eslint-disable-next-line no-console
            error => console.log(error)
        );
    }

    addItemToWishlist(dispatch, options) {
        const { product } = options;
        const { sku } = product;
        const productToAdd = { sku };
        dispatch(updateIsLoading(true));

        return fetchMutation(WishlistQuery.getAddProductToWishlistMutation(
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
        dispatch(updateIsLoading(true));

        if (noMessages) {
            return fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(product)).then(
                () => {
                    dispatch(removeItemFromWishlist(product));
                    dispatch(productToBeRemovedAfterAdd(''));
                }
            );
        }

        return fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(product)).then(
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
