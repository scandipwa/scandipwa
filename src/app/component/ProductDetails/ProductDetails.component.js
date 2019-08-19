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
import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductReviewRating from 'Component/ProductReviewRating';
import { ProductType } from 'Type/ProductList';
import PropTypes from 'prop-types';
import { getReviewText } from 'Util/Review';
import { getTabIndex } from 'Util/Link';
import { HashLink } from 'react-router-hash-link';
import './ProductDetails.style';

/**
 * Product details
 * @class ProductDetails
 */
class ProductDetails extends Component {
    /**
     * Render product SKU only when it's loaded
     */
    renderSku() {
        const {
            product: {
                variants = [],
                sku,
                stock_status
            },
            areDetailsLoaded,
            configurableVariantIndex
        } = this.props;

        if (areDetailsLoaded) {
            const { product } = variants[configurableVariantIndex] || {};

            return (
                <>
                    <span>{ __('SKU: ') }</span>
                    <Html content={ product ? product.sku : sku } />
                    <span block="ProductDetails" elem="StockAvailable">
                        { (stock_status === 'OUT_OF_STOCK' ? __('Out of stock') : __('In stock')) }
                    </span>
                </>
            );
        }

        return <TextPlaceholder length="medium" />;
    }

    renderShortDescription() {
        const { product: { short_description }, product } = this.props;

        if (product) {
            if (short_description) {
                const { html } = short_description;

                return (
                    <Html content={ html } />
                );
            }

            return null;
        }

        return (
            <p block="ProductDetails" elem="PlaceholderBlock">
                <TextPlaceholder length="long" />
                <TextPlaceholder length="medium" />
            </p>
        );
    }

    renderReviewSummary() {
        const {
            search,
            product: { review_summary, url_key },
            product,
            areDetailsLoaded
        } = this.props;

        if (areDetailsLoaded) {
            const linkTo = url_key
                ? {
                    pathname: `/product/${ url_key }`,
                    state: { product },
                    search,
                    hash: '#review-form'
                }
                : undefined;

            if (review_summary.review_count) {
                const _linkTo = { ...linkTo, hash: '#reviews' };

                return (
                    <>
                        <ProductReviewRating summary={ review_summary.rating_summary } />
                        <HashLink smooth to={ _linkTo } tabIndex={ getTabIndex(url_key) }>
                            <span>
                                { `${review_summary.review_count} ${getReviewText(review_summary.review_count)}` }
                            </span>
                        </HashLink>
                    </>
                );
            }

            return (
                <HashLink smooth to={ linkTo } tabIndex={ getTabIndex(url_key) }>
                    <span>{ __('Be the first to review this product') }</span>
                </HashLink>
            );
        }

        return (
            <div block="ProductDetails" elem="ReviewSummaryPlaceholder">
                <ProductReviewRating placeholder />
                <TextPlaceholder length="short" />
            </div>
        );
    }

    render() {
        const { product: { name, brand }, areDetailsLoaded } = this.props;

        return (
            <article block="ProductDetails">
                { !(!brand && areDetailsLoaded) && (
                    <p block="ProductDetails" elem="Brand">
                        <TextPlaceholder content={ brand } length="short" />
                    </p>
                ) }
                <h1 block="ProductDetails" elem="Title">
                    <TextPlaceholder content={ name } length="medium" />
                </h1>
                <p block="ProductDetails" elem="Sku">
                    { this.renderSku() }
                </p>
                <div block="ProductDetails" elem="ReviewSummary">
                    { this.renderReviewSummary() }
                </div>
                <div block="ProductDetails" elem="ShortDescription">
                    { this.renderShortDescription() }
                </div>
            </article>
        );
    }
}

ProductDetails.propTypes = {
    search: PropTypes.string,
    product: ProductType.isRequired,
    configurableVariantIndex: PropTypes.number.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

ProductDetails.defaultProps = {
    search: ''
};

export default ProductDetails;
