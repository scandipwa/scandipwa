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

import { fetchMutation } from 'Util/Request';
import {
    addProductToCart,
    removeProductFromCart,
    updateTotals,
    updateAllProductsInCart
} from 'Store/Cart';
import { getProductPrice } from 'Util/Price';
import { isSignedIn } from 'Util/Auth';
import { Cart } from 'Query';
import BrowserDatabase from 'Util/BrowserDatabase';
import { PRODUCTS_IN_CART } from 'Store/Cart';
import { Promise } from 'q';

export const GUEST_QUOTE_ID = 'guest_quote_id';

/**
 * Product Cart Dispatcher
 * @class CartDispatcher
 */
class CartDispatcher {
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
            this._createEmptyCart()
                .then(data => BrowserDatabase.setItem(data, GUEST_QUOTE_ID));
        }
    }

    _createEmptyCart() {
        return fetchMutation(Cart.getCreateEmptyCartMutation()).then(
            ({ createEmptyCart }) => createEmptyCart,
            error => console.log(error)
        );
    }

    _syncCartWithBE(dispatch, quoteId) {
        // Need to get current cart from BE, update cart
        // updateAllProductsInCart()
        console.log('SYNCING');
    }

    addProductToCart(dispatch, options) {
        const { product, quantity } = options;
        const { item_id, quantity: originalQuantity } = this._getProductInCart(product);

        const productToAdd = {
            item_id,
            sku: this._getProductAttribute('sku', product),
            qty: (parseInt(originalQuantity, 10) || 0) + parseInt(quantity, 10)
        };

        if (this._isAllowed(options)) {
            return fetchMutation(Cart.getSaveCartItemMutation(
                productToAdd,
                !isSignedIn() && this._getGuestQuoteId()
            )).then(
                ({ saveCartItem: { item_id, qty } }) => {
                    dispatch(addProductToCart(
                        {
                            ...product,
                            item_id,
                            quantity: qty
                        }
                    ));
                },
                error => console.log(error)
            );
        }

        return Promise.reject();
    }

    removeProductFromCart(dispatch, { product }) {
        return fetchMutation(Cart.getRemoveCartItemMutation(
            product,
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            ({ removeCartItem }) => removeCartItem && dispatch(removeProductFromCart(product)),
            error => console.log(error)
        );
    }

    updateTotals(dispatch, options) {
        const totals = this._calculateTotals(options.products);
        return dispatch(updateTotals(totals));
    }

    _getGuestQuoteId() {
        return BrowserDatabase.getItem(GUEST_QUOTE_ID);
    }

    _getProductInCart(product) {
        const id = this._getProductAttribute('id', product);
        const productsInCart = BrowserDatabase.getItem(PRODUCTS_IN_CART) || {};

        if (!productsInCart[id]) return {};
        return productsInCart[id];
    }

    _getProductAttribute(attribute, { variants, configurableVariantIndex, [attribute]: attributeValue }) {
        return typeof configurableVariantIndex === 'number'
            ? variants[configurableVariantIndex].product[attribute]
            : attributeValue;
    }

    /**
     * Check if it is allowed to add product to cart
     * @param {Object} options Cart options
     * @return {Boolean} Indicates is allowed or not
     * @memberof CartDispatcher
     */
    _isAllowed(options) {
        if (options.product && options.quantity && (options.product.quantity + options.quantity) < 1) {
            return false;
        }

        if (options.quantity === 0) {
            return false;
        }

        return true;
    }

    /**
     * Calculate totals from product list
     * @param {Object} products Object of products
     * @return {Object} Totals
     * @memberof CartDispatcher
     */
    _calculateTotals(products) {
        // TODO: Override to get product prices from server (in case price have changed)
        let subTotalPrice = 0;
        let taxPrice = 0;
        let count = 0;
        let grandTotalPrice = 0;

        if (products) {
            Object.keys(products).forEach((key) => {
                const prices = getProductPrice(products[key]);
                const { quantity } = products[key];

                count += quantity;
                subTotalPrice += (prices.subTotalPrice * quantity);
                taxPrice += (prices.taxPrice * quantity);
            });
        }
        grandTotalPrice = (subTotalPrice + taxPrice).toFixed(2);
        subTotalPrice = subTotalPrice.toFixed(2);
        taxPrice = taxPrice.toFixed(2);

        return {
            subTotalPrice,
            count,
            grandTotalPrice,
            taxPrice
        };
    }
}

export default new CartDispatcher();
