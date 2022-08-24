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

import { Reducer } from 'redux';

import {
    BreadcrumbsAction,
    BreadcrumbsActionType, BreadcrumbsStore
} from './Breadcrumbs.type';

/** @namespace Store/Breadcrumbs/Reducer/getInitialState */
export const getInitialState = (): BreadcrumbsStore => ({
    breadcrumbs: [],
    areBreadcrumbsVisible: true
});

/** @namespace Store/Breadcrumbs/Reducer/BreadcrumbsReducer */
export const BreadcrumbsReducer: Reducer<
BreadcrumbsStore,
BreadcrumbsAction
> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case BreadcrumbsActionType.UPDATE_BREADCRUMBS:
        const { breadcrumbs = [] } = action;

        return {
            ...state,
            breadcrumbs
        };

    case BreadcrumbsActionType.TOGGLE_BREADCRUMBS:
        const { areBreadcrumbsVisible = false } = action;

        return {
            ...state,
            areBreadcrumbsVisible
        };

    default:
        return state;
    }
};

export default BreadcrumbsReducer;
