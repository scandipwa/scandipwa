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
import { setCompareList, toggleLoader } from 'Store/ProductCompare/ProductCompare.action';
import { GUEST_QUOTE_ID } from 'Store/ProductCompare/ProductCompare.config';
import BrowserDatabase from 'Util/BrowserDatabase';
import { fetchMutation, QueryDispatcher } from 'Util/Request';

/** @namespace Store/ProductCompare/Dispatcher */
export class ProductCompareDispatcher extends QueryDispatcher {
    onSuccess(data, dispatch) {
        const { compareProducts } = data;
        dispatch(toggleLoader(false));
        dispatch(setCompareList(compareProducts));
    }

    onError(error, dispatch) {
        dispatch(toggleLoader(false));
        dispatch(showNotification('error', __('Unable to fetch compare list'), error));
    }

    prepareRequest(data, dispatch) {
        const guestCartId = this._getGuestQuoteId();
        dispatch(toggleLoader(true));
        return ProductCompareQuery.getQuery(guestCartId);
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

            dispatch(toggleLoader(false));
            return result;
        } catch (error) {
            dispatch(toggleLoader(false));
            dispatch(showNotification('error', __('Unable to add product to compare list'), error));
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

            dispatch(toggleLoader(false));
            return result;
        } catch (error) {
            dispatch(toggleLoader(false));
            dispatch(showNotification('error', __('Unable to remove product from compare list'), error));
            return false;
        }
    }

    async clearComparedProducts(data, dispatch) {
        const guestCartId = this._getGuestQuoteId();

        dispatch(toggleLoader(true));

        try {
            const result = await fetchMutation(
                ProductCompareQuery.getClearComparedProductsMutation(guestCartId)
            );

            dispatch(toggleLoader(false));
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
