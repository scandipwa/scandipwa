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
            addReview
        } = this.props;

        const {
            nickname,
            title,
            detail
        } = fields;

        const { sku } = product;
        const { ratingData } = this.state;

        this.setState({ isLoading: true });

        return addReview({
            nickname,
            title,
            detail,
            product_sku: sku,
            rating_data: ratingData
        }).then((success) => {
            /** Clear form after submitting valid review */
            if (success) this.formRef.form.reset();
            this.setState({ isLoading: false });
        });
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
              onChange={ () => this.handleReviewRatingChange(rating_id, option_id, this) }
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
                <legend><TextPlaceholder content={ rating_code } /></legend>
                <div
                  block="ProductReviewForm"
                  elem="RatingOptionGroup"
                >
                    { rating_options
                        ? rating_options.map(ratingOption => this.renderReviewRatingFields(ratingOption, reviewRating))
                        : <TextPlaceholder length="short" />
                    }
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
                <Form
                  key="product-review"
                  ref={ (el) => { this.formRef = el; } }
                  onSubmit={ () => this.onReviewSubmitAttempt() }
                  onSubmitSuccess={ fields => this.onReviewSubmitSuccess(fields) }
                  onSubmitError={ (fields, invalidFields) => this.onReviewSubmitAttempt(fields, invalidFields) }
                >
                    <h3>
                        <TextPlaceholder
                          content={ areDetailsLoaded && reviewRatingsLoaded ? 'You\'re reviewing:' : '' }
                        />
                    </h3>
                    <p>
                        <TextPlaceholder
                          content={ areDetailsLoaded && reviewRatingsLoaded ? product.name : '' }
                        />
                    </p>
                    { areDetailsLoaded && reviewRatingsLoaded
                        ? reviewRatings.map(reviewRating => this.renderReviewRatings(reviewRating))
                        : <TextPlaceholder length="short" />
                    }
                    { areDetailsLoaded && reviewRatingsLoaded ? (
                        <>
                            <Field
                              type="text"
                              label="Nickname"
                              id="nickname"
                              validation={ ['notEmpty'] }
                              value={ isSignedIn ? customer.firstname : '' }
                            />
                            <Field
                              type="text"
                              label="Title"
                              id="title"
                              validation={ ['notEmpty'] }
                            />
                            <Field
                              type="textarea"
                              label="Details"
                              id="detail"
                              validation={ ['notEmpty'] }
                            />
                            <Loader isLoading={ isLoading } />
                            <div block="ProductReviewForm" elem="Buttons">
                                <button>Submit Review</button>
                            </div>
                        </>
                    ) : (
                        <p block="ProductReviewForm" elem="PlaceholderBlock">
                            <TextPlaceholder length="short" />
                            <TextPlaceholder length="short" />
                            <TextPlaceholder length="short" />
                            <TextPlaceholder length="short" />
                        </p>
                    )}
                </Form>
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

ProductReviewForm.defaultProps = {
};

export default ProductReviewForm;
