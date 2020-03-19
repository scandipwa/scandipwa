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
import { updateTotals } from 'Store/Cart';
import { isSignedIn } from 'Util/Auth';
import { CartQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getExtensionAttributes } from 'Util/Product';
import { LinkedProductsDispatcher } from 'Store/LinkedProducts';

export const GUEST_QUOTE_ID = 'guest_quote_id';

/**
 * Product Cart Dispatcher
 * @class CartDispatcher
 */
export class CartDispatcher {
    updateInitialCartData(dispatch) {
        const guestQuoteId = this._getGuestQuoteId();

        if (isSignedIn()) {
            // This is logged in customer, no need for quote id
            this._syncCartWithBE(dispatch);
        } else if (guestQuoteId) {
            // This is guest
            this._syncCartWithBE(dispatch, guestQuoteId);
        } else {
            // This is guest, cart is empty
            // Need to create empty cart and save quote
            this._createEmptyCart(dispatch).then((data) => {
                BrowserDatabase.setItem(data, GUEST_QUOTE_ID);
                this._updateCartData({}, dispatch);
            });
        }
    }

    _createEmptyCart(dispatch) {
        return fetchMutation(CartQuery.getCreateEmptyCartMutation()).then(
            ({ createEmptyCart }) => createEmptyCart,
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    _syncCartWithBE(dispatch) {
        // Need to get current cart from BE, update cart
        fetchQuery(CartQuery.getCartQuery(
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            ({ cartData }) => this._updateCartData(cartData, dispatch),
            () => {
                this._createEmptyCart(dispatch).then((data) => {
                    BrowserDatabase.setItem(data, GUEST_QUOTE_ID);
                    this._updateCartData({}, dispatch);
                });
            }
        );
    }

    changeItemQty(dispatch, options, tries = 0) {
        const { item_id, quantity, sku } = options;

        if (tries > 2) {
            dispatch(showNotification('error', __('Internal server error. Can not add to cart.')));
            return Promise.reject();
        }

        return fetchMutation(CartQuery.getSaveCartItemMutation(
            { sku, item_id, qty: quantity },
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            ({ saveCartItem: { cartData } }) => this._updateCartData(cartData, dispatch),
            (error) => {
                const [{ debugMessage = '' }] = error || [{}];

                if (debugMessage.match('No such entity with cartId ')) {
                    return this._createEmptyCart(dispatch).then((data) => {
                        BrowserDatabase.setItem(data, GUEST_QUOTE_ID);
                        this._updateCartData({}, dispatch);
                        return this.changeItemQty(dispatch, options, tries + 1);
                    });
                }

                dispatch(showNotification('error', error[0].message));
                return Promise.reject();
            }
        );
    }

    addProductToCart(dispatch, options) {
        const { product, quantity } = options;
        const { sku, type_id: product_type } = product;

        const productToAdd = {
            sku,
            product_type,
            qty: parseInt(quantity, 10),
            product_option: { extension_attributes: getExtensionAttributes(product) }
        };

        if (this._canBeAdded(options)) {
            return fetchMutation(CartQuery.getSaveCartItemMutation(
                productToAdd, !isSignedIn() && this._getGuestQuoteId()
            )).then(
                ({ saveCartItem: { cartData } }) => this._updateCartData(cartData, dispatch),
                ([{ message }]) => {
                    dispatch(showNotification('error', message));
                    return Promise.reject();
                }
            );
        }

        return Promise.reject();
    }

    removeProductFromCart(dispatch, item_id) {
        return fetchMutation(CartQuery.getRemoveCartItemMutation(
            item_id,
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            ({ removeCartItem: { cartData } }) => this._updateCartData(cartData, dispatch),
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    applyCouponToCart(dispatch, couponCode) {
        return fetchMutation(CartQuery.getApplyCouponMutation(
            couponCode, !isSignedIn() && this._getGuestQuoteId()
        )).then(
            ({ applyCoupon: { cartData } }) => {
                this._updateCartData(cartData, dispatch);
                dispatch(showNotification('success', __('Coupon was applied!')));
            },
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    removeCouponFromCart(dispatch) {
        return fetchMutation(CartQuery.getRemoveCouponMutation(
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            ({ removeCoupon: { cartData } }) => {
                this._updateCartData(cartData, dispatch);
                dispatch(showNotification('success', __('Coupon was removed!')));
            },
            error => dispatch(showNotification('error', error[0].message))
        );
    }

    _updateCartData(cartData, dispatch) {
        dispatch(updateTotals(cartData));
        const { items = [] } = cartData;

        if (items.length > 0) {
            const product_links = items.reduce((links, product) => {
                const { product: { product_links } } = product;
                if (product_links) {
                    Object.values(product_links).forEach((item) => {
                        if (item.link_type === 'crosssell') {
                            links.push(item);
                        }
                    });
                }

                return links;
            }, []);

            if (product_links.length !== 0) {
                LinkedProductsDispatcher.handleData(dispatch, product_links);
            }
        }
    }

    _getGuestQuoteId() {
        return BrowserDatabase.getItem(GUEST_QUOTE_ID);
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
}

export default new CartDispatcher();
