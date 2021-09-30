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

import { Action, Reducer } from 'redux';

import { Breadcrumbs } from 'Type/Breadcrumbs';

import { TOGGLE_BREADCRUMBS, UPDATE_BREADCRUMBS } from './Breadcrumbs.action';

export interface BreadcrumbsStore {
    breadcrumbs: Breadcrumbs
    areBreadcrumbsVisible: boolean
}

declare module 'Util/Store/type' {
    export interface RootState {
        BreadcrumbsReducer: BreadcrumbsStore
    }
}

/** @namespace Store/Breadcrumbs/Reducer/getInitialState */
export const getInitialState = (): BreadcrumbsStore => ({
    breadcrumbs: [],
    areBreadcrumbsVisible: true
});

/** @namespace Store/Breadcrumbs/Reducer/BreadcrumbsReducer */
export const BreadcrumbsReducer: Reducer<
    BreadcrumbsStore,
    Action<typeof TOGGLE_BREADCRUMBS | typeof UPDATE_BREADCRUMBS> & BreadcrumbsStore
> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case UPDATE_BREADCRUMBS:
        const { breadcrumbs } = action;

        return {
            ...state,
            breadcrumbs
        };

    case TOGGLE_BREADCRUMBS:
        const { areBreadcrumbsVisible } = action;

        return {
            ...state,
            areBreadcrumbsVisible
        };

    default:
        return state;
    }
};
