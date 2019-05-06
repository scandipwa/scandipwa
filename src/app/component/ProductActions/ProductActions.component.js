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
import ExpandableContent from 'Component/ExpandableContent';
import RelatedProducts from 'Component/RelatedProducts';
import Html from 'Component/Html';
import './ProductActions.style';
import ProductInformation from 'Component/ProductInformation';

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

    renderRelatedProducts() {
        const { product, areDetailsLoaded } = this.props;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'related' } }
              aria-label="Related products"
            >
                <h4
                  block="ProductActions"
                  elem="SectionHeading"
                  mods={ { type: 'related' } }
                >
                    Scandipwa recommends
                </h4>
                <RelatedProducts
                  product={ product }
                  areDetailsLoaded={ areDetailsLoaded }
                />
            </section>
        );
    }

    renderAdditionalInformation() {
        const { product } = this.props;

        return <ProductInformation product={ product } type="expandable" />;
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
                <span className="sku">SKU: { sku }</span>
                <span className="stock">In Stock</span>
            </section>
        );
    }

    renderShortDescription() {
        const { product: { short_description } } = this.props;

        if (!short_description) return null;

        const { html } = short_description;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'short-description' } }
              aria-label="Product short description"
            >
                <Html content={ html } />
            </section>
        );
    }

    renderShortProductInformation() {
        const { product: { brand, short_description, name } } = this.props;

        if (!short_description) return null;

        const { html } = short_description;

        return (
            <section
              block="ProductActions"
              elem="Section"
              mods={ { type: 'short' } }
              aria-label="Product short description"
            >
                <h4
                  block="ProductActions"
                  elem="SectionHeading"
                  mods={ { type: 'short' } }
                >
                    { brand }
                </h4>
                <div
                  block="ProductActions"
                  elem="SectionContent"
                  mods={ { type: 'short-desc' } }
                >
                    <Html content={ html } />
                </div>
                <p
                  block="ProductActions"
                  elem="SectionContent"
                  mods={ { type: 'short-name' } }
                >
                    { name }
                </p>
            </section>
        );
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

        return Object.entries(availableFilters).map(([code, option]) => {
            if (code === 'color') return null;

            const { label: optionLabel, values } = option;

            return (
                <section
                  key={ code }
                  block="ProductActions"
                  elem="Section"
                  mods={ { type: optionLabel.toLowerCase() } }
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
            return (
                <section block="ProductActions" elem="Colors" aria-label="Color options">
                    { new Array(4).fill().map((_, i) => (
                        <Swatch
                          key={ i }
                          requestVar="color"
                        />
                    )) }
                </section>
            );
        }

        const { values: colorOptions } = color;

        return (
            <section block="ProductActions" elem="Colors" aria-label="Color options">
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
                { this.renderShortProductInformation() }
                { this.renderSkuAndStock() }
                { this.renderShortDescription() }
                { this.renderAdditionalInformation() }
                { this.renderRelatedProducts() }
            </article>
        );
    }
}

ProductActions.propTypes = {
    product: ProductType.isRequired,
    availableFilters: PropTypes.objectOf(PropTypes.shape).isRequired,
    configurableVariantIndex: PropTypes.number,
    areDetailsLoaded: PropTypes.bool.isRequired,
    updateConfigurableVariantIndex: PropTypes.func.isRequired
    // groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired
};

ProductActions.defaultProps = {
    configurableVariantIndex: 0
};

export default ProductActions;
