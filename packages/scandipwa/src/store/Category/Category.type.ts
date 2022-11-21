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

import { Category } from 'Query/Category.type';

export enum CategoryActionType {
    UPDATE_CATEGORY_STORE = 'UPDATE_CATEGORY_STORE',
}

export interface UpdateCategoryStore extends AnyAction {
    type: CategoryActionType.UPDATE_CATEGORY_STORE;
    state: Partial<CategoryStore>;
}

export interface CategoryStore {
    category: Partial<Category>;
    breadcrumbsWereUpdated: boolean;
    currentCategoryIds: number;
    selectedFilters: Record<string, string[]>;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        CategoryReducer: CategoryStore;
    }
}

export interface CategoryDispatcherData {
    category: Category;
}
