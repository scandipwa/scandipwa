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
import { Action } from 'redux';

import { Breadcrumbs } from 'Type/Breadcrumbs.type';

import { TOGGLE_BREADCRUMBS, UPDATE_BREADCRUMBS } from './Breadcrumbs.action';

export type BreadcrumbsStore = {
    breadcrumbs: Breadcrumbs;
    areBreadcrumbsVisible: boolean;
};

export type BreadcrumbsAction = Action<typeof TOGGLE_BREADCRUMBS | typeof UPDATE_BREADCRUMBS>;

declare module 'Util/Store/type' {
    export interface RootState {
        BreadcrumbsReducer: BreadcrumbsStore;
    }
}
