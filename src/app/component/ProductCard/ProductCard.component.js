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
import Link from 'Component/Link';
import ProductReviewRating from 'Component/ProductReviewRating';
import { ProductType } from 'Type/ProductList';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import Image from 'Component/Image';
import './ProductCard.style';
import Loader from 'Component/Loader';

/**
 * Product card
 * @class ProductCard
 */
export default class ProductCard extends PureComponent {
    static propTypes = {
        linkTo: PropTypes.shape({}),
        product: ProductType.isRequired,
        productOrVariant: ProductType.isRequired,
        thumbnail: PropTypes.string,
        availableVisualOptions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string
        })).isRequired,
        getAttribute: PropTypes.func.isRequired,
        children: PropTypes.element,
        isLoading: PropTypes.bool,
        mix: PropTypes.shape({})
    };

    static defaultProps = {
        thumbnail: '',
        linkTo: {},
        children: null,
        isLoading: false,
        mix: {}
    };

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
        const fullImageUrl = `//${window.location.hostname}${imageUrl}`;

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
                  src={ fullImageUrl }
                  itemProp="image"
                />
            </>
        );
    }

    renderPictureLabel() {
        const { product: { review_summary: { rating_summary, review_count } = {} } } = this.props;
        if (!rating_summary) return null;

        const ONE_FIFTH_OF_A_HUNDRED = 20;
        const rating = parseFloat(rating_summary / ONE_FIFTH_OF_A_HUNDRED).toFixed(2);

        return (
            <figcaption
              block="ProductCard"
              elem="PictureLabel"
              itemProp="aggregateRating"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
                <meta itemProp="ratingValue" content={ rating || 0 } />
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
            <Link
              block="ProductCard"
              elem="Link"
              to={ linkTo }
            >
              { children }
            </Link>
        );
    }

    render() {
        const {
            product: { sku },
            children,
            mix,
            isLoading
        } = this.props;

        return (
            <li
              block="ProductCard"
              itemScope
              itemType={ sku && 'https://schema.org/Product' }
              mix={ mix }
            >
                <Loader isLoading={ isLoading } />
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
                <div block="ProductCard" elem="AdditionalContent">
                    { children }
                </div>
            </li>
        );
    }
}
