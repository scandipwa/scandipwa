export const UPDATE_CMS_PAGE = 'UPDATE_CMS_PAGE';
export const UPDATE_LOAD_STATUS = 'UPDATE_LOAD_STATUS';

/**
 * Update CMS Page information
 * @param {String} urlKey URL Key of the page that must be returned
 */
const updateCmsPage = page => ({
    type: UPDATE_CMS_PAGE,
    page
});

export { updateCmsPage };
