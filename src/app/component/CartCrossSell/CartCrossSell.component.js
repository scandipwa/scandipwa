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

import ContentWrapper from 'Component/ContentWrapper';
import ProductCard from 'Component/ProductCard';
import { ProductType } from 'Type/ProductList';

import './CartCrossSell.style';

const NUMBER_OF_DISPLAYED_PRODUCTS = 5;

/**
 * CartCrossSell component
 * @class CartCrossSell
 */
class CartCrossSell extends PureComponent {
    static propTypes = {
        linkedProducts: PropTypes.objectOf(ProductType).isRequired
    };

    renderProductCard(product, i) {
        const { id = i } = product;

        return (
            <ProductCard
              block="CartCrossSell"
              elem="Card"
              product={ product }
              key={ id }
            />
        );
    }

    renderItems() {
        const { linkedProducts: { crossSell: { items } } } = this.props;

        if (!items) {
            return Array.from(
                { length: NUMBER_OF_DISPLAYED_PRODUCTS },
                (_, i) => this.renderProductCard({}, i)
            );
        }

        return items.map(this.renderProductCard)
            .slice(0, NUMBER_OF_DISPLAYED_PRODUCTS);
    }

    renderHeading() {
        return (
            <h2 block="CartCrossSell" elem="Title">
                { __('Check our recommended products') }
            </h2>
        );
    }

    render() {
        return (
            <ContentWrapper
              mix={ { block: 'CartCrossSell' } }
              wrapperMix={ { block: 'CartCrossSell', elem: 'Wrapper' } }
              label={ __('Recommended products') }
            >
                { this.renderHeading() }
                <ul block="CartCrossSell" elem="List">
                    { this.renderItems() }
                </ul>
            </ContentWrapper>
        );
    }
}

export default CartCrossSell;
