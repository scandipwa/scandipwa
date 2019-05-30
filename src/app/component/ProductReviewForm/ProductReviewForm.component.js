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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProductType } from 'Type/ProductList';
import { RatingItemsType } from 'Type/Rating';
import Field from 'Component/Field';
import Form from 'Component/Form';
import ContentWrapper from 'Component/ContentWrapper';
import TextPlaceholder from 'Component/TextPlaceholder';
import Loader from 'Component/Loader';
import { customerType } from 'Type/Account';
import './ProductReviewForm.style';

/**
 * ProductReviewForm
 * @class ProductReviewForm
 */
class ProductReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            ratingData: []
        };
    }

    onReviewSubmitAttempt(fields, invalidFields) {
        this.setState({ isLoading: true });
        const { showNotification } = this.props;
        if (invalidFields) {
            showNotification('error', 'Incorrect data! Please resolve all field validation errors.');
        }
        this.setState({ isLoading: !invalidFields });
    }

    onReviewSubmitSuccess(fields) {
        const {
            product,
            addReview,
            showNotification
        } = this.props;

        const {
            nickname,
            title,
            detail
        } = fields;

        const { sku } = product;
        const { ratingData } = this.state;
        const ratingsAreValid = this.validateRatings();

        this.setState({ isLoading: true });

        if (!ratingsAreValid) {
            showNotification('error', 'Incorrect rating data! Please make sure that all ratings are selected.');
            this.setState({ isLoading: false });
        } else {
            addReview({
                nickname,
                title,
                detail,
                product_sku: sku,
                rating_data: ratingData
            }).then((success) => {
                /** Clear form after submitting valid review */
                if (success) {
                    this.formRef.form.reset();
                    this.setState({ ratingData: [] });
                }

                this.setState({ isLoading: false });
            });
        }
    }

    validateRatings() {
        const { reviewRatings } = this.props;
        const { ratingData } = this.state;
        let isValid = true;

        reviewRatings.forEach((activeRating) => {
            if (!ratingData.some(selectedRating => selectedRating.rating_id === activeRating.rating_id)) {
                isValid = false;
            }
        });

        return isValid;
    }

    handleReviewRatingChange(ratingId, optionId) {
        if (typeof ratingId === 'number' && typeof optionId === 'number') {
            const { ratingData } = this.state;

            if (ratingData.length > 0 && ratingData.some(rating => rating.rating_id === ratingId)) {
                ratingData.map((rating) => {
                    if (ratingId === rating.rating_id) {
                        const newRating = rating;
                        newRating.option_id = optionId;

                        return newRating;
                    }

                    return rating;
                });
            } else {
                ratingData.push({ rating_id: ratingId, option_id: optionId });
            }

            this.setState({ ratingData });
        }
    }

    renderReviewRatingFields(ratingOption, reviewRating) {
        const {
            option_id,
            value
        } = ratingOption;
        const {
            rating_id,
            rating_code
        } = reviewRating;
        const { ratingData } = this.state;
        const isChecked = ratingData.some(rating => rating.rating_id === rating_id && rating.option_id === option_id);

        return (
            <Field
              key={ option_id }
              type="radio"
              id={ `${rating_code}_${value}` }
              value={ `${option_id}` }
              checked={ isChecked ? `${option_id}` : '' }
              name={ `ratings[${rating_id}]` }
              onChange={ () => this.handleReviewRatingChange(rating_id, option_id) }
            />
        );
    }

    renderReviewRatings(reviewRating) {
        const {
            rating_id, rating_code, rating_options
        } = reviewRating;

        return (
            <fieldset
              key={ rating_id }
              block="ProductReviewForm"
              elem="ReviewRating"
            >
                <legend
                  block="ProductReviewForm"
                  elem="ReviewRatingCode"
                >
                    { rating_code }
                </legend>
                <div
                  block="ProductReviewForm"
                  elem="RatingOptionGroup"
                >
                    { rating_options.map(ratingOption => this.renderReviewRatingFields(ratingOption, reviewRating)) }
                </div>
            </fieldset>
        );
    }

    render() {
        const {
            product,
            areDetailsLoaded,
            customer,
            isSignedIn,
            reviewRatings
        } = this.props;
        const { isLoading } = this.state;
        const reviewRatingsLoaded = reviewRatings.length;

        return (
            <ContentWrapper
              mix={ { block: 'ProductReviewForm' } }
              wrapperMix={ { block: 'ProductReviewForm', elem: 'Wrapper' } }
              label="Product Review Form"
            >
                { areDetailsLoaded && reviewRatingsLoaded ? (
                    <Form
                      key="product-review"
                      ref={ (el) => { this.formRef = el; } }
                      onSubmit={ () => this.onReviewSubmitAttempt() }
                      onSubmitSuccess={ fields => this.onReviewSubmitSuccess(fields) }
                      onSubmitError={ (fields, invalidFields) => this.onReviewSubmitAttempt(fields, invalidFields) }
                    >
                        <h3
                          block="ProductReviewForm"
                          elem="Title"
                        >
                            { 'You\'re reviewing:' }
                        </h3>
                        <p
                          block="ProductReviewForm"
                          elem="ProductName"
                        >
                            { product.name }
                        </p>
                        { reviewRatings.map(reviewRating => this.renderReviewRatings(reviewRating)) }
                        <Field
                          type="text"
                          label="Nickname"
                          id="nickname"
                          validation={ ['notEmpty'] }
                          defaultValue={ isSignedIn ? customer.firstname : '' }
                        />
                        <Field
                          type="text"
                          label="Summary"
                          id="title"
                          validation={ ['notEmpty'] }
                        />
                        <Field
                          type="textarea"
                          label="Review"
                          id="detail"
                          validation={ ['notEmpty'] }
                        />
                        <Loader isLoading={ isLoading } />
                        <div block="ProductReviewForm" elem="Buttons">
                            <button>Submit Review</button>
                        </div>
                    </Form>
                ) : (
                    <p block="ProductReviewForm" elem="PlaceholderBlock">
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="medium" />
                        <TextPlaceholder length="medium" />
                        <TextPlaceholder length="medium" />
                        <TextPlaceholder length="short" />
                    </p>
                )}
            </ContentWrapper>
        );
    }
}

ProductReviewForm.propTypes = {
    product: ProductType.isRequired,
    addReview: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired,
    customer: customerType.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    reviewRatings: RatingItemsType.isRequired
};

export default ProductReviewForm;
