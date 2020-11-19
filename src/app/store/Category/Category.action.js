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

export const UPDATE_CURRENT_CATEGORY = 'UPDATE_CURRENT_CATEGORY';

/**
 * Update Current Category
 * @param {String} categoryUrlPath url path Main Category object
 * @return {void}
 * @namespace Store/Category/Action/updateCurrentCategory
 */
export const updateCurrentCategory = (category) => ({
    type: UPDATE_CURRENT_CATEGORY,
    category
});
