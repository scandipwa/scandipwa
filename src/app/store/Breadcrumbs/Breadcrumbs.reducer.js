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

import { UPDATE_BREADCRUMBS, TOGGLE_BREADCRUMBS } from './Breadcrumbs.action';

export const getInitialState = () => ({
    breadcrumbs: [],
    areBreadcrumbsVisible: true
});

export const BreadcrumbsReducer = (
    state = middleware(getInitialState, 'Store/Breadcrumbs/Reducer/getInitialState')(),
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

export default middleware(BreadcrumbsReducer, 'Store/Breadcrumbs/Reducer');
