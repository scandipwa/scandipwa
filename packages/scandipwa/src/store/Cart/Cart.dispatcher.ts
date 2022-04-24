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

import { Dispatch } from 'redux';

import CartQuery from 'Query/Cart.query';
import { QuoteData, TotalsItem } from 'Query/Cart.type';
import { ProductLink } from 'Query/ProductList.type';
import { updateIsLoadingCart, updateTotals } from 'Store/Cart/Cart.action';
import { LinkedProductType } from 'Store/LinkedProducts/LinkedProducts.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import {
    GQLCartItemInput
} from 'Type/Graphql.type';
import { getAuthorizationToken, isSignedIn } from 'Util/Auth';
import { getGuestQuoteId, setGuestQuoteId } from 'Util/Cart';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';

export const LinkedProductsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/LinkedProducts/LinkedProducts.dispatcher'
);

/**
 * Product Cart Dispatcher
 * @class CartDispatcher
 * @namespace Store/Cart/Dispatcher
 */
export class CartDispatcher {
    async updateInitialCartData(dispatch: Dispatch, isForCustomer = false): Promise<void> {
        // Need to get current cart from BE, update cart
        try {
            // ! Get quote token first (local or from the backend) just to make sure it exists
            const quoteId = await this._getGuestQuoteId(dispatch);
            const { cartData = {} } = await fetchQuery(
                CartQuery.getCartQuery(
                    quoteId || ''
                )
            );

            dispatch(updateIsLoadingCart(false));

            if (isForCustomer && !getAuthorizationToken()) {
                return;
            }

            this._updateCartData(cartData, dispatch);
        } catch (error) {
            this.createGuestEmptyCart(dispatch);
        }
    }

    async createGuestEmptyCart(dispatch: Dispatch): Promise<string | null> {
        try {
            const {
                createEmptyCart: quoteId = ''
            } = await fetchMutation(CartQuery.getCreateEmptyCartMutation());

            setGuestQuoteId(quoteId);
            dispatch(updateIsLoadingCart(false));

            return quoteId;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));

            return null;
        }
    }

    async mergeCarts(
        sourceCartId: string,
        destinationCartId: string,
        dispatch: Dispatch
    ): Promise<string | null> {
        try {
            const {
                mergeCarts: {
                    id = ''
                } = {}
            } = await fetchMutation(
                CartQuery.getMergeCartQuery(sourceCartId, destinationCartId)
            );

            return id;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));

            return null;
        }
    }

    resetGuestCart(dispatch: Dispatch): void {
        return this._updateCartData({}, dispatch);
    }

    async changeItemQty(dispatch: Dispatch, options: {
        quantity: number;
        uid: string;
        cartId: string;
    }): Promise<void> {
        const { uid, quantity = 1, cartId: originalCartId } = options;

        const cartId = !originalCartId ? getGuestQuoteId() : originalCartId;

        try {
            if (!cartId) {
                return await Promise.reject();
            }

            await fetchMutation(
                CartQuery.getUpdateCartItemsMutation({
                    cart_id: cartId,
                    cart_items: [
                        {
                            cart_item_uid: uid,
                            quantity
                        }
                    ]
                })
            );

            return await this.updateInitialCartData(dispatch);
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));

            return Promise.reject();
        }
    }

    async addProductToCart(
        dispatch: Dispatch,
        options: {
            cartId: string;
            products: GQLCartItemInput[];
        }
    ): Promise<void> {
        const { products = [], cartId: userCartId } = options;

        const cartId = userCartId || getGuestQuoteId();

        if (!Array.isArray(products) || products.length === 0) {
            dispatch(showNotification(NotificationType.ERROR, __('No product data!')));
            return Promise.reject();
        }

        try {
            if (!cartId) {
                return await Promise.reject();
            }

            const { addProductsToCart: { user_errors: errors = [] } = {} } = await fetchMutation(
                CartQuery.getAddProductToCartMutation(cartId, products)
            );

            if (Array.isArray(errors) && errors.length > 0) {
                errors.forEach((error) => {
                    dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
                });

                return await Promise.reject();
            }

            await this.updateInitialCartData(dispatch);
            dispatch(showNotification(NotificationType.SUCCESS, __('Product was added to cart!')));
        } catch (error) {
            if (!navigator.onLine) {
                dispatch(showNotification(NotificationType.ERROR, __('Not possible to fetch while offline')));
                return Promise.reject();
            }

            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
            return Promise.reject();
        }

        return Promise.resolve();
    }

    async removeProductFromCart(dispatch: Dispatch, item_id: number): Promise<Partial<QuoteData> | null> {
        try {
            const isCustomerSignedIn = isSignedIn();
            const guestQuoteId = !isCustomerSignedIn && getGuestQuoteId();

            if (!isCustomerSignedIn && !guestQuoteId) {
                return null;
            }

            const { removeCartItem: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getRemoveCartItemMutation(item_id, guestQuoteId || '')
            );

            this._updateCartData(cartData, dispatch);

            return cartData;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));

            return null;
        }
    }

    async applyCouponToCart(dispatch: Dispatch, couponCode: string): Promise<void> {
        try {
            const isCustomerSignedIn = isSignedIn();
            const guestQuoteId = !isCustomerSignedIn && getGuestQuoteId();

            if (!isCustomerSignedIn && !guestQuoteId) {
                return;
            }

            const { applyCoupon: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getApplyCouponMutation(couponCode, guestQuoteId || '')
            );

            this._updateCartData(cartData, dispatch);
            dispatch(showNotification(NotificationType.SUCCESS, __('Coupon was applied!')));
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
        }
    }

    async removeCouponFromCart(dispatch: Dispatch): Promise<void> {
        try {
            const isCustomerSignedIn = isSignedIn();
            const guestQuoteId = !isCustomerSignedIn && getGuestQuoteId();

            if (!isCustomerSignedIn && !guestQuoteId) {
                return;
            }

            const { removeCoupon: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getRemoveCouponMutation(guestQuoteId || '')
            );

            this._updateCartData(cartData, dispatch);
            dispatch(showNotification(NotificationType.SUCCESS, __('Coupon was removed!')));
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
        }
    }

    updateCrossSellProducts(items: TotalsItem[], dispatch: Dispatch): void {
        if (items && items.length) {
            const product_links = items.reduce((links: ProductLink[], product) => {
                const { product: { product_links, variants = [] }, sku: variantSku } = product;

                const {
                    product: {
                        product_links: childProductLinks = []
                    } = {}
                } = variants.find(
                    ({ product: { sku } = {} }) => sku === variantSku
                ) || {};

                if (childProductLinks) {
                    Object.values(childProductLinks).filter(
                        ({ link_type }) => link_type === LinkedProductType.CROSS_SELL
                    )
                        .map((item) => links.push(item));
                }

                if (product_links) {
                    (Object.values(product_links)).filter(
                        ({ link_type }) => link_type === LinkedProductType.CROSS_SELL
                    )
                        .map((item) => links.push(item));
                }

                return links;
            }, []);

            if (product_links.length !== 0) {
                LinkedProductsDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.fetchCrossSellProducts(dispatch, product_links)
                );
            } else {
                LinkedProductsDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.clearCrossSellProducts(dispatch)
                );
            }
        } else {
            LinkedProductsDispatcher.then(
                ({ default: dispatcher }) => dispatcher.clearCrossSellProducts(dispatch)
            );
        }
    }

    _updateCartData(cartData: Partial<QuoteData>, dispatch: Dispatch): void {
        dispatch(updateTotals(cartData));
    }

    /**
     * Get quote id. If quote id is missing, fetch it from the BE.
     * @param Dispatch dispatch
     * @return string quote id
     */
    async _getGuestQuoteId(dispatch: Dispatch): Promise<string | null> {
        const guestQuoteId = getGuestQuoteId();

        if (guestQuoteId) {
            return guestQuoteId;
        }

        return this.createGuestEmptyCart(dispatch);
    }
}

export default new CartDispatcher();
