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

import { UPDATE_REVIEW_RATINGS } from './Review.action';

const initialState = {
    reviewRatings: []
};

const ReviewReducer = (state = initialState, action) => {
    switch (action.type) {
    case UPDATE_REVIEW_RATINGS:

        return {
            ...state,
            reviewRatings: action.reviewRatings
        };

    default:
        return state;
    }
};

export default ReviewReducer;
