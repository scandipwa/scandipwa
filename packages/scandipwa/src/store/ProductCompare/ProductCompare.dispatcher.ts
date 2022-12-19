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
import { ComparableProduct, CompareList } from 'Query/ProductCompare.type';
import { NotificationType } from 'Store/Notification/Notification.type';
import { updateProductCompareStore } from 'Store/ProductCompare/ProductCompare.action';
import { getAuthorizationToken } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { getUid, removeUid, setUid } from 'Util/Compare';
import { fetchMutation, fetchQuery } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { COMPARE_LIST_PRODUCTS } from './ProductCompare.reducer';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

/** @namespace Store/ProductCompare/Dispatcher */
export class ProductCompareDispatcher extends SimpleDispatcher {
    async getCompareList(): Promise<boolean> {
        const uid = getUid() || '';

        if (!uid) {
            return false;
        }

        this.dispatch(updateProductCompareStore({ isLoading: true }));

        try {
            const { compareList } = await fetchQuery(
                ProductCompareQuery.getCompareList(uid),
            );

            this.dispatch(updateProductCompareStore({ isLoading: false }));
            this.setCompareList(compareList);
        } catch (error) {
            this.dispatch(updateProductCompareStore({ isLoading: false }));
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    __('Unable to fetch compare list'),
                    error,
                ),
            );

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

            this.setCompareList(result);
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.SUCCESS,
                    __('Product is added to the compare list'),
                ),
            );

            return result;
        } catch (error) {
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    __('Unable to add product to the compare list'),
                    error,
                ),
            );

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

            this.setCompareList(removeProductsFromCompareList);
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.SUCCESS,
                    __('Product is removed from the compare list'),
                ),
            );

            return removeProductsFromCompareList;
        } catch (error) {
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.SUCCESS,
                    __('Unable to remove product from the compare list'),
                    error,
                ),
            );

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

        this.setCompareList(createCompareList);
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
                this.setCompareList(compare_list);
            }

            return result;
        } catch (error) {
            this.dispatch(updateProductCompareStore({ isLoading: false }));

            return false;
        }
    }

    async clearComparedProducts(): Promise<Record<'deleteCompareList', { result: boolean }> | null> {
        const uid = getUid();

        if (!uid) {
            return null;
        }

        this.dispatch(updateProductCompareStore({ isLoading: true }));

        try {
            const result = await fetchMutation(
                ProductCompareQuery.getDeleteCompareList(uid),
            );

            removeUid();
            this.resetComparedProducts();
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.SUCCESS,
                    __('Compare list is cleared'),
                ),
            );
            this.dispatch(updateProductCompareStore({ isLoading: false }));

            return result;
        } catch (error) {
            this.dispatch(updateProductCompareStore({ isLoading: false }));
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    __('Unable to clear product compare list'),
                    error,
                ),
            );

            return null;
        }
    }

    async updateInitialProductCompareData(): Promise<boolean> {
        const uid = getUid();

        if (!uid) {
            return false;
        }

        this.dispatch(updateProductCompareStore({ isLoading: true }));

        try {
            const { compareList } = await fetchQuery(
                ProductCompareQuery.getCompareListIds(uid),
            );
            const { items = [] } = compareList || {};
            const compareIds = items.map((data) => data?.product?.id);

            this.dispatch(updateProductCompareStore({ isLoading: false, count: compareIds.length }));
            this.updateCompareListIds(compareIds);
        } catch (error) {
            this.dispatch(updateProductCompareStore({ isLoading: false }));
            NotificationDispatcher.then(
                ({ default: dispatcher }) => dispatcher.showNotification(
                    NotificationType.ERROR,
                    __('Unable to fetch compare list'),
                    error,
                ),
            );

            return false;
        }

        return true;
    }

    updateCompareListIds(productIds: number[]) {
        BrowserDatabase.setItem(
            productIds,
            COMPARE_LIST_PRODUCTS,
        );

        this.dispatch(updateProductCompareStore({ productIds }));
    }

    resetComparedProducts() {
        BrowserDatabase.setItem(
            [],
            COMPARE_LIST_PRODUCTS,
        );

        this.dispatch(updateProductCompareStore({
            count: 0,
            products: [],
            productIds: [],
            items: [],
            attributes: [],
        }));
    }

    setCompareList({ item_count = 0, items = [], attributes = [] }: CompareList) {
        const products = items.map((item): ComparableProduct => ({
            ...(item?.product || {}),
            attributes: [],
        }));
        const productIds = products.map((product) => product.id);

        BrowserDatabase.setItem(
            productIds,
            COMPARE_LIST_PRODUCTS,
        );

        this.dispatch(updateProductCompareStore({
            count: item_count,
            attributes,
            products,
            productIds,
            items,
        }));
    }
}

export default new ProductCompareDispatcher();
