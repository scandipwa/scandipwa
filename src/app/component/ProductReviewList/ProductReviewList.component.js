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
import ContentWrapper from 'Component/ContentWrapper';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductReviewRating from 'Component/ProductReviewRating';
import './ProductReviewList.style';

/**
 * @class ProductReviewList
 */
class ProductReviewList extends Component {
    renderReviewListItemRating(ratingVoteItem) {
        const {
            vote_id, rating_code, percent
        } = ratingVoteItem;

        return (
            <div
              key={ vote_id }
              block="ProductReviewList"
              elem="RatingSummaryItem"
            >
                <span><TextPlaceholder content={ rating_code } /></span>
                { percent
                    ? (
                        <ProductReviewRating summary={ percent } />
                    )
                    : <TextPlaceholder length="short" />
                }
            </div>
        );
    }

    renderReviewListItem(reviewItem) {
        const {
            review_id, nickname, title, detail, created_at, rating_votes
        } = reviewItem;

        return (
            <li
              key={ review_id }
              block="ProductReviewList"
              elem="Item"
            >
                <h4><TextPlaceholder content={ title } /></h4>
                <div
                  block="ProductReviewList"
                  elem="RatingSummary"
                >
                    { rating_votes
                        ? rating_votes.map(rating => this.renderReviewListItemRating(rating))
                        : this.renderReviewListItemRating({ vote_id: null })
                    }
                </div>
                <div
                  block="ProductReviewList"
                  elem="ReviewContent"
                >
                    <p><TextPlaceholder content={ detail } length="long" /></p>
                    <span>
                        { nickname && created_at
                            ? `Review by ${nickname} ${new Date(created_at).toLocaleDateString()}`
                            : <TextPlaceholder length="medium" />
                        }
                    </span>
                </div>
            </li>
        );
    }

    render() {
        const { product, areDetailsLoaded } = this.props;
        const hasReviews = product.reviews && Object.keys(product.reviews).length > 0;

        if (areDetailsLoaded && !hasReviews) return null;

        return (
            <ContentWrapper
              mix={ { block: 'ProductReviewList' } }
              wrapperMix={ { block: 'ProductReviewList', elem: 'Wrapper' } }
              label="Product Review List"
            >
                <>
                    <h3 block="ProductReviewList" elem="Title">
                        <TextPlaceholder content={ areDetailsLoaded ? 'Customer reviews' : '' } />
                    </h3>

                    <ul block="ProductReviewList" elem="List">
                        { areDetailsLoaded
                            ? product.reviews.map(review => this.renderReviewListItem(review))
                            : this.renderReviewListItem({ review_id: null })
                        }
                    </ul>
                </>
            </ContentWrapper>
        );
    }
}

ProductReviewList.propTypes = {
    product: ProductType.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

export default ProductReviewList;
