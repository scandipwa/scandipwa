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
import { ProductType } from 'Type/ProductList';
import './UpsellProducts.style';

export const NUMBER_OF_DISPLAYED_PRODUCTS = 4;

/**
 * WorthLookingInto product feed
 * @class WorthLookingInto
 */
export class UpsellProducts extends PureComponent {
    static propTypes = {
        linkedProducts: PropTypes.objectOf(ProductType).isRequired
    };

    renderProductCard(product, i) {
        const { id = i } = product;

        return (
            <ProductCard
              block="UpsellProducts"
              elem="Card"
              product={ product }
              key={ id }
            />
        );
    }

    renderItems() {
        const { linkedProducts: { upsell: { items } } } = this.props;

        if (!items) {
            return Array.from(
                { length: NUMBER_OF_DISPLAYED_PRODUCTS },
                (_, i) => this.renderProductCard({}, i)
            );
        }

        return items.map(this.renderProductCard);
    }

    renderHeading() {
        return (
            <h2 block="UpsellProducts" elem="Title">
                { __('Worth looking into') }
            </h2>
        );
    }

    render() {
        return (
            <ContentWrapper
              mix={ { block: 'UpsellProducts' } }
              wrapperMix={ { block: 'UpsellProducts', elem: 'Wrapper' } }
              label={ __('Upsell products') }
            >
                { this.renderHeading() }
                <ul block="UpsellProducts" elem="List">
                    { this.renderItems() }
                </ul>
            </ContentWrapper>
        );
    }
}

export default UpsellProducts;
