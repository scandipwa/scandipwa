/* eslint-disable import/prefer-default-export */
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
    CategoryActionType,
    CategoryStore,
    UpdateCategoryStore,
} from './Category.type';

/**
 * Update Current Category
 * @param {String} categoryUrlPath url path Main Category object
 * @return {void}
 * @namespace Store/Category/Action/updateCategoryStore */
export const updateCategoryStore = (
    state: Partial<CategoryStore>,
): UpdateCategoryStore => ({
    type: CategoryActionType.UPDATE_CATEGORY_STORE,
    state,
});
