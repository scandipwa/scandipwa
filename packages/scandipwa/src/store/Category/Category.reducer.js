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

import { UPDATE_CURRENT_CATEGORY } from './Category.action';

/** @namespace Store/Category/Reducer/getInitialState */
export const getInitialState = () => ({
    category: {}
});

/** @namespace Store/Category/Reducer/CategoryReducer */
export const CategoryReducer = (
    state = getInitialState(),
    { type, category }
) => {
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
