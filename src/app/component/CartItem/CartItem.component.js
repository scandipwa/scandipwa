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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from 'Component/Image';
import ProductPrice from 'Component/ProductPrice';
import Field from 'Component/Field';
import Loader from 'Component/Loader';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ProductType } from 'Type/ProductList';
import { convertKeyValueObjectToQueryString } from 'Util/Url';
import './CartItem.style';

/**
 * Cart and Minicart item
 * @class CartItem
 */
class CartItem extends PureComponent {
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

        const { attributes } = variants[configurableVariantIndex];

        return (
            <ul
              block="CartItem"
              elem="Options"
              mods={ { isLikeTable } }
            >
                { Object.entries(attributes).map(([key, { attribute_label, attribute_code }]) => (
                    !Object.keys(configurable_options).includes(key) && (
                        <li
                          key={ attribute_code }
                          aria-label={ attribute_code }
                          block="CartItem"
                          elem="Option"
                        >
                            { attribute_label }
                        </li>
                    ))) }
            </ul>
        );
    }

    renderContent() {
        const { isLikeTable, linkTo } = this.props;

        return (
            <Link to={ linkTo }>
                <figure block="CartItem" elem="Wrapper">
                    { this.renderImage() }
                    <figcaption
                      block="CartItem"
                      elem="Content"
                      mods={ { isLikeTable } }
                    >
                        { this.renderProductDetails() }
                    </figcaption>
                </figure>
            </Link>
        );
    }

    renderProductDetails() {
        const { product: { name, price, isLikeTable } } = this.props;

        return (
            <>
                <p
                  block="CartItem"
                  elem="Heading"
                  itemProp="name"
                >
                    { name }
                </p>
                { this.renderConfiguration() }
                <ProductPrice
                  mix={ {
                      block: 'CartItem',
                      elem: 'Price',
                      mods: { isLikeTable }
                  } }
                  price={ price }
                />
            </>
        );
    }

    renderActions() {
        const {
            isEditing,
            isLikeTable,
            product: { quantity },
            handleRemoveItem,
            handleQtyChange
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
                  onClick={ handleRemoveItem }
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
                  onChange={ handleQtyChange }
                />
            </div>
        );
    }

    renderImage() {
        const { product: { name }, thumbnail } = this.props;

        return (
            <>
                <Image
                  src={ thumbnail }
                  mix={ {
                      block: 'CartItem',
                      elem: 'Picture'
                  } }
                  ratio="custom"
                  alt={ `Product ${name} thumbnail.` }
                />
                <img
                  style={ { display: 'none' } }
                  alt={ name }
                  src={ thumbnail }
                  itemProp="image"
                />
            </>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <li
              block="CartItem"
              itemScope
              itemType="https://schema.org/Product"
            >
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
                { this.renderActions() }
            </li>
        );
    }
}

CartItem.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    product: ProductType.isRequired,
    isEditing: PropTypes.bool,
    isLikeTable: PropTypes.bool,
    handleRemoveItem: PropTypes.func.isRequired,
    handleQtyChange: PropTypes.func.isRequired,
    linkTo: PropTypes.oneOfType([
        PropTypes.shape({
            pathname: PropTypes.string,
            search: PropTypes.string
        }),
        PropTypes.string
    ]).isRequired,
    thumbnail: PropTypes.string.isRequired
};

CartItem.defaultProps = {
    isEditing: false,
    isLikeTable: false
};

export default CartItem;
