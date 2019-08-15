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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductReviewRating from 'Component/ProductReviewRating';
import { ProductType } from 'Type/ProductList';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import Image from 'Component/Image';
import './ProductCard.style';

/**
 * Product card
 * @class ProductCard
 */
class ProductCard extends PureComponent {
    renderProductPrice() {
        const { productOrVariant: { price } } = this.props;
        if (!price) return <TextPlaceholder />;

        return (
            <ProductPrice
              price={ price }
              mix={ { block: 'ProductCard', elem: 'Price' } }
            />
        );
    }

    renderVisualConfigurableOptions() {
        const { availableVisualOptions } = this.props;

        return (
            <div block="ProductCard" elem="ConfigurableOptions">
                { availableVisualOptions.map(({ value, label }) => (
                    <span
                      block="ProductCard"
                      elem="Color"
                      key={ value }
                      style={ { backgroundColor: value } }
                      aria-label={ label }
                    />
                )) }
            </div>
        );
    }

    renderPicture() {
        const { product: { id, name }, thumbnail } = this.props;
        const imageUrl = thumbnail && `/media/catalog/product${ thumbnail }`;

        return (
            <>
                <Image
                  src={ imageUrl }
                  alt={ name }
                  ratio="custom"
                  mix={ { block: 'ProductCard', elem: 'Picture' } }
                  isPlaceholder={ !id }
                />
                <img
                  style={ { display: 'none' } }
                  alt={ name }
                  src={ imageUrl }
                  itemProp="image"
                />
            </>
        );
    }

    renderPictureLabel() {
        const { product: { review_summary: { rating_summary, review_count } = {} } } = this.props;
        if (!rating_summary) return null;

        return (
            <figcaption
              block="ProductCard"
              elem="PictureLabel"
              itemProp="aggregateRating"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
                <meta itemProp="ratingValue" content={ rating_summary || 0 } />
                <meta itemProp="ratingCount" content={ review_count || 0 } />
                <ProductReviewRating summary={ rating_summary || 0 } />
            </figcaption>
        );
    }

    renderAdditionalProductDetails() {
        const { product: { sku }, getAttribute } = this.props;
        const { attribute_value: brand } = getAttribute('brand') || {};

        if (sku && !brand) return null;

        return (
            <p
              block="ProductCard"
              elem="Brand"
              mods={ { isLoaded: !!brand } }
              itemProp="brand"
            >
                { brand }
            </p>
        );
    }

    renderMainDetails() {
        const { product: { name } } = this.props;

        return (
            <p
              block="ProductCard"
              elem="Name"
              mods={ { isLoaded: !!name } }
              itemProp="name"
            >
                <TextPlaceholder content={ name } length="medium" />
            </p>
        );
    }

    renderCardWrapper(children) {
        const { linkTo, product: { url_key } } = this.props;

        if (!url_key) {
            return (<div>{ children }</div>);
        }

        return (
            <Link to={ linkTo }>{ children }</Link>
        );
    }

    render() {
        const { product: { sku } } = this.props;

        return (
            <li
              block="ProductCard"
              itemScope
              itemType={ sku && 'https://schema.org/Product' }
            >
                <meta itemProp="sku" content={ sku } />
                { this.renderCardWrapper((
                    <>
                        <figure>
                            { this.renderPicture() }
                            { this.renderPictureLabel() }
                        </figure>
                        <div block="ProductCard" elem="Content">
                            { this.renderProductPrice() }
                            { this.renderVisualConfigurableOptions() }
                            { this.renderMainDetails() }
                            { this.renderAdditionalProductDetails() }
                        </div>
                    </>
                )) }
            </li>
        );
    }
}

ProductCard.propTypes = {
    linkTo: PropTypes.shape({}),
    product: ProductType.isRequired,
    productOrVariant: ProductType.isRequired,
    thumbnail: PropTypes.string,
    availableVisualOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    getAttribute: PropTypes.func.isRequired
};

ProductCard.defaultProps = {
    thumbnail: '',
    linkTo: {}
};

export default ProductCard;
