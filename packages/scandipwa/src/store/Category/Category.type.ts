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
    UPDATE_CURRENT_CATEGORY = 'UPDATE_CURRENT_CATEGORY',
    SET_SCROLL_POSITION = 'SET_SCROLL_POSITION',
}

export interface UpdateCurrentCategoryAction extends AnyAction {
    type: CategoryActionType.UPDATE_CURRENT_CATEGORY;
    category?: Partial<Category>;
}

export interface SetScrollPositionyAction extends AnyAction {
    type: CategoryActionType.SET_SCROLL_POSITION;
    payload: number;
}

export type CategoryAction = UpdateCurrentCategoryAction | SetScrollPositionyAction;

export interface CategoryStore {
    category: Partial<Category>;
    scrollPosition: number;
}

declare module 'Util/Store/Store.type' {
    export interface RootState {
        CategoryReducer: CategoryStore;
    }
}

export interface CategoryDispatcherData {
    category: Category;
}
