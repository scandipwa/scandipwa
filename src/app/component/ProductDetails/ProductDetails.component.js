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
import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ProductType } from 'Type/ProductList';
import PropTypes from 'prop-types';
import './ProductDetails.style';

/**
 * Product details
 * @class ProductDetails
 */
class ProductDetails extends Component {
    /**
     * Render product SKU only when it's loaded
     */
    renderSku() {
        const { product: { variants, sku }, areDetailsLoaded, configurableVariantIndex } = this.props;

        if (areDetailsLoaded) {
            const { product } = configurableVariantIndex >= 0
                    && variants
                    && Object.keys(variants).length >= configurableVariantIndex
                ? variants[configurableVariantIndex] : '';

            return (
                <>
                    <span>SKU: </span>
                    <Html content={ product ? product.sku : sku } />
                    <span block="ProductDetails" elem="StockAvailable">In stock</span>
                </>
            );
        }

        return <TextPlaceholder length="medium" />;
    }

    renderShortDescription() {
        const { product: { short_description }, product } = this.props;

        if (product) {
            if (short_description) {
                const { html } = short_description;

                return (
                    <Html content={ html } />
                );
            }

            return null;
        }

        return (
            <p block="ProductDetails" elem="PlaceholderBlock">
                <TextPlaceholder length="long" />
                <TextPlaceholder length="medium" />
            </p>
        );
    }

    render() {
        const { product: { name, brand }, areDetailsLoaded } = this.props;

        return (
            <article block="ProductDetails">
                { !(!brand && areDetailsLoaded) && (
                    <p block="ProductDetails" elem="Brand">
                        <TextPlaceholder content={ brand } length="short" />
                    </p>
                ) }
                <h1 block="ProductDetails" elem="Title">
                    <TextPlaceholder content={ name } length="medium" />
                </h1>
                <p block="ProductDetails" elem="Sku">
                    { this.renderSku() }
                </p>
                <div block="ProductDetails" elem="ShortDescription">
                    { this.renderShortDescription() }
                </div>
            </article>
        );
    }
}

ProductDetails.propTypes = {
    product: ProductType.isRequired,
    configurableVariantIndex: PropTypes.number.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

export default ProductDetails;
