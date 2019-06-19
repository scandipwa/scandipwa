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

export const UPDATE_REVIEW_RATINGS = 'UPDATE_REVIEW_RATINGS';

/**
 * Update review ratings
 * @param  {Array} reviewRatings List of review ratings returned from fetch
 * @return {void}
 */
const updateReviewRatings = reviewRatings => ({
    type: UPDATE_REVIEW_RATINGS,
    reviewRatings
});

export { updateReviewRatings };
