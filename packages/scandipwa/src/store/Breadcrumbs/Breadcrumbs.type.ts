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
import { AnyAction } from 'redux';

import { Breadcrumb } from 'Type/Breadcrumbs.type';

export enum BreadcrumbsActionType {
    UPDATE_BREADCRUMBS = 'UPDATE_BREADCRUMBS',
    TOGGLE_BREADCRUMBS = 'TOGGLE_BREADCRUMBS'
}

export interface ToggleBreadcrumbsAction extends AnyAction {
    type: BreadcrumbsActionType.TOGGLE_BREADCRUMBS;
    areBreadcrumbsVisible: boolean;
}

export interface UpdateBreadcrumbsAction extends AnyAction {
    type: BreadcrumbsActionType.UPDATE_BREADCRUMBS;
    breadcrumbs: Breadcrumb[];
}

export type BreadcrumbsAction = ToggleBreadcrumbsAction | UpdateBreadcrumbsAction;

export type BreadcrumbsStore = {
    breadcrumbs: Breadcrumb[];
    areBreadcrumbsVisible: boolean;
};

declare module 'Util/Store/Store.type' {
    export interface RootState {
        BreadcrumbsReducer: BreadcrumbsStore;
    }
}
