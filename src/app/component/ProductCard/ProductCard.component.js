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

import media, { PRODUCT_MEDIA } from 'Util/Media';
import Link from 'Component/Link';
import Image from 'Component/Image';
import Loader from 'Component/Loader';
import { ProductType } from 'Type/ProductList';
import { MixType } from 'Type/Common';
import ProductPrice from 'Component/ProductPrice';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductReviewRating from 'Component/ProductReviewRating';

import './ProductCard.style';

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
        mix: MixType
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
        const imageUrl = thumbnail && media(thumbnail, PRODUCT_MEDIA);

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

    renderReviews() {
        const { product: { review_summary: { rating_summary, review_count } = {} } } = this.props;
        if (!rating_summary) return null;

        const ONE_FIFTH_OF_A_HUNDRED = 20;
        const rating = parseFloat(rating_summary / ONE_FIFTH_OF_A_HUNDRED).toFixed(2);

        return (
            <div
              block="ProductCard"
              elem="Reviews"
              itemProp="aggregateRating"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
                <meta itemProp="ratingValue" content={ rating || 0 } />
                <meta itemProp="ratingCount" content={ review_count || 0 } />
                <ProductReviewRating summary={ rating_summary || 0 } />
            </div>
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
                        <figure block="ProductCard" elem="Figure">
                            { this.renderPicture() }
                        </figure>
                        <div block="ProductCard" elem="Content">
                            { this.renderReviews() }
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
