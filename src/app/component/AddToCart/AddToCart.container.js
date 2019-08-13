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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CartDispatcher } from 'Store/Cart';
import { showNotification } from 'Store/Notification';
import { WishlistDispatcher } from 'Store/Wishlist';
import { ProductType } from 'Type/ProductList';

import AddToCart from './AddToCart.component';

export const mapStateToProps = state => ({
    wishlistItems: state.WishlistReducer.productsInWishlist,
    productToBeRemovedAfterAdd: state.WishlistReducer.productToBeRemovedAfterAdd
});

export const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    removeProductFromWishlist: options => WishlistDispatcher.removeItemFromWishlist(dispatch, options)
});

export class AddToCartContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { isLoading: false };
        this.timeOut = null;
        this.availableFunctions = {
            componentWillUnmount: this.componentWillUnmount.bind(this),
            setAnimationTimeout: this.setAnimationTimeout.bind(this),
            afterAdded: this.afterAdded.bind(this),
            buttonClick: this.buttonClick.bind(this)
        };
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
        return (
            <AddToCart
              { ...this.props }
              { ...this.state }
              { ...this.availableFunctions }
            />
        );
    }
}

AddToCartContainer.propTypes = {
    quantity: PropTypes.number,
    configurableVariantIndex: PropTypes.number,
    groupedProductQuantity: PropTypes.objectOf(PropTypes.number),
    showNotification: PropTypes.func.isRequired,
    setQuantityToDefault: PropTypes.func,
    addProduct: PropTypes.func.isRequired,
    productToBeRemovedAfterAdd: PropTypes.string,
    removeProductFromWishlist: PropTypes.func.isRequired,
    wishlistItems: PropTypes.objectOf(ProductType).isRequired,
    removeWishlistItem: PropTypes.bool
};

AddToCartContainer.defaultProps = {
    quantity: 1,
    configurableVariantIndex: 0,
    groupedProductQuantity: {},
    setQuantityToDefault: () => {},
    productToBeRemovedAfterAdd: '',
    removeWishlistItem: false
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);