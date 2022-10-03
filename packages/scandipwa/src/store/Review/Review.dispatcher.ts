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

import { Dispatch } from 'redux';

import ReviewQuery from 'Query/Review.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { GQLCreateProductReviewInput } from 'Type/Graphql.type';
import { fetchMutation } from 'Util/Request';

import { ReviewItem } from './Review.type';

/**
 * Product Review Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Review/Dispatcher
 */
export class ReviewDispatcher {
    prepareReviewData(reviewItem: ReviewItem): GQLCreateProductReviewInput {
        const {
            rating_data,
            product_sku,
            detail,
            title,
            nickname,
        } = reviewItem;

        return {
            nickname,
            sku: product_sku,
            summary: title,
            text: detail,
            ratings: Object.keys(rating_data).map(
                (key) => ({
                    id: key,
                    value_id: rating_data[ key ],
                }),
            ),
        };
    }

    async submitProductReview(dispatch: Dispatch, options: ReviewItem): Promise<void> {
        await fetchMutation(ReviewQuery.getAddProductReviewMutation(this.prepareReviewData(options)));
        dispatch(showNotification(NotificationType.SUCCESS, 'You submitted your review for moderation.'));
    }
}

export default new ReviewDispatcher();
