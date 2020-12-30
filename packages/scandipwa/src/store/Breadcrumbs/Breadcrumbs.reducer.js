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

import { TOGGLE_BREADCRUMBS, UPDATE_BREADCRUMBS } from './Breadcrumbs.action';

/** @namespace Store/Breadcrumbs/Reducer/getInitialState */
export const getInitialState = () => ({
    breadcrumbs: [],
    areBreadcrumbsVisible: true
});

/** @namespace Store/Breadcrumbs/Reducer */
export const BreadcrumbsReducer = (
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

export default BreadcrumbsReducer;
