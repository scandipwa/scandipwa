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
    clearComparedProducts,
    removeComparedProduct,
    setCompareList,
    toggleLoader
} from 'Store/ProductCompare/ProductCompare.action';
import { GUEST_QUOTE_ID } from 'Store/ProductCompare/ProductCompare.config';
import BrowserDatabase from 'Util/BrowserDatabase';
import { fetchMutation, fetchQuery } from 'Util/Request';

/** @namespace Store/ProductCompare/Dispatcher */
export class ProductCompareDispatcher {
    async getCompareList(dispatch) {
        const guestCartId = this._getGuestQuoteId();

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

    async addProductToCompare(productSku, dispatch) {
        const guestCartId = this._getGuestQuoteId();

        dispatch(toggleLoader(true));

        try {
            const result = await fetchMutation(
                ProductCompareQuery.getAddProductToCompareMutation(
                    productSku,
                    guestCartId
                )
            );

            dispatch(showNotification('success', __('Product is added to the compare list')));
            return result;
        } catch (error) {
            dispatch(showNotification('error', __('Unable to add product to the compare list'), error));
            return false;
        }
    }

    async removeComparedProduct(productSku, dispatch) {
        const guestCartId = this._getGuestQuoteId();

        dispatch(toggleLoader(true));

        try {
            const result = await fetchMutation(
                ProductCompareQuery.getRemoveComparedProductMutation(
                    productSku,
                    guestCartId
                )
            );

            dispatch(showNotification('success', __('Product is removed from the compare list')));
            dispatch(removeComparedProduct(productSku));
            return result;
        } catch (error) {
            dispatch(showNotification('error', __('Unable to remove product from the compare list'), error));
            return false;
        }
    }

    async clearComparedProducts(dispatch) {
        const guestCartId = this._getGuestQuoteId();

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

    _getGuestQuoteId() {
        return BrowserDatabase.getItem(GUEST_QUOTE_ID);
    }
}

export default new ProductCompareDispatcher();
