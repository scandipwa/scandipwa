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
import { createRef, PureComponent } from 'react';

import ProductCard from '../ProductCard';
import { ProductType } from '../../../../../../../123/src/app/type/ProductList';
import CSS from '../../../../../../../123/src/app/util/CSS';

import './NewProducts.style';

/** @namespace Component/NewProducts/Component */
export class NewProducts extends PureComponent {
    static propTypes = {
        products: PropTypes.arrayOf(ProductType),
        productsPerPage: PropTypes.number
    };

    static defaultProps = {
        products: Array.from({ length: 4 }, () => ({})),
        productsPerPage: 4
    };

    newProductsRef = createRef();

    componentDidMount() {
        this.setStyles();
    }

    componentDidUpdate() {
        this.setStyles();
    }

    setStyles() {
        const { productsPerPage } = this.props;
        CSS.setVariable(this.newProductsRef, 'new-products-per-page-count', productsPerPage);
    }

    render() {
        const { products } = this.props;
        return (
            <section block="NewProducts" ref={ this.newProductsRef }>
                <h3>{ __('New Products') }</h3>
                <ul block="NewProducts" elem="Products">
                    { products.map((product, i) => (
                        <ProductCard
                          key={ product.id || i }
                          product={ product }
                        />
                    )) }
                </ul>
            </section>
        );
    }
}

export default NewProducts;
