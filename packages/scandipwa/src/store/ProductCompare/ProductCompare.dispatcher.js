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

import ProductCompareQuery from 'Query/ProductCompare.query';
import { showNotification } from 'Store/Notification/Notification.action';
import {
    addComparedProductIds,
    clearComparedProducts,
    removeComparedProduct,
    setComparedProductIds,
    setCompareList,
    toggleLoader
} from 'Store/ProductCompare/ProductCompare.action';
import { getGuestQuoteId } from 'Util/Cart';
import { fetchMutation, fetchQuery } from 'Util/Request';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Store/ProductCompare/Dispatcher */
export class ProductCompareDispatcher {
    async getCompareList(dispatch) {
        const guestCartId = await this._getGuestQuoteId(dispatch);

        dispatch(toggleLoader(true));

        try {
            const { compareProducts } = await fetchQuery(
                ProductCompareQuery.getQuery(guestCartId)
            );

            dispatch(toggleLoader(false));
            dispatch(setCompareList(compareProducts));
        } catch (error) {
            dispatch(toggleLoader(false));
            dispatch(showNotification('error', __('Unable to fetch compare list'), error));
        }
    }

    async addProductToCompare(productId, dispatch) {
        const guestCartId = await this._getGuestQuoteId(dispatch);

        try {
            const result = await fetchMutation(
                ProductCompareQuery.getAddProductToCompareMutation(
                    productId,
                    guestCartId
                )
            );

            dispatch(addComparedProductIds(productId));
            dispatch(showNotification('success', __('Product is added to the compare list')));
            return result;
        } catch (error) {
            dispatch(showNotification('error', __('Unable to add product to the compare list'), error));
            return false;
        }
    }

    async removeComparedProduct(productId, dispatch) {
        const guestCartId = await this._getGuestQuoteId(dispatch);

        try {
            const result = await fetchMutation(
                ProductCompareQuery.getRemoveComparedProductMutation(
                    productId,
                    guestCartId
                )
            );

            dispatch(showNotification('success', __('Product is removed from the compare list')));
            dispatch(removeComparedProduct(productId));
            return result;
        } catch (error) {
            dispatch(showNotification('error', __('Unable to remove product from the compare list'), error));
            return false;
        }
    }

    async clearComparedProducts(dispatch) {
        const guestCartId = await this._getGuestQuoteId(dispatch);

        dispatch(toggleLoader(true));

        try {
            const result = await fetchMutation(
                ProductCompareQuery.getClearComparedProductsMutation(guestCartId)
            );

            dispatch(toggleLoader(false));
            dispatch(clearComparedProducts());
            dispatch(showNotification('success', __('Compare list is cleared')));
            return result;
        } catch (error) {
            dispatch(toggleLoader(false));
            dispatch(showNotification('error', __('Unable to clear product compare list'), error));
            return false;
        }
    }

    async updateInitialProductCompareData(dispatch) {
        const guestCartId = await this._getGuestQuoteId(dispatch);

        try {
            const {
                compareProducts: {
                    products = []
                } = {}
            } = await fetchQuery(
                ProductCompareQuery.getProductIds(guestCartId)
            );

            const productIds = products.map(({ id }) => id);

            dispatch(setComparedProductIds(productIds));
        } catch (error) {
            dispatch(showNotification('error', __('Unable to fetch compare product ids'), error));
        }
    }

    resetComparedProducts(dispatch) {
        dispatch(clearComparedProducts());
    }

    async _getGuestQuoteId(dispatch) {
        const result = getGuestQuoteId();

        if (result) {
            return result;
        }

        const { default: cartDispatcher } = await CartDispatcher;
        return cartDispatcher.createGuestEmptyCart(dispatch);
    }
}

export default new ProductCompareDispatcher();
