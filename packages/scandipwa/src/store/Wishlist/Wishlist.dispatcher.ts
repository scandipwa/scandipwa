/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { Dispatch } from 'redux';

import WishlistQuery from 'Query/Wishlist.query';
import { Wishlist } from 'Query/Wishlist.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType, ShowNotificationAction } from 'Store/Notification/Notification.type';
import {
    clearWishlist,
    removeItemFromWishlist,
    updateAllProductsInWishlist,
    updateIsLoading,
} from 'Store/Wishlist/Wishlist.action';
import { NetworkError } from 'Type/Common.type';
import { GQLWishlistItemInput, GQLWishlistItemUpdateInput } from 'Type/Graphql.type';
import { getAuthorizationToken, isSignedIn } from 'Util/Auth';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';
import getStore from 'Util/Store';
import { RootState } from 'Util/Store/Store.type';
import { getPriceRange } from 'Util/Wishlist';

import { ClearWishlistAction, WishlistProduct } from './Wishlist.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/**
 * Get wishlist setting.
 * @namespace Store/Wishlist/Dispatcher/isWishlistEnabled */
export const isWishlistEnabled = (): boolean => {
    const state = getStore().getState() as RootState;
    const {
        wishlist_general_active = false,
    } = state.ConfigReducer;

    return wishlist_general_active;
};

/**
 * Product Wishlist Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Wishlist/Dispatcher
 */
export class WishlistDispatcher {
    updateInitialWishlistData(dispatch: Dispatch): void {
        if (!isSignedIn() || !isWishlistEnabled()) {
            dispatch(clearWishlist());
        }
    }

    updateWishlistProducts(dispatch: Dispatch, page: number, productsPerPage: number): void {
        if (isSignedIn() && isWishlistEnabled()) {
            this._syncWishlistWithBE(dispatch, page, productsPerPage);
        }
    }

    _syncWishlistWithBE(dispatch: Dispatch, page: number, productsPerPage: number): Promise<void> {
        dispatch(updateIsLoading(true));

        // Need to get current wishlist from BE, update wishlist
        return fetchQuery<'wishlist', Wishlist>(WishlistQuery.getWishlistQuery({
            currentPage: page,
            productsPerPage,
        })).then(
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/_syncWishlistWithBE/fetchQuery/then */
            (data: { wishlist: Wishlist }) => {
                if (!getAuthorizationToken()) {
                    return;
                }

                if (data && data.wishlist) {
                    const {
                        wishlist: {
                            items_v2: {
                                items,
                                page_info,
                            },
                            items_count,
                        },
                    } = data;

                    const productsToAdd = items.reduce((
                        prev: Record<string, WishlistProduct>,
                        wishlistItem,
                    ) => {
                        const {
                            id,
                            sku,
                            product,
                            description,
                            price,
                            price_without_tax,
                            buy_request,
                            options,
                            qty: quantity,
                        } = wishlistItem;

                        const {
                            price_range: {
                                minimum_price: {
                                    discount = 0,
                                } = {},
                            } = {},
                        } = product;

                        const priceRange = getPriceRange(product, price, price_without_tax, discount);

                        const result: WishlistProduct = {
                            ...product,
                            ...priceRange,
                            quantity,
                            wishlist: {
                                id,
                                sku,
                                quantity,
                                description,
                                buy_request,
                                options,
                            },
                        };

                        return {
                            ...prev,
                            [id]: result,
                        };
                    }, {});

                    dispatch(updateAllProductsInWishlist(productsToAdd, page_info, items_count));
                } else {
                    dispatch(updateIsLoading(false));
                }
            },
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/_syncWishlistWithBE/fetchQuery/then/catch */
            () => {
                dispatch(updateIsLoading(false));
            },
        );
    }

    async addItemToWishlist(
        dispatch: Dispatch,
        options: { items: GQLWishlistItemInput[]; wishlistId: string },
    ): Promise<void> {
        if (!isSignedIn()) {
            return;
        }

        try {
            const { items = [], wishlistId = '' } = options;

            dispatch(updateIsLoading(true));
            const {
                addProductsToWishlist: { user_errors },
            } = await fetchMutation(WishlistQuery.addProductsToWishlist(wishlistId, items));

            if (user_errors.length > 0) {
                user_errors.map(({ message }: NetworkError) => dispatch(
                    showNotification(
                        NotificationType.ERROR,
                        __('We can`t add the item to Wishlist right now: %s', message).toString(),
                    ),
                ));
            } else {
                dispatch(showNotification(NotificationType.SUCCESS, __('Product added to wish-list!')));
            }
        } catch {
            dispatch(showNotification(NotificationType.ERROR, __('Error updating wish list!')));
        } finally {
            dispatch(updateIsLoading(false));
        }
    }

    async updateWishlistItem(
        options: { wishlistItems: GQLWishlistItemUpdateInput[]; wishlistId: string },
    ): Promise<void> {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        const { wishlistItems = [], wishlistId = '' } = options;

        await fetchMutation(WishlistQuery.updateProductsInWishlist(wishlistId, wishlistItems));

        return Promise.resolve();
    }

    clearWishlist(dispatch: Dispatch): Promise<ClearWishlistAction | ShowNotificationAction> {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        dispatch(updateIsLoading(true));

        return fetchMutation<'clearWishlist', boolean>(WishlistQuery.getClearWishlist())
            .then(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/clearWishlist/then/catch/fetchMutation/then/dispatch */
                () => dispatch(clearWishlist()),
            )
            .catch(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/clearWishlist/then/catch/dispatch */
                () => dispatch(showNotification(NotificationType.ERROR, __('Error clearing wish list!'))),
            );
    }

    async moveWishlistToCart(dispatch: Dispatch, productsPerPage: number, sharingCode = ''): Promise<void> {
        if (!isSignedIn()) {
            await Promise.reject();
        }

        try {
            await fetchMutation<'moveWishlistToCart', boolean>(WishlistQuery.getMoveWishlistToCart(sharingCode));
        } finally {
            await this._syncWishlistWithBE(dispatch, 1, productsPerPage);
            CartDispatcher.then(
                ({ default: dispatcher }) => dispatcher.updateInitialCartData(dispatch, !!getAuthorizationToken()),
            );
            dispatch(showNotification(NotificationType.SUCCESS, __('Available items moved to cart')));
        }
    }

    async removeItemFromWishlist(
        dispatch: Dispatch,
        { item_id, noMessages }: { item_id: string; noMessages?: boolean },
    ): Promise<void> {
        if (!item_id || !isSignedIn()) {
            return Promise.reject();
        }

        dispatch(updateIsLoading(true));

        try {
            await fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(item_id));
        } catch (e) {
            if (!noMessages) {
                dispatch(showNotification(NotificationType.ERROR, __('Error updating wish list!')));
            }

            return Promise.reject();
        }

        dispatch(removeItemFromWishlist(item_id));

        if (!noMessages) {
            dispatch(showNotification(NotificationType.SUCCESS, __('Product has been removed from your Wish List!')));
        }

        return Promise.resolve();
    }

    // TODO: Need to make it in one request
    removeItemsFromWishlist(dispatch: Dispatch, itemIdMap: string[]): Promise<never> | Promise<void>[] {
        if (!itemIdMap.length || !isSignedIn()) {
            return Promise.reject();
        }

        return itemIdMap.map((id) => (
            fetchMutation<'removeProductFromWishlist', boolean>(
                WishlistQuery.getRemoveProductFromWishlistMutation(id),
            ).then(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/removeItemsFromWishlist/itemIdMap/map/fetchMutation/then */
                () => {
                    dispatch(removeItemFromWishlist(id));
                    dispatch(showNotification(
                        NotificationType.SUCCESS,
                        __('Product has been removed from your Wish List!'),
                    ));
                },
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/removeItemsFromWishlist/itemIdMap/map/fetchMutation/then/catch */
                (error) => {
                    dispatch(showNotification(
                        NotificationType.ERROR,
                        getErrorMessage(error, __('Error updating wishlist!')),
                    ));
                },
            )
        ));
    }

    resetWishlist(dispatch: Dispatch): void {
        dispatch(clearWishlist());
    }
}

export default new WishlistDispatcher();
