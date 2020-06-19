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

export const getInitialState = () => ({
    category: {
        isLoading: true
    }
});

export const CategoryReducer = (
    state = middleware(getInitialState, 'Store/Category/Reducer/getInitialState')(),
    { type, category }
) => {
    switch (type) {
    case UPDATE_CURRENT_CATEGORY:
        return {
            ...state,
            category: {
                isLoading: false,
                ...category
            }
        };

    default:
        return state;
    }
};

export default middleware(CategoryReducer, 'Store/Category/Reducer');
