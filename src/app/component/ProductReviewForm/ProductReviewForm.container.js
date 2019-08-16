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
import { ReviewDispatcher } from 'Store/Review';
import { showNotification } from 'Store/Notification';
import ProductReviewForm from './ProductReviewForm.component';

const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer,
    isSignedIn: state.MyAccountReducer.isSignedIn,
    reviewRatings: state.ConfigReducer.reviewRatings
});

const mapDispatchToProps = dispatch => ({
    addReview: options => ReviewDispatcher.submitProductReview(dispatch, options),

    showNotification: (type, message) => dispatch(showNotification(type, message))
});

const ProductReviewFormContainer = connect(mapStateToProps, mapDispatchToProps)(ProductReviewForm);

export default ProductReviewFormContainer;
