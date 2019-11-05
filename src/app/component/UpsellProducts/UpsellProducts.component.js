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
import './UpsellProducts.style';

export const NUMBER_OF_DISPLAYED_PRODUCTS = 4;

/**
 * WorthLookingInto product feed
 * @class WorthLookingInto
 */
export class UpsellProducts extends PureComponent {
    /**
     * Render individual product card
     * @param product
     * @returns {*}
     */
    renderProductCard(product) {
        return (
            <ProductCard
              block="UpsellProducts"
              elem="Card"
              product={ product }
              key={ product.id }
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
              block="UpsellProducts"
              elem="Card"
              key={ i }
              product={ {} }
            />
        );
    }

    render() {
        const {
            linkedProducts: { upsell: { items, total_count } },
            products,
            label
        } = this.props;
        const productIsLoaded = products.length !== 0;

        if (!productIsLoaded || !products[0].product_links) return null;

        const hasUpSells = products.some(passedProduct => (
            passedProduct.product_links
            && passedProduct.product_links.some(({ link_type }) => link_type === 'upsell')
        ));

        if (!hasUpSells) return null;
        return (
            <ContentWrapper
              mix={ { block: 'UpsellProducts' } }
              wrapperMix={ { block: 'UpsellProducts', elem: 'Wrapper' } }
              label={ __('WorthLookingInto products') }
            >
                <h4 block="UpsellProducts" elem="Title">
                    <TextPlaceholder
                      content={ total_count > 0 ? label : '' }
                    />
                </h4>
                <ul block="UpsellProducts" elem="List">
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

UpsellProducts.propTypes = {
    products: PropTypes.array,
    linkedProducts: PropTypes.objectOf(ProductType).isRequired,
    label: PropTypes.string.isRequired
};

UpsellProducts.defaultProps = {
    products: []
};

export default UpsellProducts;
