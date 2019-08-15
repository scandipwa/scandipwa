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
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { ProductType } from 'Type/ProductList';
import { CartDispatcher } from 'Store/Cart';

import CartItem from './CartItem.component';

export const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options),
    removeProduct: options => CartDispatcher.removeProductFromCart(dispatch, options)
});

export class CartItemContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { isLoading: false };

        this.containerFunctions = {
            handleQtyChange: this.handleQtyChange.bind(this),
            handleRemoveItem: this.handleRemoveItem.bind(this),
            getProductLinkTo: this._getProductLinkTo.bind(this),
            getProductThumbnail: this._getProductThumbnail.bind(this)
        };

        this.containerProps = () => ({
            thumbnail: this._getProductThumbnail(),
            linkTo: this._getProductLinkTo()
        });
    }

    _getProductLinkTo() {
        const { product: { url_key, configurableVariantIndex, parent }, product } = this.props;
        const variantIndex = configurableVariantIndex || 0;

        if (!url_key) return '/';

        return {
            pathname: `/product/${ url_key }`,
            state: { product: parent || product, variantIndex },
            search: `?variant=${ variantIndex }`
        };
    }

    _getProductThumbnail() {
        const { product: { configurableVariantIndex, variants }, product } = this.props;

        const { thumbnail: { path } = {} } = configurableVariantIndex
            ? variants[configurableVariantIndex].product
            : product;

        return path ? `/media/catalog/product${ path }` : '';
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


    render() {
        return (
            <CartItem
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

CartItemContainer.propTypes = {
    product: ProductType.isRequired,
    addProduct: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(CartItemContainer);
