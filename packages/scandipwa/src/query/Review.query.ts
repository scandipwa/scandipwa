/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Field, Mutation, Query } from '@tilework/opus';

import { GQLCreateProductReviewInput } from 'Type/Graphql.type';

import {
    CreateProductReviewOutput,
    ReviewRatingItem,
    ReviewRatingValue
} from './Review.type';

/** @namespace Query/Review/Query */
export class ReviewQuery {
    getAddProductReviewMutation(
        reviewItem: GQLCreateProductReviewInput
    ): Mutation<'addProductReview', CreateProductReviewOutput> {
        return new Mutation<'createProductReview', CreateProductReviewOutput>('createProductReview')
            .setAlias('addProductReview')
            .addArgument('input', 'CreateProductReviewInput!', reviewItem)
            .addField(new Field('review').addField('nickname'));
    }

    getRatingQuery(): Query<'reviewRatings', { items: ReviewRatingItem[] }> {
        return new Query<'productReviewRatingsMetadata', { items: ReviewRatingItem[] }>(
            'productReviewRatingsMetadata'
        )
            .setAlias('reviewRatings')
            .addFieldList(this._getRatingFields());
    }

    _getRatingFields(): Field<'items', ReviewRatingItem, true>[] {
        return [
            this._getRatingItemsField()
        ];
    }

    _getRatingItemsField(): Field<'items', ReviewRatingItem, true> {
        return new Field<'items', ReviewRatingItem, true>('items', true)
            .addFieldList(this._getRatingItemsFields());
    }

    _getRatingItemsFields(): Array<
    Field<'rating_id', number>
    | Field<'rating_code', string>
    | Field<'rating_options', ReviewRatingValue, true>
    > {
        return [
            new Field<'id', number>('id').setAlias('rating_id'),
            new Field<'name', string>('name').setAlias('rating_code'),
            this._getRatingOptionsField()
        ];
    }

    _getRatingOptionFields(): Array<
    Field<'option_id', string>
    | Field<'value', string>
    > {
        return [
            new Field<'value_id', string>('value_id').setAlias('option_id'),
            new Field<'value', string>('value')
        ];
    }

    _getRatingOptionsField(): Field<'rating_options', ReviewRatingValue, true> {
        return new Field<'values', ReviewRatingValue, true>('values', true)
            .setAlias('rating_options')
            .addFieldList(this._getRatingOptionFields());
    }
}

export default new ReviewQuery();
