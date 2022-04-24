/* eslint-disable import/prefer-default-export */
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

import { Category } from 'Query/Category.type';

import {
    CategoryActionType,
    UpdateCurrentCategoryAction
} from './Category.type';

/**
 * Update Current Category
 * @param {String} categoryUrlPath url path Main Category object
 * @return {void}
 * @namespace Store/Category/Action/updateCurrentCategory
 */
export const updateCurrentCategory = (
    category: Partial<Category>
): UpdateCurrentCategoryAction => ({
    type: CategoryActionType.UPDATE_CURRENT_CATEGORY,
    category
});
