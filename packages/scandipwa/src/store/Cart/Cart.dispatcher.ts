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

import CartQuery from 'Query/Cart.query';
import { CartAddress, CartItem, CartTotals as QuoteData } from 'Query/Cart.type';
import { ProductLink } from 'Query/ProductList.type';
import { updateIsLoadingCart, updateTotals } from 'Store/Cart/Cart.action';
import { updateCheckoutStore } from 'Store/Checkout/Checkout.action';
import { LinkedProductType } from 'Store/LinkedProducts/LinkedProducts.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError } from 'Type/Common.type';
import { getRegionIdOfRegionName } from 'Util/Address';
import { getAuthorizationToken, isSignedIn } from 'Util/Auth';
import { getCartId, setCartId } from 'Util/Cart';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';

import { AddProductToCartOptions, CheckoutAddress, UpdateProductInCartOptions } from './Cart.type';

export const CURRENT_WEBSITE = 'base';

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
    async updateInitialCartData(
        dispatch: Dispatch,
        isForCustomer = false,
        disableLoader = false,
    ): Promise<string | null> {
        // Need to get current cart from BE, update cart
        try {
            // ! Get quote token first (local or from the backend) just to make sure it exists

            if (!disableLoader) {
                dispatch(updateIsLoadingCart(true));
            }
            // ! Get quote token first (local or from the backend) just to make sure it exists
            const quoteId = await this._getCartId(dispatch);
            const {
                cartData = {},
                cartData: {
                    is_virtual = false,
                    shipping_addresses: [{
                        selected_shipping_method = null,
                    } = {}] = [],
                } = {},
            } = await fetchQuery(
                CartQuery.getCartQuery(
                    quoteId || '',
                ),
            );

            if (selected_shipping_method) {
                const {
                    address,
                    address: {
                        email = '',
                        street = '',
                    } = {},
                    method_code = '',
                } = selected_shipping_method;

                if (address && street) {
                    if (!is_virtual) {
                        await dispatch(
                            updateCheckoutStore({
                                shippingFields: {
                                    ...this.prepareCheckoutAddressFormat(address as CartAddress),
                                    method_code,
                                },
                            }),
                        );
                    }

                    await dispatch(updateCheckoutStore({ email }));
                }
            }

            if (isForCustomer && !getAuthorizationToken()) {
                dispatch(updateIsLoadingCart(false));

                return null;
            }

            await this._updateCartData(cartData, dispatch);

            if (!disableLoader) {
                dispatch(updateIsLoadingCart(false));
            }

            return null;
        } catch (error) {
            dispatch(updateIsLoadingCart(false));

            return this.createGuestEmptyCart(dispatch);
        }
    }

    prepareCheckoutAddressFormat(address: Partial<CartAddress>): CheckoutAddress {
        const {
            street: addressStreet = '',
            email,
            country: { code: country_id } = {},
            region,
            ...data
        } = address;

        const street = addressStreet.split('\n');

        const street_index: Record<string, string> = {};

        street.forEach((item, index) => {
            street_index[`street_${index}`] = item;
        });

        return {
            ...data,
            country_id,
            region,
            region_id: getRegionIdOfRegionName(country_id || 'US', region as unknown as string),
            street,
            ...street_index,
        };
    }

    async createGuestEmptyCart(dispatch: Dispatch): Promise<string | null> {
        try {
            dispatch(updateIsLoadingCart(true));

            const quoteId = await this._getNewQuoteId();

            setCartId(quoteId);

            return quoteId;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return null;
        }
    }

    async mergeCarts(
        sourceCartId: string,
        destinationCartId: string,
        dispatch: Dispatch,
    ): Promise<string | null> {
        try {
            const {
                mergeCarts: {
                    id = '',
                } = {},
            } = await fetchMutation(
                CartQuery.getMergeCartQuery(sourceCartId, destinationCartId),
            );

            return id;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return null;
        }
    }

    resetGuestCart(dispatch: Dispatch): void {
        return this._updateCartData({}, dispatch);
    }

    async changeItemQty(dispatch: Dispatch, options: UpdateProductInCartOptions): Promise<string | null> {
        const { uid, quantity = 1, cartId: originalCartId } = options;

        const cartId = !originalCartId ? getCartId() : originalCartId;

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
                            quantity,
                        },
                    ],
                }),
            );

            return await this.updateInitialCartData(dispatch);
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return Promise.reject();
        }
    }

    async addProductToCart(
        dispatch: Dispatch,
        options: AddProductToCartOptions,
    ): Promise<void> {
        const { products = [], cartId: userCartId } = options;

        const cartId = userCartId || getCartId();

        if (!Array.isArray(products) || products.length === 0) {
            dispatch(showNotification(NotificationType.ERROR, __('No product data!')));

            return Promise.reject();
        }

        try {
            if (!cartId) {
                return await Promise.reject();
            }

            const { addProductsToCart: { user_errors: errors = [] } = {} } = await fetchMutation(
                CartQuery.getAddProductToCartMutation(cartId, products),
            );

            if (Array.isArray(errors) && errors.length > 0) {
                errors.forEach((error) => {
                    dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
                });

                return await Promise.resolve();
            }

            await this.updateInitialCartData(dispatch);
            dispatch(showNotification(NotificationType.SUCCESS, __('Product was added to cart!')));
        } catch (error) {
            if (!navigator.onLine) {
                dispatch(showNotification(NotificationType.ERROR, __('Not possible to fetch while offline')));

                return Promise.reject();
            }

            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return Promise.reject();
        }

        return Promise.resolve();
    }

    async removeProductFromCart(dispatch: Dispatch, item_id: number): Promise<Partial<QuoteData> | null> {
        try {
            const isCustomerSignedIn = isSignedIn();
            const cartId = getCartId() || '';

            if (!isCustomerSignedIn && !cartId) {
                return null;
            }

            const { removeItemFromCart: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getRemoveCartItemMutation(item_id, cartId),
            );

            this._updateCartData(cartData, dispatch);

            return cartData;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return null;
        }
    }

    async applyCouponToCart(dispatch: Dispatch, couponCode: string): Promise<void> {
        try {
            const isCustomerSignedIn = isSignedIn();
            const cartId = getCartId() || '';

            if (!isCustomerSignedIn && !cartId) {
                return;
            }

            const { applyCouponToCart: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getApplyCouponMutation(couponCode, cartId),
            );

            this._updateCartData(cartData, dispatch);
            dispatch(showNotification(NotificationType.SUCCESS, __('Coupon was applied!')));
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));
        }
    }

    async removeCouponFromCart(dispatch: Dispatch): Promise<void> {
        try {
            const isCustomerSignedIn = isSignedIn();
            const cartId = getCartId() || '';

            if (!isCustomerSignedIn && !cartId) {
                return;
            }

            const { removeCouponFromCart: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getRemoveCouponMutation(cartId),
            );

            this._updateCartData(cartData, dispatch);
            dispatch(showNotification(NotificationType.SUCCESS, __('Coupon was removed!')));
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));
        }
    }

    updateCrossSellProducts(items: CartItem[], dispatch: Dispatch): void {
        if (items && items.length) {
            const product_links = items.reduce((links: ProductLink[], product) => {
                const { product: { product_links, variants = [] }, sku: variantSku } = product;

                const {
                    product: {
                        product_links: childProductLinks = [],
                    } = {},
                } = variants.find(
                    ({ product: { sku } = {} }) => sku === variantSku,
                ) || {};

                if (childProductLinks) {
                    Object.values(childProductLinks).filter(
                        ({ link_type }) => link_type === LinkedProductType.CROSS_SELL,
                    )
                        .map((item) => links.push(item));
                }

                if (product_links) {
                    (Object.values(product_links)).filter(
                        ({ link_type }) => link_type === LinkedProductType.CROSS_SELL,
                    )
                        .map((item) => links.push(item));
                }

                return links;
            }, []);

            if (product_links.length !== 0) {
                LinkedProductsDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.fetchCrossSellProducts(dispatch, product_links),
                );
            } else {
                LinkedProductsDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.clearCrossSellProducts(dispatch),
                );
            }
        } else {
            LinkedProductsDispatcher.then(
                ({ default: dispatcher }) => dispatcher.clearCrossSellProducts(dispatch),
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
    _getCartId(dispatch: Dispatch): string | Promise<string | null> {
        const cartId = getCartId();

        if (cartId) {
            return cartId;
        }

        return this.createGuestEmptyCart(dispatch);
    }

    async _getNewQuoteId(): Promise<string> {
        const { createEmptyCart: quoteId = '' } = (await fetchMutation(
            CartQuery.getCreateEmptyCartMutation(),
        ) || {}) as unknown as { createEmptyCart: string };

        return quoteId;
    }
}

export default new CartDispatcher();
