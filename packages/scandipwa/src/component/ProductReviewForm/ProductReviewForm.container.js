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
import { CustomerType } from 'Type/Account.type';
import { ProductType } from 'Type/ProductList.type';
import { RatingItemsType } from 'Type/Rating.type';
import transformToNameValuePair from 'Util/Form/Transform';
import { getErrorMessage } from 'Util/Request';

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
        customer: CustomerType.isRequired
    };

    containerFunctions = ({
        onReviewSubmitSuccess: this._onReviewSubmitSuccess.bind(this),
        onStarRatingClick: this._onStarRatingClick.bind(this),
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

    containerProps() {
        const { reviewRatings } = this.props;
        const {
            isLoading,
            ratingData,
            reviewData,
            isSubmitted
        } = this.state;

        return {
            isLoading,
            isSubmitted,
            ratingData,
            reviewData,
            reviewRatings
        };
    }

    _onReviewError(_, invalidFields) {
        const { showNotification } = this.props;
        const reviewsAreNotValid = invalidFields;

        if (reviewsAreNotValid) {
            showNotification('info', __('Please fill in all rating fields'));
        }

        this.setState({ isLoading: !reviewsAreNotValid });
    }

    async _onReviewSubmitSuccess(form, fields) {
        const {
            product,
            addReview,
            hideActiveOverlay,
            goToPreviousHeaderState,
            showNotification,
            reviewRatings
        } = this.props;

        const { ratingData: rating_data } = this.state;

        if (Object.keys(rating_data).length < Object.keys(reviewRatings).length) {
            showNotification('info', __('Please fill in all rating fields'));
            return;
        }

        this.setState({ isLoading: true });

        const {
            nickname,
            title,
            detail
        } = transformToNameValuePair(fields);

        const { sku: product_sku } = product;

        try {
            await addReview({
                nickname,
                title,
                detail,
                product_sku,
                rating_data
            });

            this.setState({
                ratingData: {},
                reviewData: {}
            });

            goToPreviousHeaderState();
            hideActiveOverlay();
        } catch (error) {
            showNotification('error', getErrorMessage(error));
        } finally {
            this.setState({ isLoading: false });
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
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewFormContainer);
