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

import ProductCompareQuery from 'Query/ProductCompare.query';
import { CompareList } from 'Query/ProductCompare.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import {
    clearComparedProducts,
    setCompareList,
    setCompareListIds,
    toggleLoader,
    updateCompareTotals,
} from 'Store/ProductCompare/ProductCompare.action';
import { getAuthorizationToken } from 'Util/Auth';
import { getUid, removeUid, setUid } from 'Util/Compare';
import { fetchMutation, fetchQuery } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Store/ProductCompare/Dispatcher */
export class ProductCompareDispatcher extends SimpleDispatcher {
    async getCompareList(): Promise<boolean> {
        const uid = getUid() || '';

        if (!uid) {
            return false;
        }

        this.dispatch(toggleLoader(true));

        try {
            const { compareList } = await fetchQuery(
                ProductCompareQuery.getCompareList(uid),
            );

            this.dispatch(toggleLoader(false));
            this.dispatch(setCompareList(compareList));
        } catch (error) {
            this.dispatch(toggleLoader(false));
            this.dispatch(showNotification(NotificationType.ERROR, __('Unable to fetch compare list'), error));

            return false;
        }

        return true;
    }

    async createCompareList(productId: string): Promise<CompareList> {
        const {
            createCompareList,
            createCompareList: {
                uid,
            },
        } = await fetchMutation(
            ProductCompareQuery.getCreateCompareList(
                [productId],
            ),
        );

        if (uid) {
            setUid(uid);
        }

        return createCompareList;
    }

    async addToCompareList(uid: string, productId: string): Promise<CompareList> {
        const {
            addProductsToCompareList,
        } = await fetchMutation(
            ProductCompareQuery.getAddProductsToCompareList(
                uid,
                [productId],
            ),
        );

        return addProductsToCompareList;
    }

    async addProductToCompare(productId: string): Promise<CompareList | null> {
        const uid = getUid();

        try {
            const result = (uid)
                ? await this.addToCompareList(uid, productId)
                : await this.createCompareList(productId);

            this.dispatch(setCompareList(result));
            this.dispatch(showNotification(NotificationType.SUCCESS, __('Product is added to the compare list')));

            return result;
        } catch (error) {
            this.dispatch(showNotification(NotificationType.ERROR, __('Unable to add product to the compare list'), error));

            return null;
        }
    }

    async removeComparedProduct(productId: string): Promise<CompareList | null> {
        const uid = getUid();

        if (!uid) {
            return null;
        }

        try {
            const {
                removeProductsFromCompareList,
            } = await fetchMutation(
                ProductCompareQuery.getRemoveProductsFromCompareList(
                    uid,
                    [productId],
                ),
            );

            this.dispatch(setCompareList(removeProductsFromCompareList));
            this.dispatch(showNotification(NotificationType.SUCCESS, __('Product is removed from the compare list')));

            return removeProductsFromCompareList;
        } catch (error) {
            this.dispatch(showNotification(
                NotificationType.SUCCESS,
                __('Unable to remove product from the compare list'),
                error,
            ));

            return null;
        }
    }

    async fetchCustomersList(): Promise<void> {
        const {
            createCompareList,
            createCompareList: {
                uid,
            },
        } = await fetchMutation(
            ProductCompareQuery.getCreateEmptyCompareList(),
        );

        if (!getAuthorizationToken()) {
            return;
        }

        if (uid) {
            setUid(uid);
        }

        this.dispatch(setCompareList(createCompareList));
    }

    async assignCompareList(): Promise<boolean> {
        const uid = getUid();

        if (!uid) {
            await this.fetchCustomersList();

            return false;
        }

        removeUid();

        try {
            const {
                assignCompareListToCustomer: {
                    result,
                    compare_list,
                    compare_list: {
                        uid: newUid = '',
                    } = {},
                },
            } = await fetchMutation(
                ProductCompareQuery.getAssignCompareList(uid),
            );

            if (!getAuthorizationToken()) {
                return false;
            }

            if (result) {
                setUid(newUid);
                this.dispatch(setCompareList(compare_list));
            }

            return result;
        } catch (error) {
            this.dispatch(toggleLoader(false));

            return false;
        }
    }

    async clearComparedProducts(): Promise<Record<'deleteCompareList', { result: boolean }> | null> {
        const uid = getUid();

        if (!uid) {
            return null;
        }

        this.dispatch(toggleLoader(true));

        try {
            const result = await fetchMutation(
                ProductCompareQuery.getDeleteCompareList(uid),
            );

            removeUid();
            this.dispatch(clearComparedProducts());
            this.dispatch(showNotification(NotificationType.SUCCESS, __('Compare list is cleared')));
            this.dispatch(toggleLoader(false));

            return result;
        } catch (error) {
            this.dispatch(toggleLoader(false));
            this.dispatch(showNotification(NotificationType.ERROR, __('Unable to clear product compare list'), error));

            return null;
        }
    }

    async updateInitialProductCompareData(): Promise<boolean> {
        const uid = getUid();

        if (!uid) {
            return false;
        }

        this.dispatch(toggleLoader(true));

        try {
            const { compareList } = await fetchQuery(
                ProductCompareQuery.getCompareListIds(uid),
            );
            const { items = [] } = compareList || {};
            const compareIds = items.map((data) => data?.product?.id);

            this.dispatch(toggleLoader(false));
            this.dispatch(setCompareListIds(compareIds));
            this.dispatch(updateCompareTotals(compareIds.length));
        } catch (error) {
            this.dispatch(toggleLoader(false));
            this.dispatch(showNotification(NotificationType.ERROR, __('Unable to fetch compare list'), error));

            return false;
        }

        return true;
    }

    resetComparedProducts(): void {
        this.dispatch(clearComparedProducts());
    }
}

export default new ProductCompareDispatcher();
