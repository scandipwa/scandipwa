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

import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import Popup from 'Component/Popup';
import ProductReviewForm from 'Component/ProductReviewForm';
import ProductReviewList from 'Component/ProductReviewList';
import ProductReviewRating from 'Component/ProductReviewRating';
import { ProductType } from 'Type/ProductList';

import { REVIEW_POPUP_ID } from './ProductReviews.config';

import './ProductReviews.style';

/** @namespace Component/ProductReviews/Component */
export class ProductReviews extends PureComponent {
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

    renderRatingSchema(percent, reviewCount) {
        return (
            <>
                <meta itemProp="ratingValue" content={ percent } />
                <meta itemProp="worstRating" content={ 0 } />
                <meta itemProp="bestRating" content={ 100 } />
                <meta itemProp="reviewCount" content={ reviewCount } />
            </>
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

        // eslint-disable-next-line no-mixed-operators
        const percent = parseFloat(STARS_COUNT * (rating_summary || 0) / PERCENT).toFixed(2);

        if (!review_count) {
            return this.renderNoRating();
        }

        return (
            <>
                { this.renderRatingSchema(rating_summary, review_count) }
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
        const {
            product: {
                review_summary: {
                    review_count
                } = {}
            }
        } = this.props;

        const reviewSchemaObject = review_count
            ? {
                itemType: 'http://schema.org/AggregateRating',
                itemProp: 'aggregateRating',
                itemScope: true
            } : {};

        return (
            <div
              block="ProductReviews"
              elem="Summary"
              { ...reviewSchemaObject }
            >
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

        const heading = areDetailsLoaded
            ? __('Product reviews (%s)', review_count || '0')
            : '';

        return (
            <ContentWrapper
              label="Product reviews"
              mix={ { block: 'ProductReviews' } }
              wrapperMix={ { block: 'ProductReviews', elem: 'Wrapper' } }
            >
                <ExpandableContent
                  mix={ { block: 'ProductReviews', elem: 'Content' } }
                  heading={ heading }
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
