/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import FieldGroup from 'Component//FieldGroup';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import ReviewStar from 'Component/ReviewStar';
import { RatingItemsType } from 'Type/Rating.type';

import './ProductReviewForm.style';

/**
 * ProductReviewForm
 * @class ProductReviewForm
 * @namespace Component/ProductReviewForm/Component
 */
export class ProductReviewForm extends PureComponent {
    static propTypes = {
        reviewRatings: RatingItemsType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        onReviewSubmitSuccess: PropTypes.func.isRequired,
        onReviewError: PropTypes.func.isRequired,
        onStarRatingClick: PropTypes.func.isRequired,
        ratingData: PropTypes.objectOf(PropTypes.string).isRequired,
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
                <FieldGroup
                  validationRule={ { isRequired: true, selector: '[type="radio"]' } }
                  validateOn={ ['onChange'] }
                  key={ rating_id }
                >
                    <fieldset block="ProductReviewForm" elem="Rating" key={ rating_id }>
                        <legend block="ProductReviewForm" elem="Legend">
                            { rating_code }
                        </legend>
                        { rating_options
                            .sort(({ value }, { value: nextValue }) => nextValue - value)
                            .map((option) => this.renderReviewStar(option, rating_id)) }
                    </fieldset>
                </FieldGroup>
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

    renderReviewRatingWrapper() {
        const { reviewRatings } = this.props;

        if (reviewRatings && reviewRatings.length === 0) {
            return null;
        }

        return (
            <div
              block="ProductReviewForm"
              elem="RatingWrapper"
            >
              { this.renderReviewRating() }
            </div>
        );
    }

    renderReviewFormContent() {
        const { reviewData } = this.props;
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
               { this.renderReviewRatingWrapper() }
                <div
                  block="ProductReviewForm"
                  elem="Content"
                >
                    <Field
                      type={ FIELD_TYPE.text }
                      label={ __('Nickname') }
                      attr={ {
                          id: 'nickname',
                          name: 'nickname',
                          defaultValue: nickname,
                          placeholder: __('Your nickname')
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true
                      } }
                      addRequiredTag
                      mix={ { block: 'ProductReviewForm', elem: 'Field' } }
                    />
                    <Field
                      type={ FIELD_TYPE.text }
                      label={ __('Summary') }
                      attr={ {
                          id: 'title',
                          name: 'title',
                          defaultValue: summary,
                          placeholder: __('Summary')
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true
                      } }
                      addRequiredTag
                      mix={ { block: 'ProductReviewForm', elem: 'Field' } }
                    />
                    <Field
                      type={ FIELD_TYPE.textarea }
                      label={ __('Review') }
                      attr={ {
                          id: 'detail',
                          name: 'detail',
                          defaultValue: detail,
                          placeholder: __('Review')
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true
                      } }
                      addRequiredTag
                      mix={ { block: 'ProductReviewForm', elem: 'Field' } }
                    />
                </div>
            </div>
        );
    }

    render() {
        const {
            isLoading,
            onReviewSubmitSuccess,
            onReviewError
        } = this.props;

        return (
            <Form
              key="product-review"
              mix={ { block: 'ProductReviewForm' } }
              onSubmit={ onReviewSubmitSuccess }
              onError={ onReviewError }
            >
                <Loader isLoading={ isLoading } />
                { this.renderReviewFormContent() }
                { this.renderButton() }
            </Form>
        );
    }
}

export default ProductReviewForm;
