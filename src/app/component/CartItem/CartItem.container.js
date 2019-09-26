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
import { PureComponent } from 'react';
import { ProductType } from 'Type/ProductList';
import { CartDispatcher } from 'Store/Cart';
import { objectToUri } from 'Util/Url';

import CartItem from './CartItem.component';

export const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options),
    removeProduct: options => CartDispatcher.removeProductFromCart(dispatch, options)
});

export class CartItemContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        addProduct: PropTypes.func.isRequired,
        removeProduct: PropTypes.func.isRequired
    };

    state = { isLoading: false };

    containerFunctions = {
        handleQtyChange: this.handleQtyChange.bind(this),
        handleRemoveItem: this.handleRemoveItem.bind(this)
    };

    containerProps = () => ({
        thumbnail: this._getProductThumbnail(),
        linkTo: this._getProductLinkTo()
    });

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

    /**
     * Get link to product page
     * @param url_key Url to product
     * @return {{pathname: Srting, state Object}} Pathname and product state
     */
    _getProductLinkTo() {
        const {
            product,
            product: {
                type_id,
                url_key,
                configurable_options,
                configurableVariantIndex,
                parent,
                variants = []
            }
        } = this.props;

        if (type_id === 'simple') return { pathname: `/product/${ url_key }` };

        const { attributes = [] } = variants[configurableVariantIndex] || {};

        const parameters = Object.entries(attributes).reduce(
            (parameters, [code, { attribute_value }]) => {
                if (Object.keys(configurable_options).includes(code)) return { ...parameters, [code]: attribute_value };
                return parameters;
            }, {}
        );

        return {
            pathname: `/product/${ url_key }`,
            state: { product: parent || product },
            search: objectToUri(parameters)
        };
    }

    _getProductThumbnail() {
        const { product: { configurableVariantIndex, variants }, product } = this.props;

        const { thumbnail: { path: thumbnail } = {} } = configurableVariantIndex
            ? variants[configurableVariantIndex]
            : product;

        return thumbnail ? `/media/catalog/product${ thumbnail }` : '';
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

export default connect(null, mapDispatchToProps)(CartItemContainer);
