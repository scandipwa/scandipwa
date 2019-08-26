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
import { objectToUri } from 'Util/Url';
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

    componentWillUnmount() {
        if (this.removeItem) this.removeItem.cancel();
    }

    /**
     * Get link to product page
     * @return {{pathname: String, state Object}} Pathname and product state
     */
    getProductLinkTo() {
        const {
            item: {
                product,
                product: {
                    type_id,
                    configurable_options,
                    parent,
                    variants = [],
                    url_key
                }
            }
        } = this.props;

        if (type_id !== 'configurable') return { pathname: `/product/${ url_key }` };

        const { product: { attributes } } = variants[this.getVariantIndex()];

        const params = Array.prototype.reduce.call(configurable_options,
            (result, item) => {
                const { attribute_code: option_code } = item;
                const currentAttribute = Array.prototype.find.call(attributes, (attribute) => {
                    const { attribute_code } = attribute;
                    return option_code === attribute_code;
                });
                const { attribute_code: current_code, attribute_value } = currentAttribute;

                return { ...result, [current_code]: attribute_value };
            }, {});

        return {
            pathname: `/product/${ url_key }`,
            state: { product: parent || product },
            search: objectToUri(params)
        };
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

        return variants.findIndex(({ product: { sku } }) => sku === itemSku);
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

    /**
     * Handle item quantity change. Check that value is >= 1
     * @param {Number} value new quantity
     * @return {void}
     */
    handleChangeQuantity(value) {
        const { handleChangeQuantity } = this.props;
        if (value < 1) return this.handleRemoveItem();
        return this.setState({ isLoading: true }, () => {
            this.changeQuantity = handleChangeQuantity(value);
            this.changeQuantity.promise.then(() => this.setState({ isLoading: false }));
        });
    }

    handleRemoveItem() {
        const { handleRemoveItem } = this.props;
        return this.setState({ isLoading: true }, () => {
            this.removeItem = handleRemoveItem();
            this.removeItem.promise.then(() => this.setState({ isLoading: false }));
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
        const { item: { product: { name, url_key, attributes } } } = this.props;
        const brand = attributes.find(attribute => attribute.attribute_code === 'brand').attribute_value;
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
        const { isLoading } = this.state;
        const { product: { thumbnail: { path: thumbnail } } } = this.getCurrentProduct();

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
    handleChangeQuantity: PropTypes.func.isRequired,
    handleRemoveItem: PropTypes.func.isRequired,
    onItemClick: PropTypes.func,
    currency: PropTypes.string.isRequired
};

CartItem.defaultProps = {
    onItemClick: () => {}
};

export default CartItem;
