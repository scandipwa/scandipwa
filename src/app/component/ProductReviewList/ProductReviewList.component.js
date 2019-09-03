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
import { ProductType } from 'Type/ProductList';
import ContentWrapper from 'Component/ContentWrapper';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductReviewRating from 'Component/ProductReviewRating';
import './ProductReviewList.style';

/**
 * @class ProductReviewList
 */
export default class ProductReviewList extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired
    };

    renderReviewListItemRating(ratingVoteItem) {
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
            >
                <p><TextPlaceholder content={ rating_code } /></p>
                { percent
                    ? <ProductReviewRating summary={ percent } code={ rating_code } />
                    : <ProductReviewRating placeholder /> }
            </div>
        );
    }

    renderReviewListItem(reviewItem) {
        const {
            review_id,
            nickname,
            title,
            detail,
            created_at,
            rating_votes
        } = reviewItem;

        return (
            <li
              key={ review_id }
              block="ProductReviewList"
              elem="Item"
            >
                <h4 block="ProductReviewList" elem="ReviewTitle">
                    <TextPlaceholder content={ title } />
                </h4>
                <div block="ProductReviewList" elem="RatingSummary">
                    { rating_votes
                        ? rating_votes.map(rating => this.renderReviewListItemRating(rating))
                        : this.renderReviewListItemRating({ vote_id: null }) }
                </div>
                <div block="ProductReviewList" elem="ReviewContent">
                    <p block="ProductReviewList" elem="ReviewDetails">
                        { detail
                            || (
                                <>
                                    <TextPlaceholder length="long" />
                                    <TextPlaceholder length="long" />
                                    <TextPlaceholder length="long" />
                                </>
                            ) }
                    </p>
                    <p block="ProductReviewList" elem="ReviewAuthor">
                        <TextPlaceholder
                          content={ nickname && created_at
                              ? `Review by ${nickname} ${new Date(created_at).toLocaleDateString()}`
                              : '' }
                          length="medium"
                        />
                    </p>
                </div>
            </li>
        );
    }

    render() {
        const { product, areDetailsLoaded } = this.props;
        const hasReviews = product.reviews && Object.keys(product.reviews).length > 0;
        const placeholderReviewList = [
            { review_id: 1 },
            { review_id: 2 },
            { review_id: 3 }
        ];

        if (areDetailsLoaded && !hasReviews) return null;

        return (
            <ContentWrapper
              mix={ { block: 'ProductReviewList' } }
              wrapperMix={ { block: 'ProductReviewList', elem: 'Wrapper' } }
              label={ __('Product Review List') }
            >
                <>
                    <h3
                      block="ProductReviewList"
                      elem="Title"
                      id="reviews"
                    >
                        <TextPlaceholder content={ areDetailsLoaded ? __('Customer reviews') : '' } />
                    </h3>

                    <ul block="ProductReviewList" elem="List">
                        { (areDetailsLoaded ? product.reviews : placeholderReviewList).map(
                            review => this.renderReviewListItem(review)
                        ) }
                    </ul>
                </>
            </ContentWrapper>
        );
    }
}
