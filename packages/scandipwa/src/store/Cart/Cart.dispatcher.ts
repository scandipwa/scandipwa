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

import CartQuery from 'Query/Cart.query';
import {
    AppliedTax,
    CartAddress,
    CartItem,
    CartItemProduct,
    CartTotals as QuoteData,
    SelectedShippingMethod,
} from 'Query/Cart.type';
import { TotalsObject } from 'Query/Checkout.type';
import { ProductItem, ProductLink } from 'Query/ProductList.type';
import { updateCartStore } from 'Store/Cart/Cart.action';
import { updateCheckoutStore } from 'Store/Checkout/Checkout.action';
import { LinkedProductType } from 'Store/LinkedProducts/LinkedProducts.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { NetworkError } from 'Type/Common.type';
import { GQLCurrencyEnum } from 'Type/Graphql.type';
import { getRegionIdOfRegionName } from 'Util/Address';
import { getAuthorizationToken, isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getCartId, setCartId } from 'Util/Cart';
import { getIndexedProduct } from 'Util/Product';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { CART_TOTALS } from './Cart.reducer';
import {
    AddProductToCartOptions,
    CartTotals,
    CheckoutAddress,
    IndexedCartItem,
    UpdateProductInCartOptions,
} from './Cart.type';

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
export class CartDispatcher extends SimpleDispatcher {
    async updateInitialCartData(

        isForCustomer = false,
        disableLoader = false,
    ): Promise<string | null> {
        // Need to get current cart from BE, update cart
        try {
            // ! Get quote token first (local or from the backend) just to make sure it exists

            if (!disableLoader) {
                this.dispatch(updateCartStore({ isLoading: true }));
            }
            // ! Get quote token first (local or from the backend) just to make sure it exists
            const quoteId = await this._getCartId();
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
                        await this.dispatch(
                            updateCheckoutStore({
                                shippingFields: {
                                    ...this.prepareCheckoutAddressFormat(address as CartAddress),
                                    method_code,
                                },
                            }),
                        );
                    }

                    await this.dispatch(updateCheckoutStore({ email }));
                }
            }

            if (isForCustomer && !getAuthorizationToken()) {
                this.dispatch(updateCartStore({ isLoading: false }));

                return null;
            }

            await this.updateCartTotals(cartData);

            if (!disableLoader) {
                this.dispatch(updateCartStore({ isLoading: false }));
            }

            return null;
        } catch (error) {
            this.dispatch(updateCartStore({ isLoading: false }));

            return this.createGuestEmptyCart();
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

    async createGuestEmptyCart(): Promise<string | null> {
        try {
            this.dispatch(updateCartStore({ isLoading: true }));

            const quoteId = await this._getNewQuoteId();

            setCartId(quoteId);

            return quoteId;
        } catch (error) {
            this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return null;
        }
    }

    async mergeCarts(
        sourceCartId: string,
        destinationCartId: string,
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
            this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return null;
        }
    }

    resetGuestCart(): void {
        return this.updateCartTotals({});
    }

    async changeItemQty(options: UpdateProductInCartOptions): Promise<string | null> {
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

            return await this.updateInitialCartData();
        } catch (error) {
            this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return Promise.reject();
        }
    }

    async addProductToCart(

        options: AddProductToCartOptions,
    ): Promise<void> {
        const { products = [], cartId: userCartId } = options;

        const cartId = userCartId || getCartId();

        if (!Array.isArray(products) || products.length === 0) {
            this.dispatch(showNotification(NotificationType.ERROR, __('No product data!')));

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
                    this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error)));
                });

                return await Promise.resolve();
            }

            await this.updateInitialCartData();
            this.dispatch(showNotification(NotificationType.SUCCESS, __('Product was added to cart!')));
        } catch (error) {
            if (!navigator.onLine) {
                this.dispatch(showNotification(NotificationType.ERROR, __('Not possible to fetch while offline')));

                return Promise.reject();
            }

            this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return Promise.reject();
        }

        return Promise.resolve();
    }

    async removeProductFromCart(item_id: number): Promise<Partial<QuoteData> | null> {
        try {
            const isCustomerSignedIn = isSignedIn();
            const cartId = getCartId() || '';

            if (!isCustomerSignedIn && !cartId) {
                return null;
            }

            const { removeItemFromCart: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getRemoveCartItemMutation(item_id, cartId),
            );

            this.updateCartTotals(cartData);

            return cartData;
        } catch (error) {
            this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));

            return null;
        }
    }

    async applyCouponToCart(couponCode: string): Promise<void> {
        try {
            const isCustomerSignedIn = isSignedIn();
            const cartId = getCartId() || '';

            if (!isCustomerSignedIn && !cartId) {
                return;
            }

            const { applyCouponToCart: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getApplyCouponMutation(couponCode, cartId),
            );

            this.updateCartTotals(cartData);
            this.dispatch(showNotification(NotificationType.SUCCESS, __('Coupon was applied!')));
        } catch (error) {
            this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));
        }
    }

    async removeCouponFromCart(): Promise<void> {
        try {
            const isCustomerSignedIn = isSignedIn();
            const cartId = getCartId() || '';

            if (!isCustomerSignedIn && !cartId) {
                return;
            }

            const { removeCouponFromCart: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getRemoveCouponMutation(cartId),
            );

            this.updateCartTotals(cartData);
            this.dispatch(showNotification(NotificationType.SUCCESS, __('Coupon was removed!')));
        } catch (error) {
            this.dispatch(showNotification(NotificationType.ERROR, getErrorMessage(error as NetworkError)));
        }
    }

    updateCrossSellProducts(items: CartItem[]): void {
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
                    ({ default: dispatcher }) => dispatcher.fetchCrossSellProducts(product_links),
                );
            } else {
                LinkedProductsDispatcher.then(
                    ({ default: dispatcher }) => dispatcher.clearCrossSellProducts(),
                );
            }
        } else {
            LinkedProductsDispatcher.then(
                ({ default: dispatcher }) => dispatcher.clearCrossSellProducts(),
            );
        }
    }

    /**
     * Get quote id. If quote id is missing, fetch it from the BE.
     * @return string quote id
     */
    _getCartId(): string | Promise<string | null> {
        const cartId = getCartId();

        if (cartId) {
            return cartId;
        }

        return this.createGuestEmptyCart();
    }

    async _getNewQuoteId(): Promise<string> {
        const { createEmptyCart: quoteId = '' } = ((await fetchMutation(
            CartQuery.getCreateEmptyCartMutation(),
        )) || {}) as unknown as { createEmptyCart: string };

        return quoteId;
    }

    updateShippingPrice(
        data: TotalsObject,

    ): void {
        const {
            discount_amount = 0,
            grand_total = 0,
            shipping_amount = 0,
            shipping_incl_tax = 0,
            shipping_tax_amount = 0,
            subtotal = 0,
            subtotal_incl_tax = 0,
            subtotal_with_discount = 0,
            tax_amount = 0,
        } = data;

        const cartStoreState = this.storeState.CartReducer;

        const {
            cartTotals: {
                prices: {
                    quote_currency_code = GQLCurrencyEnum.USD,
                } = {},
            } = {},
        } = cartStoreState;

        const shipping = {
            prices: {
                ...cartStoreState.cartTotals.prices,
                applied_taxes: [
                    {
                        ...cartStoreState.cartTotals.prices?.applied_taxes?.[0],
                        amount: {
                            value: tax_amount,
                            currency: quote_currency_code,
                        },
                    } as AppliedTax,
                ],
                discount: {
                    ...cartStoreState.cartTotals.prices?.discount,
                    label: cartStoreState.cartTotals.prices?.discount?.label || '',
                    amount: {
                        value: discount_amount,
                        currency: quote_currency_code as GQLCurrencyEnum,
                    },
                },
                grand_total: {
                    value: grand_total,
                    currency: quote_currency_code as GQLCurrencyEnum,
                },
                subtotal_excluding_tax: {
                    value: subtotal,
                    currency: quote_currency_code as GQLCurrencyEnum,
                },
                subtotal_including_tax: {
                    value: subtotal_incl_tax,
                    currency: quote_currency_code as GQLCurrencyEnum,
                },
                subtotal_with_discount_excluding_tax: {
                    value: subtotal_with_discount,
                    currency: quote_currency_code as GQLCurrencyEnum,
                },
            },
            shipping_addresses: {
                ...cartStoreState.cartTotals.shipping_addresses,
                selected_shipping_method: {
                    amount: {
                        value: shipping_amount,
                        currency: quote_currency_code as GQLCurrencyEnum,
                    },
                    amount_incl_tax: shipping_incl_tax,
                    tax_amount: shipping_tax_amount,
                } as SelectedShippingMethod,
            },
        };

        this.dispatch(updateCartStore({
            ...cartStoreState,
            cartTotals: {
                ...cartStoreState.cartTotals,
                ...shipping,
            },
        }));
    }

    /** @namespace Store/Cart/Reducer/updateCartTotals */
    updateCartTotals(cartData: Partial<QuoteData>): void {
        const { items = [], shipping_addresses = [], ...rest } = cartData;

        const cartTotals: CartTotals = {
            ...rest,
            items: [],
            shipping_addresses: {},
        };

        if (items.length) {
            const normalizedItemsProduct = items.map((item) => {
                const {
                    bundle_customizable_options,
                    configurable_customizable_options,
                    downloadable_customizable_options,
                    virtual_customizable_options,
                    simple_customizable_options,
                    ...normalizedItem
                } = item;

                normalizedItem.product = getIndexedProduct(
                    item.product as unknown as Partial<ProductItem>,
                    item.sku,
                ) as unknown as CartItemProduct;

                normalizedItem.customizable_options = bundle_customizable_options
                || configurable_customizable_options
                || downloadable_customizable_options
                || virtual_customizable_options
                || simple_customizable_options
                || [];

                return normalizedItem;
            });

            cartTotals.items = normalizedItemsProduct as unknown as IndexedCartItem[];
        }

        cartTotals.shipping_addresses = shipping_addresses[0] || [];

        BrowserDatabase.setItem(
            cartTotals,
            CART_TOTALS,
        );

        this.dispatch(updateCartStore({ cartTotals, isLoading: false }));
    }
}

export default new CartDispatcher();
