/* eslint-disable react/jsx-one-expression-per-line */
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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import CartItemPrice from 'Component/CartItemPrice';
import Field from 'Component/Field';
import Image from 'Component/Image';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import { CartItemType } from 'Type/MiniCart';

import './CartItem.style';

/**
 * Cart and CartOverlay item
 * @class CartItem
 * @namespace Component/CartItem/Component
 */
export class CartItem extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        item: CartItemType.isRequired,
        currency_code: PropTypes.string.isRequired,
        isEditing: PropTypes.bool,
        isLikeTable: PropTypes.bool,
        handleRemoveItem: PropTypes.func.isRequired,
        minSaleQuantity: PropTypes.number.isRequired,
        maxSaleQuantity: PropTypes.number.isRequired,
        handleChangeQuantity: PropTypes.func.isRequired,
        getCurrentProduct: PropTypes.func.isRequired,
        linkTo: PropTypes.oneOfType([
            PropTypes.shape({
                pathname: PropTypes.string,
                search: PropTypes.string
            }),
            PropTypes.string
        ]).isRequired,
        thumbnail: PropTypes.string.isRequired,
        showNotification: PropTypes.func.isRequired,
        getProductVariant: PropTypes.func.isRequired,
        isProductInStock: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isEditing: false,
        isLikeTable: false
    };

    renderProductConfigurationOption = ([key, attribute]) => {
        const {
            item: {
                product: {
                    configurable_options
                }
            }
        } = this.props;

        const { attribute_code, attribute_value } = attribute;

        if (!Object.keys(configurable_options).includes(key) || attribute_value === null) {
            return null;
        }

        const {
            [attribute_code]: { // configurable option attribute
                attribute_options: {
                    [attribute_value]: { // attribute option value label
                        label
                    }
                }
            }
        } = configurable_options;

        return (
            <li
              key={ attribute_code }
              aria-label={ attribute_code }
              block="CartItem"
              elem="Option"
            >
                { label }
            </li>
        );
    };

    renderProductConfigurations() {
        const {
            item: {
                product: {
                    configurable_options,
                    variants
                }
            },
            isLikeTable,
            getCurrentProduct
        } = this.props;

        if (!variants || !configurable_options) {
            return null;
        }

        const { attributes = [] } = getCurrentProduct() || {};

        if (!Object.entries(attributes).length) {
            return null;
        }

        return (
            <ul
              block="CartItem"
              elem="Options"
              mods={ { isLikeTable } }
            >
                { Object.entries(attributes).map(this.renderProductConfigurationOption) }
            </ul>
        );
    }

    renderWrapperContent() {
        return (
            <figure block="CartItem" elem="Wrapper">
                { this.renderImage() }
                { this.renderContent() }
            </figure>
        );
    }

    renderWrapper() {
        const { linkTo, isProductInStock } = this.props;

        // TODO: implement shared-transition here?

        if (!isProductInStock || Object.keys(linkTo).length === 0) {
            // If product is out of stock, or link is not set
            return (
                <span block="CartItem" elem="Link">
                    { this.renderWrapperContent() }
                </span>
            );
        }

        return (
            <Link to={ linkTo } block="CartItem" elem="Link">
                { this.renderWrapperContent() }
            </Link>
        );
    }

    renderProductOptionValue = (optionValue, i, array) => {
        const { label, value } = optionValue;
        const isNextAvailable = Boolean(array[i + 1]);

        return (
            <span
              block="CartItem"
              elem="ItemOptionValue"
              key={ label }
            >
                { label || value }{ isNextAvailable && ', ' }
            </span>
        );
    };

    renderProductOption = (option) => {
        const { label, values, id } = option;

        return (
            <div
              block="CartItem"
              elem="ItemOption"
              key={ id }
            >
                <div
                  block="CartItem"
                  elem="ItemOptionLabel"
                  key={ `label-${ id }` }
                >
                    { `${ label }:` }
                </div>
                <div block="CartItem" elem="ItemOptionValues">
                    { values.map(this.renderProductOptionValue) }
                </div>
            </div>
        );
    };

    renderProductOptions(itemOptions = []) {
        const { isLikeTable } = this.props;

        if (!itemOptions.length) {
            return null;
        }

        return (
            <div
              block="CartItem"
              elem="ItemOptionsWrapper"
              mods={ { isLikeTable } }
            >
                { itemOptions.map(this.renderProductOption) }
            </div>
        );
    }

    renderProductName() {
        const {
            item: {
                product: {
                    name
                }
            }
        } = this.props;

        return (
            <p
              block="CartItem"
              elem="Heading"
            >
                { name }
            </p>
        );
    }

    renderProductPrice() {
        const {
            isLikeTable,
            currency_code,
            item: {
                row_total
            }
        } = this.props;

        return (
            <CartItemPrice
              row_total={ row_total }
              currency_code={ currency_code }
              mix={ {
                  block: 'CartItem',
                  elem: 'Price',
                  mods: { isLikeTable }
              } }
            />
        );
    }

    renderOutOfStockMessage() {
        const { isProductInStock } = this.props;

        if (isProductInStock) {
            return null;
        }

        return (
            <p block="CartItem" elem="OutOfStock">
                { __('Product is out of stock') }
            </p>
        );
    }

    renderContent() {
        const {
            isLikeTable,
            item: {
                customizable_options,
                bundle_options
            } = {}
        } = this.props;

        return (
            <figcaption
              block="CartItem"
              elem="Content"
              mods={ { isLikeTable } }
            >
                { this.renderOutOfStockMessage() }
                { this.renderProductName() }
                { this.renderProductOptions(customizable_options) }
                { this.renderProductOptions(bundle_options) }
                { this.renderProductConfigurations() }
                { this.renderProductPrice() }
            </figcaption>
        );
    }

    renderQuantityChangeField() {
        const {
            item: { qty },
            minSaleQuantity,
            maxSaleQuantity,
            handleChangeQuantity,
            isProductInStock
        } = this.props;

        if (!isProductInStock) {
            return null;
        }

        return (
            <Field
              id="item_qty"
              name="item_qty"
              type="number"
              isControlled
              min={ minSaleQuantity }
              max={ maxSaleQuantity }
              mix={ { block: 'CartItem', elem: 'Qty' } }
              value={ qty }
              onChange={ handleChangeQuantity }
            />
        );
    }

    renderActions() {
        const {
            isEditing,
            isLikeTable,
            handleRemoveItem
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
                    <span>{ __('Delete') }</span>
                </button>
                { this.renderQuantityChangeField() }
            </div>
        );
    }

    renderImage() {
        const { item: { product: { name } }, thumbnail, isProductInStock } = this.props;

        const isNotAvailable = !isProductInStock;

        return (
            <>
                <Image
                  src={ thumbnail }
                  mix={ {
                      block: 'CartItem',
                      elem: 'Picture',
                      mods: {
                          isNotAvailable
                      }
                  } }
                  ratio="custom"
                  alt={ `Product ${name} thumbnail.` }
                />
                <img
                  style={ { display: 'none' } }
                  alt={ name }
                  src={ thumbnail }
                />
            </>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <li block="CartItem">
                <Loader isLoading={ isLoading } />
                { this.renderWrapper() }
                { this.renderActions() }
            </li>
        );
    }
}

export default CartItem;
