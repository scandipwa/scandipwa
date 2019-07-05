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

class Review {
    getAddProductReview(reviewItem) {
        const mutation = new Field('addProductReview')
            .addArgument('productReviewItem', 'ProductReviewInput!', reviewItem)
            .addField('detail');

        return mutation;
    }

    getRatingDetails() {
        const ratingOptions = new Field('rating_options')
            .addFieldList(['option_id', 'value']);

        const query = new Field('getRatings')
            .setAlias('rating_details')
            .addFieldList(['rating_id', 'rating_code', ratingOptions]);

        return query;
    }
}

export default new Review();
