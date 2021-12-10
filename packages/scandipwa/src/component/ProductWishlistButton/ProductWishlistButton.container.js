/* eslint-disable */
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
import { MixType } from 'Type/Common.type';
import { MagentoProductType, ProductType } from 'Type/ProductList.type';
import { isSignedIn } from 'Util/Auth';
import { noopFn } from 'Util/Common';

import ProductWishlistButton from './ProductWishlistButton.component';

export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

/** @namespace Component/ProductWishlistButton/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    productsInWishlist: state.WishlistReducer.productsInWishlist,
    isAddingWishlistItem: state.WishlistReducer.isLoading,
    wishlistId: state.WishlistReducer.id
});

/** @namespace Component/ProductWishlistButton/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    addProductToWishlist: (wishlistItem) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addItemToWishlist(dispatch, wishlistItem)
    ),
    removeProductFromWishlist: (options) => WishlistDispatcher.then(
        ({ default: dispatcher }) => dispatcher.removeItemFromWishlist(dispatch, options)
    ),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

/** @namespace Component/ProductWishlistButton/Container */
export class ProductWishlistButtonContainer extends PureComponent {
    static propTypes = {
        magentoProduct: PropTypes.arrayOf(MagentoProductType).isRequired,
        isAddingWishlistItem: PropTypes.bool.isRequired,
        productsInWishlist: PropTypes.objectOf(ProductType).isRequired,
        addProductToWishlist: PropTypes.func.isRequired,
        removeProductFromWishlist: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        onProductValidationError: PropTypes.func,
        wishlistId: PropTypes.number,
        mix: MixType
    };

    static defaultProps = {
        mix: {},
        onProductValidationError: noopFn
    };

    state = {
        isWishlistButtonLoading: false
    };

    containerFunctions = {
        addToWishlist: this.toggleProductInWishlist.bind(this, true),
        removeFromWishlist: this.toggleProductInWishlist.bind(this, false)
    };

    componentDidUpdate(prevProps) {
        const { isAddingWishlistItem: isPrevAddingWishlistItem } = prevProps;
        const { isAddingWishlistItem } = this.props;

        if (isPrevAddingWishlistItem && !isAddingWishlistItem) {
            this.setWishlistButtonLoading(false);
        }
    }

    containerProps() {
        const { magentoProduct, mix } = this.props;

        return {
            mix,
            magentoProduct,
            isDisabled: this.isDisabled(),
            isInWishlist: this.isInWishlist(),
            isSignedIn: isSignedIn()
        };
    }

    setWishlistButtonLoading(isLoading) {
        return this.setState({ isWishlistButtonLoading: isLoading });
    }

    async toggleProductInWishlist(add = true) {
        const {
            magentoProduct,
            magentoProduct: [{ sku }] = [],
            isAddingWishlistItem,
            showNotification,
            addProductToWishlist,
            removeProductFromWishlist,
            wishlistId
        } = this.props;

        if (!isSignedIn()) {
            return showNotification('info', __('You must login or register to add items to your wishlist.'));
        }

        if (isAddingWishlistItem) {
            return null;
        }

        this.setWishlistButtonLoading(true);

        if (add) {
            await addProductToWishlist({
                items: magentoProduct,
                wishlistId
            });

            return;
        }

        const wishlistItem = this.getWishlistItem(sku);
        if (!wishlistItem) {
            return;
        }

        const {
            wishlist: {
                id: itemId
            }
        } = wishlistItem;

        return removeProductFromWishlist({ item_id: itemId });
    }

    isDisabled() {
        const { isAddingWishlistItem } = this.props;
        return isAddingWishlistItem || !isSignedIn();
    };

    getWishlistItem(sku) {
        const { productsInWishlist } = this.props;
        if (!productsInWishlist) {
            return null;
        }

        // TODO: After new graphql will need to check by options
        return Object.values(productsInWishlist).find(
            ({ sku: wishlistSku }) => sku === wishlistSku
        );
    }

    isInWishlist() {
        const { magentoProduct = [] } = this.props;
        const [{ sku: productSku }] = magentoProduct;

        if (!productSku) {
            return false;
        }

        return !!this.getWishlistItem(productSku);
    };

    render() {
        const { isWishlistButtonLoading } = this.state;

        return (
            <ProductWishlistButton
              isLoading={ isWishlistButtonLoading }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWishlistButtonContainer);
