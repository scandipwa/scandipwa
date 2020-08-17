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
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { showNotification } from 'Store/Notification/Notification.action';
import { ProductType } from 'Type/ProductList';
import { isSignedIn } from 'Util/Auth';
import { getExtensionAttributes } from 'Util/Product';

import ProductWishlistButton from './ProductWishlistButton.component';
import { ERROR_CONFIGURABLE_NOT_PROVIDED } from './ProductWishlistButton.config';

const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

export const mapStateToProps = (state) => ({
    productsInWishlist: state.WishlistReducer.productsInWishlist,
    isLoading: state.WishlistReducer.isLoading
});

export const mapDispatchToProps = (dispatch) => ({
    addProductToWishlist: (wishlistItem) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addItemToWishlist(dispatch, wishlistItem)
    ),
    removeProductFromWishlist: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeItemFromWishlist(dispatch, options)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

export class ProductWishlistButtonContainer extends PureComponent {
    static propTypes = {
        quantity: PropTypes.number,
        product: ProductType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        configurableVariantIndex: PropTypes.number,
        showNotification: PropTypes.func.isRequired,
        productsInWishlist: PropTypes.objectOf(ProductType).isRequired,
        addProductToWishlist: PropTypes.func.isRequired,
        onProductValidationError: PropTypes.func,
        removeProductFromWishlist: PropTypes.func.isRequired
    };

    static defaultProps = {
        quantity: 1,
        onProductValidationError: () => {},
        configurableVariantIndex: -2
    };

    containerProps = () => ({
        isDisabled: this.isDisabled(),
        isInWishlist: this.isInWishlist(),
        isReady: this._getIsProductReady()
    });

    containerFunctions = () => ({
        addToWishlist: this.toggleProductInWishlist.bind(this, true),
        removeFromWishlist: this.toggleProductInWishlist.bind(this, false)
    });

    toggleProductInWishlist = (add = true) => {
        const {
            product: { sku, type_id },
            quantity,
            isLoading,
            showNotification,
            productsInWishlist,
            addProductToWishlist,
            onProductValidationError,
            removeProductFromWishlist
        } = this.props;

        if (!isSignedIn()) {
            return showNotification('info', __('You must login or register to add items to your wishlist.'));
        }

        if (isLoading) {
            return null;
        }

        const product = this._getProductVariant();
        if (product === ERROR_CONFIGURABLE_NOT_PROVIDED) {
            onProductValidationError(type_id);
            return showNotification('info', __('Please, select desirable option first!'));
        }

        const { sku: variantSku, product_option } = product;
        if (add) {
            return addProductToWishlist({ sku, product_option, quantity });
        }

        const { wishlist: { id: item_id } } = Object.values(productsInWishlist).find(
            ({ wishlist: { sku } }) => sku === variantSku
        );

        return removeProductFromWishlist({ item_id, sku: variantSku });
    };

    isDisabled = () => {
        const { isLoading } = this.props;
        const product = this._getProductVariant();

        if (product === ERROR_CONFIGURABLE_NOT_PROVIDED) {
            return true;
        }

        return isLoading || !isSignedIn();
    };

    isInWishlist = () => {
        const { productsInWishlist } = this.props;
        const product = this._getProductVariant();

        if (product === ERROR_CONFIGURABLE_NOT_PROVIDED) {
            return false;
        }

        const { sku: productSku } = product;
        return Object.values(productsInWishlist).findIndex(({ wishlist: { sku } }) => sku === productSku) >= 0;
    };

    _getIsProductReady() {
        const { product: { type_id }, configurableVariantIndex } = this.props;

        if (type_id === 'configurable' && configurableVariantIndex < 0) {
            return false;
        }

        return true;
    }

    _getProductVariant() {
        const {
            product,
            product: { type_id },
            configurableVariantIndex
        } = this.props;

        if (type_id === 'configurable') {
            if (configurableVariantIndex < 0) {
                return ERROR_CONFIGURABLE_NOT_PROVIDED;
            }

            const extension_attributes = getExtensionAttributes({ ...product, configurableVariantIndex });
            const variant = product.variants[configurableVariantIndex];

            return { ...variant, product_option: { extension_attributes } };
        }

        return product;
    }

    render() {
        return (
            <ProductWishlistButton
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWishlistButtonContainer);
