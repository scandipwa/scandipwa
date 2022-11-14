/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */
import { AnyAction } from 'redux';

import { Url } from 'Type/Common.type';

export interface Breadcrumb {
    url?: Url | string;
    name: string;
}

export interface CategoryBreadcrumb {
    category_level: number;
    category_url: string;
    category_name: string;
    category_is_active: boolean;
}

export interface Category {
    id: number | string;
    url: string;
    name: string;
    breadcrumbs: CategoryBreadcrumb[];
}

export interface Product {
    name: string;
    url: Url;
    categories: Category[];
}

export enum BreadcrumbsActionType {
    UPDATE_BREADCRUMBS = 'UPDATE_BREADCRUMBS',
    TOGGLE_BREADCRUMBS = 'TOGGLE_BREADCRUMBS',
    UPDATE_BREADCRUMBS_STORE = 'UPDATE_BREADCRUMBS_STORE',
}

export interface UpdateBreadcrumbsActionStore extends AnyAction {
    type: BreadcrumbsActionType.UPDATE_BREADCRUMBS_STORE;
    state: Partial<BreadcrumbsStore>;
}

export type BreadcrumbsAction = UpdateBreadcrumbsActionStore;

export interface BreadcrumbsStore {
    breadcrumbs: Breadcrumb[];
    areBreadcrumbsVisible: boolean;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        BreadcrumbsReducer: BreadcrumbsStore;
    }
}
