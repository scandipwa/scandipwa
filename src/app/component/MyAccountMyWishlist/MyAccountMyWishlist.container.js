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
import { CartDispatcher } from 'Store/Cart';
import { WishlistDispatcher } from 'Store/Wishlist';
import { showNotification } from 'Store/Notification';
import { ProductType } from 'Type/ProductList';
import MyAccountMyWishlist from './MyAccountMyWishlist.component';

export const mapStateToProps = state => ({
    isLoading: state.WishlistReducer.isLoading,
    wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = dispatch => ({
    clearWishlist: () => WishlistDispatcher.clearWishlist(dispatch),
    moveWishlistToCart: () => WishlistDispatcher.moveWishlistToCart(dispatch),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    addProductToCart: options => CartDispatcher.addProductToCart(dispatch, options),
    updateWishlistItem: options => WishlistDispatcher.updateWishlistItem(dispatch, options),
    removeFromWishlist: options => WishlistDispatcher.removeItemFromWishlist(dispatch, options)
});

export class MyAccountMyWishlistContainer extends PureComponent {
    static propTypes = {
        clearWishlist: PropTypes.func.isRequired,
        addProductToCart: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        moveWishlistToCart: PropTypes.func.isRequired,
        removeFromWishlist: PropTypes.func.isRequired,
        updateWishlistItem: PropTypes.func.isRequired,
        wishlistItems: PropTypes.objectOf(ProductType).isRequired
    };

    containerProps = () => ({
        isWishlistEmpty: this.getIsWishlistEmpty()
    });

    containerFunctions = () => ({
        removeAll: this.removeAll,
        removeItem: this.removeItem,
        addAllToCart: this.addAllToCart,
        addItemToCart: this.addItemToCart,
        getParameters: this.getParameters,
        changeQuantity: this.changeQuantity,
        changeDescription: this.changeDescription,
        showErrorNotification: this.showErrorNotification,
        showSuccessNotification: this.showSuccessNotification
    });

    getIsWishlistEmpty = () => {
        const { wishlistItems } = this.props;

        return Object.entries(wishlistItems).length <= 0;
    };

    getConfigurableVariantIndex = (sku, variants) => Object.keys(variants).find(i => variants[i].sku === sku);

    getParameters = (sku, item) => {
        const { variants, configurable_options } = item;

        const options = Object.keys(configurable_options) || [];
        const configurableVariantIndex = this.getConfigurableVariantIndex(sku, variants);

        const { attributes = {} } = variants[configurableVariantIndex];
        const parameters = Object.entries(attributes).reduce((acc, [code, { attribute_value }]) => {
            if (!options.includes(code)) return acc;

            return {
                ...acc,
                [code]: [attribute_value]
            };
        }, {});

        return parameters;
    };

    addItemToCart = (item) => {
        const { addProductToCart } = this.props;

        const {
            type_id,
            variants,
            wishlist: {
                id,
                sku,
                quantity
            }
        } = item;

        const configurableVariantIndex = this.getConfigurableVariantIndex(sku, variants);
        const product = type_id === 'configurable'
            ? {
                ...item,
                configurableVariantIndex
            }
            : item;

        return addProductToCart({ product, quantity }).then(() => this.removeItem(id));
    };

    addAllToCart = () => {
        const { moveWishlistToCart } = this.props;

        return moveWishlistToCart().then(() => this.showSuccessNotification('Wishlist moved to cart'));
    };

    changeQuantity = (item_id, quantity) => {
        const { updateWishlistItem } = this.props;
        updateWishlistItem({ item_id, quantity });
    };

    changeDescription = (item_id, description) => {
        const { updateWishlistItem } = this.props;
        updateWishlistItem({ item_id, description });
    };

    removeAll = () => {
        const { clearWishlist } = this.props;
        return clearWishlist().then(() => this.showSuccessNotification('Wishlist cleared'));
    };

    removeItem = (item_id) => {
        const { removeFromWishlist } = this.props;
        return removeFromWishlist({ item_id, noMessages: true });
    };

    showSuccessNotification = (message) => {
        const { showNotification } = this.props;
        return showNotification('success', message);
    };

    showErrorNotification = (message = 'Something went wrong') => {
        const { showNotification } = this.props;
        return showNotification('error', message);
    };

    render() {
        return (
            <MyAccountMyWishlist
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountMyWishlistContainer);
