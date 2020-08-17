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

import './ProductReviewList.style';

import { PureComponent } from 'react';

import ProductReviewRating from 'Component/ProductReviewRating';
import { ProductType } from 'Type/ProductList';

/**
 * @class ProductReviewList
 */
export class ProductReviewList extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired
    };

    getFormattedDate(created_at) {
        // Safari bug
        const fixedDate = created_at.replace(/-/g, '/');
        const date = new Date(fixedDate);
        return date ? date.toDateString() : created_at;
    }

    renderReviewListItemRating = (ratingVoteItem) => {
        const {
            vote_id,
            rating_code,
            percent
        } = ratingVoteItem;

        return (
            <div
              key={ vote_id }
              block="ProductReviewList"
              elem="RatingSummaryItem"
              itemType="http://schema.org/Rating"
              itemScope
              itemProp="reviewRating"
            >
                <p itemProp="name">{ rating_code }</p>
                <meta itemProp="ratingValue" content={ percent } />
                <meta itemProp="worstRating" content={ 0 } />
                <meta itemProp="bestRating" content={ 100 } />
                <ProductReviewRating
                  summary={ percent }
                  code={ rating_code }
                />
            </div>
        );
    };

    renderAuthor(reviewItem) {
        const { nickname, created_at } = reviewItem;

        return (
            <p block="ProductReviewList" elem="ReviewAuthor">
                { __('Written by ') }
                <strong itemProp="author">{ nickname }</strong>
                <meta itemProp="datePublished" content={ this.getFormattedDate(created_at) } />
                { __(', written at %s', this.getFormattedDate(created_at)) }
            </p>
        );
    }

    renderReviewListItem = (reviewItem) => {
        const {
            title,
            detail,
            review_id,
            rating_votes
        } = reviewItem;

        return (
            <li
              key={ review_id }
              block="ProductReviewList"
              elem="Item"
              itemType="http://schema.org/Review"
              itemProp="review"
              itemScope
            >
                <h4 block="ProductReviewList" elem="ReviewTitle" itemProp="name">
                    { title }
                </h4>
                <div block="ProductReviewList" elem="RatingSummary">
                    { rating_votes.map(this.renderReviewListItemRating) }
                </div>
                <div block="ProductReviewList" elem="ReviewContent">
                    <p block="ProductReviewList" elem="ReviewDetails" itemProp="reviewBody">
                        { detail }
                    </p>
                    { this.renderAuthor(reviewItem) }
                </div>
            </li>
        );
    };

    renderReviews() {
        const { product: { reviews } } = this.props;
        return reviews.map(this.renderReviewListItem);
    }

    render() {
        const { product } = this.props;
        const hasReviews = product.reviews && Object.keys(product.reviews).length > 0;
        if (!hasReviews) {
            return null;
        }

        return (
            <ul block="ProductReviewList">
                { this.renderReviews() }
            </ul>
        );
    }
}

export default ProductReviewList;
