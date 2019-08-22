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
     * Check that all page data is loaded
     * @return {Boolean}
     */
    allDataLoaded() {
        const {
            product: {
                price,
                type_id,
                attributes,
                configurable_options
            }
        } = this.props;
        const simpleProductData = price !== undefined && attributes !== undefined;
        const configurableProductData = simpleProductData !== undefined && configurable_options !== undefined;

        return type_id === 'configurable' ? configurableProductData : simpleProductData;
    }

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

    renderProductActions() {
        const { itemCount } = this.state;
        const {
            product,
            product: { type_id, variants },
            configurableVariantIndex,
            groupedProductQuantity
        } = this.props;

        const isConfigurable = type_id === 'configurable';
        const { price } = isConfigurable && configurableVariantIndex in variants
            ? variants[configurableVariantIndex] : product;

        return (
            <>
                <ProductPrice price={ price } />
                <Field
                  type="number"
                  id="HeaderInput"
                  onChange={ itemCount => this.setState({ itemCount }) }
                  onKeyPress={ event => this.handleKeyPress(event) }
                  value={ itemCount }
                />
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

    renderPlaceholder() {
        return (
            <>
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
    groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired
};

export default ProductActions;
