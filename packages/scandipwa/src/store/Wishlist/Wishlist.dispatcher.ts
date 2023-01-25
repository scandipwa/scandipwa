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

import WishlistQuery from 'Query/Wishlist.query';
import { Wishlist } from 'Query/Wishlist.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import {
    updateWishlistStore,
} from 'Store/Wishlist/Wishlist.action';
import { NetworkError } from 'Type/Common.type';
import { GQLWishlistItemInput, GQLWishlistItemUpdateInput } from 'Type/Graphql.type';
import { getAuthorizationToken, isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getIndexedParameteredProducts } from 'Util/Product';
import { IndexedWishlistProduct } from 'Util/Product/Product.type';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';
import { getStoreState } from 'Util/Store';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';
import { getPriceRange } from 'Util/Wishlist';

import { clearWishlist, deleteProperty, PRODUCTS_IN_WISHLIST } from './Wishlist.reducer';
import { UpdateWishlistStoreAction, WishlistProduct } from './Wishlist.type';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

/**
 * Get wishlist setting.
 * @namespace Store/Wishlist/Dispatcher/isWishlistEnabled */
export const isWishlistEnabled = (): boolean => {
    const state = getStoreState();
    const {
        wishlist_general_active = false,
    } = state.ConfigReducer || {};

    return wishlist_general_active;
};

/**
 * Product Wishlist Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Wishlist/Dispatcher
 */
export class WishlistDispatcher extends SimpleDispatcher {
    updateInitialWishlistData(): void {
        if (isSignedIn() && isWishlistEnabled()) {
            this._syncWishlistWithBE();
        } else {
            this.updateAllProductsInWishlist();
        }
    }

    _syncWishlistWithBE(): Promise<void> {
        // Need to get current wishlist from BE, update wishlist
        return fetchQuery<'wishlist', Wishlist>(WishlistQuery.getWishlistQuery()).then(
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/_syncWishlistWithBE/fetchQuery/then */
            (data: { wishlist: Wishlist }) => {
                if (!getAuthorizationToken()) {
                    return;
                }

                if (data && data.wishlist) {
                    const { wishlist } = data;
                    const productsToAdd = wishlist.items.reduce((
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

                    this.updateAllProductsInWishlist(productsToAdd);
                } else {
                    this.dispatch(updateWishlistStore({ isLoading: false }));
                }
            },
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/_syncWishlistWithBE/fetchQuery/then/catch */
            () => {
                this.dispatch(updateWishlistStore({ isLoading: false }));
            },
        );
    }

    async addItemToWishlist(
        options: { items: GQLWishlistItemInput[]; wishlistId: string },
    ): Promise<void> {
        if (!isSignedIn()) {
            return;
        }

        try {
            const { items = [], wishlistId = '' } = options;

            this.dispatch(updateWishlistStore({ isLoading: true }));
            const {
                addProductsToWishlist: { user_errors },
            } = await fetchMutation(WishlistQuery.addProductsToWishlist(wishlistId, items));

            if (user_errors.length > 0) {
                user_errors.map(({ message }: NetworkError) => NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.ERROR,
                        __('We can`t add the item to Wishlist right now: %s', message),
                    ),
                ));
            } else {
                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.SUCCESS,
                        __('Product added to wish-list!'),
                    ),
                );

                await this._syncWishlistWithBE();
            }
        } catch {
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    __('Error updating wish list!'),
                ),
            );
        } finally {
            this.dispatch(updateWishlistStore({ isLoading: false }));
        }
    }

    updateWishlistItem(
        options: { wishlistItems: GQLWishlistItemUpdateInput[]; wishlistId: string },
    ): Promise<void> {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        const { wishlistItems = [], wishlistId = '' } = options;

        return fetchMutation(WishlistQuery.updateProductsInWishlist(wishlistId, wishlistItems)).then(
            /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/updateWishlistItem/fetchMutation/then */
            () => {
                this._syncWishlistWithBE();
            },
        );
    }

    clearWishlist(): Promise<void | UpdateWishlistStoreAction> {
        if (!isSignedIn()) {
            return Promise.reject();
        }

        return fetchMutation<'clearWishlist', boolean>(WishlistQuery.getClearWishlist())
            .then(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/clearWishlist/then/catch/fetchMutation/then */
                () => this.dispatch(updateWishlistStore(clearWishlist())),
            )
            .catch(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/clearWishlist/then/catch */
                () => NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.ERROR,
                        __('Error clearing wish list!'),
                    ),
                ),
            );
    }

    async moveWishlistToCart(sharingCode = ''): Promise<void> {
        if (!isSignedIn()) {
            await Promise.reject();
        }

        try {
            await fetchMutation<'moveWishlistToCart', boolean>(WishlistQuery.getMoveWishlistToCart(sharingCode));
        } finally {
            await this._syncWishlistWithBE();
            CartDispatcher.then(
                ({ default: dispatcher }) => dispatcher.updateInitialCartData(!!getAuthorizationToken()),
            );
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.SUCCESS,
                    __('Available items moved to cart'),
                ),
            );
        }
    }

    async removeItemFromWishlist(
        { item_id, noMessages }: { item_id: string; noMessages?: boolean },
    ): Promise<void> {
        if (!item_id || !isSignedIn()) {
            return Promise.reject();
        }

        this.dispatch(updateWishlistStore({ isLoading: true }));

        try {
            await fetchMutation(WishlistQuery.getRemoveProductFromWishlistMutation(item_id));
        } catch (e) {
            if (!noMessages) {
                NotificationDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.showNotification(
                        NotificationType.ERROR,
                        __('Error updating wish list!'),
                    ),
                );
            }

            return Promise.reject();
        }

        this.removeItemFromWishlistStore(item_id);

        if (!noMessages) {
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.SUCCESS,
                    __('Product has been removed from your Wish List!'),
                ),
            );
        }

        return Promise.resolve();
    }

    // TODO: Need to make it in one request
    removeItemsFromWishlist(itemIdMap: string[]): Promise<never> | Promise<void>[] {
        if (!itemIdMap.length || !isSignedIn()) {
            return Promise.reject();
        }

        return itemIdMap.map((id) => (
            fetchMutation<'removeProductFromWishlist', boolean>(
                WishlistQuery.getRemoveProductFromWishlistMutation(id),
            ).then(
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/removeItemsFromWishlist/itemIdMap/map/fetchMutation/then */
                () => {
                    this.removeItemFromWishlistStore(id);
                    NotificationDispatcher.then(
                        ({ default: dispatcher }) => dispatcher.showNotification(
                            NotificationType.SUCCESS,
                            __('Product has been removed from your Wish List!'),
                        ),
                    );
                },
                /** @namespace Store/Wishlist/Dispatcher/WishlistDispatcher/removeItemsFromWishlist/itemIdMap/map/fetchMutation/then/catch */
                (error) => {
                    NotificationDispatcher.then(
                        ({ default: dispatcher }) => dispatcher.showNotification(
                            NotificationType.ERROR,
                            getErrorMessage(error, __('Error updating wishlist!')),
                        ),
                    );
                },
            )
        ));
    }

    removeItemFromWishlistStore(itemId: string) {
        const { WishlistReducer } = this.storeState;

        const productsInWishlist = deleteProperty(itemId, WishlistReducer as unknown as Record<string, IndexedWishlistProduct>) || {};

        BrowserDatabase.setItem(
            productsInWishlist,
            PRODUCTS_IN_WISHLIST,
        );

        this.dispatch(updateWishlistStore({
            isLoading: false,
            productsInWishlist,
        }));
    }

    updateAllProductsInWishlist(initialProducts: Record<string, WishlistProduct> = {}) {
        const products = getIndexedParameteredProducts(initialProducts);

        BrowserDatabase.setItem(
            products,
            PRODUCTS_IN_WISHLIST,
        );

        this.dispatch(updateWishlistStore({ productsInWishlist: products, isLoading: false }));
    }

    resetWishlist(): void {
        this.dispatch(updateWishlistStore(clearWishlist()));
    }
}

export default new WishlistDispatcher();
