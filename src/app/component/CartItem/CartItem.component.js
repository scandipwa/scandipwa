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
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from 'Component/Image';
import ProductPrice from 'Component/ProductPrice';
import Field from 'Component/Field';
import Loader from 'Component/Loader';
import { ProductType } from 'Type/ProductList';
import './CartItem.style';

/**
 * Cart and Minicart item
 * @class CartItem
 */
class CartItem extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: false };

        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    getProductLinkTo() {
        const { product: { url_key, configurableVariantIndex, parent }, product } = this.props;
        const variantIndex = configurableVariantIndex || 0;

        if (!url_key) return '/';

        return {
            pathname: `/product/${ url_key }`,
            state: { product: parent || product, variantIndex },
            search: `?variant=${ variantIndex }`
        };
    }

    getProductThumbnail() {
        const { product: { configurableVariantIndex, variants }, product } = this.props;

        const { thumbnail } = configurableVariantIndex
            ? variants[configurableVariantIndex].product
            : product;

        return thumbnail ? `/media/catalog/product${ thumbnail.path }` : null;
    }

    handleQtyChange(value) {
        const { addProduct, product, product: { quantity } } = this.props;
        const newQuantity = value - quantity;

        if (newQuantity) {
            this.setState({ isLoading: true });
            addProduct({ product, quantity: newQuantity }).then(
                () => this.setState({ isLoading: false })
            );
        }
    }

    handleRemoveItem() {
        const { removeProduct, product } = this.props;

        this.setState({ isLoading: true });

        removeProduct({ product }).then(
            () => this.setState({ isLoading: false })
        );
    }

    renderConfiguration() {
        const {
            product: {
                configurable_options,
                configurableVariantIndex,
                variants
            },
            isLikeTable
        } = this.props;

        if (!variants || !configurable_options) return null;

        const { product: currentVariant } = variants[configurableVariantIndex];

        return (
            <ul
              block="CartItem"
              elem="Options"
              mods={ { isLikeTable } }
            >
                { configurable_options.map(({ label, attribute_code, values }) => (
                    <li
                      key={ attribute_code }
                      aria-label={ label }
                      block="CartItem"
                      elem="Option"
                    >
                        { values.find(({ value_index }) => value_index === currentVariant[attribute_code]).label }
                    </li>
                )) }
            </ul>
        );
    }

    renderActions() {
        const {
            isEditing,
            isLikeTable,
            product: { quantity }
        } = this.props;

        return (
            <div
              block="CartItem"
              elem="Actions"
              mods={ { isEditing, isLikeTable } }
            >
                <button
                  block="CartItem"
                  id="RemoveItem"
                  name="RemoveItem"
                  elem="Delete"
                  aria-label="Remove item from cart"
                  onClick={ this.handleRemoveItem }
                >
                    <span>Delete</span>
                </button>
                <Field
                  id="item_qty"
                  name="item_qty"
                  type="number"
                  min={ 1 }
                  mix={ { block: 'CartItem', elem: 'Qty' } }
                  value={ quantity }
                  onChange={ this.handleQtyChange }
                />
            </div>
        );
    }

    render() {
        const { isLoading } = this.state;

        const {
            product: { name, price },
            isLikeTable
        } = this.props;

        return (
            <li
              block="CartItem"
            >
                <Loader isLoading={ isLoading } />
                <Link to={ this.getProductLinkTo() }>
                    <figure block="CartItem" elem="Wrapper">
                        <Image
                          src={ this.getProductThumbnail() }
                          mix={ {
                              block: 'CartItem',
                              elem: 'Picture'
                          } }
                          ratio="custom"
                          alt={ `Product ${name} thumbnail.` }
                        />
                        <figcaption
                          block="CartItem"
                          elem="Content"
                          mods={ { isLikeTable } }
                        >
                            <p block="CartItem" elem="Heading">{ name }</p>
                            { this.renderConfiguration() }
                            <ProductPrice
                              mix={ {
                                  block: 'CartItem',
                                  elem: 'Price',
                                  mods: { isLikeTable }
                              } }
                              price={ price }
                            />
                        </figcaption>
                    </figure>
                </Link>
                { this.renderActions() }
            </li>
        );
    }
}

CartItem.propTypes = {
    product: ProductType.isRequired,
    isEditing: PropTypes.bool,
    isLikeTable: PropTypes.bool,
    addProduct: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired
};

CartItem.defaultProps = {
    isEditing: false,
    isLikeTable: false
};

export default CartItem;
