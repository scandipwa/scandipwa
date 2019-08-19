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
import { ProductType } from 'Type/ProductList';
import { convertKeyValueObjectToQueryString } from 'Util/Url';
import './CartItem.style';

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
     * @param url_key Url to product
     * @return {{pathname: Srting, state Object}} Pathname and product state
     */
    getProductLinkTo(url_key) {
        if (!url_key) return undefined;
        const {
            product,
            product: {
                type_id,
                configurable_options,
                configurableVariantIndex,
                parent,
                variants = []
            }
        } = this.props;

        if (type_id === 'simple') return { pathname: `/product/${ url_key }` };

        const { attributes } = variants[configurableVariantIndex];

        const parameters = Object.entries(attributes).reduce(
            (parameters, [code, { attribute_value }]) => {
                if (Object.keys(configurable_options).includes(code)) return { ...parameters, [code]: attribute_value };
                return parameters;
            }, {}
        );

        return {
            pathname: `/product/${ url_key }`,
            state: { product: parent || product },
            search: convertKeyValueObjectToQueryString(parameters)
        };
    }

    /**
     * Get data of a product
     * @return {Object} Product data
     */
    getDataSource() {
        const { product, product: { configurableVariantIndex } } = this.props;

        if (typeof configurableVariantIndex === 'number') {
            const { variants } = product;

            return { ...product, ...variants[configurableVariantIndex].product };
        }

        return product;
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

    /**
     * Removes product from the cart
     * @return {void}
     */
    handleRemoveItem() {
        const { removeProduct, product } = this.props;
        this.setState({ isLoading: true });
        removeProduct({ product });
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

    renderItemTitle(url_key, name, brand) {
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

    renderItemDetails(quantity, price) {
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
                  value={ quantity }
                  onChange={ quantity => this.handleChangeQuantity(quantity) }
                />
                <div block="CartItem" elem="Price">
                    <ProductPrice price={ price } mods={ { type: 'regular' } } />
                </div>
            </div>
        );
    }

    render() {
        const { isLoading } = this.state;
        const {
            thumbnail: { path: thumbnail },
            url_key,
            name,
            quantity,
            price,
            brand
        } = this.getDataSource();

        return (
            <li block="CartItem" aria-label="Cart Item">
                <Loader isLoading={ isLoading } />
                <div
                  block="CartItem"
                  elem="Thumbnail"
                >
                    <Link to={ this.getProductLinkTo(url_key) } onClick={ () => this.handleItemClick }>
                        <Image src={ `/media/catalog/product${thumbnail}` } alt={ __('Cart Thumbnail') } />
                    </Link>
                </div>
                <div
                  block="CartItem"
                  elem="Info"
                  aria-label={ __('Cart Info') }
                >
                    { url_key && this.renderItemTitle(url_key, name, brand || '') }
                    { quantity && this.renderItemDetails(quantity, price) }
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
    product: ProductType.isRequired,
    addProduct: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired,
    onItemClick: PropTypes.func
};

CartItem.defaultProps = {
    onItemClick: () => {}
};

export default CartItem;
