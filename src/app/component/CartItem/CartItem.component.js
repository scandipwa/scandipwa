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
import ProductPrice from 'Component/ProductPrice';
import Field from 'Component/Field';
import Loader from 'Component/Loader';
import { CartItemType } from 'Type/MiniCart';
import './CartItem.style';
import { formatCurrency } from 'Util/Price';

/**
 * Cart and Minicart item
 * @class CartItem
 */
class CartItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    /**
     * Get link to product page
     * @return {{pathname: String, state Object}} Pathname and product state
     */
    getProductLinkTo() {
        const { item: { product: { url_key } } } = this.props;
        const variantIndex = this.getVariantIndex();

        return {
            pathname: `/product/${ url_key }`,
            state: { product: parent || product, variantIndex },
            search: `?variant=${ variantIndex >= 0 ? variantIndex : 0}`
        };
    }

    componentWillUnmount() {
        const { handleRemoveItem } = this.props;
        this.removeItem && this.removeItem.cancel();
    }

    /**
     * Handle item quantity change. Check that value is <1
     * @param {Number} value new quantity
     * @return {void}
     */
    handleChangeQuantity(value) {
        const { addProduct, product, product: { quantity } } = this.props;
        const newQuantity = quantity < value ? 1 : -1;
        this.setState({ isLoading: true });
        addProduct({ product, quantity: newQuantity }).then(
            () => this.setState({ isLoading: false })
        );
    }

    
    handleRemoveItem() {
        const { handleRemoveItem } = this.props;
        this.setState({ isLoading: true }, () => {
            this.removeItem = handleRemoveItem();
            this.removeItem.promise.then(() => this.setState({ isLoading: false }))
        });
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

    renderItemTitle() {
        const { item: { product: { name, url_key, attributes } }} = this.props;
        let brand = attributes.find(attribute => attribute.attribute_code === 'brand').attribute_value;
        return (
            <div block="CartItem" elem="Title">
                <Link
                  onClick={ () => this.handleItemClick() }
                    // TODO: replace from configuration file
                  to={ this.getProductLinkTo(url_key) }
                >
                    { brand && <span>{ brand }</span> }
                    <p><TextPlaceholder content={ name } /></p>
                </Link>
            </div>
        );
    }

    /**
     * @returns {void}
     */
    renderItemDetails() {
        const { currency, item: {qty, row_total} } = this.props;
        const priceString = formatCurrency(ProductPrice.roundPrice(row_total), currency);
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
                    <p block="ProductPrice" aria-label={ __('Product Price') }>
                        <span aria-label={ __('Current product price') }>
                            <data value={ProductPrice.roundPrice(row_total)}>{ priceString }</data>
                        </span>
                    </p>
                </div>
            </div>
        );
    }

    /**
     * @returns {Int}
     */
    getVariantIndex() {
        const {
            item: {
                sku: itemSku,
                product: { variants = [] }
            }
        } = this.props;

        return variants.findIndex( ({ product: { sku } }) => sku === itemSku);
    }

    /**
     * @returns {Product}
     */
    getCurrentProduct() {
        const { item: { product } } = this.props;

        const variantIndex = this.getVariantIndex();
        if (variantIndex < 0) {
            return product;
        }
        return product.variants[variantIndex];
    }

    render() {
        const { isLoading } = this.state;
        const { product: { thumbnail: { path: thumbnail } } } = this.getCurrentProduct();
        let t = '';
        return (
            <li block="CartItem" aria-label="Cart Item">
                <Loader isLoading={ isLoading } />
                <div
                  block="CartItem"
                  elem="Thumbnail"
                >
                    <Link to={ this.getProductLinkTo() } onClick={ () => this.handleItemClick }>
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
    addProduct: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    onItemClick: PropTypes.func
};

CartItem.defaultProps = {
    onItemClick: () => {}
};

export default CartItem;
