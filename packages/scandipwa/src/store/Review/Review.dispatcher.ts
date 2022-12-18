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

import ReviewQuery from 'Query/Review.query';
import { NotificationType } from 'Store/Notification/Notification.type';
import { GQLCreateProductReviewInput } from 'Type/Graphql.type';
import { fetchMutation } from 'Util/Request';
import { SimpleDispatcher } from 'Util/Store/SimpleDispatcher';

import { ReviewItem } from './Review.type';

export const NotificationDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Notification/Notification.dispatcher'
);

/**
 * Product Review Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Review/Dispatcher
 */
export class ReviewDispatcher extends SimpleDispatcher {
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

    async submitProductReview(options: ReviewItem): Promise<void> {
        await fetchMutation(ReviewQuery.getAddProductReviewMutation(this.prepareReviewData(options)));
        NotificationDispatcher.then(
            ({ default: dispatcher }) => dispatcher.showNotification(
                NotificationType.SUCCESS,
                'You submitted your review for moderation.',
            ),
        );
    }
}

export default new ReviewDispatcher();
