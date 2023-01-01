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

import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import ProductReviewList from 'Component/ProductReviewList';
import ProductReviewRating from 'Component/ProductReviewRating';
import { ReactElement } from 'Type/Common.type';
import { showNewReviewPopup } from 'Util/Product';

import { ProductReviewsComponentProps } from './ProductReviews.type';

import './ProductReviews.style';

/** @namespace Component/ProductReviews/Component */
export class ProductReviewsComponent<
P extends Readonly<ProductReviewsComponentProps> = Readonly<ProductReviewsComponentProps>,
S extends ProductReviewsComponentState = ProductReviewsComponentState,
> extends PureComponent<P, S> {
    renderButton(): ReactElement {
        return (
            <button
              block="ProductReviews"
              elem="Button"
              mix={ { block: 'Button', mods: { isHollow: true } } }
              onClick={ showNewReviewPopup }
            >
                { __('Write a review') }
            </button>
        );
    }

    renderNoRating(): ReactElement {
        const { device: { isMobile } } = this.props;

        if (isMobile) {
            return (
                <p>
                    { __('There are no reviews yet! Click button below to submit one!') }
                </p>
            );
        }

        return (
            <p>
                { __('There are no reviews yet! Click button on the right to submit one!') }
            </p>
        );
    }

    renderRatingSchema(percent: number, reviewCount: number): ReactElement {
        return (
            <>
                <meta itemProp="ratingValue" content={ String(percent) } />
                <meta itemProp="worstRating" content="0" />
                <meta itemProp="bestRating" content="100" />
                <meta itemProp="reviewCount" content={ String(reviewCount) } />
            </>
        );
    }

    renderRatingData(): ReactElement {
        const {
            product: {
                review_summary: {
                    rating_summary = 0,
                    review_count,
                } = {},
            },
        } = this.props;

        const STARS_COUNT = 5;
        const PERCENT = 100;

        const percent = ((STARS_COUNT * (rating_summary || 0)) / PERCENT).toFixed(2);

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

    renderSummary(): ReactElement {
        const {
            product: {
                review_summary: {
                    review_count,
                } = {},
            },
        } = this.props;

        return (
            <div
              block="ProductReviews"
              elem="Summary"
              itemType={ review_count ? 'http://schema.org/AggregateRating' : '' }
              itemProp={ review_count ? 'aggregateRating' : '' }
              itemScope={ !!review_count }
            >
                { this.renderRatingData() }
                { this.renderButton() }
            </div>
        );
    }

    renderList(): ReactElement {
        const { product } = this.props;

        return (
            <ProductReviewList
              product={ product }
            />
        );
    }

    render(): ReactElement {
        const { areDetailsLoaded } = this.props;

        const heading = areDetailsLoaded ? __('Reviews') : '';

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
                </ExpandableContent>
            </ContentWrapper>
        );
    }
}

export default ProductReviewsComponent;
