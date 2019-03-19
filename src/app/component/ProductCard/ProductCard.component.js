import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import Image from 'Component/Image';
import AddToCart from 'Component/AddToCart';
import { ProductType } from 'Type/ProductList';
import './ProductCard.style';

/**
 * Product card
 * @class ProductCard
 */
class ProductCard extends Component {
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
        const variantThumbnail = variants ? variants[ currentVariantIndex ].product.thumbnail : null;
        return variantThumbnail || thumbnail;
    }

    /**
     * Dispatch add product to cart
     * @return {void}
     */
    addProduct() {
        const { addProduct, product } = this.props;
        addProduct({ product, quantity: 1 });
    }

    render() {
        const {
            product: {
                name,
                price,
                url_key,
                brand
            },
            product,
            arePlaceholdersShown
        } = this.props;

        const variantIndex = this.getCurrentVariantIndex();
        const thumbnail = this.getThumbnail(variantIndex);
        const TagName = url_key ? Link : 'div';
        const isLoading = !url_key;
        const linkTo = url_key ? { pathname: `/product/${ url_key }`, state: { product, variantIndex } } : undefined;

        return (
            <li block="ProductCard" mods={ { isLoading } }>
                <TagName
                  to={ linkTo }
                  tabIndex={ url_key ? '0' : '-1' }
                >
                    <Image
                      src={ thumbnail ? `/media/jpg/catalog/product${ thumbnail }` : null }
                      alt="Product Thumbnail"
                      arePlaceholdersShown={ arePlaceholdersShown }
                    />
                    <span block="ProductCard" elem="Brand">
                        <TextPlaceholder content={ brand } />
                    </span>
                    <h4><TextPlaceholder content={ name } /></h4>
                    { price && <ProductPrice price={ price } /> }
                </TagName>
                <div block="ProductCard" elem="Actions">
                    { price
                        ? <AddToCart onClick={ () => this.addProduct() } fullWidth />
                        : <TextPlaceholder length="medium" />
                    }
                </div>
            </li>
        );
    }
}

ProductCard.propTypes = {
    product: ProductType.isRequired,
    addProduct: PropTypes.func.isRequired,
    customFilters: PropTypes.objectOf(PropTypes.array),
    arePlaceholdersShown: PropTypes.bool
};

ProductCard.defaultProps = {
    customFilters: {},
    arePlaceholdersShown: false
};

export default ProductCard;
