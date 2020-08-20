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

import ReviewQuery from 'Query/Review.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { fetchMutation } from 'Util/Request';

/**
 * Product Review Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Review/Dispatcher
 */
export class ReviewDispatcher {
    prepareRatingData(reviewItem) {
        const { rating_data } = reviewItem;

        return Object.keys(rating_data).map(
            (key) => ({
                rating_id: +key,
                option_id: rating_data[key]
            })
        );
    }

    submitProductReview(dispatch, options) {
        const reviewItem = options;

        reviewItem.rating_data = this.prepareRatingData(reviewItem);

        return fetchMutation(ReviewQuery.getAddProductReviewMutation(
            reviewItem
        )).then(
            /** @namespace Store/Review/Dispatcher/submitProductReviewFetchMutationThen */
            () => dispatch(showNotification('success', 'You submitted your review for moderation.')),
            /** @namespace Store/Review/Dispatcher/submitProductReviewFetchMutationError */
            // eslint-disable-next-line no-console
            (error) => dispatch(showNotification('error', 'Error submitting review!')) && console.log(error)
        );
    }
}

export default new ReviewDispatcher();
