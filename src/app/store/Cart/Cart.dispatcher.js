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
import { updateTotals } from 'Store/Cart/Cart.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getExtensionAttributes } from 'Util/Product';
import { fetchMutation, fetchQuery } from 'Util/Request';

export const LinkedProductsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/LinkedProducts/LinkedProducts.dispatcher'
);

export const GUEST_QUOTE_ID = 'guest_quote_id';

/**
 * Product Cart Dispatcher
 * @class CartDispatcher
 * @namespace Store/Cart/Dispatcher
 */
export class CartDispatcher {
    updateInitialCartData(dispatch) {
        if (isSignedIn()) {
            this._syncCartWithBE(dispatch);
        } else {
            this.createGuestEmptyCart(dispatch);
        }
    }

    createGuestEmptyCart(dispatch) {
        return this._createEmptyCart(dispatch).then(
            /** @namespace Store/Cart/Dispatcher/updateInitialCartData_createEmptyCartThen */
            (data) => {
                BrowserDatabase.setItem(data, GUEST_QUOTE_ID);
                this._updateCartData({}, dispatch);
            }
        );
    }

    _createEmptyCart(dispatch) {
        return fetchMutation(CartQuery.getCreateEmptyCartMutation()).then(
            /** @namespace Store/Cart/Dispatcher/_createEmptyCartFetchMutationThen */
            ({ createEmptyCart }) => createEmptyCart,
            /** @namespace Store/Cart/Dispatcher/_createEmptyCartFetchMutationCatch */
            (error) => dispatch(showNotification('error', error[0].message))
        );
    }

    handle_syncCartWithBESuccess(dispatch, { cartData }) {
        this._updateCartData(cartData, dispatch);
    }

    handle_syncCartWithBEError(dispatch) {
        return this._createEmptyCart(dispatch)
            .then(
                /** @namespace Store/Cart/Dispatcher/handle_syncCartWithBEError_createEmptyCartThen */
                (data) => {
                    BrowserDatabase.setItem(data, GUEST_QUOTE_ID);
                    this._updateCartData({}, dispatch);
                }
            );
    }

    _syncCartWithBE(dispatch) {
        // Need to get current cart from BE, update cart
        fetchQuery(CartQuery.getCartQuery(
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            /** @namespace Store/Cart/Dispatcher/_syncCartWithBEFetchQueryThen */
            (result) => this.handle_syncCartWithBESuccess(dispatch, result),
            /** @namespace Store/Cart/Dispatcher/_syncCartWithBEFetchQueryError */
            (error) => this.handle_syncCartWithBEError(dispatch, error)
        );
    }

    changeItemQty(dispatch, options, tries = 0) {
        const { item_id, quantity, sku } = options;

        if (tries > 2) {
            dispatch(showNotification('error', __('Internal server error. Can not add to cart.')));
            return Promise.reject();
        }

        return fetchMutation(CartQuery.getSaveCartItemMutation(
            { sku, item_id, quantity },
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            /** @namespace Store/Cart/Dispatcher/changeItemQtyFetchMutationThen */
            ({ saveCartItem: { cartData } }) => this._updateCartData(cartData, dispatch),
            /** @namespace Store/Cart/Dispatcher/changeItemQtyFetchMutationCatch */
            (error) => {
                const [{ debugMessage = '' }] = error || [{}];

                if (debugMessage.match('No such entity with cartId ')) {
                    return this._createEmptyCart(dispatch).then(
                        /** @namespace Store/Cart/Dispatcher/changeItemQtyFetchMutationCatch_createEmptyCartThen */
                        (data) => {
                            BrowserDatabase.setItem(data, GUEST_QUOTE_ID);
                            this._updateCartData({}, dispatch);
                            return this.changeItemQty(dispatch, options, tries + 1);
                        }
                    );
                }

                dispatch(showNotification('error', error[0].message));
                return Promise.reject();
            }
        );
    }

    async addProductToCart(dispatch, options) {
        const guestQuoteId = this._getGuestQuoteId();
        const {
            product,
            quantity,
            productOptionsData
        } = options;

        const {
            sku,
            type_id: product_type
        } = product;

        const {
            productOptions,
            productOptionsMulti
        } = productOptionsData || {};

        const productToAdd = {
            sku,
            product_type,
            quantity,
            product_option: {
                extension_attributes: getExtensionAttributes(
                    {
                        ...product,
                        productOptions,
                        productOptionsMulti
                    }
                )
            }
        };

        if (!guestQuoteId) {
            await this.createGuestEmptyCart(dispatch);
        }

        if (this._canBeAdded(options)) {
            try {
                const { saveCartItem: { cartData } } = await fetchMutation(CartQuery.getSaveCartItemMutation(
                    productToAdd, !isSignedIn() && this._getGuestQuoteId()
                ));

                return this._updateCartData(cartData, dispatch);
            } catch ([{ message }]) {
                dispatch(showNotification('error', message));
                return Promise.reject();
            }
        }

        return Promise.reject();
    }

    removeProductFromCart(dispatch, item_id) {
        return fetchMutation(CartQuery.getRemoveCartItemMutation(
            item_id,
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            /** @namespace Store/Cart/Dispatcher/removeProductFromCartFetchMutationThen */
            ({ removeCartItem: { cartData } }) => this._updateCartData(cartData, dispatch),
            /** @namespace Store/Cart/Dispatcher/removeProductFromCartFetchMutationError */
            (error) => dispatch(showNotification('error', error[0].message))
        );
    }

    async applyCouponToCart(dispatch, couponCode) {
        const guestQuoteId = this._getGuestQuoteId();

        if (!guestQuoteId) {
            await this.createGuestEmptyCart(dispatch);
        }

        try {
            const { applyCoupon: { cartData } } = await fetchMutation(CartQuery.getApplyCouponMutation(
                couponCode, !isSignedIn() && this._getGuestQuoteId()
            ));

            this._updateCartData(cartData, dispatch);
            dispatch(showNotification('success', __('Coupon was applied!')));
        } catch (error) {
            dispatch(showNotification('error', error[0].message));
        }
    }

    removeCouponFromCart(dispatch) {
        return fetchMutation(CartQuery.getRemoveCouponMutation(
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            /** @namespace Store/Cart/Dispatcher/removeCouponFromCartFetchMutationThen */
            ({ removeCoupon: { cartData } }) => {
                this._updateCartData(cartData, dispatch);
                dispatch(showNotification('success', __('Coupon was removed!')));
            },
            /** @namespace Store/Cart/Dispatcher/removeCouponFromCartFetchMutationError */
            (error) => dispatch(showNotification('error', error[0].message))
        );
    }

    _updateCartData(cartData, dispatch) {
        dispatch(updateTotals(cartData));
        const { items = [] } = cartData;

        if (items.length > 0) {
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
                    ({ default: dispatcher }) => dispatcher.handleData(dispatch, product_links)
                );
            } else {
                // LinkedProductsDispatcher.then(
                //     ({ default: dispatcher }) => dispatcher.clearLinkedProducts(dispatch, true)
                // );
            }
        } else {
            // LinkedProductsDispatcher.then(
            //     ({ default: dispatcher }) => dispatcher.clearLinkedProducts(dispatch, true)
            // );
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
