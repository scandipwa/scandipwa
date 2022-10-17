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

import {
    Breadcrumb,
    BreadcrumbsActionType,
    ToggleBreadcrumbsAction,
    UpdateBreadcrumbsAction,
} from './Breadcrumbs.type';

/**
 * Update current breadcrumbs with new breadcrumbs (rewrite if already exists).
 * @param  {Array<Object>} breadcrumbs List of breadcrumbs
 * @return {void}
 * @namespace Store/Breadcrumbs/Action/updateBreadcrumbs
 */
export const updateBreadcrumbs = (breadcrumbs: Breadcrumb[]): UpdateBreadcrumbsAction => ({
    type: BreadcrumbsActionType.UPDATE_BREADCRUMBS,
    breadcrumbs,
});

/**
 * Toggle breadcrumbs display/hide
 * @param  {Boolean} areBreadcrumbsVisible
 * @return {void}
 * @namespace Store/Breadcrumbs/Action/toggleBreadcrumbs
 */
export const toggleBreadcrumbs = (areBreadcrumbsVisible: boolean): ToggleBreadcrumbsAction => ({
    type: BreadcrumbsActionType.TOGGLE_BREADCRUMBS,
    areBreadcrumbsVisible,
});
