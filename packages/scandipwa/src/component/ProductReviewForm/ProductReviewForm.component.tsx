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

import { PureComponent } from 'react';

import FieldGroup from 'Component//FieldGroup';
import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import ReviewStar from 'Component/ReviewStar';
import { ReviewRatingValue } from 'Query/Review.type';
import { ReactElement } from 'Type/Common.type';

import { ProductReviewFormComponentProps } from './ProductReviewForm.type';

import './ProductReviewForm.style';

/**
 * ProductReviewForm
 * @class ProductReviewForm
 * @namespace Component/ProductReviewForm/Component
 */
export class ProductReviewForm extends PureComponent<ProductReviewFormComponentProps> {
    ratingTitleMap = {
        1: __('Awful'),
        2: __('Bad'),
        3: __('Average'),
        4: __('Good'),
        5: __('Awesome'),
    };

    renderReviewStar(options: ReviewRatingValue, rating_id: number): ReactElement {
        const { ratingData, onStarRatingClick } = this.props;
        const { option_id, value } = options;
        const isChecked = !!ratingData[rating_id] && ratingData[rating_id] === option_id;
        const ratingId = rating_id.toString();

        return (
            <ReviewStar
              key={ option_id }
              name={ ratingId }
              value={ value }
              title={ this.ratingTitleMap[Number(value) as keyof typeof this.ratingTitleMap] }
              isChecked={ isChecked }
              option_id={ option_id }
              rating_id={ ratingId }
              onStarRatingClick={ onStarRatingClick }
            />
        );
    }

    renderReviewRating(): ReactElement {
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
                            .sort(({ value }, { value: nextValue }) => Number(nextValue) - Number(value))
                            .map((option) => this.renderReviewStar(option, rating_id)) }
                    </fieldset>
                </FieldGroup>
            );
        });
    }

    renderButton(): ReactElement {
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

    renderReviewRatingWrapper(): ReactElement {
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

    renderReviewFormContent(): ReactElement {
        const { reviewData } = this.props;
        const {
            nickname = '',
            summary = '',
            detail = '',
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
                      type={ FieldType.TEXT }
                      label={ __('Nickname') }
                      attr={ {
                          id: 'nickname',
                          name: 'nickname',
                          defaultValue: nickname,
                          placeholder: __('Your nickname'),
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                      } }
                      addRequiredTag
                      mix={ { block: 'ProductReviewForm', elem: 'Field' } }
                    />
                    <Field
                      type={ FieldType.TEXT }
                      label={ __('Summary') }
                      attr={ {
                          id: 'title',
                          name: 'title',
                          defaultValue: summary,
                          placeholder: __('Summary'),
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                      } }
                      addRequiredTag
                      mix={ { block: 'ProductReviewForm', elem: 'Field' } }
                    />
                    <Field
                      type={ FieldType.TEXTAREA }
                      label={ __('Review') }
                      attr={ {
                          id: 'detail',
                          name: 'detail',
                          defaultValue: detail,
                          placeholder: __('Review'),
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                      } }
                      addRequiredTag
                      mix={ { block: 'ProductReviewForm', elem: 'Field' } }
                    />
                </div>
            </div>
        );
    }

    render(): ReactElement {
        const {
            isLoading,
            onReviewSubmitSuccess,
            onReviewError,
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
