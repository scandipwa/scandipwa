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

import PropTypes from 'prop-types';
import { Component, createRef } from 'react';

import ProductCard from 'Component/ProductCard';
import { ProductCardPropsType, ProductType } from 'Type/ProductList.type';
import CSS from 'Util/CSS';

import './NewProducts.style';

/** @namespace Component/NewProducts/Component */
export class NewProducts extends Component {
    static propTypes = {
        products: PropTypes.arrayOf(ProductType),
        productsPerPage: PropTypes.number.isRequired,
        productCardProps: ProductCardPropsType.isRequired,
        productCardFunctions: PropTypes.objectOf(PropTypes.func).isRequired
    };

    static defaultProps = {
        products: Array.from({ length: 4 }, () => ({}))
    };

    newProductsRef = createRef();

    renderProductCard = this.renderProductCard.bind(this);

    componentDidMount() {
        this.setStyles();
    }

    shouldComponentUpdate(nextProps) {
        const { products, productsPerPage } = this.props;
        const {
            products: nextProducts,
            productsPerPage: nextProductsPerPage
        } = nextProps;

        return products !== nextProducts || productsPerPage !== nextProductsPerPage;
    }

    componentDidUpdate() {
        this.setStyles();
    }

    setStyles() {
        const { productsPerPage } = this.props;
        CSS.setVariable(this.newProductsRef, 'new-products-per-page-count', productsPerPage);
    }

    renderProductCard(product, i) {
        const {
            productCardProps: {
                siblingsHaveBrands,
                siblingsHavePriceBadge,
                siblingsHaveTierPrice,
                siblingsHaveConfigurableOptions
            },
            productCardFunctions: {
                setSiblingsHaveBrands,
                setSiblingsHavePriceBadge,
                setSiblingsHaveTierPrice,
                setSiblingsHaveConfigurableOptions
            }
        } = this.props;

        return (
            <ProductCard
              key={ product.id || i }
              product={ product }
              siblingsHaveBrands={ siblingsHaveBrands }
              siblingsHavePriceBadge={ siblingsHavePriceBadge }
              siblingsHaveTierPrice={ siblingsHaveTierPrice }
              siblingsHaveConfigurableOptions={ siblingsHaveConfigurableOptions }
              setSiblingsHaveBrands={ setSiblingsHaveBrands }
              setSiblingsHavePriceBadge={ setSiblingsHavePriceBadge }
              setSiblingsHaveTierPrice={ setSiblingsHaveTierPrice }
              setSiblingsHaveConfigurableOptions={ setSiblingsHaveConfigurableOptions }
            />
        );
    }

    render() {
        const { products } = this.props;

        return (
            <section block="NewProducts" ref={ this.newProductsRef }>
                <h2>{ __('New Products') }</h2>
                <ul block="NewProducts" elem="Products">
                    { products.map(this.renderProductCard) }
                </ul>
            </section>
        );
    }
}

export default NewProducts;
