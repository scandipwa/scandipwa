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
import Html from 'Component/Html';
import './ProductActions.style';
import TextPlaceholder from 'Component/TextPlaceholder';

/**
 * Product actions
 * @class ProductActions
 */
class ProductActions extends Component {
    constructor(props) {
        super(props);

        this.optionsInCurrentVariant = {};
    }

    // TODO: make key=>value based
    getIsOptionInCurrentVariant(attribute, value) {
        const { configurableVariantIndex, product: { variants } } = this.props;
        if (!variants) return false;
        return variants[configurableVariantIndex].product[attribute] === value;
    }

    changeConfigurableVariant(attributeCode, value) {
        const {
            product: {
                variants,
                configurable_options
            },
            updateConfigurableVariantIndex,
            configurableVariantIndex
        } = this.props;

        const {
            product: currentConfigurableVariant
        } = variants[configurableVariantIndex];

        const currentVariant = {
            ...currentConfigurableVariant,
            [attributeCode]: value
        };

        for (let i = 0; i < variants.length; i++) {
            const { product } = variants[i];

            const isCorrectVariant = configurable_options.every(({ attribute_code }) => (
                product[attribute_code] === currentVariant[attribute_code]
            ));

            if (isCorrectVariant) return updateConfigurableVariantIndex(i);
        }

        return null;
    }

    showOnlyIfLoaded(expression, content, placeholder = content) {
        const { areDetailsLoaded } = this.props;

        if (!areDetailsLoaded) return placeholder;
        if (areDetailsLoaded && !expression) return null;
        return content;
    }

    renderSkuAndStock() {
        const { product: { sku } } = this.props;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'sku' } }
              aria-label="Product SKU and availability"
            >
                { this.showOnlyIfLoaded(
                    sku,
                    (<>
                        <span block="ProductActions" elem="Sku">{ `SKU: ${ sku }` }</span>
                        <span block="ProductActions" elem="Stock">In Stock</span>
                    </>),
                    <TextPlaceholder />
                ) }
            </section>
        );
    }

    renderShortDescription() {
        const { product: { short_description, brand } } = this.props;
        const { html } = short_description || {};

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'short' } }
              aria-label="Product short description"
            >
                { this.showOnlyIfLoaded(
                    brand,
                    (
                        <h4
                          block="ProductActions"
                          elem="SectionHeading"
                          mods={ { type: 'brand' } }
                        >
                            <TextPlaceholder content={ brand } />
                        </h4>
                    )
                ) }
                <div block="ProductActions" elem="ShortDescription">
                    { html ? <Html content={ html } /> : <TextPlaceholder length="long" /> }
                </div>
            </section>
        );
    }

    renderNameAndBrand() {
        const { product: { brand, name } } = this.props;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'name' } }
              aria-label="Product name information"
            >
                { this.showOnlyIfLoaded(
                    brand,
                    (
                        <h4 block="ProductActions" elem="Brand">
                            <TextPlaceholder content={ brand } />
                        </h4>
                    )
                ) }
                <p block="ProductActions" elem="Title">
                    <TextPlaceholder content={ name } length="medium" />
                </p>
            </section>
        );
    }

    renderAddToCart() {
        const { configurableVariantIndex, product } = this.props;

        return (
            <div block="ProductActions" elem="AddToCartWrapper">
                <AddToCart
                  product={ product }
                  configurableVariantIndex={ configurableVariantIndex }
                  mix={ { block: 'ProductActions', elem: 'AddToCart' } }
                />
            </div>
        );
    }

    renderPrice() {
        const { product: { price } } = this.props;

        return (
            <ProductPrice
              price={ price }
              mix={ { block: 'ProductActions', elem: 'Price' } }
            />
        );
    }

    renderOtherOptions() {
        const { availableFilters } = this.props;
        const hasAvailableFilter = Object.keys(availableFilters).length;

        if (!hasAvailableFilter) {
            return this.showOnlyIfLoaded(
                hasAvailableFilter,
                (
                    <section
                      block="ProductActions"
                      elem="Section"
                      mix={ { block: 'ProductActions', elem: 'Option' } }
                      aria-label="Loading other options"
                    >
                        <h4 block="ProductActions" elem="SectionHeading">
                            <TextPlaceholder />
                        </h4>
                        { new Array(4).fill().map((_, i) => (
                            <Swatch
                              key={ i }
                              mix={ { block: 'ProductActions', elem: 'PlaceholderOption' } }
                              requestVar="placeholder"
                            />
                        )) }
                    </section>
                )
            );
        }

        return Object.entries(availableFilters).map(([code, option]) => {
            if (code === 'color') return null;

            const { label: optionLabel, values } = option;

            return (
                <section
                  key={ code }
                  block="ProductActions"
                  elem="Section"
                  mods={ { type: optionLabel.toLowerCase() } }
                  mix={ { block: 'ProductActions', elem: 'Option' } }
                  aria-label={ `${ optionLabel } options` }
                >
                    <h4 block="ProductActions" elem="SectionHeading">{ optionLabel }</h4>
                    { values.map(({ value, label, id }) => (
                        <Swatch
                          key={ id }
                          onClick={ () => this.changeConfigurableVariant(code, id) }
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

        if (!color) {
            return this.showOnlyIfLoaded(
                color,
                (
                    <section block="ProductActions" elem="Colors" aria-label="Color options">
                        <h4 block="ProductActions" elem="SectionHeading" mods={ { type: 'color' } }>
                            <TextPlaceholder />
                        </h4>
                        { new Array(4).fill().map((_, i) => (
                            <Swatch
                              key={ i }
                              requestVar="color"
                              mix={ { block: 'ProductActions', elem: 'Color' } }
                            />
                        )) }
                    </section>
                )
            );
        }

        const { values: colorOptions } = color;

        return (
            <section
              block="ProductActions"
              elem="Colors"
              aria-label="Color options"
            >
                <h4
                  block="ProductActions"
                  elem="SectionHeading"
                  mods={ { type: 'color' } }
                >
                    Color
                </h4>
                { colorOptions.map(({ value, label, id }) => (
                    <Swatch
                      key={ id }
                      mix={ { block: 'ProductActions', elem: 'Color' } }
                      onClick={ () => this.changeConfigurableVariant('color', id) }
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
                { this.renderNameAndBrand() }
                { this.renderSkuAndStock() }
                { this.renderShortDescription() }
            </article>
        );
    }
}

ProductActions.propTypes = {
    product: ProductType.isRequired,
    availableFilters: PropTypes.objectOf(PropTypes.shape).isRequired,
    configurableVariantIndex: PropTypes.number,
    updateConfigurableVariantIndex: PropTypes.func.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
    // groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired
};

ProductActions.defaultProps = {
    configurableVariantIndex: 0
};

export default ProductActions;
