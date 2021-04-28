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
    prepareReviewData(reviewItem) {
        const {
            rating_data,
            product_sku,
            detail,
            title,
            nickname
        } = reviewItem;

        return {
            nickname,
            sku: product_sku,
            summary: title,
            text: detail,
            ratings: Object.keys(rating_data).map(
                (key) => ({
                    id: key,
                    value_id: rating_data[key]
                })
            )
        };
    }

    submitProductReview(dispatch, options) {
        return fetchMutation(ReviewQuery.getAddProductReviewMutation(
            this.prepareReviewData(options)
        )).then(
            /** @namespace Store/Review/Dispatcher/submitProductReviewFetchMutationThen */
            () => dispatch(showNotification('success', 'You submitted your review for moderation.')),
            /** @namespace Store/Review/Dispatcher/submitProductReviewFetchMutationError */
            () => dispatch(showNotification('error', __('Error submitting review!')))
        );
    }
}

export default new ReviewDispatcher();
