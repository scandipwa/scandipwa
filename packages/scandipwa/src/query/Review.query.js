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

import { Field } from 'Util/Query';

/** @namespace Query/Review */
export class ReviewQuery {
    getAddProductReviewMutation(reviewItem) {
        return new Field('createProductReview')
            .setAlias('addProductReview')
            .addArgument('input', 'CreateProductReviewInput!', reviewItem)
            .addField(new Field('review').addField('nickname'));
    }

    getRatingQuery() {
        return new Field('productReviewRatingsMetadata')
            .setAlias('reviewRatings')
            .addFieldList(this._getRatingFields());
    }

    _getRatingFields() {
        return [
            this._getRatingItemsField()
        ];
    }

    _getRatingItemsField() {
        return new Field('items')
            .addFieldList(this._getRatingItemsFields());
    }

    _getRatingItemsFields() {
        return [
            new Field('id').setAlias('rating_id'),
            new Field('name').setAlias('rating_code'),
            this._getRatingOptionsField()
        ];
    }

    _getRatingOptionFields() {
        return [
            new Field('value_id').setAlias('option_id'),
            'value'
        ];
    }

    _getRatingOptionsField() {
        return new Field('values')
            .setAlias('rating_options')
            .addFieldList(this._getRatingOptionFields());
    }
}

export default new ReviewQuery();
