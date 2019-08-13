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

    renderFigureCaption() {
        const {
            product: { price },
            isLikeTable
        } = this.props;

        return (
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
        const {
            product: { name },
            isLoading
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
                        { this.renderFigureCaption() }
                    </figure>
                </Link>
                { this.renderActions() }
            </li>
        );
    }
}

CartItem.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    product: ProductType.isRequired,
    isEditing: PropTypes.bool,
    isLikeTable: PropTypes.bool
};

CartItem.defaultProps = {
    isEditing: false,
    isLikeTable: false
};

export default CartItem;
