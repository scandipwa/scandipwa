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

import BreadcrumbsReducer from './Breadcrumbs.reducer';
import BreadcrumbsDispatcher, { BreadcrumbsDispatcher as BreadcrumbsDispatcherClass } from './Breadcrumbs.dispatcher';
import {
    UPDATE_BREADCRUMBS,
    TOGGLE_BREADCRUMBS,
    toggleBreadcrumbs,
    updateBreadcrumbs
} from './Breadcrumbs.action';

export {
    BreadcrumbsReducer,
    BreadcrumbsDispatcher,
    BreadcrumbsDispatcherClass,
    UPDATE_BREADCRUMBS,
    TOGGLE_BREADCRUMBS,
    toggleBreadcrumbs,
    updateBreadcrumbs
};
