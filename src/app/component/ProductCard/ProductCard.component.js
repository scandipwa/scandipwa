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
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import Image from 'Component/Image';
import { ProductType, FilterType } from 'Type/ProductList';
import './ProductCard.style';

/**
 * Product card
 * @class ProductCard
 */
class ProductCard extends Component {
    getPictureLabel() {
        const { product: { type_id } } = this.props;

        if (type_id === 'grouped') return 'grouped product';

        return null;
    }

    getCurrentVariantIndex() {
        const { product: { variants }, customFilters } = this.props;
        const customFiltersExist = customFilters && Object.keys(customFilters).length;

        if (variants && customFiltersExist) {
            for (let i = 0; i < variants.length; i++) {
                const { product } = variants[ i ];

                const isCorrectVariant = Object.keys(customFilters).every(filterKey => (
                    customFilters[ filterKey ].find(value => +value === product[ filterKey ])
                ));

                if (isCorrectVariant) return i;
            }

            return 0;
        }

        return 0;
    }

    /**
     * Get thumbnail for the product
     * @param {Number} currentVariantIndex configurable product index
     * @return {void}
     */
    getThumbnail(currentVariantIndex) {
        const { product: { thumbnail, variants } } = this.props;
        const variantThumbnail = variants ? variants[ currentVariantIndex ].product.thumbnail.path : null;
        return variantThumbnail || (thumbnail && thumbnail.path);
    }

    renderProductPrice() {
        const { product: { price } } = this.props;

        if (price) {
            return (
                <ProductPrice
                  price={ price }
                  mix={ { block: 'ProductCard', elem: 'Price' } }
                />
            );
        }

        return <TextPlaceholder />;
    }

    renderColorOptions() {
        const { product: { variants, color }, availableFilters } = this.props;

        if (!availableFilters.length || !(variants || color)) return null;

        // Collects only COLOR filter items from available filter object
        const { filter_items: filterItems } = availableFilters.reduce(
            (prev, curr) => ((curr.request_var === 'color') ? curr : prev),
            {}
        );

        if (!filterItems) return null;

        // Maps every color attribute value to corresponding string
        const colorMap = filterItems.reduce(
            (prev, { value_string, label, swatch_data: { value } }) => ({ ...prev, [value_string]: { value, label } }),
            {}
        );

        // Collects color object from product variants
        const colors = variants
            ? variants.reduce(
                (prev, { product: { color } }) => ((!color) ? prev : ({ ...prev, [color]: colorMap[color] })),
                {}
            ) : { [color]: colorMap[color] };

        return (
            <div block="ProductCard" elem="Colors">
                { Object.values(colors).map(({ value: backgroundColor, label }) => (
                    <span
                      block="ProductCard"
                      elem="Color"
                      key={ label }
                      style={ { backgroundColor } }
                      aria-label={ label }
                    />
                )) }
            </div>
        );
    }

    renderPictureLabel() {
        const label = this.getPictureLabel();

        if (!label) return null;

        return (
            <figcaption block="ProductCard" elem="PictureLabel">
                { label }
            </figcaption>
        );
    }

    render() {
        const {
            product: {
                name,
                url_key,
                brand
            },
            product,
            cardRef
        } = this.props;

        const variantIndex = this.getCurrentVariantIndex();
        const thumbnail = this.getThumbnail(variantIndex);
        const TagName = url_key ? Link : 'div';
        const isLoading = !url_key;
        const linkTo = url_key
            ? {
                pathname: `/product/${ url_key }`,
                state: { product, variantIndex },
                search: `?variant=${ variantIndex }`
            }
            : undefined;

        return (
            <li
              block="ProductCard"
              mods={ { isLoading } }
              ref={ cardRef }
            >
                <TagName
                  to={ linkTo }
                  tabIndex={ url_key ? '0' : '-1' }
                >
                    <figure>
                        <Image
                          src={ thumbnail && `/media/jpg/catalog/product${ thumbnail }` }
                          alt="Product Thumbnail"
                          ratio="custom"
                          mix={ { block: 'ProductCard', elem: 'Picture' } }
                        />
                        { this.renderPictureLabel() }
                    </figure>
                    <div block="ProductCard" elem="Content">
                        { this.renderProductPrice() }
                        { this.renderColorOptions() }
                        <p block="ProductCard" elem="Name">
                            <TextPlaceholder content={ name } length="medium" />
                        </p>
                        <p block="ProductCard" elem="Brand">
                            { brand }
                        </p>
                    </div>
                </TagName>
            </li>
        );
    }
}

ProductCard.propTypes = {
    product: ProductType.isRequired,
    customFilters: FilterType,
    availableFilters: PropTypes.arrayOf(PropTypes.shape),
    cardRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
        PropTypes.bool
    ])
};

ProductCard.defaultProps = {
    customFilters: {},
    availableFilters: [],
    cardRef: null
};

export default ProductCard;
