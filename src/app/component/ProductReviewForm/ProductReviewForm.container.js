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

import { connect } from 'react-redux';
import { ProductDispatcher } from 'Store/Product';
import { showNotification } from 'Store/Notification';
import ProductReviewForm from './ProductReviewForm.component';

const mapDispatchToProps = dispatch => ({
    addReview: options => ProductDispatcher.submitProductReview(dispatch, options),

    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

const ProductReviewFormContainer = connect(null, mapDispatchToProps)(ProductReviewForm);

export default ProductReviewFormContainer;
