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

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CartDispatcher } from 'Store/Cart';
import { makeCancelable } from 'Util/Promise';
import { CartItemType } from 'Type/MiniCart';
import { objectToUri } from 'Util/Url';
import CartItem from './CartItem.component';

const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options),
    changeItemQty: options => CartDispatcher.changeItemQty(dispatch, options),
    removeProduct: options => CartDispatcher.removeProductFromCart(dispatch, options)
});

export class CartItemContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.handlers = [];
        this.containerFunctions = {
            handleChangeQuantity: this.handleChangeQuantity.bind(this),
            handleRemoveItem: this.handleRemoveItem.bind(this),
            getProductLinkTo: this.getProductLinkTo.bind(this),
            getCurrentProduct: this.getCurrentProduct.bind(this)
        };
        this.setStateNotLoading = this.setStateNotLoading.bind(this);
    }

    componentWillUnmount() {
        if (this.handlers.length) [].forEach.call(this.handlers, cancelablePromise => cancelablePromise.cancel());
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

        const params = [].reduce.call(configurable_options,
            (result, item) => {
                const { attribute_code: option_code } = item;
                const currentAttribute = [].find.call(attributes, (attribute) => {
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

    setStateNotLoading() {
        this.setState({ isLoading: false });
    }

    /**
     * @param {Promise}
     * @returns {cancelablePromise}
     */
    registerCancelablePromise(promise) {
        const cancelablePromise = makeCancelable(promise);
        this.handlers.push(cancelablePromise);
        return cancelablePromise;
    }

    /**
     * @param {Promise} promise
     * @returns {void}
     */
    hideLoaderAfterPromise(promise) {
        this.registerCancelablePromise(promise)
            .promise.then(this.setStateNotLoading, this.setStateNotLoading);
    }

    /**
     * Handle item quantity change. Check that value is <1
     * @param {Number} value new quantity
     * @return {void}
     */
    handleChangeQuantity(quantity) {
        this.setState({ isLoading: true }, () => {
            const { changeItemQty, item: { item_id, sku } } = this.props;
            this.hideLoaderAfterPromise(changeItemQty({ item_id, quantity, sku }));
        });
    }

    /**
     * @return {void}
     */
    handleRemoveItem() {
        this.setState({ isLoading: true }, () => {
            const { removeProduct, item: { item_id } } = this.props;
            this.hideLoaderAfterPromise(removeProduct(item_id));
        });
    }

    render() {
        const { isLoading } = this.state;
        return (
            <CartItem
              { ...this.props }
              { ...this.containerFunctions }
              isLoading={ isLoading }
            />
        );
    }
}

CartItemContainer.propTypes = {
    item: CartItemType.isRequired,
    changeItemQty: PropTypes.func.isRequired,
    removeProduct: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(CartItemContainer);
