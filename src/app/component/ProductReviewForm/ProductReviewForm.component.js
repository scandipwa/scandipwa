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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Form from 'Component/Form';
import Field from 'Component/Field';
import Loader from 'Component/Loader';
import ReviewStar from 'Component/ReviewStar';
import { RatingItemsType } from 'Type/Rating';

import './ProductReviewForm.style';

/**
 * ProductReviewForm
 * @class ProductReviewForm
 */
export default class ProductReviewForm extends PureComponent {
    static propTypes = {
        reviewRatings: RatingItemsType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        onReviewSubmitAttempt: PropTypes.func.isRequired,
        onReviewSubmitSuccess: PropTypes.func.isRequired,
        onReviewError: PropTypes.func.isRequired,
        onStarRatingClick: PropTypes.func.isRequired,
        handleNicknameChange: PropTypes.func.isRequired,
        handleSummaryChange: PropTypes.func.isRequired,
        handleDetailChange: PropTypes.func.isRequired,
        ratingData: PropTypes.objectOf(PropTypes.number).isRequired,
        reviewData: PropTypes.shape({
            nickname: PropTypes.string,
            summary: PropTypes.string,
            detail: PropTypes.string
        }).isRequired
    };

    ratingTitleMap = {
        1: __('Awful'),
        2: __('Bad'),
        3: __('Average'),
        4: __('Good'),
        5: __('Awesome')
    };

    renderReviewStar(options, rating_id) {
        const { ratingData, onStarRatingClick } = this.props;
        const { option_id, value } = options;
        const isChecked = !!ratingData[rating_id] && ratingData[rating_id] === option_id;

        return (
            <ReviewStar
              key={ option_id }
              name={ rating_id }
              value={ value }
              title={ this.ratingTitleMap[value] }
              isChecked={ isChecked }
              option_id={ option_id }
              rating_id={ rating_id }
              onStarRatingClick={ onStarRatingClick }
            />
        );
    }

    renderReviewRating() {
        const { reviewRatings } = this.props;

        return reviewRatings.map((rating) => {
            const { rating_id, rating_code, rating_options } = rating;

            return (
                <fieldset block="ProductReviewForm" elem="Rating" key={ rating_id }>
                    <legend block="ProductReviewForm" elem="Legend">
                        { rating_code }
                    </legend>
                    { rating_options
                        .sort(({ value }, { value: nextValue }) => nextValue - value)
                        .map(option => this.renderReviewStar(option, rating_id)) }
                </fieldset>
            );
        });
    }

    renderButton() {
        return (
            <button
              block="ProductReviewForm"
              elem="Button"
              type="submit"
              mix={ { block: 'Button' } }
            >
                { __('Submit Review') }
            </button>
        );
    }

    renderReviewFormContent() {
        const {
            handleNicknameChange,
            handleSummaryChange,
            handleDetailChange,
            reviewData
        } = this.props;

        const {
            nickname = '',
            summary = '',
            detail = ''
        } = reviewData;

        return (
            <div
              block="ProductReviewForm"
              elem="Wrapper"
            >
                <div>
                    { this.renderReviewRating() }
                </div>
                <div
                  block="ProductReviewForm"
                  elem="Content"
                >
                    <Field
                      type="text"
                      label={ __('Nickname') }
                      id="nickname"
                      name="nickname"
                      validation={ ['notEmpty'] }
                      value={ nickname }
                      onChange={ handleNicknameChange }
                    />
                    <Field
                      type="text"
                      label={ __('Summary') }
                      id="title"
                      name="title"
                      validation={ ['notEmpty'] }
                      value={ summary }
                      onChange={ handleSummaryChange }
                    />
                    <Field
                      type="textarea"
                      label={ __('Review') }
                      id="detail"
                      name="detail"
                      validation={ ['notEmpty'] }
                      value={ detail }
                      onChange={ handleDetailChange }
                    />
                </div>
            </div>
        );
    }

    render() {
        const {
            isLoading,
            onReviewSubmitAttempt,
            onReviewSubmitSuccess,
            onReviewError
        } = this.props;

        return (
            <Form
              key="product-review"
              mix={ { block: 'ProductReviewForm' } }
              onSubmit={ onReviewSubmitAttempt }
              onSubmitSuccess={ onReviewSubmitSuccess }
              onSubmitError={ onReviewError }
            >
                <Loader isLoading={ isLoading } />
                { this.renderReviewFormContent() }
                { this.renderButton() }
            </Form>
        );
    }
}
