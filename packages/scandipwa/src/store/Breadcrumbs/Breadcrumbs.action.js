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

export const UPDATE_BREADCRUMBS = 'UPDATE_BREADCRUMBS';
export const TOGGLE_BREADCRUMBS = 'TOGGLE_BREADCRUMBS';

/**
 * Update current breadcrumbs with new breadcrumbs (rewrite if already exists).
 * @param  {Array<Object>} breadcrumbs List of breadcrumbs
 * @return {void}
 * @namespace Store/Breadcrumbs/Action/updateBreadcrumbs
 */
export const updateBreadcrumbs = (breadcrumbs) => ({
    type: UPDATE_BREADCRUMBS,
    breadcrumbs
});

/**
 * Toggle breadcrumbs display/hide
 * @param  {Boolean} areBreadcrumbsVisible
 * @return {void}
 * @namespace Store/Breadcrumbs/Action/toggleBreadcrumbs
 */
export const toggleBreadcrumbs = (areBreadcrumbsVisible) => ({
    type: TOGGLE_BREADCRUMBS,
    areBreadcrumbsVisible
});
