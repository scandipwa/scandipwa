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
    addItemToWishlist,
    removeItemFromWishlist,
    updateAllProductsInWishlist
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
        fetchQuery(Wishlist.getWishlistQuery()).then(({ wishlist }) => {
            if (wishlist.items_count) {
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
        });
    }

    addItemToWishlist(dispatch, options) {
        const { product } = options;
        const { sku } = product;

        const productToAdd = { sku };

        /** TO-DO: remove _syncWishlistWithBE when redirect to wishlist page will be added after successful addItemToWishlist */
        return fetchMutation(Wishlist.getAddProductToWishlistMutation(
            productToAdd
        )).then(
            () => dispatch(addItemToWishlist({ ...product }))
                && dispatch(showNotification('success', 'Product has been added to your Wish List!'))
                && this._syncWishlistWithBE(dispatch),
            error => dispatch(showNotification('error', 'Error updating wish list!')) && console.log(error)
        );
    }

    removeItemFromWishlist(dispatch, { product }) {
        return fetchMutation(Wishlist.getRemoveProductFromWishlistMutation(product)).then(
            ({ removeProductFromWishlist }) => removeProductFromWishlist && dispatch(removeItemFromWishlist(product))
            && dispatch(showNotification('success', 'Product has been removed from your Wish List!')),
            error => dispatch(showNotification('error', 'Error updating wish list!')) && console.log(error)
        );
    }
}

export default new WishlistDispatcher();
