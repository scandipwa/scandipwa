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
import AddToCart from 'Component/AddToCart';
import ProductWishlistButton from 'Component/ProductWishlistButton';
import { ProductType, FilterType } from 'Type/ProductList';
import './ProductCard.style';

/**
 * Product card
 * @class ProductCard
 */
class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.handleConfigurableClick = this.handleConfigurableClick.bind(this);
    }

    getCurrentVariantIndex() {
        const { product: { variants }, customFilters } = this.props;
        const customFiltersExist = customFilters && Object.keys(customFilters).length;

        if (variants && customFiltersExist) {
            for (let i = 0; i < variants.length; i++) {
                const { product } = variants[ i ];

                const isCorrectVariant = Object.keys(customFilters).every(filterKey => (
                    customFilters[ filterKey ].find(value => +value === +product[ filterKey ])
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

    handleConfigurableClick() {
        const {
            product,
            updateProductToBeRemovedAfterAdd,
            wishlistItem
        } = this.props;

        if (wishlistItem && updateProductToBeRemovedAfterAdd) {
            return updateProductToBeRemovedAfterAdd({ product });
        }

        return null;
    }

    addOrConfigureProduct(variantIndex, linkTo) {
        const { customFilters, product, product: { url_key, variants, type_id } } = this.props;

        if (variants && type_id === 'configurable') {
            const correctVariants = variants.reduce((correctVariants, { product }) => {
                const isCorrectVariant = Object.keys(customFilters).every(filterKey => (
                    customFilters[ filterKey ].find(value => +value === +product[ filterKey ])
                ));

                if (isCorrectVariant) correctVariants.push(product);

                return correctVariants;
            }, []);

            if (correctVariants.length !== 1) {
                return (
                    <Link
                      to={ linkTo }
                      tabIndex={ url_key ? '0' : '-1' }
                      onClick={ this.handleConfigurableClick }
                    >
                        <span>{ __('Configure Product') }</span>
                    </Link>
                );
            }
        }

        if (type_id === 'grouped') {
            return (
                <Link to={ linkTo } tabIndex={ url_key ? '0' : '-1' }>
                    <span>{ __('View details') }</span>
                </Link>
            );
        }

        return (
            <AddToCart
              product={ product }
              configurableVariantIndex={ variantIndex }
              fullWidth
              removeWishlistItem
            />
        );
    }

    render() {
        const {
            product: {
                name,
                url_key,
                brand,
                type_id,
                variants
            },
            product,
            arePlaceholdersShown
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

        const { price } = type_id === 'configurable' && variants
            ? variants[this.getCurrentVariantIndex()].product
            : product;

        return (
            <li block="ProductCard" mods={ { isLoading } }>
                <TagName
                  to={ linkTo }
                  tabIndex={ url_key ? '0' : '-1' }
                >
                    <Image
                      src={ thumbnail && `/media/jpg/catalog/product${ thumbnail }` }
                      alt={ __('Product Thumbnail') }
                      arePlaceholdersShown={ arePlaceholdersShown }
                      showGreyPlaceholder={ !url_key }
                    />
                    <span block="ProductCard" elem="Brand">
                        <TextPlaceholder content={ brand } />
                    </span>
                    <h4><TextPlaceholder content={ name } /></h4>
                    { price && <ProductPrice price={ price } /> }
                </TagName>
                <div block="ProductCard" elem="Actions">
                    { price
                        ? this.addOrConfigureProduct(variantIndex, linkTo)
                        : <TextPlaceholder length="medium" />
                    }
                    { price
                        ? (
                            <ProductWishlistButton
                              product={ product }
                              fullWidth
                            />
                        )
                        : <TextPlaceholder length="medium" />
                    }
                </div>
            </li>
        );
    }
}

ProductCard.propTypes = {
    product: ProductType.isRequired,
    customFilters: FilterType,
    arePlaceholdersShown: PropTypes.bool,
    wishlistItem: PropTypes.bool,
    updateProductToBeRemovedAfterAdd: PropTypes.func.isRequired
};

ProductCard.defaultProps = {
    customFilters: {},
    arePlaceholdersShown: false,
    wishlistItem: false
};

export default ProductCard;
