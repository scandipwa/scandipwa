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

import { fetchQuery, fetchMutation } from 'Util/Request';
import { updateReviewRatings } from 'Store/Review';
import { showNotification } from 'Store/Notification';
import { Review } from 'Query';

/**
 * Product Review Dispatcher
 * @class WishlistDispatcher
 */
class ReviewDispatcher {
    updateReviewRatings(dispatch) {
        return fetchQuery(Review.getRatingsQuery()).then(
            ({ getRatings }) => dispatch(updateReviewRatings(getRatings)),
            // eslint-disable-next-line no-console
            error => dispatch(showNotification('error', 'Error fetching review ratings!')) && console.log(error)
        );
    }

    submitProductReview(dispatch, options) {
        const reviewItem = options;

        return fetchMutation(Review.getAddProductReview(
            reviewItem
        )).then(
            () => dispatch(showNotification('success', 'You submitted your review for moderation.')),
            // eslint-disable-next-line no-console
            error => dispatch(showNotification('error', 'Error submitting review!')) && console.log(error)
        );
    }
}

export default new ReviewDispatcher();
