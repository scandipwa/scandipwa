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

import { UPDATE_CURRENT_CATEGORY } from './Category.action';

export const initialState = {
    category: {}
};

export const CategoryReducer = (state = initialState, { type, category }) => {
    switch (type) {
    case UPDATE_CURRENT_CATEGORY:
        return {
            ...state,
            category: { ...category }
        };

    default:
        return state;
    }
};

export default CategoryReducer;
