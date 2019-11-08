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
    wishlistItems: state.WishlistReducer.productsInWishlist,
    groupedProductQuantity: state.ProductReducer.groupedProductQuantity
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
        wishlistItems: PropTypes.objectOf(ProductType).isRequired
    };

    static defaultProps = {
        quantity: 1,
        configurableVariantIndex: 0,
        setQuantityToDefault: () => {
        },
        isLoading: false
    };

    state = { isLoading: false };

    containerFunctions = {
        buttonClick: this.buttonClick.bind(this)
    };

    containerProps = () => ({
        isDisabled: this._getIsDisabled()
    });

    _getIsDisabled() {
        const {
            configurableVariantIndex,
            groupedProductQuantity,
            product,
            product: {
                type_id,
                variants = [],
                items
            }
        } = this.props;

        const { isLoading } = this.state;
        if (isLoading) return true;

        switch (type_id) {
        case CONFIGURABLE:
            if (!variants[configurableVariantIndex]) return true;
            const { stock_status: configurableStock } = variants[configurableVariantIndex];
            return configurableStock !== 'IN_STOCK';
        case GROUPED:
            return items.every(({ product: { id } }) => !groupedProductQuantity[id]);
        default:
            const { stock_status } = product;
            return stock_status !== 'IN_STOCK';
        }

        if (!variants[configurableVariantIndex]) {
            return true;
        }

        const productData = type_id === 'configurable'
            ? variants[configurableVariantIndex]
            : product;

        const { stock_status } = productData;
        return stock_status !== 'IN_STOCK';
    }

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
                const { product: groupedProductItem } = item;

                groupedProductItem.parent = product;
                const quantity = groupedProductQuantity[groupedProductItem.id];
                if (!quantity) return Promise.resolve();

                return addProduct({
                    product: groupedProductItem,
                    quantity
                });
            })).then(() => this._afterAdded());
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
        }).then(() => this._afterAdded());
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

        const wishilistItemKey = Object.keys(wishlistItems)
            .find((key) => {
                const { wishlist: { sku: wSku } } = wishlistItems[key];
                return wSku === sku;
            });

        if (!isSignedIn() || wishilistItemKey === undefined) return;

        const { wishlist: { id: item_id } } = wishlistItems[wishilistItemKey];
        removeFromWishlist({ item_id, sku, noMessage: true });
    }

    _afterAdded() {
        const {
            showNotification,
            setQuantityToDefault
        } = this.props;

        showNotification('success', 'Product added to cart!');
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
                { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);
