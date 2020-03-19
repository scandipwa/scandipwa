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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'Component/Link';
import Image from 'Component/Image';
import Field from 'Component/Field';
import CartItemPrice from 'Component/CartItemPrice';
import Loader from 'Component/Loader';
import { CartItemType } from 'Type/MiniCart';
import './CartItem.style';

/**
 * Cart and CartOverlay item
 * @class CartItem
 */
export default class CartItem extends PureComponent {
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
        thumbnail: PropTypes.string.isRequired
    };

    static defaultProps = {
        isEditing: false,
        isLikeTable: false
    };

    renderConfiguration() {
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

        if (!variants || !configurable_options) return null;

        const product = getCurrentProduct() || {};
        const { attributes = [] } = product;

        return (
            <ul
              block="CartItem"
              elem="Options"
              mods={ { isLikeTable } }
            >
                { Object.entries(attributes).map(([key, { attribute_code, attribute_value }]) => (
                    Object.keys(configurable_options).includes(key) && (
                        <li
                          key={ attribute_code }
                          aria-label={ attribute_code }
                          block="CartItem"
                          elem="Option"
                        >
                            { configurable_options[attribute_code].attribute_options[attribute_value].label }
                        </li>
                    ))) }
            </ul>
        );
    }

    renderContent() {
        const { isLikeTable, linkTo } = this.props;

        return (
            <Link to={ linkTo } block="CartItem" elem="Link">
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
        const {
            isLikeTable,
            currency_code,
            item: {
                row_total,
                product: {
                    name
                }
            }
        } = this.props;

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
                <CartItemPrice
                  row_total={ row_total }
                  currency_code={ currency_code }
                  mix={ {
                      block: 'CartItem',
                      elem: 'Price',
                      mods: { isLikeTable }
                  } }
                />
            </>
        );
    }

    renderActions() {
        const {
            isEditing,
            isLikeTable,
            item: { qty },
            minSaleQuantity,
            maxSaleQuantity,
            handleRemoveItem,
            handleChangeQuantity
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
            </div>
        );
    }

    renderImage() {
        const { item: { product: { name } }, thumbnail } = this.props;

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
