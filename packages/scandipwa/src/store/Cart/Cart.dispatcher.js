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

import CartQuery from 'Query/Cart.query';
import { updateIsLoadingCart, updateTotals } from 'Store/Cart/Cart.action';
import { updateEmail, updateShippingFields } from 'Store/Checkout/Checkout.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { getRegionIdOfRegionName } from 'Util/Address';
import { getAuthorizationToken, isSignedIn } from 'Util/Auth';
import { getGuestQuoteId, setGuestQuoteId } from 'Util/Cart';
import {
    fetchMutation, fetchQuery, getErrorMessage
} from 'Util/Request';

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
    async updateInitialCartData(dispatch, isForCustomer = false, disableLoader = false) {
        // Need to get current cart from BE, update cart
        try {
            // ! Get quote token first (local or from the backend) just to make sure it exists

            if (!disableLoader) {
                dispatch(updateIsLoadingCart(true));
            }
            // ! Get quote token first (local or from the backend) just to make sure it exists
            const quoteId = await this._getGuestQuoteId(dispatch);

            const {
                cartData = {},
                cartData: {
                    is_virtual = false,
                    shipping_address,
                    shipping_address: {
                        street = null,
                        email = ''
                    } = {},
                    shipping_method
                } = {}
            } = await fetchQuery(
                CartQuery.getCartQuery(
                    quoteId
                )
            );

            if (shipping_address && street) {
                if (!is_virtual) {
                    await dispatch(
                        updateShippingFields({
                            ...this.prepareCheckoutAddressFormat(shipping_address),
                            shipping_method
                        })
                    );
                }

                await dispatch(updateEmail(email));
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

    prepareCheckoutAddressFormat(address) {
        const {
            street: addressStreet = '',
            email,
            country_id,
            region,
            region_id,
            ...data
        } = address;

        const street = addressStreet.split('\n');

        const street_index = {};
        street.forEach((item, index) => {
            street_index[`street_${index}`] = item;
        });

        return {
            ...data,
            country_id,
            region,
            region_id: getRegionIdOfRegionName(country_id, region),
            street,
            ...street_index
        };
    }

    async createGuestEmptyCart(dispatch) {
        try {
            dispatch(updateIsLoadingCart(true));

            const quoteId = await this._getNewQuoteId(dispatch);

            setGuestQuoteId(quoteId);

            return quoteId;
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));

            return null;
        }
    }

    async mergeCarts(sourceCartId, destinationCartId, dispatch) {
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
            dispatch(showNotification('error', getErrorMessage(error)));

            return null;
        }
    }

    resetGuestCart(dispatch) {
        return this._updateCartData({}, dispatch);
    }

    async changeItemQty(dispatch, options) {
        const { uid, quantity = 1, cartId: originalCartId } = options;

        // const cartId = !originalCartId ? getGuestQuoteId() : originalCartId;

        const cartId = !originalCartId ? getGuestQuoteId() : originalCartId;

        try {
            if (!cartId) {
                return Promise.reject();
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

            return this.updateInitialCartData(dispatch);
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));

            return Promise.reject();
        }
    }

    async addProductToCart(dispatch, options = {}) {
        const { products = [], cartId: userCartId } = options;

        const cartId = userCartId || getGuestQuoteId();

        if (!Array.isArray(products) || products.length === 0) {
            dispatch(showNotification('error', __('No product data!')));
            return Promise.reject();
        }

        try {
            if (!cartId) {
                return Promise.reject();
            }

            const { addProductsToCart: { user_errors: errors = [] } = {} } = await fetchMutation(
                CartQuery.getAddProductToCartMutation(cartId, products)
            );

            if (Array.isArray(errors) && errors.length > 0) {
                errors.forEach((error) => {
                    dispatch(showNotification('error', getErrorMessage(error)));
                });

                return Promise.reject();
            }

            await this.updateInitialCartData(dispatch);
            dispatch(showNotification('success', __('Product was added to cart!')));
        } catch (error) {
            if (!navigator.onLine) {
                dispatch(showNotification('error', __('Not possible to fetch while offline')));
                return Promise.reject();
            }

            dispatch(showNotification('error', getErrorMessage(error)));
            return Promise.reject();
        }

        return Promise.resolve();
    }

    async removeProductFromCart(dispatch, item_id) {
        try {
            const isCustomerSignedIn = isSignedIn();
            const guestQuoteId = !isCustomerSignedIn && getGuestQuoteId();

            if (!isCustomerSignedIn && !guestQuoteId) {
                return null;
            }

            const { removeCartItem: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getRemoveCartItemMutation(item_id, guestQuoteId)
            );

            this._updateCartData(cartData, dispatch);

            return cartData;
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));

            return null;
        }
    }

    async applyCouponToCart(dispatch, couponCode) {
        try {
            const isCustomerSignedIn = isSignedIn();
            const guestQuoteId = !isCustomerSignedIn && getGuestQuoteId();

            if (!isCustomerSignedIn && !guestQuoteId) {
                return false;
            }

            const { applyCoupon: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getApplyCouponMutation(couponCode, guestQuoteId)
            );

            this._updateCartData(cartData, dispatch);
            dispatch(showNotification('success', __('Coupon was applied!')));

            return true;
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));

            return false;
        }
    }

    async removeCouponFromCart(dispatch) {
        try {
            const isCustomerSignedIn = isSignedIn();
            const guestQuoteId = !isCustomerSignedIn && getGuestQuoteId();

            if (!isCustomerSignedIn && !guestQuoteId) {
                return;
            }

            const { removeCoupon: { cartData = {} } = {} } = await fetchMutation(
                CartQuery.getRemoveCouponMutation(guestQuoteId)
            );

            this._updateCartData(cartData, dispatch);
            dispatch(showNotification('success', __('Coupon was removed!')));
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));
        }
    }

    updateCrossSellProducts(items, dispatch) {
        if (items && items.length) {
            const product_links = items.reduce((links, product) => {
                const { product: { product_links, variants = [] }, sku: variantSku } = product;

                const { product_links: childProductLinks } = variants.find(({ sku }) => sku === variantSku) || {};

                if (childProductLinks) {
                    Object.values(childProductLinks).filter(({ link_type }) => link_type === 'crosssell')
                        .map((item) => links.push(item));
                }

                if (product_links) {
                    Object.values(product_links).filter(({ link_type }) => link_type === 'crosssell')
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

    _updateCartData(cartData, dispatch) {
        dispatch(updateTotals(cartData));
    }

    /**
     * @param {*} attribute
     * @param {*} product
     */
    _getProductAttribute(attribute, product) {
        const { variants, configurableVariantIndex, [attribute]: attributeValue } = product;

        return configurableVariantIndex >= 0
            ? variants[configurableVariantIndex][attribute]
            : attributeValue;
    }

    /**
     * Check if it is allowed to add product to cart
     * @param {Object} options Cart options
     * @return {Boolean} Indicates is allowed or not
     * @memberof CartDispatcher
     */
    _canBeAdded(options) {
        if (options.product && options.quantity && (options.product.quantity + options.quantity) < 1) {
            return false;
        }

        if (options.quantity === 0) {
            return false;
        }

        return true;
    }

    /**
     * Get quote id. If quote id is missing, fetch it from the BE.
     * @param Dispatch dispatch
     * @return string quote id
     */
    async _getGuestQuoteId(dispatch) {
        const guestQuoteId = getGuestQuoteId();

        if (guestQuoteId) {
            return guestQuoteId;
        }

        return this.createGuestEmptyCart(dispatch);
    }

    async _getNewQuoteId() {
        const { createEmptyCart: quoteId = '' } = await fetchMutation(
            CartQuery.getCreateEmptyCartMutation()
        );

        return quoteId;
    }
}

export default new CartDispatcher();
