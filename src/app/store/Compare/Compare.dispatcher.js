/* eslint-disable max-len */
/* eslint-disable no-console */

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

import { fetchQuery, fetchMutation } from 'Util/Request';
import {
    addProductToCompare,
    removeProductFromCompare,
    removeAllProductsFromCompare,
    updateAllProductsInCompare,
    updateCompareLoadStatus,
    PRODUCTS_IN_COMPARE
} from 'Store/Compare';
import { Compare } from 'Query';
import BrowserDatabase from 'Util/BrowserDatabase';
import { isSignedIn } from 'Util/Auth';
import { showNotification } from 'Store/Notification';
import { GUEST_QUOTE_ID } from 'Store/Cart';
import { getIndexedProducts } from 'Util/Product';

export class CompareDispatcher {
    updateInitialCompareData(dispatch) {
        const guestQuoteId = this._getGuestQuoteId();

        if (isSignedIn()) {
            this._syncCompareWithBE(dispatch, null, true);
        } else if (guestQuoteId) {
            this._syncCompareWithBE(dispatch, guestQuoteId, true);
        } else {
            dispatch(updateAllProductsInCompare([], false));
        }
    }

    addProductToCompare(options, dispatch) {
        const { product: { sku, id }, product } = options;
        const comparedProducts = this._getCompareProductsInLocalStorage();
        const isProductInCompareList = comparedProducts.find(({ id: existingId }) => existingId === id);

        if (isProductInCompareList) return null;

        dispatch(updateCompareLoadStatus(true));

        return fetchMutation(Compare.getAddProductToCompareQuery(
            sku,
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            () => {
                dispatch(addProductToCompare(product));
                dispatch(showNotification('success', __('Product has been added to Compare List!')));
            },
            error => dispatch(showNotification('error', __('Error adding product to Compare List!'))) && console.log(error)
        );
    }

    removeProductFromCompare(options, dispatch) {
        const { product: { sku } } = options;
        dispatch(updateCompareLoadStatus(true));

        return fetchMutation(Compare.getRemoveCompareProductMutation(
            sku,
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            (isRemovedOnBE) => {
                dispatch(removeProductFromCompare(sku, isRemovedOnBE));
                dispatch(showNotification('success', __('Product has been removed from Compare List!')));
            },
            error => dispatch(showNotification('error', __('Error removing product from Compare List!'))) && console.log(error)
        );
    }

    removeAllProductsFromCompare(dispatch) {
        dispatch(updateCompareLoadStatus(true));

        return fetchMutation(Compare.getClearCompareProductsMutation(
            !isSignedIn() && this._getGuestQuoteId()
        )).then(
            (isRemovedAllOnBE) => {
                dispatch(removeAllProductsFromCompare(isRemovedAllOnBE));
                dispatch(showNotification('success', __('Compare List was wiped!')));
            },
            error => dispatch(showNotification('error', __('Error wiping Compare List!'))) && console.log(error)
        );
    }

    _syncCompareWithBE(dispatch, questQuoteId) {
        dispatch(updateAllProductsInCompare([], true));

        return fetchQuery(Compare.getCompareProductsQuery(questQuoteId))
            .then(
                ({ CompareProducts: { products } }) => {
                    dispatch(
                        updateAllProductsInCompare(
                            getIndexedProducts(products || []),
                            false
                        )
                    );
                },
                ({ errors: [{ message }] }) => dispatch(showNotification('error', message))
            );
    }

    _getGuestQuoteId() {
        return BrowserDatabase.getItem(GUEST_QUOTE_ID);
    }

    _getCompareProductsInLocalStorage() {
        return BrowserDatabase.getItem(PRODUCTS_IN_COMPARE) || [];
    }
}

export default new CompareDispatcher();
