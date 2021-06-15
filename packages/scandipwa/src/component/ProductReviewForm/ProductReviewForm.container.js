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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { customerType } from 'Type/Account';
import { ProductType } from 'Type/ProductList';
import { RatingItemsType } from 'Type/Rating';

import ProductReviewForm from './ProductReviewForm.component';

export const ReviewDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Review/Review.dispatcher'
);

/** @namespace Component/ProductReviewForm/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    customer: state.MyAccountReducer.customer,
    reviewRatings: state.ConfigReducer.reviewRatings
});

/** @namespace Component/ProductReviewForm/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    addReview: (options) => ReviewDispatcher.then(
        ({ default: dispatcher }) => dispatcher.submitProductReview(dispatch, options)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE))
});

/** @namespace Component/ProductReviewForm/Container */
export class ProductReviewFormContainer extends PureComponent {
    static propTypes = {
        showNotification: PropTypes.func.isRequired,
        goToPreviousHeaderState: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        reviewRatings: RatingItemsType.isRequired,
        product: ProductType.isRequired,
        addReview: PropTypes.func.isRequired,
        customer: customerType.isRequired
    };

    containerFunctions = ({
        onReviewSubmitAttempt: this._onReviewSubmitAttempt.bind(this),
        onReviewSubmitSuccess: this._onReviewSubmitSuccess.bind(this),
        onStarRatingClick: this._onStarRatingClick.bind(this),
        handleNicknameChange: this._handleFieldChange.bind(this, 'nickname'),
        handleSummaryChange: this._handleFieldChange.bind(this, 'summary'),
        handleDetailChange: this._handleFieldChange.bind(this, 'detail'),
        onReviewError: this._onReviewError.bind(this)
    });

    __construct(props) {
        super.__construct(props);

        const { customer: { firstname: nickname } } = this.props;
        const reviewData = { nickname };

        this.state = {
            isLoading: false,
            ratingData: {},
            reviewData,
            isSubmitted: false
        };
    }

    _onReviewError(_, invalidFields) {
        const { showNotification } = this.props;
        const reviewsAreNotValid = invalidFields;

        if (reviewsAreNotValid) {
            showNotification('info', __('Incorrect data! Please check review fields.'));
        }

        this.setState({ isLoading: !reviewsAreNotValid });
    }

    _onReviewSubmitAttempt() {
        const { showNotification, reviewRatings } = this.props;
        const { ratingData, isSubmitted } = this.state;
        const reviewsAreNotValid = !reviewRatings.every(({ rating_id }) => ratingData[rating_id]);

        if (reviewsAreNotValid) {
            showNotification('info', __('Please fill all rating fields.'));
        }

        this.setState({ isSubmitted: !isSubmitted, isLoading: !reviewsAreNotValid });
    }

    _onReviewSubmitSuccess(fields) {
        const {
            product,
            addReview,
            hideActiveOverlay,
            goToPreviousHeaderState
        } = this.props;

        const { ratingData: rating_data, isLoading } = this.state;

        const {
            nickname,
            title,
            detail
        } = fields;

        const { sku: product_sku } = product;

        if (Object.keys(rating_data).length && isLoading) {
            addReview({
                nickname,
                title,
                detail,
                product_sku,
                rating_data
            }).then(
                /** @namespace Component/ProductReviewForm/Container/addReviewThen */
                (success) => {
                    if (success) {
                        this.setState({
                            ratingData: {},
                            reviewData: {},
                            isLoading: false
                        });

                        goToPreviousHeaderState();
                        hideActiveOverlay();

                        return;
                    }

                    this.setState({ isLoading: false });
                }
            );
        }
    }

    _onStarRatingClick(rating_id, option_id) {
        this.setState(({ ratingData }) => ({
            ratingData: { ...ratingData, [rating_id]: option_id }
        }));
    }

    _handleFieldChange(fieldName, value) {
        this.setState(({ reviewData }) => ({
            reviewData: { ...reviewData, [fieldName]: value }
        }));
    }

    render() {
        return (
            <ProductReviewForm
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewFormContainer);
