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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isSignedIn } from 'Util/Auth';
import { showNotification } from 'Store/Notification';
import { WishlistDispatcher } from 'Store/Wishlist';
import { ProductType } from 'Type/ProductList';
import ProductWishlistButton from './ProductWishlistButton.component';

export const mapStateToProps = state => ({
    productsInWishlist: state.WishlistReducer.productsInWishlist,
    isLoading: state.WishlistReducer.isLoading
});

export const mapDispatchToProps = dispatch => ({
    addProductToWishlist: options => WishlistDispatcher.addItemToWishlist(dispatch, options),
    removeProductFromWishlist: options => WishlistDispatcher.removeItemFromWishlist(dispatch, options),
    showNotification: (type, message) => dispatch(showNotification(type, message))
});

export class ProductWishlistButtonContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        isLoading: PropTypes.bool.isRequired,
        showNotification: PropTypes.func.isRequired,
        productsInWishlist: PropTypes.objectOf(ProductType).isRequired,
        addProductToWishlist: PropTypes.func.isRequired,
        removeProductFromWishlist: PropTypes.func.isRequired
    };

    containerProps = () => ({
        isInWishlist: this.isInWishlist()
    });

    containerFunctions = () => ({
        addToWishlist: this.toggleProductInWishlist,
        removeFromWishlist: this.toggleProductInWishlist.bind(this, false)
    });

    toggleProductInWishlist = (add = true) => {
        const {
            product,
            product: { id },
            showNotification,
            productsInWishlist,
            addProductToWishlist,
            removeProductFromWishlist
        } = this.props;

        if (!isSignedIn()) {
            return showNotification('error', __('You must login or register to add items to your wishlist.'));
        }

        if (add) return addProductToWishlist({ product });

        return removeProductFromWishlist({ product: productsInWishlist[id] });
    };

    isInWishlist = () => {
        const { product: { id }, productsInWishlist } = this.props;

        return id in productsInWishlist;
    };

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
