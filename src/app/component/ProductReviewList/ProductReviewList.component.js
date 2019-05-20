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
import './ProductReviewList.style';

/**
 * @class ProductReviewList
 */
class ProductReviewList extends Component {
    renderReviewListItemRating(ratingVote) {

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
                <span>{ nickname }</span>
                <span>{ title }</span>
                <span>{ detail }</span>
                <span>{ created_at }</span>
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
                { !areDetailsLoaded ? (
                    <p block="ProductReviewList" elem="PlaceholderBlock">
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="short" />
                        <TextPlaceholder length="short" />
                    </p>
                ) : (
                    <>
                        <h3 block="ProductReviewList" elem="Title">
                            { 'Customer reviews' }
                        </h3>

                        <ul block="ProductReviewList" elem="List">
                            {
                                Object.values(product.reviews).map(
                                    review => this.renderReviewListItem(review)
                                )
                            }
                        </ul>
                    </>
                )}
            </ContentWrapper>
        );
    }
}

ProductReviewList.propTypes = {
    product: ProductType.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

export default ProductReviewList;
