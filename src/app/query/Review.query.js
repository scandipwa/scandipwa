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

export class ReviewQuery {
    getAddProductReviewMutation(reviewItem) {
        return new Field('addProductReview')
            .addArgument('productReviewItem', 'ProductReviewInput!', reviewItem)
            .addFieldList(this._getAddProductReviewFields());
    }

    getRatingQuery() {
        return new Field('getRatings')
            .setAlias('reviewRatings')
            .addFieldList(this._getRatingFields());
    }

    _getRatingFields() {
        return [
            'rating_id',
            'rating_code',
            this._getRatingOptionsField()
        ];
    }

    _getAddProductReviewFields() {
        return [
            'detail'
        ];
    }

    _getRatingOptionFields() {
        return [
            'option_id',
            'value'
        ];
    }

    _getRatingOptionsField() {
        return new Field('rating_options')
            .addFieldList(this._getRatingOptionFields());
    }
}

export default new ReviewQuery();
