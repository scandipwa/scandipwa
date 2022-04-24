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

import { Dispatch } from 'redux';

import ProductCompareQuery from 'Query/ProductCompare.query';
import { CompareList } from 'Query/ProductCompare.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import {
    clearComparedProducts,
    setCompareList,
    setCompareListIds,
    toggleLoader,
    updateCompareTotals
} from 'Store/ProductCompare/ProductCompare.action';
import { getAuthorizationToken } from 'Util/Auth';
import { getUid, removeUid, setUid } from 'Util/Compare';
import { fetchMutation, fetchQuery } from 'Util/Request';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Store/ProductCompare/Dispatcher */
export class ProductCompareDispatcher {
    async getCompareList(dispatch: Dispatch): Promise<boolean> {
        const uid = getUid() || '';

        if (!uid) {
            return false;
        }

        dispatch(toggleLoader(true));

        try {
            const { compareList } = await fetchQuery(
                ProductCompareQuery.getCompareList(uid)
            );

            dispatch(toggleLoader(false));
            dispatch(setCompareList(compareList));
        } catch (error) {
            dispatch(toggleLoader(false));
            dispatch(showNotification(NotificationType.ERROR, __('Unable to fetch compare list'), error));

            return false;
        }

        return true;
    }

    async createCompareList(productId: string): Promise<CompareList> {
        const {
            createCompareList,
            createCompareList: {
                uid
            }
        } = await fetchMutation(
            ProductCompareQuery.getCreateCompareList(
                [productId]
            )
        );

        if (uid) {
            setUid(uid);
        }

        return createCompareList;
    }

    async addToCompareList(uid: string, productId: string): Promise<CompareList> {
        const {
            addProductsToCompareList
        } = await fetchMutation(
            ProductCompareQuery.getAddProductsToCompareList(
                uid,
                [productId]
            )
        );

        return addProductsToCompareList;
    }

    async addProductToCompare(productId: string, dispatch: Dispatch): Promise<CompareList | null> {
        const uid = getUid();

        try {
            const result = (uid)
                ? await this.addToCompareList(uid, productId)
                : await this.createCompareList(productId);

            dispatch(setCompareList(result));
            dispatch(showNotification(NotificationType.SUCCESS, __('Product is added to the compare list')));

            return result;
        } catch (error) {
            dispatch(showNotification(NotificationType.ERROR, __('Unable to add product to the compare list'), error));

            return null;
        }
    }

    async removeComparedProduct(productId: string, dispatch: Dispatch): Promise<CompareList | null> {
        const uid = getUid();

        if (!uid) {
            return null;
        }

        try {
            const {
                removeProductsFromCompareList
            } = await fetchMutation(
                ProductCompareQuery.getRemoveProductsFromCompareList(
                    uid,
                    [productId]
                )
            );

            dispatch(setCompareList(removeProductsFromCompareList));
            dispatch(showNotification(NotificationType.SUCCESS, __('Product is removed from the compare list')));

            return removeProductsFromCompareList;
        } catch (error) {
            dispatch(showNotification(
                NotificationType.SUCCESS,
                __('Unable to remove product from the compare list'),
                error
            ));

            return null;
        }
    }

    async fetchCustomersList(dispatch: Dispatch): Promise<void> {
        const {
            createCompareList,
            createCompareList: {
                uid
            }
        } = await fetchMutation(
            ProductCompareQuery.getCreateEmptyCompareList()
        );

        if (!getAuthorizationToken()) {
            return;
        }

        if (uid) {
            setUid(uid);
        }

        dispatch(setCompareList(createCompareList));
    }

    async assignCompareList(dispatch: Dispatch): Promise<boolean> {
        const uid = getUid();

        if (!uid) {
            await this.fetchCustomersList(dispatch);

            return false;
        }

        removeUid();

        try {
            const {
                assignCompareListToCustomer: {
                    result,
                    compare_list,
                    compare_list: {
                        uid: newUid = ''
                    } = {}
                }
            } = await fetchMutation(
                ProductCompareQuery.getAssignCompareList(uid)
            );

            if (!getAuthorizationToken()) {
                return false;
            }

            if (result) {
                setUid(newUid);
                dispatch(setCompareList(compare_list));
            }

            return result;
        } catch (error) {
            dispatch(toggleLoader(false));

            return false;
        }
    }

    async clearComparedProducts(
        dispatch: Dispatch
    ): Promise<Record<'deleteCompareList', { result: boolean }> | null> {
        const uid = getUid();

        if (!uid) {
            return null;
        }

        dispatch(toggleLoader(true));

        try {
            const result = await fetchMutation(
                ProductCompareQuery.getDeleteCompareList(uid)
            );

            removeUid();
            dispatch(clearComparedProducts());
            dispatch(showNotification(NotificationType.SUCCESS, __('Compare list is cleared')));
            dispatch(toggleLoader(false));

            return result;
        } catch (error) {
            dispatch(toggleLoader(false));
            dispatch(showNotification(NotificationType.ERROR, __('Unable to clear product compare list'), error));

            return null;
        }
    }

    async updateInitialProductCompareData(
        dispatch: Dispatch
    ): Promise<boolean> {
        const uid = getUid();

        if (!uid) {
            return false;
        }

        dispatch(toggleLoader(true));

        try {
            const { compareList } = await fetchQuery(
                ProductCompareQuery.getCompareListIds(uid)
            );
            const { items = [] } = compareList || {};
            const compareIds = items.map((data) => data?.product?.id);

            dispatch(toggleLoader(false));
            dispatch(setCompareListIds(compareIds));
            dispatch(updateCompareTotals(compareIds.length));
        } catch (error) {
            dispatch(toggleLoader(false));
            dispatch(showNotification(NotificationType.ERROR, __('Unable to fetch compare list'), error));

            return false;
        }

        return true;
    }

    resetComparedProducts(dispatch: Dispatch): void {
        dispatch(clearComparedProducts());
    }
}

export default new ProductCompareDispatcher();
