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

import Popup from 'Component/Popup';
import { ProductType } from 'Type/ProductList';
import ProductReviewList from 'Component/ProductReviewList';
import ProductReviewForm from 'Component/ProductReviewForm';
import ExpandableContent from 'Component/ExpandableContent';
import ProductReviewRating from 'Component/ProductReviewRating';

import './ProductReviews.style';
import ContentWrapper from 'Component/ContentWrapper';

export const REVIEW_POPUP_ID = 'REVIEW_POPUP_ID';

class ProductReviews extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        showPopup: PropTypes.func.isRequired,
        areDetailsLoaded: PropTypes.bool
    };

    static defaultProps = {
        areDetailsLoaded: false
    };

    renderPopup() {
        const { product } = this.props;

        return (
            <Popup
              id={ REVIEW_POPUP_ID }
              mix={ { block: 'ProductReviews', elem: 'Popup' } }
            >
                <ProductReviewForm product={ product } />
            </Popup>
        );
    }

    renderButton() {
        const { showPopup } = this.props;

        return (
            <button
              block="ProductReviews"
              elem="Button"
              mix={ { block: 'Button' } }
              onClick={ showPopup }
            >
                { __('Write a new review') }
            </button>
        );
    }

    renderNoRating() {
        return (
            <p>
                { __('There are no reviews yet! Click button on the right to submit one!') }
            </p>
        );
    }

    renderRatingData() {
        const {
            product: {
                review_summary: {
                    rating_summary,
                    review_count
                } = {}
            }
        } = this.props;

        const STARS_COUNT = 5;
        const PERCENT = 100;

        const percent = parseFloat(STARS_COUNT * (rating_summary || 0) / PERCENT).toFixed(2);

        if (!rating_summary) return this.renderNoRating();

        return (
            <>
                <ProductReviewRating
                  mix={ { block: 'ProductReviews', elem: 'SummaryRating' } }
                  summary={ rating_summary }
                />
                <p block="ProductReviews" elem="SummaryDetails">
                    { percent }
                    <span>{ __('%s reviews', review_count || 0) }</span>
                </p>
            </>
        );
    }

    renderSummary() {
        return (
            <div block="ProductReviews" elem="Summary">
                <h3 block="ProductReviews" elem="Title">
                    { __('Customer reviews') }
                </h3>
                { this.renderRatingData() }
                { this.renderButton() }
            </div>
        );
    }

    renderList() {
        const { product } = this.props;

        return (
            <ProductReviewList
              product={ product }
            />
        );
    }

    render() {
        const {
            product,
            areDetailsLoaded
        } = this.props;

        const {
            review_summary: { review_count } = {}
        } = product;

        if (!areDetailsLoaded) {
            return null;
        }

        return (
            <ContentWrapper
              label="Product reviews"
              mix={ { block: 'ProductReviews' } }
              wrapperMix={ { block: 'ProductReviews', elem: 'Wrapper' } }
            >
                <ExpandableContent
                  mix={ { block: 'ProductReviews' } }
                  heading={ __('Product reviews (%s)', review_count || '0') }
                >
                    { this.renderSummary() }
                    { this.renderList() }
                    { this.renderPopup() }
                </ExpandableContent>
            </ContentWrapper>
        );
    }
}

export default ProductReviews;
