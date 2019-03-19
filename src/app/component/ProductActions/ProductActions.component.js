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
import './ProductActions.style';

/**
 * Product actions
 * @class ProductActions
 */
class ProductActions extends Component {
    constructor(props) {
        super(props);
        this.state = { itemCount: 1 };
    }

    /**
     * Get hex color from color value
     * @param {Number} colorValue
     * @return {void}
     */
    getBackgroundColorForColorFilter(colorValue) {
        const { availableFilters } = this.props;

        for (const { request_var, filter_items } of availableFilters) {
            if (request_var === 'color') {
                for (const { value_string, swatch_data: { value: hexColor } } of filter_items) {
                    if (+value_string === colorValue) {
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
        const { availableFilters } = this.props;

        for (let i = 0; i < availableFilters.length; i++) {
            const { filter_items, request_var } = availableFilters[i];

            if (request_var === attributeCode) {
                for (let j = 0; j < filter_items.length; j++) {
                    const { value_string, swatch_data: { value: swatchValue } } = filter_items[j];

                    if (parseInt(value_string, 10) === value) {
                        return swatchValue;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Dispatch add product to cart
     * @return {void}
     */
    addProduct() {
        const {
            addProduct, product, product: {
                variants
            }, configurableVariantIndex
        } = this.props;
        const { itemCount } = this.state;

        if (variants) {
            // mixing product data with variant to work properly in cart
            const configurableProduct = {
                ...product,
                configurableVariantIndex
            };

            addProduct({ product: configurableProduct, quantity: itemCount });
        } else {
            addProduct({ product, quantity: itemCount });
        }
    }

    /**
     * Check that all page data is loaded
     * @return {Boolean}
     */
    allDataLoaded() {
        const { availableFilters, product: { price, type_id, configurable_options } } = this.props;
        const simpleProductData = price && availableFilters;
        const configurableProductData = simpleProductData && configurable_options;

        return type_id === 'configurable' ? configurableProductData : simpleProductData;
    }

    /**
     * Handle configurable value change
     * @param {Number} value custom filter value
     * @param {String} attributeCode
     * @return {void}
     */
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

        const currentVariant = { ...currentConfigurableVariant };

        currentVariant[attributeCode] = value;

        for (let i = 0; i < variants.length; i++) {
            const { product } = variants[i];
            const isCorrectVariant = configurable_options.every(({ attribute_code }) => (
                product[attribute_code] === currentVariant[attribute_code]
            ));

            if (isCorrectVariant) {
                updateConfigurableVariantIndex(i);
                break;
            }
        }
    }

    renderProductActions() {
        const { product: { price, type_id } } = this.props;
        const { itemCount } = this.state;
        const isConfigurable = type_id === 'configurable';

        return (
            <>
                { isConfigurable ? this.renderConfigurableSwatches() : this.renderSimpleSwatches() }
                <ProductPrice price={ price } />
                <Field
                  type="number"
                  id="HeaderInput"
                  onChange={ itemCount => this.setState({ itemCount }) }
                  value={ itemCount }
                />
                <AddToCart onClick={ () => this.addProduct() } />
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
            return null;
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
                value === currentConfigurableVariant[attribute_code]
            );

            return values.map(value => (
                <li key={ value.value_index }>
                    <Swatch
                      title={ isColorOption ? '' : returnLabel(value) }
                      isRound={ isColorOption }
                      isSelected={ isSelected(value.value_index) }
                      backgroundColor={ backgroundColor(value.value_index) }
                      handler={ () => this.changeConfigurableVariant(attribute_code, value.value_index) }
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
        const { product, availableFilters } = this.props;

        const renderSwatch = ({ name, request_var }) => {
            const isColor = request_var === 'color';
            const backgroundColor = isColor ? this.getBackgroundColorForColorFilter(product[request_var]) : false;

            return (
                <li key={ name }>
                    <h4>{ name }</h4>
                    <Swatch
                      title={ isColor ? '' : this.getCustomFilterLabel(product[request_var], request_var) }
                      round={ isColor }
                      backgroundColor={ backgroundColor }
                    />
                </li>
            );
        };

        const renderAvailableAttributes = () => {
            if (availableFilters.length) {
                return availableFilters.map((filter) => {
                    if (product[filter.request_var]) {
                        return renderSwatch(filter);
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
    addProduct: PropTypes.func.isRequired,
    availableFilters: PropTypes.arrayOf(PropTypes.shape).isRequired,
    configurableVariantIndex: PropTypes.number.isRequired,
    updateConfigurableVariantIndex: PropTypes.func.isRequired,
    areDetailsLoaded: PropTypes.bool.isRequired
};

export default ProductActions;
