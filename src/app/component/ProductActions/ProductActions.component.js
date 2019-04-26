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

/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
// Disabled due placeholder needs

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProductType } from 'Type/ProductList';
import Swatch from 'Component/Swatch';
import ProductPrice from 'Component/ProductPrice';
import AddToCart from 'Component/AddToCart';
import './ProductActions.style';

/**
 * Product actions
 * @class ProductActions
 */
class ProductActions extends Component {
    // TODO: make key=>value based
    getIsOptionInCurrentVariant(attribute, value) {
        const { configurableVariantIndex, product: { variants } } = this.props;
        return variants[configurableVariantIndex].product[attribute] === value;
    }

    renderShortProductInformation() {
        const { product } = this.props;

        console.log(product);
    }

    renderAddToCart() {
        const { configurableVariantIndex, product } = this.props;

        return (
            <AddToCart
              product={ product }
              configurableVariantIndex={ configurableVariantIndex }
              mix={ {
                  block: 'ProductActions',
                  elem: 'AddToCart'
              } }
            />
        );
    }

    renderPrice() {
        const { product: { price } } = this.props;

        return (
            <ProductPrice
              price={ price }
              mix={ {
                  block: 'ProductActions',
                  elem: 'Price'
              } }
            />
        );
    }

    renderOtherOptions() {
        const { availableFilters } = this.props;

        delete availableFilters.color;

        return Object.entries(availableFilters).map(([code, option]) => {
            const { label: optionLabel, values } = option;

            return (
                <section
                  key={ code }
                  block="ProductActions"
                  elem="Section"
                  aria-label={ `${ optionLabel } options` }
                >
                    <h4 block="ProductActions" elem="SectionHeading">{ optionLabel }</h4>
                    { values.map(({ value, label, id }) => (
                        <Swatch
                          key={ id }
                          mix={ { block: 'ProductActions', elem: 'TextOption' } }
                          isSelected={ this.getIsOptionInCurrentVariant(code, id) }
                          filterItem={ { label, swatch_data: { value } } }
                          requestVar={ code }
                        />
                    )) }
                </section>
            );
        });
    }

    renderColorOptions() {
        const { availableFilters: { color } } = this.props;

        if (!color) return null;

        const { values: colorOptions } = color;

        return (
            <section block="ProductActions" elem="Colors" aria-label="Color options">
                { colorOptions.map(({ value, label, id }) => (
                    <Swatch
                      key={ id }
                      isSelected={ this.getIsOptionInCurrentVariant('color', id) }
                      filterItem={ { label, swatch_data: { value } } }
                      requestVar="color"
                    />
                )) }
            </section>
        );
    }

    render() {
        return (
            <article block="ProductActions">
                { this.renderColorOptions() }
                { this.renderPrice() }
                { this.renderAddToCart() }
                { this.renderOtherOptions() }
                { this.renderShortProductInformation() }
            </article>
        );
    }
}

ProductActions.propTypes = {
    product: ProductType.isRequired,
    availableFilters: PropTypes.objectOf(PropTypes.shape).isRequired,
    configurableVariantIndex: PropTypes.number.isRequired,
    updateConfigurableVariantIndex: PropTypes.func.isRequired,
    groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

export default ProductActions;
