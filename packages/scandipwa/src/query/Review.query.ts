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

import { Field, Mutation, Query } from '@tilework/opus';

import {
    GQLCreateProductReviewInput,
    GQLCreateProductReviewOutput,
    GQLProductReviewRatingMetadata,
    GQLProductReviewRatingsMetadata,
    GQLProductReviewRatingValueMetadata
} from 'Type/Graphql.type';

import { CommonField } from './Query.type';

/** @namespace Query/Review/Query */
export class ReviewQuery {
    getAddProductReviewMutation(
        reviewItem: GQLCreateProductReviewInput
    ): Mutation<'addProductReview', GQLCreateProductReviewOutput> {
        return new Mutation<'createProductReview', GQLCreateProductReviewOutput>('createProductReview')
            .setAlias('addProductReview')
            .addArgument('input', 'CreateProductReviewInput!', reviewItem)
            .addField(new Field('review').addField('nickname'));
    }

    getRatingQuery(): Query<'reviewRatings', GQLProductReviewRatingsMetadata> {
        return new Query<'productReviewRatingsMetadata', GQLProductReviewRatingsMetadata>(
            'productReviewRatingsMetadata'
        )
            .setAlias('reviewRatings')
            .addFieldList(this._getRatingFields());
    }

    _getRatingFields(): CommonField[] {
        return [
            this._getRatingItemsField()
        ];
    }

    _getRatingItemsField(): Field<'items', GQLProductReviewRatingMetadata, true> {
        return new Field<'items', GQLProductReviewRatingMetadata, true>('items', true)
            .addFieldList(this._getRatingItemsFields());
    }

    _getRatingItemsFields(): CommonField[] {
        return [
            new Field('id').setAlias('rating_id'),
            new Field('name').setAlias('rating_code'),
            this._getRatingOptionsField()
        ];
    }

    _getRatingOptionFields(): CommonField[] {
        return [
            new Field('value_id').setAlias('option_id'),
            'value'
        ];
    }

    _getRatingOptionsField(): Field<'rating_options', GQLProductReviewRatingValueMetadata, true> {
        return new Field<'values', GQLProductReviewRatingValueMetadata, true>('values', true)
            .setAlias('rating_options')
            .addFieldList(this._getRatingOptionFields());
    }
}

export default new ReviewQuery();
