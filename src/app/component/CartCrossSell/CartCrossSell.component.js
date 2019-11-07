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
import ContentWrapper from 'Component/ContentWrapper';
import ProductCard from 'Component/ProductCard';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ProductType } from 'Type/ProductList';
import './CartCrossSell.style';

const NUMBER_OF_DISPLAYED_PRODUCTS = 6;

/**
 * CartCrossSell component
 * @class CartCrossSell
 */
class CartCrossSell extends PureComponent {
    /**
     * Render individual product card
     * @param product
     * @returns {*}
     */
    renderProductCard(product) {
        const { variants } = product;
        const modifiedProduct = {
            ...product,
            variants: variants.map(({ product }) => product)
        };

        return (
            <ProductCard
              block="CartCrossSellProducts"
              elem="Card"
              product={ modifiedProduct }
              key={ modifiedProduct.id }
              showName
            />
        );
    }

    /**
     * Render placeholder card when products are loading
     * @param i
     * @returns {*}
     */
    renderPlaceholderCard(i) {
        return (
                <ProductCard
                  block="CartCrossSellProducts"
                  elem="Card"
                  key={ i }
                  product={ {} }
                />
        );
    }

    render() {
        const {
            linkedProducts: { crossSell: { items, total_count } },
            products
        } = this.props;
        const productIsLoaded = products.length !== 0;

        if (!productIsLoaded || total_count === 0) return null;

        const hasCrossSells = products.some(passedProduct => (
            passedProduct.product.product_links
            && passedProduct.product.product_links.some(({ link_type }) => link_type === 'crosssell')
        ));

        if (!hasCrossSells) return null;

        return (
            <ContentWrapper
              mix={ { block: 'CrossSellProducts' } }
              wrapperMix={ { block: 'CrossSellProducts', elem: 'Wrapper' } }
              label={ __('CrossSell products') }
            >
                <h3 block="CrossSellProducts" elem="Title">
                <TextPlaceholder
                  content={ total_count > 0 ? __('Members Who Bought This Item Also Bought') : '' }
                />
                </h3>
                <ul block="CrossSellProducts" elem="List">
                { items
                    ? items.map(product => (
                        this.renderProductCard(product)
                    ))
                    : Array(NUMBER_OF_DISPLAYED_PRODUCTS).fill().map((_, i) => (
                        this.renderPlaceholderCard(i)
                    )) }
                </ul>
            </ContentWrapper>
        );
    }
}

CartCrossSell.propTypes = {
    products: PropTypes.array,
    linkedProducts: PropTypes.objectOf(ProductType).isRequired
};

CartCrossSell.defaultProps = {
    products: []
};

export default CartCrossSell;
