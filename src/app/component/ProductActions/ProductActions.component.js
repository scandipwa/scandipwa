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
import Field from 'Component/Field';
import Swatch from 'Component/Swatch';
import TextPlaceholder from 'Component/TextPlaceholder';
import ProductPrice from 'Component/ProductPrice';
import AddToCart from 'Component/AddToCart';
import ProductWishlistButton from 'Component/ProductWishlistButton';
import './ProductActions.style';

/**
 * Product actions
 * @class ProductActions
 */
class ProductActions extends Component {
    constructor(props) {
        super(props);
        this.state = { itemCount: 1 };

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    /**
     * Get hex color from color value
     * @param {Number} colorValue
     * @return {void}
     */
    getBackgroundColorForColorFilter(colorValue) {
        const { product: { attributes } } = this.props;

        for (const { attribute_code, attribute_options } of attributes) {
            if (attribute_code === 'color') {
                for (const { value, swatch_data: { value: hexColor } } of attribute_options) {
                    if (parseInt(value, 10) === colorValue) {
                        return hexColor;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Get custom fitler label
     * @param {Number} value custom filter value
     * @param {String} attributeCode
     * @return {void}
     */
    getCustomFilterLabel(value, attributeCode) {
        const { product: { attributes } } = this.props;

        for (let i = 0; i < attributes.length; i++) {
            const { attribute_code, attribute_options } = attributes[i];

            if (attribute_code === attributeCode) {
                for (let j = 0; j < attribute_options.length; j++) {
                    const { value: value_string, swatch_data: { value: swatchValue } } = attribute_options[j];
                    
                    if (parseInt(value_string, 10) === value) {
                        return swatchValue;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Check that all page data is loaded
     * @return {Boolean}
     */
    allDataLoaded() {
        const { product: { attributes, price, type_id, configurable_options } } = this.props;
        const simpleProductData = price && attributes;
        const configurableProductData = simpleProductData && configurable_options;

        return type_id === 'configurable' ? configurableProductData : simpleProductData;
    }

    /**
     * Handle configurable value change
     * @param {Number} value custom filter value
     * @param {String} attributeCode
     * @return {void}
     */
    // changeConfigurableVariant(attributeCode, value) {
    //     const {
    //         product: {
    //             variants,
    //             configurable_options
    //         },
    //         updateConfigurableVariantIndex,
    //         configurableVariantIndex
    //     } = this.props;

    //     const {
    //         product: currentConfigurableVariant
    //     } = variants[configurableVariantIndex];

    //     const currentVariant = { ...currentConfigurableVariant, parametres: { [attributeCode]: value } };

    //     console.log(currentVariant);
    //     // fixed here??
    //     // currentVariant.parametres[attributeCode] = value;

    //     for (let i = 0; i < variants.length; i++) {
    //         const { product } = variants[i];
    //         // console.log(variants,'test', configurable_options, product.parametres, currentVariant.parametres);
    //         const isCorrectVariant = configurable_options.every(
    //             // fixed here??
    //             ({ attribute_code: code }) => parseInt(product.parametres[code], 10) === parseInt(currentVariant.parametres[code], 10)
    //         );
    //         // console.log(isCorrectVariant, i);
    //         if (isCorrectVariant) {
    //             updateConfigurableVariantIndex(i);
    //             // console.log(i);
    //             break;
    //         }
    //     }
    // }

    /**
     * Handle onKeyDown event
     * @param {Object} event onKeyDown event
     * @returns {void}
     */
    handleKeyPress(event) {
        const key = event.key || event.keyCode;

        // Ignore comma (",")
        if (key === ',' || key === 188) {
            event.preventDefault();
        }
    }

    renderConfigurableSimpleProduct() {
        const { product: { type_id, variants }, product, configurableVariantIndex } = this.props;
        const { itemCount } = this.state;
        const isConfigurable = type_id === 'configurable';

        const { price } = isConfigurable && variants ? variants[configurableVariantIndex].product : product;

        return (
            <>
                { isConfigurable ? this.renderConfigurableSwatches() : this.renderSimpleSwatches() }
                <ProductPrice price={ price } />
                <Field
                  type="number"
                  id="HeaderInput"
                  onChange={ itemCount => this.setState({ itemCount }) }
                  onKeyPress={ event => this.handleKeyPress(event) }
                  value={ itemCount }
                />
            </>
        );
    }

    renderProductActions() {
        const {
            product: { type_id },
            product,
            configurableVariantIndex,
            groupedProductQuantity
        } = this.props;
        const { itemCount } = this.state;
        const isGrouped = type_id === 'grouped';

        return (
            <>
                { !isGrouped && this.renderConfigurableSimpleProduct() }
                <AddToCart
                  quantity={ itemCount }
                  product={ product }
                  configurableVariantIndex={ configurableVariantIndex }
                  groupedProductQuantity={ groupedProductQuantity }
                />
                <ProductWishlistButton
                  product={ product }
                />
            </>
        );
    }

    /**
     * Render configurable swatch, return null if configurable does not exist by variant or not yet loaded
     */
    renderConfigurableSwatches() {
        const { product: { configurable_options, variants }, configurableVariantIndex, areDetailsLoaded } = this.props;
        const configurableExists = variants[configurableVariantIndex] && areDetailsLoaded;

        if (!configurableExists) {
            return this.renderSwatchPlaceholder();
        }

        const { product: currentConfigurableVariant } = variants[configurableVariantIndex];

        const renderAvailableValues = (configurableOption) => {
            const { values, attribute_code } = configurableOption;
            const isColorOption = attribute_code === 'color';

            const returnLabel = value => this.getCustomFilterLabel(value.value_index, attribute_code);

            const backgroundColor = value => (
                isColorOption ? this.getBackgroundColorForColorFilter(value) : false
            );

            const isSelected = value => (
                // fixed here??
                value === parseInt(currentConfigurableVariant.parametres[attribute_code], 10)
            );

            return values.map(value => (
                <li key={ value.value_index }>
                    <Swatch
                      title={ isColorOption ? '' : returnLabel(value) }
                      isRound={ isColorOption }
                      isSelected={ isSelected(value.value_index) }
                      backgroundColor={ backgroundColor(value.value_index) }
                      handler={ () => this.changeConfigurableVariant(attribute_code, value.value_index) }
                      arePlaceholdersShown
                    />
                </li>
            ));
        };

        const renderOptions = () => (
            configurable_options.map(option => (
                <li key={ option.id }>
                    <h4>{ option.label }</h4>
                    <ul block="ProductActions" elem="SwatchesConfigurable">
                        { renderAvailableValues(option) }
                    </ul>
                </li>
            ))
        );

        return (
            <ul block="ProductActions" elem="ConfigurableOptions">
                { renderOptions() }
            </ul>
        );
    }

    renderSimpleSwatches() {
        const { product, product: { attributes } } = this.props;

        const renderSwatch = (attribute) => {
            const {
                attribute_code, attribute_label, attribute_value, attribute_options
            } = attribute;
            const isColor = attribute_code === 'color';
            const option = attribute_options ? attribute_options.find(({ value }) => value === attribute_value) : {};
            const label = option ? (() => {
                if (!Object.keys(option)) return attribute_value;
                if (!option.swatch_data) return option.label;
                return option.swatch_data.value;
            })() : null;

            if (label) {
                return (
                    <li key={ attribute_code }>
                        <h4>{ attribute_label }</h4>
                        <Swatch
                          title={ isColor ? '' : label }
                          isRound={ isColor }
                          backgroundColor={ isColor ? label : '' }
                          arePlaceholdersShown
                          handler={ () => {} }
                          isSelected
                        />
                    </li>
                );
            }

            return null;
        };

        const renderAvailableAttributes = () => {
            if (attributes.length) {
                return attributes.map((attribute) => {
                    const { attribute_code } = attribute;
                    // fixed here??
                    if (product.parametres[attribute_code]) {
                        return renderSwatch(attribute);
                    }

                    return null;
                });
            }

            return null;
        };

        return (
            <ul block="ProductActions" elem="SwatchesSimple">
                { renderAvailableAttributes() }
            </ul>
        );
    }

    renderSwatchPlaceholder() {
        return (
            <ul block="ProductActions" elem="ConfigurableOptions">
                { Array(2).fill().map((_, i) => (
                    <li key={ i }>
                        <h4><TextPlaceholder length="short" /></h4>
                        <ul block="ProductActions" elem="SwatchesConfigurable">
                            { Array(4).fill().map((_, i) => <li key={ i }><Swatch /></li>) }
                        </ul>
                    </li>
                )) }
            </ul>
        );
    }

    renderPlaceholder() {
        return (
            <>
                { this.renderSwatchPlaceholder() }
                <h4 block="ProductActions" elem="PricePlaceholder"><TextPlaceholder length="short" /></h4>
                <h3 block="ProductActions" elem="AddToCartPlaceholder">
                    <TextPlaceholder length="short" />
                </h3>
            </>
        );
    }

    render() {
        return (
            <div block="ProductActions">
                { this.allDataLoaded() ? this.renderProductActions() : this.renderPlaceholder() }
            </div>
        );
    }
}

ProductActions.propTypes = {
    product: ProductType.isRequired,
    configurableVariantIndex: PropTypes.number.isRequired,
    updateConfigurableVariantIndex: PropTypes.func.isRequired,
    groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

export default ProductActions;
