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
import { connect } from 'react-redux';
import { isSignedIn } from 'Util/Auth';
import { CONFIGURABLE, GROUPED } from 'Util/Product';
import { CartDispatcher } from 'Store/Cart';
import { ProductType } from 'Type/ProductList';
import { showNotification } from 'Store/Notification';

import { WishlistDispatcher } from 'Store/Wishlist';
import AddToCart from './AddToCart.component';

export const mapStateToProps = state => ({
    wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = dispatch => ({
    addProduct: options => CartDispatcher.addProductToCart(dispatch, options),
    removeFromWishlist: options => WishlistDispatcher.removeItemFromWishlist(dispatch, options),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

export class AddToCartContainer extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        product: ProductType.isRequired,
        quantity: PropTypes.number,
        configurableVariantIndex: PropTypes.number,
        groupedProductQuantity: PropTypes.objectOf(PropTypes.number).isRequired,
        showNotification: PropTypes.func.isRequired,
        setQuantityToDefault: PropTypes.func,
        addProduct: PropTypes.func.isRequired,
        removeFromWishlist: PropTypes.func.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired,
        onProductValidationError: PropTypes.func
    };

    static defaultProps = {
        quantity: 1,
        configurableVariantIndex: 0,
        setQuantityToDefault: () => {},
        onProductValidationError: () => {},
        isLoading: false
    };

    state = { isLoading: false };

    containerFunctions = {
        buttonClick: this.buttonClick.bind(this)
    };

    _validateAddToCart() {
        const {
            configurableVariantIndex,
            groupedProductQuantity,
            showNotification,
            product,
            product: {
                type_id,
                variants = [],
                items
            }
        } = this.props;

        switch (type_id) {
        case CONFIGURABLE:
            if (configurableVariantIndex < 0 || !variants[configurableVariantIndex]) {
                showNotification('info', __('Please select product options!'));
                return false;
            }

            const { stock_status: configurableStock } = variants[configurableVariantIndex];

            if (configurableStock !== 'IN_STOCK') {
                showNotification('info', __('Sorry! The selected product option is out of stock!'));
                return false;
            }

            break;
        case GROUPED:
            const isAllItemsAvailable = items.every(({ product: { id } }) => groupedProductQuantity[id]);

            if (!isAllItemsAvailable) {
                showNotification('info', __('Sorry! Child product quantities are invalid!'));
                return false;
            }

            break;
        default:
            const { stock_status } = product;

            if (stock_status !== 'IN_STOCK') {
                showNotification('info', __('Sorry! The product is out of stock!'));
                return false;
            }
        }

        return true;
    }

    buttonClick() {
        const {
            product,
            onProductValidationError,
            configurableVariantIndex,
            groupedProductQuantity,
            quantity,
            addProduct
        } = this.props;

        const { variants, type_id } = product;

        if (!this._validateAddToCart()) {
            onProductValidationError(type_id);
            return;
        }

        this.setState({ isLoading: true });

        if (type_id === 'grouped') {
            const { items } = product;

            Promise.all(items.map((item) => {
                const { product: groupedProductItem } = item;

                groupedProductItem.parent = product;
                const quantity = groupedProductQuantity[groupedProductItem.id];
                if (!quantity) return Promise.resolve();

                return addProduct({
                    product: groupedProductItem,
                    quantity
                });
            })).then(() => this._afterAdded());

            return;
        }

        const productToAdd = variants
            ? {
                ...product,
                configurableVariantIndex
            }
            : product;

        addProduct({
            product: productToAdd,
            quantity
        }).then(
            () => this._afterAdded()
        ).catch(
            () => this.resetLoading()
        );
    }

    resetLoading() {
        this.setState({ isLoading: false });
    }

    removeProductFromWishlist() {
        const {
            wishlistItems,
            removeFromWishlist,
            configurableVariantIndex,
            product: { type_id, variants = {} } = {}
        } = this.props;

        if (type_id !== 'configurable') return;

        const { sku } = variants[configurableVariantIndex];

        const wishlistItemKey = Object.keys(wishlistItems)
            .find((key) => {
                const { wishlist: { sku: wSku } } = wishlistItems[key];
                return wSku === sku;
            });

        if (!isSignedIn() || wishlistItemKey === undefined) return;

        const { wishlist: { id: item_id } } = wishlistItems[wishlistItemKey];
        removeFromWishlist({ item_id, sku, noMessage: true });
    }

    _afterAdded() {
        const {
            showNotification,
            setQuantityToDefault
        } = this.props;

        showNotification('success', __('Product added to cart!'));
        setQuantityToDefault();

        this.removeProductFromWishlist();
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <AddToCart
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);
