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

    addOrConfigureProduct(variantIndex, linkTo) {
        const { customFilters, product: { url_key, variants, type_id } } = this.props;

        if (variants && type_id === 'configurable') {
            const correctVariants = variants.reduce((correctVariants, { product }) => {
                const isCorrectVariant = Object.keys(customFilters).every(filterKey => (
                    customFilters[ filterKey ].find(value => +value === product[ filterKey ])
                ));

                if (isCorrectVariant) correctVariants.push(product);

                return correctVariants;
            }, []);

            const hasNoMoreOptions = correctVariants.length === 1;

            if (!hasNoMoreOptions) {
                return (
                    <Link to={ linkTo } tabIndex={ url_key ? '0' : '-1' }>
                        <span>Configure Product</span>
                    </Link>
                );
            }
        }

        return <AddToCart onClick={ () => this.addProduct(variantIndex) } fullWidth />;
    }

    /**
     * Dispatch add product to cart
     * @return {void}
     */
    addProduct(configurableVariantIndex) {
        const {
            addProduct,
            product,
            product: { variants }
        } = this.props;

        if (variants) {
            const configurableProduct = {
                ...product,
                configurableVariantIndex
            };

            addProduct({ product: configurableProduct, quantity: 1 });
        } else {
            addProduct({ product, quantity: 1 });
        }
        return null;
    }

    render() {
        const {
            product: {
                name,
                price,
                url_key,
                brand
            },
            product
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
                </div>
            </li>
        );
    }
}

ProductCard.propTypes = {
    product: ProductType.isRequired,
    addProduct: PropTypes.func.isRequired,
    customFilters: PropTypes.objectOf(PropTypes.array)
};

ProductCard.defaultProps = {
    customFilters: {}
};

export default ProductCard;
