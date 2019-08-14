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
import { ProductType } from 'Type/ProductList';
import './AddToCart.style';

/**
 * Button for adding product to Cart
 * @class AddToCart
 */
class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
        this.timeOut = null;
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    /**
     * Switch button text to indicated that product has been added
     * @return {Promise}
     */
    setAnimationTimeout() {
        return setTimeout(() => {
            this.timeOut = null;
            this.setState(({ transition }) => ({ transition: !transition }));
        }, 1500);
    }

    afterAdded() {
        const {
            showNotification,
            setQuantityToDefault,
            productToBeRemovedAfterAdd,
            removeProductFromWishlist,
            wishlistItems,
            product,
            removeWishlistItem
        } = this.props;

        showNotification('success', 'Product added to cart!');
        setQuantityToDefault();

        const { sku, id } = product;

        // for configurable products productToBeRemovedAfterAdd will be saved in state
        if (removeWishlistItem || (productToBeRemovedAfterAdd === sku && wishlistItems[id])) {
            removeProductFromWishlist({ product: wishlistItems[id], noMessages: true });
        }

        this.setState({ isLoading: false });
    }

    /**
     * Button click listener
     * @return {void}
     */
    buttonClick() {
        const {
            product,
            configurableVariantIndex,
            groupedProductQuantity,
            quantity,
            addProduct
        } = this.props;
        const { variants, type_id } = product;

        this.setState({ isLoading: true });

        if (type_id === 'grouped') {
            const { items } = product;
            return Promise.all(items.map((item) => {
                // TODO: TEST
                const { product: groupedProductItem } = item;
                const {
                    items: deletedItems,
                    ...parentProduct
                } = product;

                groupedProductItem.parent = parentProduct;

                return addProduct({
                    product: groupedProductItem,
                    quantity: groupedProductQuantity[groupedProductItem.id]
                });
            })).then(() => this.afterAdded());
        }
        const productToAdd = variants
            ? {
                ...product,
                configurableVariantIndex
            }
            : product;

        return addProduct({
            product: productToAdd,
            quantity
        }).then(() => this.afterAdded());
    }

    render() {
        const { isLoading } = this.state;
        const {
            mix,
            product: {
                type_id,
                stock_status,
                variants = []
            },
            fullWidth,
            configurableVariantIndex
        } = this.props;

        if (!type_id) {
            return (
                <div
                  block="AddToCart"
                  mods={ { isLoading, isPlaceholder: true } }
                  mix={ mix }
                />
            );
        }

        const isNotAvailable = stock_status !== 'IN_STOCK';
        const isNotVariantAvailable = type_id === 'configurable' && !variants[configurableVariantIndex];

        return (
            <button
              onClick={ () => this.buttonClick() }
              block="AddToCart"
              elem="Button"
              mods={ { isLoading, fullWidth } }
              disabled={ isLoading || isNotAvailable || isNotVariantAvailable }
            >
                <span>{ __('Add to cart') }</span>
                <span>{ __('Adding...') }</span>
            </button>
        );
    }
}

AddToCart.propTypes = {
    product: ProductType,
    quantity: PropTypes.number,
    configurableVariantIndex: PropTypes.number,
    groupedProductQuantity: PropTypes.objectOf(PropTypes.number),
    showNotification: PropTypes.func.isRequired,
    setQuantityToDefault: PropTypes.func,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string,
        mods: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]))
    }),
    addProduct: PropTypes.func.isRequired,
    productToBeRemovedAfterAdd: PropTypes.string,
    removeProductFromWishlist: PropTypes.func.isRequired,
    wishlistItems: PropTypes.objectOf(ProductType).isRequired,
    removeWishlistItem: PropTypes.bool,
    fullWidth: PropTypes.bool
};

AddToCart.defaultProps = {
    quantity: 1,
    configurableVariantIndex: 0,
    groupedProductQuantity: {},
    setQuantityToDefault: () => {},
    product: {},
    mix: {},
    productToBeRemovedAfterAdd: '',
    removeWishlistItem: false,
    fullWidth: false
};

export default AddToCart;
