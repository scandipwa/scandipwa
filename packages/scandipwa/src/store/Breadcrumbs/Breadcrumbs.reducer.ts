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

import { BreadcrumbsActionType, BreadcrumbsStore } from './Breadcrumbs.type';

/** @namespace Store/Breadcrumbs/Reducer/getInitialState */
export const getInitialState = (): BreadcrumbsStore => ({
    breadcrumbs: [],
    areBreadcrumbsVisible: true,
});

/** @namespace Store/Breadcrumbs/Reducer/BreadcrumbsReducer */
export const BreadcrumbsReducer: Reducer<
BreadcrumbsStore
> = (
    state = getInitialState(),
    action,
) => {
    const { state: newState, type } = action;

    if (BreadcrumbsActionType.UPDATE_BREADCRUMBS_STORE !== type) {
        return state;
    }

    return {
        ...state,
        ...newState,
    };
};

export default BreadcrumbsReducer;
