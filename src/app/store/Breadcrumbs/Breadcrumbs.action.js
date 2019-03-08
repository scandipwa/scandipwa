export const UPDATE_BREADCRUMBS = 'UPDATE_BREADCRUMBS';
export const TOGGLE_BREADCRUMBS = 'TOGGLE_BREADCRUMBS';

/**
 * Update current breadcrumbs with new breadcrumbs (rewrite if already exists).
 * @param  {Array<Object>} breadcrumbs List of breadcrumbs
 * @return {void}
 */
const updateBreadcrumbs = breadcrumbs => ({
    type: UPDATE_BREADCRUMBS,
    breadcrumbs
});

/**
 * Toggle breadcrumbs display/hide
 * @param  {Boolean} areBreadcrumbsVisible
 * @return {void}
 */
const toggleBreadcrumbs = areBreadcrumbsVisible => ({
    type: TOGGLE_BREADCRUMBS,
    areBreadcrumbsVisible
});

export { updateBreadcrumbs, toggleBreadcrumbs };
