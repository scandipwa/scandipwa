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
import TextPlaceholder from 'Component/TextPlaceholder';
import Image from 'Component/Image';
import Field from 'Component/Field';
import Loader from 'Component/Loader';
import CartItemPrice from 'Component/CartItemPrice';
import { CartItemType } from 'Type/MiniCart';
import './CartItem.style';

/**
 * Cart and Minicart item
 * @class CartItem
 */
class CartItem extends Component {
    /**
     * Handle item quantity change. Check that value is >= 1
     * @param {Number} value new quantity
     * @returns {void}
     */
    handleChangeQuantity(value) {
        const { handleChangeQuantity } = this.props;
        if (value < 1) {
            this.handleRemoveItem();
            return;
        }
        handleChangeQuantity(value);
    }

    /**
     * @returns {void}
     */
    handleRemoveItem() {
        const { handleRemoveItem } = this.props;
        handleRemoveItem();
    }

    /**
     * Listener for item click
     * @return {void}
     */
    handleItemClick() {
        const { onItemClick } = this.props;

        document.activeElement.blur();
        onItemClick();
    }

    renderAdditionalAttributes() {
        const { item: { product: { attributes } } } = this.props;
        const brand = attributes.find(attribute => attribute.attribute_code === 'brand');
        if (!brand && {}.hasOwnProperty.call(brand, 'attribute_value')) return null;

        return <span>{ brand.attribute_value }</span>;
    }

    renderItemTitle() {
        const { item: { product: { name } }, getProductLinkTo } = this.props;
        return (
            <div block="CartItem" elem="Title">
                <Link
                  onClick={ () => this.handleItemClick() }
                    // TODO: replace from configuration file
                  to={ getProductLinkTo() }
                >
                    { this.renderAdditionalAttributes() }
                    <p><TextPlaceholder content={ name } /></p>
                </Link>
            </div>
        );
    }

    /**
     * @returns {void}
     */
    renderItemDetails() {
        const { currency, item: { qty, row_total } } = this.props;
        return (
            <div
              block="CartItem"
              elem="Details"
            >
                <Field
                  block="CartItem"
                  elem="QtySelector"
                  id="QtySelector"
                  type="number"
                  value={ qty }
                  onChange={ qty => this.handleChangeQuantity(qty) }
                />
                <div block="CartItem" elem="Price">
                    <CartItemPrice row_total={ row_total } currency_code={ currency } />
                </div>
            </div>
        );
    }

    render() {
        const { isLoading, getProductLinkTo, getCurrentProduct } = this.props;
        const product = getCurrentProduct();
        const { product: { thumbnail: { path: thumbnail } } } = product;

        return (
            <li block="CartItem" aria-label="Cart Item">
                <Loader isLoading={ isLoading } />
                <div
                  block="CartItem"
                  elem="Thumbnail"
                >
                    <Link to={ getProductLinkTo() } onClick={ () => this.handleItemClick }>
                        <Image src={ `/media/catalog/product${ thumbnail }` } alt={ __('Cart Thumbnail') } />
                    </Link>
                </div>
                <div
                  block="CartItem"
                  elem="Info"
                  aria-label={ __('Cart Info') }
                >
                    { this.renderItemTitle() }
                    { this.renderItemDetails() }
                </div>
                <button
                  block="CartItem"
                  elem="RemoveButton"
                  onClick={ () => this.handleRemoveItem() }
                >
                    <span block="CartItem" elem="RemoveIcon" aria-hidden="true" aria-label={ __('Remove item') } />
                </button>
            </li>
        );
    }
}

CartItem.propTypes = {
    item: CartItemType.isRequired,
    handleChangeQuantity: PropTypes.func.isRequired,
    handleRemoveItem: PropTypes.func.isRequired,
    getProductLinkTo: PropTypes.func.isRequired,
    getCurrentProduct: PropTypes.func.isRequired,
    onItemClick: PropTypes.func,
    currency: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
};

CartItem.defaultProps = {
    onItemClick: () => {}
};

export default CartItem;
